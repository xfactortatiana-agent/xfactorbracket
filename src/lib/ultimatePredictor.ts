import {
  seedVsSeedHistory,
  seedAdvancementRates,
  conferenceTournamentPerformance,
  championBenchmarks,
  kenpom2025,
  injuryImpact,
  momentumWeights,
  upsetIndicators,
  tournamentField2026 as tournamentField2025,
  modelWeights,
} from '../data/ultimateDataset';

// ============================================================================
// XFACTOR ULTIMATE PREDICTION ENGINE
// Uses historical data, KenPom metrics, injuries, and momentum
// ============================================================================

export interface Team {
  id: string;
  name: string;
  seed: number;
  region: string;
  record: string;
  kenPomRank?: number;
  adjOE?: number;
  adjDE?: number;
  tempo?: number;
  conference?: string;
  injuries?: string[];
  momentum?: 'hot' | 'neutral' | 'cold';
}

export interface Game {
  id: string;
  round: number;
  team1: Team;
  team2: Team;
  winner?: Team;
  confidence: number;
  upsetProbability: number;
  predictionFactors: PredictionFactors;
}

export interface PredictionFactors {
  seedAdvantage: number;
  kenPomAdvantage: number;
  conferenceStrength: number;
  injuryImpact: number;
  momentumBonus: number;
  upsetRisk: number;
}

// ============================================================================
// CORE PREDICTION FUNCTION
// ============================================================================

export function predictWinner(team1: Team, team2: Team): {
  winner: Team;
  probability: number;
  confidence: number;
  upsetProbability: number;
  factors: PredictionFactors;
  analysis: string;
} {
  const factors = calculateFactors(team1, team2);
  
  // Calculate weighted score for each team
  const team1Score = calculateTeamScore(team1, team2, factors);
  const team2Score = calculateTeamScore(team2, team1, factors);
  
  const totalScore = team1Score + team2Score;
  const team1Prob = team1Score / totalScore;
  const team2Prob = team2Score / totalScore;
  
  const winner = team1Prob > team2Prob ? team1 : team2;
  const loser = team1Prob > team2Prob ? team2 : team1;
  const probability = Math.max(team1Prob, team2Prob);
  
  // Calculate upset probability (lower seed winning)
  const upsetProb = calculateUpsetProbability(winner, loser, factors);
  
  // Confidence is inverse of upset probability (higher = more confident)
  const confidence = 1 - (upsetProb * 0.5);
  
  const analysis = generateAnalysis(winner, loser, factors, probability);
  
  return {
    winner,
    probability,
    confidence,
    upsetProbability: upsetProb,
    factors,
    analysis,
  };
}

// ============================================================================
// CALCULATE PREDICTION FACTORS
// ============================================================================

function calculateFactors(team1: Team, team2: Team): PredictionFactors {
  return {
    seedAdvantage: calculateSeedAdvantage(team1, team2),
    kenPomAdvantage: calculateKenPomAdvantage(team1, team2),
    conferenceStrength: calculateConferenceAdvantage(team1, team2),
    injuryImpact: calculateInjuryImpact(team1, team2),
    momentumBonus: calculateMomentumBonus(team1, team2),
    upsetRisk: calculateUpsetRisk(team1, team2),
  };
}

// ============================================================================
// SEED HISTORICAL ADVANTAGE (25% weight)
// Uses 40 years of historical seed vs seed data
// ============================================================================

function calculateSeedAdvantage(team1: Team, team2: Team): number {
  const seedDiff = team2.seed - team1.seed;
  
  // Look up historical win rate for this seed matchup
  const matchupKey = `${team1.seed}v${team2.seed}`;
  const reverseKey = `${team2.seed}v${team1.seed}`;
  
  const historical = seedVsSeedHistory[matchupKey];
  const reverseHistorical = seedVsSeedHistory[reverseKey];
  
  if (historical) {
    return (historical.winPct - 0.5) * 2; // Normalize to -1 to 1
  }
  
  if (reverseHistorical) {
    return -(reverseHistorical.winPct - 0.5) * 2;
  }
  
  // Fallback: General seed advantage formula based on historical data
  const seedAdvantageMap: Record<number, number> = {
    15: 0.97,  // 1 vs 16
    13: 0.86,  // 1 vs 14, 2 vs 15
    11: 0.79,  // 1 vs 12, 3 vs 14
    9: 0.64,   // 1 vs 10, 2 vs 11, 4 vs 13
    7: 0.61,   // 2 vs 9, 3 vs 10, 5 vs 12
    5: 0.51,   // 1 vs 6, 3 vs 8, 4 vs 9
    3: 0.39,   // 3 vs 6, 4 vs 7, 5 vs 8
    1: 0.02,   // 8 vs 9
    0: 0,
  };
  
  const absDiff = Math.abs(seedDiff);
  const baseAdvantage = seedAdvantageMap[absDiff] || 0.2;
  return seedDiff > 0 ? baseAdvantage : -baseAdvantage;
}

// ============================================================================
// KENPOM EFFICIENCY ADVANTAGE (20% weight)
// Uses adjusted offensive/defensive efficiency
// ============================================================================

function calculateKenPomAdvantage(team1: Team, team2: Team): number {
  // Get real KenPom data if available
  const kp1 = kenpom2025[team1.name] || { adjOE: team1.adjOE || 110, adjDE: team1.adjDE || 100 };
  const kp2 = kenpom2025[team2.name] || { adjOE: team2.adjOE || 110, adjDE: team2.adjDE || 100 };
  
  // Calculate efficiency margin (higher is better)
  const margin1 = kp1.adjOE - kp1.adjDE;
  const margin2 = kp2.adjOE - kp2.adjDE;
  
  // Difference in efficiency margins (scaled)
  const diff = (margin1 - margin2) / 10;
  
  // Clamp between -1 and 1
  return Math.max(-1, Math.min(1, diff));
}

// ============================================================================
// CONFERENCE STRENGTH ADVANTAGE (10% weight)
// ============================================================================

function calculateConferenceAdvantage(team1: Team, team2: Team): number {
  const conf1 = conferenceTournamentPerformance[team1.conference || ''];
  const conf2 = conferenceTournamentPerformance[team2.conference || ''];
  
  if (!conf1 || !conf2) return 0;
  
  const strength1 = conf1.strength;
  const strength2 = conf2.strength;
  
  return (strength1 - strength2) * 2; // Scale to -1 to 1
}

// ============================================================================
// INJURY IMPACT CALCULATION (15% weight)
// ============================================================================

function calculateInjuryImpact(team1: Team, team2: Team): number {
  const injuries1 = team1.injuries || [];
  const injuries2 = team2.injuries || [];
  
  let impact1 = 0;
  let impact2 = 0;
  
  // Calculate impact for team1
  injuries1.forEach(injury => {
    if (injury.includes('out') || injury.includes('Out')) {
      if (injury.includes('star') || injury.includes('Star')) {
        impact1 += injuryImpact['star-player-out'].winPctImpact;
      } else {
        impact1 += injuryImpact['starter-out'].winPctImpact;
      }
    } else if (injury.includes('questionable') || injury.includes('Questionable')) {
      impact1 += injuryImpact['star-limited'].winPctImpact;
    }
  });
  
  // Calculate impact for team2
  injuries2.forEach(injury => {
    if (injury.includes('out') || injury.includes('Out')) {
      if (injury.includes('star') || injury.includes('Star')) {
        impact2 += injuryImpact['star-player-out'].winPctImpact;
      } else {
        impact2 += injuryImpact['starter-out'].winPctImpact;
      }
    } else if (injury.includes('questionable') || injury.includes('Questionable')) {
      impact2 += injuryImpact['star-limited'].winPctImpact;
    }
  });
  
  // Return advantage for team1 (positive = team1 less impacted)
  return impact2 - impact1;
}

// ============================================================================
// MOMENTUM BONUS (10% weight)
// ============================================================================

function calculateMomentumBonus(team1: Team, team2: Team): number {
  const momentumMap = { hot: 0.06, neutral: 0, cold: -0.04 };
  
  const m1 = momentumMap[team1.momentum || 'neutral'];
  const m2 = momentumMap[team2.momentum || 'neutral'];
  
  return m1 - m2;
}

// ============================================================================
// UPSET RISK CALCULATION (10% weight)
// Detects when lower seed has upset potential
// ============================================================================

function calculateUpsetRisk(team1: Team, team2: Team): number {
  const higherSeed = team1.seed < team2.seed ? team1 : team2;
  const lowerSeed = team1.seed < team2.seed ? team2 : team1;
  
  const seedDiff = lowerSeed.seed - higherSeed.seed;
  let upsetRisk = 0;
  
  // Check for specific upset scenarios
  if (seedDiff === 7) { // 12 vs 5, 8 vs 1
    const indicators = upsetIndicators['12v5'];
    // Check if lower seed has upset indicators
    if (lowerSeed.adjOE && lowerSeed.adjDE) {
      const margin = lowerSeed.adjOE - lowerSeed.adjDE;
      if (margin > 15) upsetRisk += indicators.highVolumeRebounding;
    }
  } else if (seedDiff === 5) { // 11 vs 6
    const indicators = upsetIndicators['11v6'];
    if (lowerSeed.momentum === 'hot') upsetRisk += indicators.starPlayer;
  } else if (seedDiff === 3) { // 10 vs 7
    const indicators = upsetIndicators['10v7'];
    upsetRisk += indicators.balancedScoring;
  }
  
  // If team1 is the lower seed, return positive upset risk
  return lowerSeed.id === team1.id ? upsetRisk : -upsetRisk;
}

// ============================================================================
// CALCULATE FINAL TEAM SCORE
// ============================================================================

function calculateTeamScore(
  team: Team,
  opponent: Team,
  factors: PredictionFactors
): number {
  let score = 0.5; // Base score
  
  // Apply weighted factors
  score += factors.seedAdvantage * modelWeights.seedHistory;
  score += factors.kenPomAdvantage * modelWeights.kenPom;
  score += factors.conferenceStrength * modelWeights.conference;
  score += factors.injuryImpact * modelWeights.injuries;
  score += factors.momentumBonus * modelWeights.momentum;
  score += factors.upsetRisk * modelWeights.upsetFactors;
  
  // Ensure score is positive
  return Math.max(0.1, score);
}

// ============================================================================
// UPSET PROBABILITY CALCULATION
// ============================================================================

function calculateUpsetProbability(
  winner: Team,
  loser: Team,
  factors: PredictionFactors
): number {
  const seedDiff = loser.seed - winner.seed;
  
  // If favorite won, upset probability is low
  if (winner.seed <= loser.seed) {
    const matchupKey = `${winner.seed}v${loser.seed}`;
    const historical = seedVsSeedHistory[matchupKey];
    return historical ? historical.upsetProb * 0.5 : 0.1;
  }
  
  // If upset occurred, calculate how likely it was
  const matchupKey = `${loser.seed}v${winner.seed}`;
  const historical = seedVsSeedHistory[matchupKey];
  let baseProb = historical ? historical.winPct : 0.2;
  
  // Adjust based on factors
  if (factors.kenPomAdvantage > 0) baseProb += 0.1;
  if (factors.momentumBonus > 0.03) baseProb += 0.05;
  if (factors.injuryImpact < 0) baseProb += 0.05;
  
  return Math.min(0.95, baseProb);
}

// ============================================================================
// GENERATE PREDICTION ANALYSIS TEXT
// ============================================================================

function generateAnalysis(
  winner: Team,
  loser: Team,
  factors: PredictionFactors,
  probability: number
): string {
  const parts: string[] = [];
  
  // Seed analysis
  if (winner.seed < loser.seed) {
    parts.push(`${winner.name} (${winner.seed}-seed) has ${(probability * 100).toFixed(0)}% win probability vs ${loser.name} (${loser.seed}-seed) based on 40 years of historical data.`);
  } else {
    parts.push(`UPSET ALERT: ${winner.name} (${winner.seed}-seed) has ${(probability * 100).toFixed(0)}% win probability vs ${loser.name} (${loser.seed}-seed).`);
  }
  
  // KenPom analysis
  if (factors.kenPomAdvantage > 0.2) {
    parts.push(`Strong KenPom efficiency advantage (${(factors.kenPomAdvantage * 100).toFixed(0)}%).`);
  } else if (factors.kenPomAdvantage < -0.2) {
    parts.push(`KenPom metrics favor opponent, but other factors override.`);
  }
  
  // Injury analysis
  if (factors.injuryImpact > 0.05) {
    parts.push(`Significant injury advantage (+${(factors.injuryImpact * 100).toFixed(0)}%).`);
  } else if (factors.injuryImpact < -0.05) {
    parts.push(`Injury concerns may impact performance.`);
  }
  
  // Momentum analysis
  if (winner.momentum === 'hot') {
    parts.push(`Hot momentum entering tournament.`);
  }
  
  return parts.join(' ');
}

// ============================================================================
// CHAMPIONSHIP PREDICTION
// Identify teams with championship DNA
// ============================================================================

export function calculateChampionshipProbability(team: Team): number {
  const kp = kenpom2025[team.name];
  if (!kp) return 0.02;
  
  let prob = seedAdvancementRates[team.seed]?.champion || 0.02;
  
  // Adjust based on KenPom rankings
  if (kp.rank <= 5) prob += 0.10;
  else if (kp.rank <= 10) prob += 0.05;
  else if (kp.rank > 25) prob *= 0.5;
  
  // Check if top 25 in both offense and defense (championship formula)
  if (kp.adjOE >= 115 && kp.adjDE <= 95) prob += 0.08;
  
  // Conference strength bonus
  const conf = conferenceTournamentPerformance[team.conference || ''];
  if (conf) prob += conf.championshipRate * 0.05;
  
  // Injury penalty
  const injuries = team.injuries || [];
  if (injuries.some(i => i.includes('out'))) prob *= 0.7;
  
  // Momentum bonus
  if (team.momentum === 'hot') prob += 0.03;
  
  return Math.min(0.35, Math.max(0.001, prob));
}

// ============================================================================
// MONTE CARLO SIMULATION
// Run thousands of tournament simulations
// ============================================================================

export function runMonteCarloSimulation(
  teams: Team[],
  iterations: number = 10000
): Map<string, number> {
  const championshipCounts = new Map<string, number>();
  
  for (let i = 0; i < iterations; i++) {
    const champion = simulateTournament(teams);
    const current = championshipCounts.get(champion.id) || 0;
    championshipCounts.set(champion.id, current + 1);
  }
  
  // Convert to probabilities
  const probabilities = new Map<string, number>();
  championshipCounts.forEach((count, teamId) => {
    probabilities.set(teamId, count / iterations);
  });
  
  return probabilities;
}

function simulateTournament(teams: Team[]): Team {
  // Simulate each round
  let currentTeams = [...teams];
  
  for (let round = 1; round <= 6; round++) {
    const nextRound: Team[] = [];
    
    for (let i = 0; i < currentTeams.length; i += 2) {
      const team1 = currentTeams[i];
      const team2 = currentTeams[i + 1];
      
      const result = predictWinner(team1, team2);
      
      // Use probability to determine winner with some randomness
      const random = Math.random();
      if (random < result.probability) {
        nextRound.push(result.winner);
      } else {
        nextRound.push(result.winner.id === team1.id ? team2 : team1);
      }
    }
    
    currentTeams = nextRound;
  }
  
  return currentTeams[0];
}

// ============================================================================
// GENERATE FULL BRACKET
// ============================================================================

export function generateBracket(teams: Team[], strategy: 'chalk' | 'balanced' | 'aggressive' = 'balanced'): Game[] {
  const games: Game[] = [];
  
  // First round matchups by region
  const regions = ['South', 'East', 'Midwest', 'West'];
  
  regions.forEach(region => {
    const regionTeams = teams.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
    
    // NCAA bracket ordering: 1v16, 8v9, 5v12, 4v13, 6v11, 3v14, 7v10, 2v15
    const matchupOrder = [0, 15, 7, 8, 4, 11, 3, 12, 5, 10, 2, 13, 6, 9, 1, 14];
    
    for (let i = 0; i < 8; i++) {
      const t1 = regionTeams[matchupOrder[i * 2]];
      const t2 = regionTeams[matchupOrder[i * 2 + 1]];
      
      if (t1 && t2) {
        const result = predictWinner(t1, t2);
        
        // Apply strategy adjustments
        let winner = result.winner;
        let confidence = result.confidence;
        
        if (strategy === 'chalk') {
          // Always pick the higher seed unless probability is overwhelming
          winner = t1.seed < t2.seed ? t1 : t2;
        } else if (strategy === 'aggressive') {
          // More willing to pick upsets
          if (result.upsetProbability > 0.3 && Math.random() < 0.4) {
            winner = result.winner.id === t1.id ? t2 : t1;
          }
        }
        
        games.push({
          id: `${region}-r64-${i}`,
          round: 1,
          team1: t1,
          team2: t2,
          winner,
          confidence,
          upsetProbability: result.upsetProbability,
          predictionFactors: result.factors,
        });
      }
    }
  });
  
  return games;
}

// ============================================================================
// UPSET PICKS GENERATOR
// Identify the most likely upsets
// ============================================================================

export function findBestUpsetPicks(teams: Team[]): Array<{
  game: string;
  underdog: Team;
  favorite: Team;
  upsetProb: number;
  reasons: string[];
}> {
  const upsets: Array<{
    game: string;
    underdog: Team;
    favorite: Team;
    upsetProb: number;
    reasons: string[];
  }> = [];
  
  // Check all potential first-round matchups
  const regions = ['South', 'East', 'Midwest', 'West'];
  
  regions.forEach(region => {
    const regionTeams = teams.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
    const matchupOrder = [0, 15, 7, 8, 4, 11, 3, 12, 5, 10, 2, 13, 6, 9, 1, 14];
    
    for (let i = 0; i < 8; i++) {
      const t1 = regionTeams[matchupOrder[i * 2]];
      const t2 = regionTeams[matchupOrder[i * 2 + 1]];
      
      if (t1 && t2) {
        const higherSeed = t1.seed < t2.seed ? t1 : t2;
        const lowerSeed = t1.seed < t2.seed ? t2 : t1;
        
        const result = predictWinner(higherSeed, lowerSeed);
        
        // If upset probability is significant
        if (result.upsetProbability > 0.25) {
          const reasons: string[] = [];
          
          if (result.factors.kenPomAdvantage < -0.1) {
            reasons.push('KenPom metrics favor underdog');
          }
          if (result.factors.injuryImpact < -0.05) {
            reasons.push('Favorite has injury concerns');
          }
          if (lowerSeed.momentum === 'hot') {
            reasons.push('Underdog has hot momentum');
          }
          if (lowerSeed.seed === 12 && higherSeed.seed === 5) {
            reasons.push('12-over-5 is historically common (36%)');
          }
          
          upsets.push({
            game: `${higherSeed.name} (${higherSeed.seed}) vs ${lowerSeed.name} (${lowerSeed.seed})`,
            underdog: lowerSeed,
            favorite: higherSeed,
            upsetProb: result.upsetProbability,
            reasons,
          });
        }
      }
    }
  });
  
  return upsets.sort((a, b) => b.upsetProb - a.upsetProb);
}

// Export all functions
export default {
  predictWinner,
  calculateChampionshipProbability,
  runMonteCarloSimulation,
  generateBracket,
  findBestUpsetPicks,
};
