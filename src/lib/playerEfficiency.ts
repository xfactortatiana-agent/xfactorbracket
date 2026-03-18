// ============================================================================
// PLAYER EFFICIENCY AND ADVANCED STATS DATABASE
// Key players for 2025 tournament with efficiency metrics
// ============================================================================

export interface PlayerEfficiency {
  name: string;
  team: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  class: 'Fr' | 'So' | 'Jr' | 'Sr' | 'Grad';
  ppg: number;
  rpg: number;
  apg: number;
  fg_pct: number;
  three_pct: number;
  ft_pct: number;
  minutes: number;
  
  // Advanced stats
  per: number;              // Player Efficiency Rating
  ts_pct: number;          // True Shooting %
  usg_rate: number;        // Usage Rate
  ortg: number;            // Offensive Rating
  drtg: number;            // Defensive Rating
  ws_40: number;           // Win Shares per 40 min
  bpm: number;             // Box Plus/Minus
  
  // Key indicators
  isInjured: boolean;
  injuryType?: string;
  gamesPlayed: number;
  last5PPG: number;        // Recent form
}

// Star players for 2025 tournament
export const playerDatabase: Record<string, PlayerEfficiency[]> = {
  'Duke': [
    {
      name: 'Cooper Flagg',
      team: 'Duke',
      position: 'SF',
      class: 'Fr',
      ppg: 19.2,
      rpg: 7.5,
      apg: 4.2,
      fg_pct: 0.485,
      three_pct: 0.385,
      ft_pct: 0.815,
      minutes: 32.5,
      per: 28.5,
      ts_pct: 0.595,
      usg_rate: 28.5,
      ortg: 125.2,
      drtg: 95.8,
      ws_40: 0.185,
      bpm: 12.5,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 21.4,
    },
    {
      name: 'Kon Knueppel',
      team: 'Duke',
      position: 'SG',
      class: 'Fr',
      ppg: 13.8,
      rpg: 4.2,
      apg: 2.1,
      fg_pct: 0.465,
      three_pct: 0.405,
      ft_pct: 0.825,
      minutes: 30.2,
      per: 18.2,
      ts_pct: 0.585,
      usg_rate: 18.5,
      ortg: 118.5,
      drtg: 102.5,
      ws_40: 0.125,
      bpm: 5.2,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 15.2,
    },
    {
      name: 'Tyrese Proctor',
      team: 'Duke',
      position: 'PG',
      class: 'Jr',
      ppg: 11.5,
      rpg: 3.2,
      apg: 4.8,
      fg_pct: 0.425,
      three_pct: 0.385,
      ft_pct: 0.785,
      minutes: 31.5,
      per: 15.5,
      ts_pct: 0.525,
      usg_rate: 16.5,
      ortg: 112.5,
      drtg: 102.8,
      ws_40: 0.095,
      bpm: 3.8,
      isInjured: false,
      gamesPlayed: 30,
      last5PPG: 12.8,
    },
  ],
  'Arizona': [
    {
      name: 'Caleb Love',
      team: 'Arizona',
      position: 'SG',
      class: 'Sr',
      ppg: 17.8,
      rpg: 4.5,
      apg: 3.2,
      fg_pct: 0.435,
      three_pct: 0.355,
      ft_pct: 0.825,
      minutes: 34.2,
      per: 22.5,
      ts_pct: 0.545,
      usg_rate: 26.5,
      ortg: 118.2,
      drtg: 102.5,
      ws_40: 0.145,
      bpm: 7.5,
      isInjured: false,
      gamesPlayed: 31,
      last5PPG: 19.2,
    },
    {
      name: 'Henri Veesaar',
      team: 'Arizona',
      position: 'C',
      class: 'So',
      ppg: 12.5,
      rpg: 7.2,
      apg: 1.2,
      fg_pct: 0.585,
      three_pct: 0.285,
      ft_pct: 0.725,
      minutes: 26.5,
      per: 20.2,
      ts_pct: 0.625,
      usg_rate: 18.5,
      ortg: 122.5,
      drtg: 98.5,
      ws_40: 0.155,
      bpm: 8.2,
      isInjured: false,
      gamesPlayed: 31,
      last5PPG: 13.8,
    },
  ],
  'Houston': [
    {
      name: 'LJ Cryer',
      team: 'Houston',
      position: 'SG',
      class: 'Sr',
      ppg: 15.8,
      rpg: 3.2,
      apg: 2.5,
      fg_pct: 0.445,
      three_pct: 0.385,
      ft_pct: 0.845,
      minutes: 33.5,
      per: 19.5,
      ts_pct: 0.575,
      usg_rate: 22.5,
      ortg: 118.8,
      drtg: 95.2,
      ws_40: 0.135,
      bpm: 6.5,
      isInjured: false,
      gamesPlayed: 33,
      last5PPG: 16.5,
    },
    {
      name: 'Jwan Roberts',
      team: 'Houston',
      position: 'PF',
      class: 'Sr',
      ppg: 11.2,
      rpg: 6.8,
      apg: 1.5,
      fg_pct: 0.565,
      three_pct: 0.125,
      ft_pct: 0.685,
      minutes: 28.5,
      per: 18.5,
      ts_pct: 0.595,
      usg_rate: 16.8,
      ortg: 120.2,
      drtg: 92.5,
      ws_40: 0.145,
      bpm: 7.2,
      isInjured: false,
      gamesPlayed: 33,
      last5PPG: 12.2,
    },
  ],
  'Florida': [
    {
      name: 'Walter Clayton Jr.',
      team: 'Florida',
      position: 'SG',
      class: 'Jr',
      ppg: 17.2,
      rpg: 4.2,
      apg: 3.5,
      fg_pct: 0.465,
      three_pct: 0.395,
      ft_pct: 0.875,
      minutes: 32.8,
      per: 21.8,
      ts_pct: 0.585,
      usg_rate: 24.5,
      ortg: 120.5,
      drtg: 102.8,
      ws_40: 0.155,
      bpm: 8.5,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 18.5,
    },
    {
      name: 'Vlad Goldin',
      team: 'Florida',
      position: 'C',
      class: 'Sr',
      ppg: 15.8,
      rpg: 6.5,
      apg: 1.8,
      fg_pct: 0.625,
      three_pct: 0.425,
      ft_pct: 0.825,
      minutes: 30.2,
      per: 24.5,
      ts_pct: 0.685,
      usg_rate: 22.5,
      ortg: 132.5,
      drtg: 102.2,
      ws_40: 0.195,
      bpm: 10.2,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 16.8,
    },
  ],
  'UConn': [
    {
      name: 'Alex Karaban',
      team: 'UConn',
      position: 'PF',
      class: 'Jr',
      ppg: 14.8,
      rpg: 5.8,
      apg: 2.2,
      fg_pct: 0.465,
      three_pct: 0.385,
      ft_pct: 0.805,
      minutes: 33.5,
      per: 19.2,
      ts_pct: 0.575,
      usg_rate: 20.5,
      ortg: 118.5,
      drtg: 102.5,
      ws_40: 0.135,
      bpm: 6.8,
      isInjured: false,
      gamesPlayed: 31,
      last5PPG: 15.5,
    },
    {
      name: 'Liam McNeeley',
      team: 'UConn',
      position: 'SF',
      class: 'Fr',
      ppg: 14.2,
      rpg: 6.2,
      apg: 2.5,
      fg_pct: 0.455,
      three_pct: 0.375,
      ft_pct: 0.815,
      minutes: 31.2,
      per: 18.5,
      ts_pct: 0.565,
      usg_rate: 21.5,
      ortg: 115.8,
      drtg: 99.5,
      ws_40: 0.125,
      bpm: 6.2,
      isInjured: false,
      gamesPlayed: 31,
      last5PPG: 13.8,
    },
  ],
  'Alabama': [
    {
      name: 'Mark Sears',
      team: 'Alabama',
      position: 'PG',
      class: 'Sr',
      ppg: 18.5,
      rpg: 4.2,
      apg: 5.2,
      fg_pct: 0.455,
      three_pct: 0.385,
      ft_pct: 0.855,
      minutes: 34.2,
      per: 24.2,
      ts_pct: 0.595,
      usg_rate: 28.5,
      ortg: 122.5,
      drtg: 105.2,
      ws_40: 0.165,
      bpm: 9.5,
      isInjured: false,
      gamesPlayed: 31,
      last5PPG: 19.8,
    },
  ],
  'Iowa State': [
    {
      name: 'Curtis Jones',
      team: 'Iowa State',
      position: 'SG',
      class: 'Sr',
      ppg: 14.2,
      rpg: 3.8,
      apg: 2.8,
      fg_pct: 0.445,
      three_pct: 0.405,
      ft_pct: 0.795,
      minutes: 33.5,
      per: 17.5,
      ts_pct: 0.575,
      usg_rate: 21.5,
      ortg: 115.2,
      drtg: 99.5,
      ws_40: 0.125,
      bpm: 5.8,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 15.2,
    },
    {
      name: 'Keshon Gilbert',
      team: 'Iowa State',
      position: 'PG',
      class: 'Jr',
      ppg: 12.5,
      rpg: 4.2,
      apg: 4.5,
      fg_pct: 0.465,
      three_pct: 0.325,
      ft_pct: 0.755,
      minutes: 32.8,
      per: 16.8,
      ts_pct: 0.555,
      usg_rate: 20.2,
      ortg: 114.5,
      drtg: 98.2,
      ws_40: 0.115,
      bpm: 5.2,
      isInjured: false,
      gamesPlayed: 32,
      last5PPG: 13.5,
    },
  ],
};

// Calculate team player efficiency metrics
export function calculateTeamPlayerMetrics(teamName: string): {
  avgPER: number;
  bestPER: number;
  starPower: number;
  depth: number;
  injuredPlayers: string[];
  recentForm: number;
  hasSuperstar: boolean;
} {
  const players = playerDatabase[teamName] || [];
  
  if (players.length === 0) {
    return {
      avgPER: 15.0,
      bestPER: 18.0,
      starPower: 50,
      depth: 50,
      injuredPlayers: [],
      recentForm: 0.5,
      hasSuperstar: false,
    };
  }
  
  const pers = players.map(p => p.per);
  const avgPER = pers.reduce((a, b) => a + b, 0) / pers.length;
  const bestPER = Math.max(...pers);
  
  // Star power: weighted combination of top players
  const sortedByPER = [...players].sort((a, b) => b.per - a.per);
  const starPower = Math.min(100, 
    sortedByPER[0]?.per * 2.5 + 
    (sortedByPER[1]?.per || 0) * 1.5 + 
    (sortedByPER[2]?.per || 0)
  );
  
  // Depth: number of players with PER > 15
  const qualityPlayers = players.filter(p => p.per > 15).length;
  const depth = Math.min(100, qualityPlayers * 25);
  
  const injuredPlayers = players
    .filter(p => p.isInjured)
    .map(p => p.name);
  
  // Recent form based on last 5 games
  const recentForm = players.reduce((sum, p) => sum + (p.last5PPG / Math.max(p.ppg, 1)), 0) / players.length;
  
  const hasSuperstar = bestPER > 25;
  
  return {
    avgPER,
    bestPER,
    starPower,
    depth,
    injuredPlayers,
    recentForm,
    hasSuperstar,
  };
}

// Compare two teams' player talent
export function compareTeamTalent(team1: string, team2: string): {
  advantage: number;
  explanation: string;
  keyMatchup: string;
} {
  const t1 = calculateTeamPlayerMetrics(team1);
  const t2 = calculateTeamPlayerMetrics(team2);
  
  const perDiff = t1.avgPER - t2.avgPER;
  const starDiff = t1.starPower - t2.starPower;
  const depthDiff = t1.depth - t2.depth;
  
  // Composite advantage score
  const advantage = (perDiff * 2 + starDiff * 0.3 + depthDiff * 0.1) / 3;
  
  let explanation = '';
  let keyMatchup = '';
  
  if (t1.hasSuperstar && !t2.hasSuperstar) {
    const star = playerDatabase[team1]?.find(p => p.per > 25);
    explanation = `${team1} has superstar ${star?.name} (PER: ${star?.per})`;
    keyMatchup = `${star?.name} vs ${team2} defense`;
  } else if (t2.hasSuperstar && !t1.hasSuperstar) {
    const star = playerDatabase[team2]?.find(p => p.per > 25);
    explanation = `${team2} has superstar ${star?.name} (PER: ${star?.per})`;
    keyMatchup = `${team1} defense vs ${star?.name}`;
  } else if (perDiff > 2) {
    explanation = `${team1} has better overall player efficiency (+${perDiff.toFixed(1)} PER)`;
    keyMatchup = 'Frontcourt battle';
  } else if (perDiff < -2) {
    explanation = `${team2} has better overall player efficiency (${Math.abs(perDiff).toFixed(1)} PER advantage)`;
    keyMatchup = 'Frontcourt battle';
  } else {
    explanation = 'Both teams have comparable player talent';
    keyMatchup = 'Battle of depth';
  }
  
  return { advantage, explanation, keyMatchup };
}

// Get injury impact
export function getInjuryImpact(teamName: string): {
  impact: number;
  missingPlayers: string[];
  severity: 'none' | 'minor' | 'major' | 'critical';
} {
  const metrics = calculateTeamPlayerMetrics(teamName);
  
  if (metrics.injuredPlayers.length === 0) {
    return { impact: 0, missingPlayers: [], severity: 'none' };
  }
  
  const players = playerDatabase[teamName] || [];
  const injuredPlayerData = players.filter(p => p.isInjured);
  
  // Calculate impact based on injured players' PER
  const totalPER = players.reduce((sum, p) => sum + p.per, 0);
  const injuredPER = injuredPlayerData.reduce((sum, p) => sum + p.per, 0);
  const impact = (injuredPER / totalPER) * 100;
  
  let severity: 'none' | 'minor' | 'major' | 'critical' = 'minor';
  if (impact > 30) severity = 'critical';
  else if (impact > 20) severity = 'major';
  else if (impact > 10) severity = 'minor';
  
  return {
    impact,
    missingPlayers: metrics.injuredPlayers,
    severity,
  };
}

// Export for ML features
export function getTeamPER(teamName: string): number {
  return calculateTeamPlayerMetrics(teamName).avgPER;
}

export function getStarPlayerImpact(teamName: string): number {
  const metrics = calculateTeamPlayerMetrics(teamName);
  return metrics.hasSuperstar ? metrics.bestPER / 30 : 0;
}

export default playerDatabase;
