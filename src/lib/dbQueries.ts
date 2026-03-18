import { PrismaClient } from '@prisma/client';

// Prisma client singleton - lazy initialization to prevent build-time connection
let prismaClient: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prismaClient) {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set - returning mock client');
      // Return a mock client for build time
      return createMockPrisma();
    }
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}

// Mock Prisma client for build time
function createMockPrisma(): PrismaClient {
  const mockHandler = {
    get: () => Promise.resolve([]),
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    count: () => Promise.resolve(0),
    upsert: () => Promise.resolve({}),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
  };
  
  return new Proxy({} as PrismaClient, {
    get: () => mockHandler,
  });
}

// Export for backward compatibility
export const prisma = getPrisma();

// ============================================================================
// DATABASE QUERIES FOR PREDICTIONS
// ============================================================================

export async function getHistoricalMatchupStats(seed1: number, seed2: number) {
  const prisma = getPrisma();
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
  const prisma = getPrisma();
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
    avgKenPomRank: avg(seasons.map(s => s.kenPomRank).filter((v): v is number => v != null)),
    recentForm: seasons.slice(0, 3),
  };
}

export async function getChampionshipDNAProfile(teamName: string, season: number) {
  const prisma = getPrisma();
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
    dnaMetrics: {
      kenPomRank: team.kenPomRank || 999,
      adjustedOffense: team.adjOE || 100,
      adjustedDefense: team.adjDE || 100,
    },
  };
}

// ============================================================================
// PREDICTION CACHE
// ============================================================================

export async function getCachedPrediction(team1Id: string, team2Id: string) {
  const prisma = getPrisma();
  const cacheKey = `pred:2025:${team1Id}:${team2Id}`;
  
  const cached = await prisma.predictionCache.findUnique({
    where: { cacheKey },
  });
  
  if (!cached || cached.expiresAt < new Date()) {
    return null;
  }
  
  return cached;
}

export async function cachePrediction(
  team1Id: string,
  team2Id: string,
  prediction: any
) {
  const prisma = getPrisma();
  const cacheKey = `pred:2025:${team1Id}:${team2Id}`;
  
  await prisma.predictionCache.upsert({
    where: { cacheKey },
    update: {
      team1Id,
      team2Id,
      winnerId: prediction.winnerId,
      probability: prediction.probability,
      confidence: prediction.confidence,
      upsetProbability: prediction.upsetProbability,
      factors: prediction.factors,
      expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour
    },
    create: {
      cacheKey,
      team1Id,
      team2Id,
      winnerId: prediction.winnerId,
      probability: prediction.probability,
      confidence: prediction.confidence,
      upsetProbability: prediction.upsetProbability,
      factors: prediction.factors,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    },
  });
}

// ============================================================================
// LIVE GAME DATA
// ============================================================================

export async function saveLiveGame(gameData: any) {
  const prisma = getPrisma();
  return prisma.liveGame.upsert({
    where: { gameId: gameData.gameId },
    update: gameData,
    create: gameData,
  });
}

export async function getLiveGamesForUpdate() {
  const prisma = getPrisma();
  return prisma.liveGame.findMany({
    where: {
      status: { in: ['scheduled', 'live'] },
    },
    orderBy: { scheduledAt: 'asc' },
  });
}

// ============================================================================
// USER BRACKET MANAGEMENT
// ============================================================================

export async function getUserBracket(userId: string, year: number = 2025) {
  const prisma = getPrisma();
  return prisma.userBracket.findFirst({
    where: { userId, year },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function saveUserBracket(userId: string, name: string, bracket: any, year: number = 2025) {
  const prisma = getPrisma();
  return prisma.userBracket.upsert({
    where: { 
      userId_year_name: { userId, year, name }
    },
    update: {
      picks: bracket,
      updatedAt: new Date(),
    },
    create: {
      userId,
      year,
      name,
      picks: bracket,
      strategy: 'balanced',
    },
  });
}

// ============================================================================
// STATS AND ANALYTICS
// ============================================================================

export async function getPredictionAccuracy() {
  const prisma = getPrisma();
  // Note: This would need a 'verified' field added to the schema
  // For now, return null
  return null;
}

export async function getUpsetHistory(seed1: number, seed2: number) {
  const prisma = getPrisma();
  const upsets = await prisma.historicalGame.findMany({
    where: {
      OR: [
        { team1Seed: seed1, team2Seed: seed2, upset: true },
        { team1Seed: seed2, team2Seed: seed1, upset: true },
      ],
    },
    orderBy: { year: 'desc' },
    take: 10,
  });
  
  return upsets;
}

// ============================================================================
// HELPERS
// ============================================================================

function calculateAverageMargin(games: any[], targetSeed: number) {
  const margins = games.map(g => {
    const isTargetTeam1 = g.team1Seed === targetSeed;
    const targetScore = isTargetTeam1 ? g.team1Score : g.team2Score;
    const opponentScore = isTargetTeam1 ? g.team2Score : g.team1Score;
    return targetScore - opponentScore;
  });
  
  return avg(margins);
}

function getRecentTrend(games: any[], targetSeed: number) {
  const wins = games.filter(g => g.winnerSeed === targetSeed).length;
  return {
    wins,
    losses: games.length - wins,
    winRate: wins / games.length,
  };
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export default {
  getPrisma,
  getHistoricalMatchupStats,
  getTeamSeasonHistory,
  getChampionshipDNAProfile,
  getCachedPrediction,
  cachePrediction,
  saveLiveGame,
  getLiveGamesForUpdate,
  getUserBracket,
  saveUserBracket,
  getPredictionAccuracy,
  getUpsetHistory,
};
