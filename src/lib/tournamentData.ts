// ============================================================================
// TOURNAMENT DATA ANALYTICS ENGINE
// Processes historical data to extract predictive patterns
// ============================================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================================
// SEED MATCHUP HISTORICAL RECORDS (1985-2024)
// ============================================================================

export interface SeedMatchupRecord {
  matchup: string;
  higherSeedWins: number;
  lowerSeedWins: number;
  totalGames: number;
  upsetRate: number;
  avgMargin: number;
}

export const seedMatchupHistory: Record<string, SeedMatchupRecord> = {
  '1v16': { matchup: '1 vs 16', higherSeedWins: 158, lowerSeedWins: 2, totalGames: 160, upsetRate: 0.0125, avgMargin: 24.5 },
  '2v15': { matchup: '2 vs 15', higherSeedWins: 149, lowerSeedWins: 11, totalGames: 160, upsetRate: 0.0688, avgMargin: 18.2 },
  '3v14': { matchup: '3 vs 14', higherSeedWins: 137, lowerSeedWins: 23, totalGames: 160, upsetRate: 0.1438, avgMargin: 12.5 },
  '4v13': { matchup: '4 vs 13', higherSeedWins: 127, lowerSeedWins: 33, totalGames: 160, upsetRate: 0.2063, avgMargin: 9.8 },
  '5v12': { matchup: '5 vs 12', higherSeedWins: 103, lowerSeedWins: 57, totalGames: 160, upsetRate: 0.3563, avgMargin: 5.2 },
  '6v11': { matchup: '6 vs 11', higherSeedWins: 98, lowerSeedWins: 62, totalGames: 160, upsetRate: 0.3875, avgMargin: 3.1 },
  '7v10': { matchup: '7 vs 10', higherSeedWins: 98, lowerSeedWins: 62, totalGames: 160, upsetRate: 0.3875, avgMargin: 2.8 },
  '8v9': { matchup: '8 vs 9', higherSeedWins: 77, lowerSeedWins: 83, totalGames: 160, upsetRate: 0.5188, avgMargin: 1.5 },
  // Round of 32
  '1v8': { matchup: '1 vs 8', higherSeedWins: 61, lowerSeedWins: 16, totalGames: 77, upsetRate: 0.2078, avgMargin: 8.5 },
  '1v9': { matchup: '1 vs 9', higherSeedWins: 75, lowerSeedWins: 6, totalGames: 81, upsetRate: 0.0741, avgMargin: 12.2 },
  '2v7': { matchup: '2 vs 7', higherSeedWins: 65, lowerSeedWins: 27, totalGames: 92, upsetRate: 0.2935, avgMargin: 6.8 },
  '2v10': { matchup: '2 vs 10', higherSeedWins: 38, lowerSeedWins: 19, totalGames: 57, upsetRate: 0.3333, avgMargin: 5.5 },
  '3v6': { matchup: '3 vs 6', higherSeedWins: 49, lowerSeedWins: 33, totalGames: 82, upsetRate: 0.4024, avgMargin: 4.2 },
  '3v11': { matchup: '3 vs 11', higherSeedWins: 35, lowerSeedWins: 20, totalGames: 55, upsetRate: 0.3636, avgMargin: 5.8 },
  '4v5': { matchup: '4 vs 5', higherSeedWins: 45, lowerSeedWins: 37, totalGames: 82, upsetRate: 0.4512, avgMargin: 3.1 },
  '4v12': { matchup: '4 vs 12', higherSeedWins: 32, lowerSeedWins: 13, totalGames: 45, upsetRate: 0.2889, avgMargin: 6.5 },
  '5v13': { matchup: '5 vs 13', higherSeedWins: 18, lowerSeedWins: 3, totalGames: 21, upsetRate: 0.1429, avgMargin: 8.2 },
  // Sweet 16
  '1v4': { matchup: '1 vs 4', higherSeedWins: 44, lowerSeedWins: 18, totalGames: 62, upsetRate: 0.2903, avgMargin: 7.8 },
  '1v5': { matchup: '1 vs 5', higherSeedWins: 39, lowerSeedWins: 11, totalGames: 50, upsetRate: 0.2200, avgMargin: 9.5 },
  '2v3': { matchup: '2 vs 3', higherSeedWins: 32, lowerSeedWins: 19, totalGames: 51, upsetRate: 0.3725, avgMargin: 4.5 },
  '2v6': { matchup: '2 vs 6', higherSeedWins: 25, lowerSeedWins: 7, totalGames: 32, upsetRate: 0.2188, avgMargin: 8.2 },
  '3v7': { matchup: '3 vs 7', higherSeedWins: 10, lowerSeedWins: 6, totalGames: 16, upsetRate: 0.3750, avgMargin: 4.8 },
  '3v10': { matchup: '3 vs 10', higherSeedWins: 10, lowerSeedWins: 4, totalGames: 14, upsetRate: 0.2857, avgMargin: 6.2 },
  // Elite 8
  '1v2': { matchup: '1 vs 2', higherSeedWins: 27, lowerSeedWins: 24, totalGames: 51, upsetRate: 0.4706, avgMargin: 5.5 },
  '1v3': { matchup: '1 vs 3', higherSeedWins: 18, lowerSeedWins: 10, totalGames: 28, upsetRate: 0.3571, avgMargin: 7.2 },
  '1v6': { matchup: '1 vs 6', higherSeedWins: 8, lowerSeedWins: 2, totalGames: 10, upsetRate: 0.2000, avgMargin: 10.5 },
  '2v4': { matchup: '2 vs 4', higherSeedWins: 3, lowerSeedWins: 4, totalGames: 7, upsetRate: 0.5714, avgMargin: 4.2 },
};

// ============================================================================
// CHAMPIONSHIP DNA CRITERIA
// Teams that won championships had these common traits
// ============================================================================

export const championshipDNA = {
  // Since 2002 (KenPom era)
  kenPomRank: {
    average: 4.2,
    median: 3,
    range: [1, 15], // Lowest ranked champion was UConn 2014 at #15
  },
  offensiveEfficiency: {
    average: 121.5,
    median: 122.5,
    min: 115.0, // UConn 2011
  },
  defensiveEfficiency: {
    average: 94.2,
    median: 94.5,
    max: 99.2, // Worst defensive champ was Villanova 2016
  },
  adjustedTempo: {
    average: 68.0,
    median: 68.0,
    range: [62.5, 73.5],
  },
  mustBeTop25: {
    both: true, // All champions since 2002 were top 25 in both OE and DE
    offense: true,
    defense: true,
  },
};

// ============================================================================
// CONFERENCE STRENGTH (Tournament Win % by Conference, 2000-2024)
// ============================================================================

export const conferenceStrength = {
  'ACC': { winRate: 0.625, champions: 5, finalFours: 18, avgSeed: 4.2 },
  'Big 12': { winRate: 0.584, champions: 3, finalFours: 12, avgSeed: 4.8 },
  'SEC': { winRate: 0.636, champions: 4, finalFours: 14, avgSeed: 5.1 },
  'Big Ten': { winRate: 0.512, champions: 2, finalFours: 10, avgSeed: 5.5 },
  'Big East': { winRate: 0.589, champions: 6, finalFours: 16, avgSeed: 4.8 },
  'Pac-10/12': { winRate: 0.545, champions: 2, finalFours: 8, avgSeed: 5.8 },
  'Mountain West': { winRate: 0.425, champions: 0, finalFours: 1, avgSeed: 8.2 },
  'AAC': { winRate: 0.485, champions: 1, finalFours: 2, avgSeed: 6.8 },
  'WCC': { winRate: 0.412, champions: 0, finalFours: 1, avgSeed: 7.5 },
  'Horizon': { winRate: 0.385, champions: 0, finalFours: 2, avgSeed: 9.2 },
  'C-USA': { winRate: 0.352, champions: 0, finalFours: 1, avgSeed: 8.8 },
};

// ============================================================================
// UPSET INDICATORS
// Statistical factors that predict upsets
// ============================================================================

export const upsetIndicators = {
  '12_over_5': {
    probability: 0.356,
    keyFactors: [
      '12-seed has top-50 defensive efficiency',
      '5-seed has 3+ losses in last 10 games',
      '12-seed won conference tournament',
      '12-seed has 25+ wins',
      '12-seed experienced backcourt (2+ upperclassmen guards)',
    ],
    redFlags: [
      '5-seed is from major conference (ACC, Big 12, SEC, Big Ten)',
      '12-seed relies heavily on one player (30%+ of offense)',
      '12-seed poor road record (under .500)',
    ],
  },
  '11_over_6': {
    probability: 0.388,
    keyFactors: [
      '11-seed has star player (18+ PPG)',
      '11-seed won First Four/play-in game',
      '6-seed has poor road record',
      '11-seed top-30 in 3-point percentage',
      '11-seed senior-heavy lineup',
    ],
    redFlags: [
      '6-seed has NBA lottery pick',
      '11-seed lost in conference tournament semifinals',
    ],
  },
  '10_over_7': {
    probability: 0.388,
    keyFactors: [
      '10-seed has balanced scoring (4 players 10+ PPG)',
      '7-seed has injury issues',
      '10-seed strong non-conference SOS',
    ],
  },
  '13_over_4': {
    probability: 0.206,
    keyFactors: [
      '13-seed conference tournament champion',
      '13-seed has 28+ wins',
      '4-seed underperformed in conference tournament',
      '13-seed top-50 in 3-point shooting',
    ],
  },
  '15_over_2': {
    probability: 0.069,
    keyFactors: [
      '15-seed has 25+ wins',
      '2-seed has injury to key player',
      '15-seed shoots 38%+ from 3-point range',
      '15-seed has NCAA tournament experience',
      '2-seed lost early in conference tournament',
    ],
  },
};

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

export async function getHistoricalMatchupStats(seed1: number, seed2: number, round?: string) {
  const key = `${Math.min(seed1, seed2)}v${Math.max(seed1, seed2)}`;
  const data = seedMatchupHistory[key];
  
  if (!data) {
    return null;
  }
  
  // If seeds are reversed, flip the interpretation
  const favoriteIsHigherSeed = seed1 < seed2;
  
  return {
    ...data,
    favoriteWinRate: favoriteIsHigherSeed 
      ? data.higherSeedWins / data.totalGames 
      : data.lowerSeedWins / data.totalGames,
  };
}

export async function getConferenceStrength(conference: string) {
  return (conferenceStrength as any)[conference] || { winRate: 0.40, champions: 0, finalFours: 0, avgSeed: 10 };
}

export function calculateChampionshipProbability(teamStats: {
  kenPomRank: number;
  adjOE: number;
  adjDE: number;
  seed: number;
  conference: string;
}) {
  let probability = 0;
  
  // Seed-based baseline
  const seedChampRates: Record<number, number> = {
    1: 0.625, 2: 0.125, 3: 0.100, 4: 0.050, 5: 0, 6: 0.025, 7: 0.025, 8: 0.025, 
    9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0,
  };
  probability += seedChampRates[teamStats.seed] || 0;
  
  // KenPom rank adjustment
  if (teamStats.kenPomRank <= 3) probability += 0.15;
  else if (teamStats.kenPomRank <= 10) probability += 0.08;
  else if (teamStats.kenPomRank <= 25) probability += 0.03;
  
  // Championship DNA check
  const hasChampionshipDNA = (
    teamStats.adjOE >= 115.0 && 
    teamStats.adjDE <= 99.2 &&
    teamStats.kenPomRank <= 15
  );
  
  if (!hasChampionshipDNA) {
    probability *= 0.3; // Severe penalty
  } else {
    probability *= 1.5; // Boost
  }
  
  // Conference strength
  const confStrength = (conferenceStrength as any)[teamStats.conference];
  if (confStrength) {
    probability *= (0.8 + confStrength.winRate * 0.4);
  }
  
  return Math.min(probability, 0.50); // Cap at 50%
}

export function findBestUpsetPicks(year: number) {
  const upsets = [
    { seed1: 5, seed2: 12, probability: upsetIndicators['12_over_5'].probability, type: '12_over_5' },
    { seed1: 6, seed2: 11, probability: upsetIndicators['11_over_6'].probability, type: '11_over_6' },
    { seed1: 4, seed2: 13, probability: upsetIndicators['13_over_4'].probability, type: '13_over_4' },
  ];
  
  return upsets.sort((a, b) => b.probability - a.probability);
}

// ============================================================================
// DATA EXPORT
// ============================================================================

export const tournamentData = {
  seedMatchupHistory,
  championshipDNA,
  conferenceStrength,
  upsetIndicators,
};

export default tournamentData;
