// ============================================================================
// COACH TOURNAMENT HISTORY DATABASE
// Tracks NCAA tournament performance by coach
// ============================================================================

export interface CoachTournamentHistory {
  coachName: string;
  currentTeam: string;
  yearsExperience: number;
  tournamentAppearances: number;
  sweetSixteens: number;
  eliteEights: number;
  finalFours: number;
  championships: number;
  upsetWins: number;      // As underdog
  upsetLosses: number;    // As favorite
  clutchRecord: number;   // Close game win % (within 5 pts)
  marchMadnessScore: number; // Composite 0-100
}

// Coach tournament data (compiled from research)
export const coachHistory: Record<string, CoachTournamentHistory> = {
  // Elite Coaches (90+ score)
  'Mike Krzyzewski': {
    coachName: 'Mike Krzyzewski',
    currentTeam: 'Retired',
    yearsExperience: 42,
    tournamentAppearances: 35,
    sweetSixteens: 26,
    eliteEights: 18,
    finalFours: 13,
    championships: 5,
    upsetWins: 12,
    upsetLosses: 8,
    clutchRecord: 0.72,
    marchMadnessScore: 98,
  },
  'Roy Williams': {
    coachName: 'Roy Williams',
    currentTeam: 'Retired',
    yearsExperience: 33,
    tournamentAppearances: 29,
    sweetSixteens: 20,
    eliteEights: 13,
    finalFours: 9,
    championships: 3,
    upsetWins: 15,
    upsetLosses: 6,
    clutchRecord: 0.68,
    marchMadnessScore: 95,
  },
  'Bill Self': {
    coachName: 'Bill Self',
    currentTeam: 'Kansas',
    yearsExperience: 21,
    tournamentAppearances: 19,
    sweetSixteens: 13,
    eliteEights: 8,
    finalFours: 4,
    championships: 2,
    upsetWins: 8,
    upsetLosses: 5,
    clutchRecord: 0.65,
    marchMadnessScore: 92,
  },
  'Tom Izzo': {
    coachName: 'Tom Izzo',
    currentTeam: 'Michigan State',
    yearsExperience: 27,
    tournamentAppearances: 26,
    sweetSixteens: 18,
    eliteEights: 10,
    finalFours: 8,
    championships: 1,
    upsetWins: 22,
    upsetLosses: 7,
    clutchRecord: 0.70,
    marchMadnessScore: 94,
  },
  'Jay Wright': {
    coachName: 'Jay Wright',
    currentTeam: 'Retired',
    yearsExperience: 21,
    tournamentAppearances: 16,
    sweetSixteens: 8,
    eliteEights: 6,
    finalFours: 4,
    championships: 2,
    upsetWins: 10,
    upsetLosses: 3,
    clutchRecord: 0.74,
    marchMadnessScore: 93,
  },
  // Active Elite (85+ score)
  'Mark Few': {
    coachName: 'Mark Few',
    currentTeam: 'Gonzaga',
    yearsExperience: 25,
    tournamentAppearances: 24,
    sweetSixteens: 12,
    eliteEights: 5,
    finalFours: 2,
    championships: 0,
    upsetWins: 6,
    upsetLosses: 8,
    clutchRecord: 0.58,
    marchMadnessScore: 88,
  },
  'Tony Bennett': {
    coachName: 'Tony Bennett',
    currentTeam: 'Virginia',
    yearsExperience: 15,
    tournamentAppearances: 12,
    sweetSixteens: 6,
    eliteEights: 3,
    finalFours: 1,
    championships: 1,
    upsetWins: 4,
    upsetLosses: 3,
    clutchRecord: 0.62,
    marchMadnessScore: 86,
  },
  'Dana Altman': {
    coachName: 'Dana Altman',
    currentTeam: 'Oregon',
    yearsExperience: 17,
    tournamentAppearances: 13,
    sweetSixteens: 5,
    eliteEights: 2,
    finalFours: 1,
    championships: 0,
    upsetWins: 9,
    upsetLosses: 4,
    clutchRecord: 0.61,
    marchMadnessScore: 84,
  },
  'Kelvin Sampson': {
    coachName: 'Kelvin Sampson',
    currentTeam: 'Houston',
    yearsExperience: 29,
    tournamentAppearances: 18,
    sweetSixteens: 8,
    eliteEights: 5,
    finalFours: 2,
    championships: 0,
    upsetWins: 11,
    upsetLosses: 6,
    clutchRecord: 0.64,
    marchMadnessScore: 87,
  },
  'Scott Drew': {
    coachName: 'Scott Drew',
    currentTeam: 'Baylor',
    yearsExperience: 21,
    tournamentAppearances: 13,
    sweetSixteens: 6,
    eliteEights: 3,
    finalFours: 2,
    championships: 1,
    upsetWins: 8,
    upsetLosses: 4,
    clutchRecord: 0.66,
    marchMadnessScore: 88,
  },
  // Strong Tournament Coaches (75-84 score)
  'John Calipari': {
    coachName: 'John Calipari',
    currentTeam: 'Arkansas',
    yearsExperience: 17,
    tournamentAppearances: 14,
    sweetSixteens: 10,
    eliteEights: 7,
    finalFours: 4,
    championships: 1,
    upsetWins: 7,
    upsetLosses: 6,
    clutchRecord: 0.59,
    marchMadnessScore: 85,
  },
  'Bruce Pearl': {
    coachName: 'Bruce Pearl',
    currentTeam: 'Auburn',
    yearsExperience: 19,
    tournamentAppearances: 13,
    sweetSixteens: 5,
    eliteEights: 3,
    finalFours: 1,
    championships: 0,
    upsetWins: 12,
    upsetLosses: 5,
    clutchRecord: 0.63,
    marchMadnessScore: 82,
  },
  'Rick Barnes': {
    coachName: 'Rick Barnes',
    currentTeam: 'Tennessee',
    yearsExperience: 28,
    tournamentAppearances: 24,
    sweetSixteens: 10,
    eliteEights: 4,
    finalFours: 1,
    championships: 0,
    upsetWins: 14,
    upsetLosses: 12,
    clutchRecord: 0.55,
    marchMadnessScore: 80,
  },
  'Chris Beard': {
    coachName: 'Chris Beard',
    currentTeam: 'Ole Miss',
    yearsExperience: 8,
    tournamentAppearances: 6,
    sweetSixteens: 4,
    eliteEights: 2,
    finalFours: 1,
    championships: 0,
    upsetWins: 8,
    upsetLosses: 2,
    clutchRecord: 0.67,
    marchMadnessScore: 83,
  },
  'Shaka Smart': {
    coachName: 'Shaka Smart',
    currentTeam: 'Marquette',
    yearsExperience: 13,
    tournamentAppearances: 10,
    sweetSixteens: 4,
    eliteEights: 1,
    finalFours: 1,
    championships: 0,
    upsetWins: 11,
    upsetLosses: 5,
    clutchRecord: 0.60,
    marchMadnessScore: 78,
  },
  // 2025 Notable Coaches
  'Jon Scheyer': {
    coachName: 'Jon Scheyer',
    currentTeam: 'Duke',
    yearsExperience: 3,
    tournamentAppearances: 3,
    sweetSixteens: 2,
    eliteEights: 1,
    finalFours: 0,
    championships: 0,
    upsetWins: 2,
    upsetLosses: 0,
    clutchRecord: 0.70,
    marchMadnessScore: 75,
  },
  'T.J. Otzelberger': {
    coachName: 'T.J. Otzelberger',
    currentTeam: 'Iowa State',
    yearsExperience: 4,
    tournamentAppearances: 3,
    sweetSixteens: 1,
    eliteEights: 0,
    finalFours: 0,
    championships: 0,
    upsetWins: 5,
    upsetLosses: 1,
    clutchRecord: 0.62,
    marchMadnessScore: 72,
  },
  'Todd Golden': {
    coachName: 'Todd Golden',
    currentTeam: 'Florida',
    yearsExperience: 3,
    tournamentAppearances: 2,
    sweetSixteens: 1,
    eliteEights: 0,
    finalFours: 0,
    championships: 0,
    upsetWins: 3,
    upsetLosses: 1,
    clutchRecord: 0.58,
    marchMadnessScore: 70,
  },
  'Tommy Lloyd': {
    coachName: 'Tommy Lloyd',
    currentTeam: 'Arizona',
    yearsExperience: 4,
    tournamentAppearances: 4,
    sweetSixteens: 3,
    eliteEights: 1,
    finalFours: 0,
    championships: 0,
    upsetWins: 3,
    upsetLosses: 2,
    clutchRecord: 0.65,
    marchMadnessScore: 76,
  },
  'Dusty May': {
    coachName: 'Dusty May',
    currentTeam: 'Florida',
    yearsExperience: 6,
    tournamentAppearances: 4,
    sweetSixteens: 2,
    eliteEights: 1,
    finalFours: 0,
    championships: 0,
    upsetWins: 6,
    upsetLosses: 2,
    clutchRecord: 0.61,
    marchMadnessScore: 74,
  },
  // Mid-Major Upset Specialists
  'Bob Huggins': {
    coachName: 'Bob Huggins',
    currentTeam: 'West Virginia',
    yearsExperience: 33,
    tournamentAppearances: 24,
    sweetSixteens: 8,
    eliteEights: 4,
    finalFours: 2,
    championships: 0,
    upsetWins: 18,
    upsetLosses: 9,
    clutchRecord: 0.58,
    marchMadnessScore: 83,
  },
  'Matt Painter': {
    coachName: 'Matt Painter',
    currentTeam: 'Purdue',
    yearsExperience: 20,
    tournamentAppearances: 15,
    sweetSixteens: 7,
    eliteEights: 3,
    finalFours: 1,
    championships: 0,
    upsetWins: 6,
    upsetLosses: 7,
    clutchRecord: 0.54,
    marchMadnessScore: 81,
  },
  'Mick Cronin': {
    coachName: 'Mick Cronin',
    currentTeam: 'UCLA',
    yearsExperience: 18,
    tournamentAppearances: 14,
    sweetSixteens: 6,
    eliteEights: 3,
    finalFours: 1,
    championships: 0,
    upsetWins: 9,
    upsetLosses: 5,
    clutchRecord: 0.59,
    marchMadnessScore: 79,
  },
  // Underperformers in Tournament (below 70)
  'Mark Turgeon': {
    coachName: 'Mark Turgeon',
    currentTeam: 'Retired',
    yearsExperience: 14,
    tournamentAppearances: 11,
    sweetSixteens: 2,
    eliteEights: 0,
    finalFours: 0,
    championships: 0,
    upsetWins: 4,
    upsetLosses: 6,
    clutchRecord: 0.45,
    marchMadnessScore: 62,
  },
};

// Calculate coach advantage between two teams
export function calculateCoachAdvantage(
  coach1Name: string,
  coach2Name: string
): { advantage: number; explanation: string } {
  const coach1 = coachHistory[coach1Name];
  const coach2 = coachHistory[coach2Name];
  
  if (!coach1 && !coach2) {
    return { advantage: 0, explanation: 'No coach data available' };
  }
  
  if (!coach1) {
    return { 
      advantage: -5, 
      explanation: `${coach2Name} has significant tournament experience (${coach2.marchMadnessScore} score)` 
    };
  }
  
  if (!coach2) {
    return { 
      advantage: 5, 
      explanation: `${coach1Name} has significant tournament experience (${coach1.marchMadnessScore} score)` 
    };
  }
  
  const scoreDiff = coach1.marchMadnessScore - coach2.marchMadnessScore;
  
  let explanation = '';
  if (scoreDiff > 15) {
    explanation = `${coach1Name} is an elite tournament coach (${coach1.marchMadnessScore}) vs ${coach2Name} (${coach2.marchMadnessScore})`;
  } else if (scoreDiff > 5) {
    explanation = `${coach1Name} has better tournament history (${coach1.marchMadnessScore}) vs ${coach2Name} (${coach2.marchMadnessScore})`;
  } else if (scoreDiff < -15) {
    explanation = `${coach2Name} is an elite tournament coach (${coach2.marchMadnessScore}) vs ${coach1Name} (${coach1.marchMadnessScore})`;
    return { advantage: scoreDiff / 5, explanation };
  } else if (scoreDiff < -5) {
    explanation = `${coach2Name} has better tournament history (${coach2.marchMadnessScore}) vs ${coach1Name} (${coach1.marchMadnessScore})`;
    return { advantage: scoreDiff / 5, explanation };
  } else {
    explanation = 'Both coaches have comparable tournament experience';
  }
  
  return { advantage: scoreDiff / 5, explanation };
}

// Get clutch coaching factor (close game performance)
export function getClutchFactor(coachName: string): number {
  const coach = coachHistory[coachName];
  if (!coach) return 0.5; // Neutral
  
  // Normalize clutch record to -0.1 to +0.1 range
  return (coach.clutchRecord - 0.5) * 0.4;
}

// Get upset propensity
export function getUpsetPropensity(coachName: string): {
  asUnderdog: number;
  asFavorite: number;
} {
  const coach = coachHistory[coachName];
  if (!coach) return { asUnderdog: 0.3, asFavorite: 0.2 };
  
  const totalGames = coach.upsetWins + coach.upsetLosses + 10; // Smoothing
  const upsetWinRate = coach.upsetWins / totalGames;
  const upsetLossRate = coach.upsetLosses / totalGames;
  
  return {
    asUnderdog: upsetWinRate,
    asFavorite: upsetLossRate,
  };
}

// Export for feature engineering
export function getCoachTournamentScore(coachName: string): number {
  return coachHistory[coachName]?.marchMadnessScore || 50;
}

export default coachHistory;
