import { PrismaClient } from '@prisma/client';

// Prisma client singleton
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// ============================================================================
// DATABASE QUERIES FOR PREDICTIONS
// ============================================================================

export async function getHistoricalMatchupStats(seed1: number, seed2: number) {
  const games = await prisma.historicalGame.findMany({
    where: {
      OR: [
        { team1Seed: seed1, team2Seed: seed2 },
        { team1Seed: seed2, team2Seed: seed1 },
      ],
    },
    orderBy: { year: 'desc' },
  });

  if (games.length === 0) {
    return null;
  }

  const seed1Wins = games.filter(
    g => (g.team1Seed === seed1 && g.winnerSeed === seed1) ||
         (g.team2Seed === seed1 && g.winnerSeed === seed1)
  ).length;

  return {
    totalGames: games.length,
    seed1Wins,
    seed2Wins: games.length - seed1Wins,
    winRate: seed1Wins / games.length,
    upsetRate: (games.length - seed1Wins) / games.length,
    averageMargin: calculateAverageMargin(games, seed1),
    recentTrend: getRecentTrend(games.slice(0, 5), seed1),
  };
}

export async function getTeamSeasonHistory(teamName: string, lookback: number = 10) {
  const seasons = await prisma.teamSeason.findMany({
    where: {
      teamName: { contains: teamName, mode: 'insensitive' },
      season: { gte: new Date().getFullYear() - lookback },
    },
    orderBy: { season: 'desc' },
  });

  return {
    tournamentAppearances: seasons.filter(s => s.madeTournament).length,
    avgTournamentWins: avg(seasons.map(s => s.tournamentWins)),
    finalFours: seasons.filter(s => s.finalFour).length,
    championships: seasons.filter(s => s.championship).length,
    avgKenPomRank: avg(seasons.map(s => s.kenPomRank).filter(Boolean)),
    recentForm: seasons.slice(0, 3),
  };
}

export async function getChampionshipDNAProfile(teamName: string, season: number) {
  const team = await prisma.teamSeason.findUnique({
    where: {
      teamName_season: { teamName, season },
    },
  });

  if (!team) return null;

  // All champions since 2002 were top 25 in both offense and defense
  const hasChampionshipDNA = 
    team.kenPomRank && team.kenPomRank <= 25 &&
    team.adjOE && team.adjOE >= 115 &&
    team.adjDE && team.adjDE <= 95;

  const injuries = await prisma.injury.findMany({
    where: {
      teamName: { contains: teamName, mode: 'insensitive' },
      season,
      injuryType: { in: ['out', 'questionable'] },
    },
  });

  const totalImpact = injuries.reduce((sum, i) => sum + (i.impactScore || 0), 0);

  return {
    hasChampionshipDNA,
    kenPomRank: team.kenPomRank,
    efficiencyMargin: (team.adjOE || 0) - (team.adjDE || 100),
    injuries: {
      count: injuries.length,
      totalImpact,
      critical: injuries.filter(i => i.severity === 'critical').length,
    },
  };
}

export async function getUpsetIndicators(seed: number) {
  // Query historical upsets for this seed line
  const upsets = await prisma.historicalGame.findMany({
    where: {
      OR: [
        { team1Seed: seed, upset: true },
        { team2Seed: seed, upset: true },
      ],
    },
  });

  // Common characteristics of upsets for this seed
  const upsetCharacteristics = await prisma.$queryRaw`
    SELECT 
      AVG(CASE WHEN team1_seed < team2_seed THEN team1_ken_pom_rank ELSE team2_ken_pom_rank END) as avg_favorite_kp,
      AVG(CASE WHEN team1_seed > team2_seed THEN team1_ken_pom_rank ELSE team2_ken_pom_rank END) as avg_underdog_kp,
      COUNT(*) FILTER (WHERE overtime = true) as overtime_games
    FROM historical_games
    WHERE upset = true
    AND (team1_seed = ${seed} OR team2_seed = ${seed})
  `;

  return {
    totalUpsets: upsets.length,
    upsetRate: upsets.length / await getTotalGamesForSeed(seed),
    characteristics: upsetCharacteristics,
  };
}

// ============================================================================
// PREDICTION CACHE
// ============================================================================

export async function getCachedPrediction(team1Id: string, team2Id: string) {
  const cacheKey = `pred:2025:${team1Id}:${team2Id}`;
  
  const cached = await prisma.predictionCache.findUnique({
    where: { cacheKey },
  });

  if (!cached || cached.expiresAt < new Date()) {
    return null;
  }

  return {
    winnerId: cached.winnerId,
    probability: cached.probability,
    confidence: cached.confidence,
    upsetProbability: cached.upsetProbability,
    factors: cached.factors,
  };
}

export async function cachePrediction(
  team1Id: string,
  team2Id: string,
  result: {
    winnerId: string;
    probability: number;
    confidence: number;
    upsetProbability: number;
    factors: any;
  }
) {
  const cacheKey = `pred:2025:${team1Id}:${team2Id}`;
  
  await prisma.predictionCache.upsert({
    where: { cacheKey },
    update: {
      winnerId: result.winnerId,
      probability: result.probability,
      confidence: result.confidence,
      upsetProbability: result.upsetProbability,
      factors: result.factors,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    },
    create: {
      cacheKey,
      team1Id,
      team2Id,
      winnerId: result.winnerId,
      probability: result.probability,
      confidence: result.confidence,
      upsetProbability: result.upsetProbability,
      factors: result.factors,
      expiresAt: new Date(Date.now() + 3600000),
    },
  });
}

export async function invalidatePredictionCache(teamName?: string) {
  if (teamName) {
    // Invalidate all predictions involving this team
    await prisma.predictionCache.deleteMany({
      where: {
        OR: [
          { team1Id: { contains: teamName } },
          { team2Id: { contains: teamName } },
        ],
      },
    });
  } else {
    // Clear all expired cache
    await prisma.predictionCache.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  }
}

// ============================================================================
// SEEDING HISTORICAL DATA
// ============================================================================

export async function seedHistoricalData(games: any[]) {
  const batch = games.map(g => prisma.historicalGame.upsert({
    where: {
      // Composite key would be better, using id for now
      id: `${g.year}-${g.round}-${g.team1Name}-${g.team2Name}`,
    },
    update: {},
    create: {
      year: g.year,
      round: g.round,
      region: g.region,
      team1Seed: g.team1Seed,
      team1Name: g.team1Name,
      team1Score: g.team1Score,
      team2Seed: g.team2Seed,
      team2Name: g.team2Name,
      team2Score: g.team2Score,
      winnerSeed: g.winnerSeed,
      upset: g.upset,
      overtime: g.overtime,
      team1KenPomRank: g.team1KenPomRank,
      team2KenPomRank: g.team2KenPomRank,
      team1AdjOE: g.team1AdjOE,
      team1AdjDE: g.team1AdjDE,
      team2AdjOE: g.team2AdjOE,
      team2AdjDE: g.team2AdjDE,
    },
  }));

  return await prisma.$transaction(batch);
}

// ============================================================================
// HELPERS
// ============================================================================

function calculateAverageMargin(games: any[], targetSeed: number): number {
  let totalMargin = 0;
  let count = 0;

  for (const g of games) {
    if (g.team1Score && g.team2Score) {
      const margin = g.team1Seed === targetSeed 
        ? g.team1Score - g.team2Score
        : g.team2Score - g.team1Score;
      totalMargin += margin;
      count++;
    }
  }

  return count > 0 ? totalMargin / count : 0;
}

function getRecentTrend(games: any[], targetSeed: number): 'up' | 'down' | 'flat' {
  const wins = games.filter(g => g.winnerSeed === targetSeed).length;
  if (wins >= 4) return 'up';
  if (wins <= 1) return 'down';
  return 'flat';
}

async function getTotalGamesForSeed(seed: number): Promise<number> {
  const count = await prisma.historicalGame.count({
    where: {
      OR: [{ team1Seed: seed }, { team2Seed: seed }],
    },
  });
  return count;
}

function avg(arr: (number | null | undefined)[]): number {
  const valid = arr.filter((n): n is number => typeof n === 'number');
  return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
}
