// ============================================================================
// BARTTORVIK NEUTRAL COURT PREDICTION ENGINE
// Uses Barthag + adjusted efficiencies + shooting splits for maximum accuracy
// ============================================================================

import { BarttorvikMetrics, getBarttorvikData } from '../data/barttorvik2026';
import { TournamentTeam2026 } from '../data/tournament2026';

export interface BarttorvikPrediction {
  winner: TournamentTeam2026;
  loser: TournamentTeam2026;
  winProbability: number;
  confidence: number;
  upsetProbability: number;
  margin: number;
  factors: {
    barthagDiff: number;
    effMarginDiff: number;
    shootingDiff: number;
    turnoverDiff: number;
    seedAdvantage: number;
  };
  analysis: string;
}

// ============================================================================
// CORE: Log5 win probability using Barthag
// ============================================================================
export function calculateBarthagWinProbability(barthag1: number, barthag2: number): number {
  // Log5 formula: (p1 - p1*p2) / (p1 + p2 - 2*p1*p2)
  if (barthag1 + barthag2 === 0) return 0.5;
  return (barthag1 - barthag1 * barthag2) / (barthag1 + barthag2 - 2 * barthag1 * barthag2);
}

// ============================================================================
// EFFICIENCY MARGIN (adjusted for neutral court)
// ============================================================================
function calculateEfficiencyMargin(team: BarttorvikMetrics): number {
  return team.adjOE - team.adjDE;
}

// ============================================================================
// SHOOTING ADVANTAGE (eFG% + 3P%)
// ============================================================================
function calculateShootingAdvantage(team: BarttorvikMetrics): number {
  // eFG% is most predictive for tournament success
  const efgAdvantage = (team.efgPct - team.efgDPct) * 0.6;
  const threePointAdvantage = (team.threePpct - team.threePdpct) * 0.4;
  return efgAdvantage + threePointAdvantage;
}

// ============================================================================
// TURNOVER ADVANTAGE (protect ball + force turnovers)
// ============================================================================
function calculateTurnoverAdvantage(team: BarttorvikMetrics): number {
  // Lower tor is better (protects ball), higher tord is better (forces TOs)
  const protectBall = (20 - team.tor) / 20; // Normalize to 0-1
  const forceTurnovers = team.tord / 25; // Normalize to 0-1
  return (protectBall + forceTurnovers) / 2;
}

// ============================================================================
// HISTORICAL SEED ADVANTAGE (for close matchups)
// ============================================================================
function calculateSeedAdvantage(seed1: number, seed2: number): number {
  const diff = seed2 - seed1;
  // Historical upset rates inform this
  if (diff >= 8) return 0.25;      // 1 vs 16: ~99%
  if (diff >= 5) return 0.18;      // 1 vs 12, 2 vs 15: ~85-90%
  if (diff >= 4) return 0.12;      // 1 vs 13: ~85%
  if (diff >= 3) return 0.08;      // 4 vs 13: ~80%
  if (diff >= 2) return 0.05;      // 5 vs 12: ~65%
  if (diff >= 1) return 0.02;      // 8 vs 9: ~52%
  return 0;
}

// ============================================================================
// UPSET PROBABILITY (based on seed diff + metrics)
// ============================================================================
function calculateUpsetProbability(
  favoriteSeed: number,
  underdogSeed: number,
  barthagDiff: number,
  effMarginDiff: number
): number {
  const seedDiff = underdogSeed - favoriteSeed;
  
  // Base upset rate by seed difference (historical 1985-2024)
  let baseUpsetRate = 0.02; // Default 2%
  if (seedDiff === 0) baseUpsetRate = 0.50;      // 8/9 games
  else if (seedDiff === 1) baseUpsetRate = 0.38; // 7/10 games
  else if (seedDiff === 2) baseUpsetRate = 0.35; // 6/11 games
  else if (seedDiff === 3) baseUpsetRate = 0.28; // 5/12 games
  else if (seedDiff === 4) baseUpsetRate = 0.15; // 4/13 games
  else if (seedDiff === 5) baseUpsetRate = 0.10; // 3/14 games
  else if (seedDiff === 6) baseUpsetRate = 0.08; // 2/15 games
  else if (seedDiff >= 7) baseUpsetRate = 0.01;  // 1/16 games
  
  // Adjust based on metrics
  // If underdog has better efficiency margin, boost upset chance
  const effAdjustment = effMarginDiff < -2 ? 0.15 : effMarginDiff < 0 ? 0.05 : 0;
  
  // If barthag is close, boost upset chance
  const barthagAdjustment = barthagDiff < 0.05 ? 0.10 : barthagDiff < 0.10 ? 0.05 : 0;
  
  return Math.min(baseUpsetRate + effAdjustment + barthagAdjustment, 0.55);
}

// ============================================================================
// MAIN PREDICTION FUNCTION
// ============================================================================
export function predictWithBarttorvik(
  team1: TournamentTeam2026,
  team2: TournamentTeam2026
): BarttorvikPrediction {
  const b1 = getBarttorvikData(team1.name);
  const b2 = getBarttorvikData(team2.name);
  
  // Fallback if no Barttorvik data
  if (!b1 || !b2) {
    return fallbackPrediction(team1, team2);
  }
  
  // 1. Barthag-based probability (primary)
  const barthagProb = calculateBarthagWinProbability(b1.barthag, b2.barthag);
  
  // 2. Efficiency margin adjustment
  const eff1 = calculateEfficiencyMargin(b1);
  const eff2 = calculateEfficiencyMargin(b2);
  const effDiff = eff1 - eff2;
  const effAdjustment = Math.tanh(effDiff / 20) * 0.10; // ±10% max adjustment
  
  // 3. Shooting advantage
  const shoot1 = calculateShootingAdvantage(b1);
  const shoot2 = calculateShootingAdvantage(b2);
  const shootAdjustment = (shoot1 - shoot2) * 0.05; // ±5% max adjustment
  
  // 4. Turnover advantage
  const to1 = calculateTurnoverAdvantage(b1);
  const to2 = calculateTurnoverAdvantage(b2);
  const toAdjustment = (to1 - to2) * 0.03; // ±3% max adjustment
  
  // Combine all factors
  let team1Prob = barthagProb + effAdjustment + shootAdjustment + toAdjustment;
  team1Prob = Math.max(0.02, Math.min(0.98, team1Prob)); // Clamp to realistic bounds
  
  const team2Prob = 1 - team1Prob;
  
  // Determine winner
  const team1IsFavorite = team1.seed < team2.seed || 
    (team1.seed === team2.seed && team1Prob > 0.5);
  
  const favorite = team1IsFavorite ? team1 : team2;
  const underdog = team1IsFavorite ? team2 : team1;
  const favoriteProb = team1IsFavorite ? team1Prob : team2Prob;
  const bFavorite = team1IsFavorite ? b1 : b2;
  const bUnderdog = team1IsFavorite ? b2 : b1;
  
  // Calculate upset probability
  const barthagDiff = bFavorite.barthag - bUnderdog.barthag;
  const effMarginDiff = calculateEfficiencyMargin(bFavorite) - calculateEfficiencyMargin(bUnderdog);
  const upsetProb = calculateUpsetProbability(favorite.seed, underdog.seed, barthagDiff, effMarginDiff);
  
  // Confidence based on probability gap and upset history
  const confidence = favoriteProb * (1 - upsetProb * 0.5);
  
  // Expected margin (approximate)
  const margin = effMarginDiff * 0.7 + barthagDiff * 20;
  
  const analysis = generateAnalysis(favorite, underdog, bFavorite, bUnderdog, favoriteProb, upsetProb);
  
  return {
    winner: favoriteProb > 0.5 ? team1 : team2,
    loser: favoriteProb > 0.5 ? team2 : team1,
    winProbability: Math.max(favoriteProb, 1 - favoriteProb),
    confidence,
    upsetProbability: favoriteProb > 0.5 ? upsetProb : 1 - upsetProb,
    margin,
    factors: {
      barthagDiff,
      effMarginDiff,
      shootingDiff: shoot1 - shoot2,
      turnoverDiff: to1 - to2,
      seedAdvantage: calculateSeedAdvantage(favorite.seed, underdog.seed),
    },
    analysis,
  };
}

// ============================================================================
// FALLBACK: When Barttorvik data unavailable
// ============================================================================
function fallbackPrediction(t1: TournamentTeam2026, t2: TournamentTeam2026): BarttorvikPrediction {
  const seedDiff = t2.seed - t1.seed;
  let t1Prob = 0.5 + (seedDiff * 0.04);
  t1Prob = Math.max(0.05, Math.min(0.95, t1Prob));
  
  const winner = t1Prob > 0.5 ? t1 : t2;
  const loser = t1Prob > 0.5 ? t2 : t1;
  const prob = Math.max(t1Prob, 1 - t1Prob);
  
  return {
    winner,
    loser,
    winProbability: prob,
    confidence: prob * 0.7,
    upsetProbability: 0.15,
    margin: seedDiff * 2,
    factors: {
      barthagDiff: 0,
      effMarginDiff: 0,
      shootingDiff: 0,
      turnoverDiff: 0,
      seedAdvantage: calculateSeedAdvantage(winner.seed, loser.seed),
    },
    analysis: `${winner.name} favored by seed (${winner.seed} vs ${loser.seed}). Limited data available.`,
  };
}

// ============================================================================
// ANALYSIS GENERATOR
// ============================================================================
function generateAnalysis(
  favorite: TournamentTeam2026,
  underdog: TournamentTeam2026,
  bFav: BarttorvikMetrics,
  bUnder: BarttorvikMetrics,
  prob: number,
  upsetProb: number
): string {
  const parts: string[] = [];
  
  // Barthag comparison
  const barthagDiff = ((bFav.barthag - bUnder.barthag) * 100).toFixed(1);
  parts.push(`${favorite.name} has a ${barthagDiff}% higher Barthag rating (${(bFav.barthag * 100).toFixed(1)} vs ${(bUnder.barthag * 100).toFixed(1)}).`);
  
  // Efficiency margin
  const effFav = (bFav.adjOE - bFav.adjDE).toFixed(1);
  const effUnder = (bUnder.adjOE - bUnder.adjDE).toFixed(1);
  parts.push(`Efficiency margin: ${favorite.name} +${effFav} vs ${underdog.name} +${effUnder}.`);
  
  // Shooting
  if (bFav.efgPct > bUnder.efgPct + 2) {
    parts.push(`${favorite.name} shoots better (${bFav.efgPct.toFixed(1)}% eFG vs ${bUnder.efgPct.toFixed(1)}%).`);
  } else if (bUnder.efgPct > bFav.efgPct + 2) {
    parts.push(`${underdog.name} is a dangerous shooter (${bUnder.efgPct.toFixed(1)}% eFG).`);
  }
  
  // Upset watch
  if (upsetProb > 0.25) {
    parts.push(`⚠️ Upset alert: ${(upsetProb * 100).toFixed(0)}% upset probability.`);
  }
  
  return parts.join(' ');
}

// ============================================================================
// BATCH PREDICTION: Run all first round games
// ============================================================================
export function runFirstRoundPredictions(
  matchups: Array<[TournamentTeam2026, TournamentTeam2026]>
): BarttorvikPrediction[] {
  return matchups.map(([t1, t2]) => predictWithBarttorvik(t1, t2));
}

// ============================================================================
// SIMULATE TOURNAMENT: Full bracket simulation
// ============================================================================
export interface SimulatedBracket {
  roundOf64: BarttorvikPrediction[];
  roundOf32: BarttorvikPrediction[];
  sweet16: BarttorvikPrediction[];
  elite8: BarttorvikPrediction[];
  finalFour: BarttorvikPrediction[];
  championship: BarttorvikPrediction | null;
  champion: TournamentTeam2026 | null;
}

export function simulateTournament(
  firstRoundMatchups: Array<[TournamentTeam2026, TournamentTeam2026]>
): SimulatedBracket {
  const results: SimulatedBracket = {
    roundOf64: [],
    roundOf32: [],
    sweet16: [],
    elite8: [],
    finalFour: [],
    championship: null,
    champion: null,
  };
  
  // Round of 64
  results.roundOf64 = runFirstRoundPredictions(firstRoundMatchups);
  
  // Build subsequent rounds
  let currentWinners = results.roundOf64.map(p => p.winner);
  
  // Helper to simulate a round
  const simulateRound = (winners: TournamentTeam2026[], roundName: keyof SimulatedBracket) => {
    const roundResults: BarttorvikPrediction[] = [];
    for (let i = 0; i < winners.length; i += 2) {
      if (i + 1 < winners.length) {
        roundResults.push(predictWithBarttorvik(winners[i], winners[i + 1]));
      }
    }
    (results[roundName] as BarttorvikPrediction[]) = roundResults;
    return roundResults.map(p => p.winner);
  };
  
  // Round of 32
  currentWinners = simulateRound(currentWinners, 'roundOf32');
  
  // Sweet 16
  currentWinners = simulateRound(currentWinners, 'sweet16');
  
  // Elite 8
  currentWinners = simulateRound(currentWinners, 'elite8');
  
  // Final Four
  currentWinners = simulateRound(currentWinners, 'finalFour');
  
  // Championship
  if (currentWinners.length === 2) {
    results.championship = predictWithBarttorvik(currentWinners[0], currentWinners[1]);
    results.champion = results.championship.winner;
  }
  
  return results;
}
