import {
  getHistoricalMatchupStats,
  getTeamSeasonHistory,
  getChampionshipDNAProfile,
  getCachedPrediction,
  cachePrediction,
} from './dbQueries';

import {
  getEnhancedTeamProfile,
  getLiveGames,
} from './espnApi';

import {
  seedVsSeedHistory,
  modelWeights,
  conferenceTournamentPerformance,
} from '../data/ultimateDataset';

// ============================================================================
// HYBRID PREDICTION ENGINE
// Combines database historical data + API live data + cache layer
// ============================================================================

export interface HybridTeamData {
  id: string;
  name: string;
  seed: number;
  region: string;
  record: string;
  
  // From database (historical)
  historical: {
    tournamentAppearances: number;
    avgTournamentWins: number;
    finalFours: number;
    championships: number;
    seedHistory: any[];
  } | null;
  
  // From API (live)
  live: {
    momentum: {
      games: number;
      wins: number;
      winRate: number;
      streak: number;
      last10Record?: string;
    };
    injuries: {
      playerName: string;
      status: string;
      severity?: 'critical' | 'major' | 'moderate' | 'minor';
    }[];
    hasInjuries?: boolean;
    criticalInjuries?: number;
    isHot: boolean;
    isCold: boolean;
  } | null;
  
  // From database (current season metrics)
  metrics: {
    kenPomRank: number | null;
    adjOE: number | null;
    adjDE: number | null;
    conference: string | null;
  } | null;
  
  // Computed
  championshipDNA: {
    hasDNA: boolean;
    efficiencyMargin: number;
    injuryImpact: number;
  } | null;
}

export interface HybridPrediction {
  winner: {
    id: string;
    name: string;
    seed: number;
  };
  loser: {
    id: string;
    name: string;
    seed: number;
  };
  probability: number;        // Winner's win probability
  confidence: number;         // Our confidence in this prediction
  upsetProbability: number;   // Chance of upset if lower seed wins
  
  factors: {
    seedHistoryWeight: number;
    kenPomWeight: number;
    momentumWeight: number;
    injuryWeight: number;
    historicalWeight: number;
  };
  
  reasoning: string[];
  dataSources: string[];
}

// ============================================================================
// MAIN PREDICTION FUNCTION
// ============================================================================

export async function predictHybrid(
  team1Id: string,
  team2Id: string,
  options: {
    skipCache?: boolean;
    useLiveData?: boolean;
    year?: number;
  } = {}
): Promise<HybridPrediction> {
  const { skipCache = false, useLiveData = true, year = 2025 } = options;
  
  // 1. Check cache first
  if (!skipCache) {
    const cached = await getCachedPrediction(team1Id, team2Id);
    if (cached) {
      const factors = cached.factors as any || {};
      return {
        winner: { id: cached.winnerId, name: '', seed: 0 },
        loser: { id: '', name: '', seed: 0 },
        probability: cached.probability,
        confidence: cached.confidence,
        upsetProbability: cached.upsetProbability,
        factors: {
          seedHistoryWeight: factors.seedHistoryWeight ?? 0.25,
          kenPomWeight: factors.kenPomWeight ?? 0.20,
          momentumWeight: factors.momentumWeight ?? 0.15,
          injuryWeight: factors.injuryWeight ?? 0.10,
          historicalWeight: factors.historicalWeight ?? 0.10,
        },
        reasoning: ['Retrieved from cache'],
        dataSources: ['cache'],
      };
    }
  }
  
  // 2. Gather data from all sources
  const [team1Data, team2Data, matchupStats] = await Promise.all([
    gatherTeamData(team1Id, year, useLiveData),
    gatherTeamData(team2Id, year, useLiveData),
    getHistoricalMatchupStats(
      parseInt(team1Id) || 1, // Fallback if ID isn't seed
      parseInt(team2Id) || 16
    ),
  ]);
  
  // 3. Run prediction algorithm
  const prediction = computeHybridPrediction(team1Data, team2Data, matchupStats);
  
  // 4. Cache result
  await cachePrediction(team1Id, team2Id, {
    winnerId: prediction.winner.id,
    probability: prediction.probability,
    confidence: prediction.confidence,
    upsetProbability: prediction.upsetProbability,
    factors: prediction.factors,
  });
  
  return prediction;
}

// ============================================================================
// DATA GATHERING
// ============================================================================

async function gatherTeamData(
  teamId: string,
  year: number,
  useLiveData: boolean
): Promise<HybridTeamData> {
  // Parallel fetch from all sources
  const [historical, live, championshipDNA] = await Promise.all([
    // Database queries
    getTeamSeasonHistory(teamId, 10),
    
    // API queries (if enabled)
    useLiveData ? getEnhancedTeamProfile(teamId, teamId, year) : null,
    
    // Championship DNA analysis
    getChampionshipDNAProfile(teamId, year),
  ]);
  
  return {
    id: teamId,
    name: teamId, // Will be populated from full team lookup
    seed: 1,      // Will be populated
    region: '',
    record: '',
    
    historical: historical ? {
      ...historical,
      seedHistory: [],
    } : null,
    live,
    metrics: championshipDNA ? {
      kenPomRank: championshipDNA.kenPomRank || null,
      adjOE: null,
      adjDE: null,
      conference: null,
    } : null,
    championshipDNA: championshipDNA ? {
      hasDNA: !!championshipDNA.hasChampionshipDNA,
      efficiencyMargin: championshipDNA.efficiencyMargin,
      injuryImpact: championshipDNA.injuries.totalImpact,
    } : null,
  };
}

// ============================================================================
// PREDICTION ALGORITHM
// ============================================================================

function computeHybridPrediction(
  team1: HybridTeamData,
  team2: HybridTeamData,
  matchupStats: any
): HybridPrediction {
  const reasoning: string[] = [];
  const dataSources: string[] = [];
  
  // Calculate weighted scores
  let score1 = 0.5; // Base
  let score2 = 0.5;
  
  // 1. Seed History (25%)
  const seedKey = `${Math.min(team1.seed, team2.seed)}v${Math.max(team1.seed, team2.seed)}`;
  const seedHistory = seedVsSeedHistory[seedKey];
  
  if (seedHistory && matchupStats) {
    const seedAdvantage = team1.seed < team2.seed ? 1 : -1;
    const adjustment = (seedHistory.winPct - 0.5) * 2 * seedAdvantage * modelWeights.seedHistory;
    score1 += adjustment;
    score2 -= adjustment;
    
    reasoning.push(`Seed history: ${seedKey} matchup favors ${seedHistory.winPct > 0.5 ? 'higher' : 'lower'} seed`);
    dataSources.push('historical_games_db');
  }
  
  // 2. KenPom Metrics (20%)
  if (team1.metrics?.kenPomRank && team2.metrics?.kenPomRank) {
    const kpDiff = team2.metrics.kenPomRank - team1.metrics.kenPomRank;
    const kpAdjustment = (kpDiff / 50) * modelWeights.kenPom;
    score1 += kpAdjustment;
    score2 -= kpAdjustment;
    
    reasoning.push(`KenPom: #${team1.metrics.kenPomRank} vs #${team2.metrics.kenPomRank}`);
    dataSources.push('kenpom_metrics_db');
  }
  
  // 3. Momentum (10%)
  if (team1.live && team2.live) {
    const m1 = team1.live.momentum.winRate;
    const m2 = team2.live.momentum.winRate;
    const momAdjustment = (m1 - m2) * modelWeights.momentum;
    score1 += momAdjustment;
    score2 -= momAdjustment;
    
    if (team1.live.isHot) reasoning.push(`${team1.name} is hot: ${team1.live.momentum.streak} game streak`);
    if (team2.live.isHot) reasoning.push(`${team2.name} is hot: ${team2.live.momentum.streak} game streak`);
    dataSources.push('espn_api');
  }
  
  // 4. Injuries (15%)
  if (team1.live && team2.live) {
    const i1 = team1.live.injuries.length * 0.05;
    const i2 = team2.live.injuries.length * 0.05;
    const injuryAdjustment = (i2 - i1) * modelWeights.injuries;
    score1 += injuryAdjustment;
    score2 -= injuryAdjustment;
    
    if ((team1.live.criticalInjuries ?? 0) > 0) reasoning.push(`${team1.name} has ${team1.live.criticalInjuries} critical injuries`);
    if ((team2.live.criticalInjuries ?? 0) > 0) reasoning.push(`${team2.name} has ${team2.live.criticalInjuries} critical injuries`);
    dataSources.push('injury_reports_api');
  }
  
  // 5. Historical Performance (10%)
  if (team1.historical && team2.historical) {
    const h1 = team1.historical.avgTournamentWins / 5; // Normalize
    const h2 = team2.historical.avgTournamentWins / 5;
    const histAdjustment = (h1 - h2) * modelWeights.seedHistory;
    score1 += histAdjustment;
    score2 -= histAdjustment;
    
    if (team1.historical.championships > team2.historical.championships) {
      reasoning.push(`${team1.name} has championship pedigree`);
    }
    dataSources.push('team_seasons_db');
  }
  
  // Determine winner
  const winner = score1 > score2 ? team1 : team2;
  const loser = score1 > score2 ? team2 : team1;
  const totalScore = score1 + score2;
  const probability = Math.max(score1, score2) / totalScore;
  
  // Calculate upset probability
  const upsetProbability = winner.seed > loser.seed 
    ? probability 
    : (1 - probability) * (loser.seed - winner.seed) * 0.05;
  
  // Confidence based on data quality
  const dataQuality = [
    matchupStats ? 0.2 : 0,
    team1.metrics ? 0.2 : 0,
    team2.metrics ? 0.2 : 0,
    team1.live ? 0.2 : 0,
    team2.live ? 0.2 : 0,
  ].reduce((a, b) => a + b, 0);
  
  const confidence = 0.5 + (dataQuality * 0.3) + (probability * 0.2);
  
  return {
    winner: {
      id: winner.id,
      name: winner.name,
      seed: winner.seed,
    },
    loser: {
      id: loser.id,
      name: loser.name,
      seed: loser.seed,
    },
    probability,
    confidence,
    upsetProbability,
    factors: {
      seedHistoryWeight: modelWeights.seedHistory,
      kenPomWeight: modelWeights.kenPom,
      momentumWeight: modelWeights.momentum,
      injuryWeight: modelWeights.injuries,
      historicalWeight: 0.1,
    },
    reasoning,
    dataSources: Array.from(new Set(dataSources)),
  };
}

// ============================================================================
// BATCH PREDICTIONS (for full bracket)
// ============================================================================

export async function predictTournamentBatch(
  matchups: Array<{ team1Id: string; team2Id: string }>
): Promise<HybridPrediction[]> {
  const predictions: HybridPrediction[] = [];
  
  // Process in batches to avoid overwhelming APIs
  const batchSize = 5;
  for (let i = 0; i < matchups.length; i += batchSize) {
    const batch = matchups.slice(i, i + batchSize);
    
    const batchPredictions = await Promise.all(
      batch.map(m => predictHybrid(m.team1Id, m.team2Id))
    );
    
    predictions.push(...batchPredictions);
    
    // Small delay between batches
    if (i + batchSize < matchups.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }
  
  return predictions;
}

// ============================================================================
// REAL-TIME UPDATES
// ============================================================================

export async function updatePredictionsWithLiveData(
  currentPredictions: HybridPrediction[]
): Promise<HybridPrediction[]> {
  const liveGames = await getLiveGames();
  
  const updated = await Promise.all(
    currentPredictions.map(async pred => {
      // Check if this game is live
      const liveGame = liveGames.find(
        g => (g.team1.name === pred.winner.name || g.team2.name === pred.winner.name) &&
             (g.team1.name === pred.loser.name || g.team2.name === pred.loser.name)
      );
      
      if (liveGame) {
        // Game is in progress - adjust prediction based on current score
        const winnerScore = liveGame.team1.name === pred.winner.name 
          ? liveGame.team1.score 
          : liveGame.team2.score;
        const loserScore = liveGame.team1.name === pred.loser.name 
          ? liveGame.team1.score 
          : liveGame.team2.score;
        
        // Simple heuristic: if leader has 10+ point lead, increase probability
        const lead = winnerScore - loserScore;
        const adjustedProb = Math.min(0.99, pred.probability + (lead * 0.01));
        
        return {
          ...pred,
          probability: adjustedProb,
          reasoning: [...pred.reasoning, `Live: ${winnerScore}-${loserScore} (${liveGame.timeRemaining} left)`],
        };
      }
      
      return pred;
    })
  );
  
  return updated;
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  predictHybrid,
  predictTournamentBatch,
  updatePredictionsWithLiveData,
  gatherTeamData,
};
