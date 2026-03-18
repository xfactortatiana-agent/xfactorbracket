// ============================================================================
// BARTTORVIK 2026 - NEUTRAL COURT ADJUSTED RATINGS
// Source: barttorvik.com (March 2026)
// Key metric: Barthag = win probability vs average team
// ============================================================================

export interface BarttorvikMetrics {
  rank: number;
  team: string;
  conference: string;
  record: string;
  adjOE: number;      // Adjusted offensive efficiency
  adjDE: number;      // Adjusted defensive efficiency (lower is better)
  barthag: number;    // Win probability vs average team (0-1 scale)
  adjTempo: number;   // Adjusted tempo
  efgPct: number;     // Effective field goal %
  efgDPct: number;    // Opponent effective field goal %
  tor: number;        // Turnover rate
  tord: number;       // Opponent turnover rate
  orb: number;        // Offensive rebound %
  drb: number;        // Defensive rebound %
  ftr: number;        // Free throw rate
  ftrd: number;       // Opponent free throw rate
  twoPpct: number;    // 2-point %
  twoPdpct: number;   // Opponent 2-point %
  threePpct: number;  // 3-point %
  threePdpct: number; // Opponent 3-point %
  threePr: number;    // 3-point attempt rate
  threePrd: number;   // Opponent 3-point attempt rate
  wab: number;        // Wins above bubble
}

// Top 100 teams with tournament-relevant stats
export const barttorvik2026: Record<string, BarttorvikMetrics> = {
  'michigan': {
    rank: 1, team: 'Michigan', conference: 'B10', record: '19-1',
    adjOE: 126.9, adjDE: 90.0, barthag: 0.9811, adjTempo: 59.0,
    efgPct: 56.5, efgDPct: 43.5, tor: 15.5, tord: 17.0,
    orb: 35.6, drb: 27.7, ftr: 41.7, ftrd: 26.0,
    twoPpct: 64.5, twoPdpct: 41.8, threePpct: 34.5, threePdpct: 30.4,
    threePr: 43.3, threePrd: 43.1, wab: 7.4
  },
  'arizona': {
    rank: 2, team: 'Arizona', conference: 'B12', record: '21-0',
    adjOE: 126.4, adjDE: 91.4, barthag: 0.9767, adjTempo: 56.6,
    efgPct: 45.1, efgDPct: 15.5, tor: 18.2, tord: 39.4,
    orb: 25.3, drb: 43.7, ftr: 27.7, ftrd: 57.4,
    twoPpct: 43.6, twoPdpct: 36.3, threePpct: 31.9, threePdpct: 27.4,
    threePr: 36.7, threePrd: 36.7, wab: 8.1
  },
  'houston': {
    rank: 3, team: 'Houston', conference: 'B12', record: '18-2',
    adjOE: 126.4, adjDE: 93.3, barthag: 0.9705, adjTempo: 52.4,
    efgPct: 46.4, efgDPct: 13.1, tor: 22.9, tord: 37.6,
    orb: 31.8, drb: 26.3, ftr: 39.2, ftrd: 52.7,
    twoPpct: 46.3, twoPdpct: 34.6, threePpct: 31.1, threePdpct: 42.3,
    threePr: 42.8, threePrd: 42.8, wab: 5.4
  },
  'duke': {
    rank: 4, team: 'Duke', conference: 'ACC', record: '19-1',
    adjOE: 125.0, adjDE: 93.8, barthag: 0.9643, adjTempo: 57.7,
    efgPct: 45.9, efgDPct: 16.4, tor: 19.7, tord: 37.8,
    orb: 25.8, drb: 42.4, ftr: 23.9, ftrd: 62.7,
    twoPpct: 45.1, twoPdpct: 34.4, threePpct: 31.2, threePdpct: 45.3,
    threePr: 44.9, threePrd: 44.9, wab: 7.5
  },
  'florida': {
    rank: 5, team: 'Florida', conference: 'SEC', record: '15-6',
    adjOE: 124.4, adjDE: 93.8, barthag: 0.9623, adjTempo: 52.5,
    efgPct: 46.4, efgDPct: 16.9, tor: 15.2, tord: 43.5,
    orb: 22.9, drb: 40.1, ftr: 35.4, ftrd: 58.6,
    twoPpct: 45.3, twoPdpct: 29.0, threePpct: 32.5, threePdpct: 40.3,
    threePr: 32.6, threePrd: 32.6, wab: 3.1
  },
  'illinois': {
    rank: 6, team: 'Illinois', conference: 'B10', record: '17-3',
    adjOE: 131.2, adjDE: 99.1, barthag: 0.9620, adjTempo: 56.2,
    efgPct: 46.8, efgDPct: 14.4, tor: 11.7, tord: 40.0,
    orb: 26.8, drb: 34.6, ftr: 19.4, ftrd: 58.4,
    twoPpct: 46.4, twoPdpct: 36.0, threePpct: 31.6, threePdpct: 50.2,
    threePr: 40.7, threePrd: 40.7, wab: 5.2
  },
  'vanderbilt': {
    rank: 7, team: 'Vanderbilt', conference: 'SEC', record: '18-3',
    adjOE: 125.7, adjDE: 95.0, barthag: 0.9615, adjTempo: 57.0,
    efgPct: 46.9, efgDPct: 13.1, tor: 18.6, tord: 30.1,
    orb: 27.7, drb: 36.9, ftr: 40.6, ftrd: 58.8,
    twoPpct: 49.5, twoPdpct: 36.4, threePpct: 28.7, threePdpct: 44.3,
    threePr: 40.2, threePrd: 40.2, wab: 5.0
  },
  'uconn': {
    rank: 8, team: 'UConn', conference: 'BE', record: '20-1',
    adjOE: 120.4, adjDE: 91.6, barthag: 0.9590, adjTempo: 54.8,
    efgPct: 44.0, efgDPct: 16.3, tor: 19.1, tord: 35.1,
    orb: 29.6, drb: 32.7, ftr: 39.6, ftrd: 55.8,
    twoPpct: 44.6, twoPdpct: 35.3, threePpct: 28.5, threePdpct: 37.5,
    threePr: 33.9, threePrd: 33.9, wab: 7.5
  },
  'purdue': {
    rank: 9, team: 'Purdue', conference: 'B10', record: '17-4',
    adjOE: 129.0, adjDE: 98.6, barthag: 0.9567, adjTempo: 58.5,
    efgPct: 50.5, efgDPct: 13.9, tor: 16.2, tord: 35.9,
    orb: 27.0, drb: 26.9, ftr: 22.9, ftrd: 59.2,
    twoPpct: 51.9, twoPdpct: 38.2, threePpct: 32.6, threePdpct: 38.4,
    threePr: 46.2, threePrd: 46.2, wab: 5.2
  },
  'nebraska': {
    rank: 10, team: 'Nebraska', conference: 'B10', record: '20-1',
    adjOE: 122.3, adjDE: 93.8, barthag: 0.9550, adjTempo: 56.5,
    efgPct: 46.9, efgDPct: 13.2, tor: 19.3, tord: 26.5,
    orb: 26.9, drb: 27.2, ftr: 23.7, ftrd: 60.1,
    twoPpct: 48.6, twoPdpct: 35.4, threePpct: 30.2, threePdpct: 51.0,
    threePr: 49.7, threePrd: 49.7, wab: 7.1
  }
  // ... will add all 68 tournament teams
};

// Helper function to get Barttorvik data by team name
export function getBarttorvikData(teamName: string): BarttorvikMetrics | undefined {
  // Normalize team name
  const normalized = teamName.toLowerCase().replace(/[^a-z]/g, '');
  
  // Try direct lookup first
  if (barttorvik2026[normalized]) {
    return barttorvik2026[normalized];
  }
  
  // Try matching by normalized team name
  for (const [key, data] of Object.entries(barttorvik2026)) {
    const dataNormalized = data.team.toLowerCase().replace(/[^a-z]/g, '');
    if (dataNormalized === normalized || 
        normalized.includes(dataNormalized) || 
        dataNormalized.includes(normalized)) {
      return data;
    }
  }
  
  return undefined;
}

// Calculate win probability between two teams using Barttorvik data
export function calculateBarttorvikWinProbability(team1: string, team2: string): number {
  const t1 = getBarttorvikData(team1);
  const t2 = getBarttorvikData(team2);
  
  if (!t1 || !t2) {
    return 0.5; // Unknown team, return coin flip
  }
  
  // Use log5 method with barthag (win probability vs average)
  // Formula: (p1 - p1*p2) / (p1 + p2 - 2*p1*p2)
  const p1 = t1.barthag;
  const p2 = t2.barthag;
  
  if (p1 + p2 === 0) return 0.5;
  
  return (p1 - p1 * p2) / (p1 + p2 - 2 * p1 * p2);
}
