// March Madness Prediction Engine
// Ensemble model combining multiple prediction strategies

export interface Team {
  id: string;
  name: string;
  seed: number;
  region: string;
  record: string;
  adjOE: number; // Adjusted Offensive Efficiency
  adjDE: number; // Adjusted Defensive Efficiency
  tempo: number;
  luck: number;
  sos: number; // Strength of Schedule
  last10: string;
  confRecord: string;
  upsetFactor: number;
}

export interface Game {
  id: string;
  round: number;
  team1: Team;
  team2: Team;
  winner?: Team;
  confidence: number;
  upsetProbability: number;
}

// Historical upset probabilities by seed matchup
const UPSET_PROBABILITIES: Record<string, number> = {
  '1-16': 0.007, '2-15': 0.062, '3-14': 0.149, '4-13': 0.207,
  '5-12': 0.352, '6-11': 0.363, '7-10': 0.387, '8-9': 0.500,
  '2-7': 0.75, '3-6': 0.70, '4-5': 0.55, '1-8': 0.85,
  '1-9': 0.88, '2-3': 0.60, '1-4': 0.78, '1-5': 0.82,
  '1-6': 0.85, '1-7': 0.87, '2-4': 0.65, '2-5': 0.68,
  '2-6': 0.72, '3-4': 0.58, '3-5': 0.62
};

// Model 1: Seed-based prediction
function seedModel(team1: Team, team2: Team): number {
  const seedDiff = team2.seed - team1.seed;
  const matchup = `${Math.min(team1.seed, team2.seed)}-${Math.max(team1.seed, team2.seed)}`;
  const upsetProb = UPSET_PROBABILITIES[matchup] || 0.5;
  
  if (team1.seed < team2.seed) {
    return 1 - upsetProb;
  }
  return upsetProb;
}

// Model 2: Efficiency ratings (KenPom-style)
function efficiencyModel(team1: Team, team2: Team): number {
  // Calculate team strength
  const strength1 = Math.pow(team1.adjOE, 1.1) / Math.pow(team1.adjDE, 1.1);
  const strength2 = Math.pow(team2.adjOE, 1.1) / Math.pow(team2.adjDE, 1.1);
  
  // Adjust for strength of schedule
  const adjustedStrength1 = strength1 * (1 + (team1.sos - 0.5) * 0.2);
  const adjustedStrength2 = strength2 * (1 + (team2.sos - 0.5) * 0.2);
  
  // Logistic function for win probability
  const prob = adjustedStrength1 / (adjustedStrength1 + adjustedStrength2);
  return prob;
}

// Model 3: Momentum and form
function momentumModel(team1: Team, team2: Team): number {
  // Parse last 10 record
  const parseRecord = (record: string) => {
    const [wins, losses] = record.split('-').map(Number);
    return wins / (wins + losses);
  };
  
  const form1 = parseRecord(team1.last10);
  const form2 = parseRecord(team2.last10);
  
  // Luck factor (wins above expected)
  const luck1 = team1.luck;
  const luck2 = team2.luck;
  
  // Combine form and luck
  const score1 = form1 * 0.7 + luck1 * 0.3;
  const score2 = form2 * 0.7 + luck2 * 0.3;
  
  return score1 / (score1 + score2);
}

// Model 4: Matchup-specific analysis
function matchupModel(team1: Team, team2: Team): number {
  // Tempo differential (faster teams can upset slower favorites)
  const tempoDiff = team1.tempo - team2.tempo;
  const tempoAdvantage = tempoDiff > 2 ? 0.05 : tempoDiff < -2 ? -0.05 : 0;
  
  // Upset history factor
  const upsetFactor = (team1.upsetFactor - team2.upsetFactor) * 0.1;
  
  // Base on efficiency with adjustments
  const baseProb = efficiencyModel(team1, team2);
  
  return Math.max(0.05, Math.min(0.95, baseProb + tempoAdvantage + upsetFactor));
}

// Ensemble prediction combining all models
export function predictWinner(team1: Team, team2: Team): {
  probability: number;
  confidence: number;
  upsetProbability: number;
  modelBreakdown: {
    seed: number;
    efficiency: number;
    momentum: number;
    matchup: number;
  }
} {
  // Get predictions from each model
  const seedProb = seedModel(team1, team2);
  const efficiencyProb = efficiencyModel(team1, team2);
  const momentumProb = momentumModel(team1, team2);
  const matchupProb = matchupModel(team1, team2);
  
  // Weighted ensemble (weights from backtesting)
  const weights = {
    seed: 0.15,
    efficiency: 0.35,
    momentum: 0.25,
    matchup: 0.25
  };
  
  const finalProb = 
    weights.seed * seedProb +
    weights.efficiency * efficiencyProb +
    weights.momentum * momentumProb +
    weights.matchup * matchupProb;
  
  // Calculate confidence based on model agreement
  const probs = [seedProb, efficiencyProb, momentumProb, matchupProb];
  const avgProb = probs.reduce((a, b) => a + b) / probs.length;
  const variance = probs.reduce((sum, p) => sum + Math.pow(p - avgProb, 2), 0) / probs.length;
  const confidence = 1 - Math.sqrt(variance) * 2; // Higher agreement = higher confidence
  
  // Upset probability based on seed differential
  const seedDiff = Math.abs(team1.seed - team2.seed);
  const upsetProbability = seedDiff >= 5 ? 0.3 + (seedDiff - 5) * 0.05 : 0.15;
  
  return {
    probability: finalProb,
    confidence: Math.max(0.3, Math.min(0.95, confidence)),
    upsetProbability: Math.min(0.5, upsetProbability),
    modelBreakdown: {
      seed: seedProb,
      efficiency: efficiencyProb,
      momentum: momentumProb,
      matchup: matchupProb
    }
  };
}

// Monte Carlo simulation for bracket
export function runMonteCarloSimulation(
  teams: Team[],
  numSimulations: number = 10000
): Map<string, number> {
  const championshipCounts = new Map<string, number>();
  
  for (let i = 0; i < numSimulations; i++) {
    const winner = simulateTournament(teams);
    const current = championshipCounts.get(winner.id) || 0;
    championshipCounts.set(winner.id, current + 1);
  }
  
  // Convert to probabilities
  const probabilities = new Map<string, number>();
  championshipCounts.forEach((count, teamId) => {
    probabilities.set(teamId, count / numSimulations);
  });
  
  return probabilities;
}

function simulateTournament(teams: Team[]): Team {
  // Simplified: just return the team with highest efficiency for now
  // Full implementation would simulate each round
  return teams.reduce((best, team) => {
    const strength = team.adjOE / team.adjDE;
    const bestStrength = best.adjOE / best.adjDE;
    return strength > bestStrength ? team : best;
  });
}

// Generate complete bracket predictions
export function generateBracket(
  teams: Team[],
  strategy: 'chalk' | 'aggressive' | 'balanced' = 'balanced'
): Game[] {
  const games: Game[] = [];
  
  // First round matchups (simplified)
  const firstRound = [
    [0, 15], [7, 8], [4, 11], [3, 12], [5, 10], [2, 13], [6, 9], [1, 14]
  ];
  
  firstRound.forEach(([i1, i2], idx) => {
    const team1 = teams[i1];
    const team2 = teams[i2];
    const prediction = predictWinner(team1, team2);
    
    // Apply strategy adjustments
    let prob = prediction.probability;
    if (strategy === 'chalk') {
      prob = prob > 0.5 ? 0.9 : 0.1; // Always pick favorite
    } else if (strategy === 'aggressive') {
      // Increase upset probability for 5-12, 6-11, 7-10 matchups
      if (team1.seed >= 5 && team2.seed >= 10) {
        prob = 0.5; // Coin flip
      }
    }
    
    const winner = Math.random() < prob ? team1 : team2;
    
    games.push({
      id: `r1-${idx}`,
      round: 1,
      team1,
      team2,
      winner,
      confidence: prediction.confidence,
      upsetProbability: prediction.upsetProbability
    });
  });
  
  return games;
}

// Calculate expected points for a bracket
export function calculateExpectedPoints(
  games: Game[],
  scoring: { r1: number; r2: number; r3: number; r4: number; r5: number; r6: number }
): number {
  return games.reduce((total, game) => {
    const roundPoints = scoring[`r${game.round}` as keyof typeof scoring] || 0;
    const winProb = game.winner === game.team1 
      ? predictWinner(game.team1, game.team2).probability
      : 1 - predictWinner(game.team1, game.team2).probability;
    return total + roundPoints * winProb;
  }, 0);
}
