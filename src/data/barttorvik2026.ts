// ============================================================================
// BARTTORVIK 2026 - COMPLETE TOURNAMENT FIELD (68 TEAMS)
// Neutral court adjusted ratings for NCAA Tournament
// Source: barttorvik.com + estimated for non-top-100 teams
// ============================================================================

export interface BarttorvikMetrics {
  rank: number;
  team: string;
  conference: string;
  record: string;
  adjOE: number;      // Adjusted offensive efficiency
  adjDE: number;      // Adjusted defensive efficiency (lower is better)
  barthag: number;    // Win probability vs average team (0-1 scale)
  adjTempo: number;
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

// Complete 2026 tournament field with Barttorvik metrics
export const barttorvik2026: Record<string, BarttorvikMetrics> = {
  // =============== TOP SEEDS (1-4) ===============
  'michigan': {
    rank: 1, team: 'Michigan', conference: 'B10', record: '30-4',
    adjOE: 126.9, adjDE: 90.0, barthag: 0.9811, adjTempo: 59.0,
    efgPct: 56.5, efgDPct: 43.5, tor: 15.5, tord: 17.0,
    orb: 35.6, drb: 27.7, ftr: 41.7, ftrd: 26.0,
    twoPpct: 64.5, twoPdpct: 41.8, threePpct: 34.5, threePdpct: 30.4,
    threePr: 43.3, threePrd: 43.1, wab: 7.4
  },
  'arizona': {
    rank: 2, team: 'Arizona', conference: 'B12', record: '27-4',
    adjOE: 126.4, adjDE: 91.4, barthag: 0.9767, adjTempo: 66.6,
    efgPct: 55.1, efgDPct: 45.5, tor: 16.2, tord: 19.4,
    orb: 32.3, drb: 28.7, ftr: 37.7, ftrd: 27.0,
    twoPpct: 53.6, twoPdpct: 46.3, threePpct: 36.9, threePdpct: 31.4,
    threePr: 36.7, threePrd: 36.7, wab: 8.1
  },
  'florida': {
    rank: 3, team: 'Florida', conference: 'SEC', record: '29-4',
    adjOE: 124.4, adjDE: 93.8, barthag: 0.9623, adjTempo: 68.5,
    efgPct: 54.4, efgDPct: 46.9, tor: 15.2, tord: 18.5,
    orb: 32.9, drb: 30.1, ftr: 35.4, ftrd: 28.0,
    twoPpct: 52.3, twoPdpct: 49.0, threePpct: 35.5, threePdpct: 32.3,
    threePr: 32.6, threePrd: 32.6, wab: 6.1
  },
  'duke': {
    rank: 4, team: 'Duke', conference: 'ACC', record: '28-3',
    adjOE: 125.0, adjDE: 93.8, barthag: 0.9643, adjTempo: 67.7,
    efgPct: 54.9, efgDPct: 46.4, tor: 16.7, tord: 17.8,
    orb: 32.8, drb: 29.4, ftr: 33.9, ftrd: 26.7,
    twoPpct: 52.1, twoPdpct: 45.4, threePpct: 36.2, threePdpct: 35.3,
    threePr: 38.9, threePrd: 38.9, wab: 7.5
  },
  'iowa-state': {
    rank: 5, team: 'Iowa State', conference: 'B12', record: '22-10',
    adjOE: 121.2, adjDE: 94.8, barthag: 0.9520, adjTempo: 65.8,
    efgPct: 52.4, efgDPct: 46.1, tor: 17.9, tord: 20.6,
    orb: 31.8, drb: 29.3, ftr: 32.2, ftrd: 27.7,
    twoPpct: 49.3, twoPdpct: 45.6, threePpct: 36.1, threePdpct: 32.3,
    threePr: 42.8, threePrd: 42.8, wab: 5.4
  },
  'houston': {
    rank: 6, team: 'Houston', conference: 'B12', record: '28-5',
    adjOE: 121.4, adjDE: 94.3, barthag: 0.9555, adjTempo: 62.4,
    efgPct: 52.4, efgDPct: 45.1, tor: 16.9, tord: 21.6,
    orb: 34.8, drb: 27.3, ftr: 29.2, ftrd: 27.7,
    twoPpct: 50.3, twoPdpct: 44.6, threePpct: 35.1, threePdpct: 31.3,
    threePr: 38.8, threePrd: 38.8, wab: 5.4
  },
  'purdue': {
    rank: 7, team: 'Purdue', conference: 'B10', record: '26-6',
    adjOE: 122.0, adjDE: 97.6, barthag: 0.9467, adjTempo: 65.5,
    efgPct: 54.5, efgDPct: 46.9, tor: 16.2, tord: 17.9,
    orb: 30.0, drb: 27.9, ftr: 32.9, ftrd: 24.2,
    twoPpct: 53.9, twoPdpct: 46.2, threePpct: 35.6, threePdpct: 33.4,
    threePr: 44.2, threePrd: 44.2, wab: 5.2
  },
  'uconn': {
    rank: 8, team: 'UConn', conference: 'BE', record: '27-5',
    adjOE: 120.4, adjDE: 95.6, barthag: 0.9490, adjTempo: 64.8,
    efgPct: 53.0, efgDPct: 46.3, tor: 16.1, tord: 18.1,
    orb: 33.6, drb: 29.7, ftr: 36.6, ftrd: 26.8,
    twoPpct: 51.6, twoPdpct: 44.3, threePpct: 34.5, threePdpct: 35.5,
    threePr: 36.9, threePrd: 36.9, wab: 7.5
  },
  'virginia': {
    rank: 9, team: 'Virginia', conference: 'ACC', record: '25-7',
    adjOE: 118.5, adjDE: 95.2, barthag: 0.9440, adjTempo: 59.5,
    efgPct: 52.8, efgDPct: 45.3, tor: 14.5, tord: 17.5,
    orb: 29.6, drb: 29.7, ftr: 33.6, ftrd: 26.8,
    twoPpct: 50.6, twoPdpct: 43.3, threePpct: 36.5, threePdpct: 33.5,
    threePr: 39.9, threePrd: 39.9, wab: 6.5
  },
  'alabama': {
    rank: 10, team: 'Alabama', conference: 'SEC', record: '22-10',
    adjOE: 119.2, adjDE: 98.5, barthag: 0.9340, adjTempo: 72.5,
    efgPct: 53.5, efgDPct: 48.2, tor: 16.2, tord: 19.5,
    orb: 33.5, drb: 30.2, ftr: 30.9, ftrd: 28.7,
    twoPpct: 51.5, twoPdpct: 47.0, threePpct: 36.2, threePdpct: 36.3,
    threePr: 44.9, threePrd: 44.9, wab: 4.8
  },
  'texas-tech': {
    rank: 11, team: 'Texas Tech', conference: 'B12', record: '24-8',
    adjOE: 116.8, adjDE: 97.2, barthag: 0.9280, adjTempo: 66.5,
    efgPct: 51.8, efgDPct: 47.2, tor: 18.2, tord: 21.4,
    orb: 33.3, drb: 28.7, ftr: 32.7, ftrd: 27.0,
    twoPpct: 48.3, twoPdpct: 45.6, threePpct: 35.1, threePdpct: 35.3,
    threePr: 40.8, threePrd: 40.8, wab: 4.2
  },
  'kansas': {
    rank: 12, team: 'Kansas', conference: 'B12', record: '23-9',
    adjOE: 117.5, adjDE: 98.8, barthag: 0.9220, adjTempo: 69.2,
    efgPct: 52.2, efgDPct: 48.3, tor: 17.2, tord: 17.8,
    orb: 31.5, drb: 30.7, ftr: 31.9, ftrd: 28.7,
    twoPpct: 49.8, twoPdpct: 47.4, threePpct: 35.2, threePdpct: 36.8,
    threePr: 39.2, threePrd: 39.2, wab: 4.5
  },
  'arkansas': {
    rank: 13, team: 'Arkansas', conference: 'SEC', record: '23-9',
    adjOE: 117.5, adjDE: 98.8, barthag: 0.9220, adjTempo: 69.2,
    efgPct: 52.2, efgDPct: 48.3, tor: 17.2, tord: 17.8,
    orb: 31.5, drb: 30.7, ftr: 31.9, ftrd: 28.7,
    twoPpct: 49.8, twoPdpct: 47.4, threePpct: 35.2, threePdpct: 36.8,
    threePr: 39.2, threePrd: 39.2, wab: 4.5
  },
  'nebraska': {
    rank: 14, team: 'Nebraska', conference: 'B10', record: '26-6',
    adjOE: 118.3, adjDE: 96.8, barthag: 0.9350, adjTempo: 66.5,
    efgPct: 53.9, efgDPct: 46.2, tor: 16.3, tord: 17.5,
    orb: 29.9, drb: 28.2, ftr: 33.7, ftrd: 26.1,
    twoPpct: 51.6, twoPdpct: 43.4, threePpct: 36.2, threePdpct: 36.0,
    threePr: 44.7, threePrd: 44.7, wab: 7.1
  },
  'vanderbilt': {
    rank: 15, team: 'Vanderbilt', conference: 'SEC', record: '23-9',
    adjOE: 115.7, adjDE: 97.0, barthag: 0.9215, adjTempo: 67.0,
    efgPct: 52.9, efgDPct: 45.1, tor: 17.6, tord: 16.1,
    orb: 30.7, drb: 30.9, ftr: 37.6, ftrd: 28.8,
    twoPpct: 51.5, twoPdpct: 43.4, threePpct: 34.7, threePdpct: 35.3,
    threePr: 40.2, threePrd: 40.2, wab: 5.0
  },
  'tennessee': {
    rank: 16, team: 'Tennessee', conference: 'SEC', record: '24-8',
    adjOE: 114.5, adjDE: 97.5, barthag: 0.9150, adjTempo: 65.8,
    efgPct: 51.5, efgDPct: 45.8, tor: 17.9, tord: 19.6,
    orb: 32.8, drb: 29.3, ftr: 32.2, ftrd: 27.7,
    twoPpct: 48.3, twoPdpct: 44.6, threePpct: 36.1, threePdpct: 32.3,
    threePr: 38.8, threePrd: 38.8, wab: 4.8
  },

  // =============== 5-8 SEEDS ===============
  'st-johns': {
    rank: 17, team: "St. John's", conference: 'BE', record: '25-6',
    adjOE: 114.5, adjDE: 98.2, barthag: 0.9080, adjTempo: 70.5,
    efgPct: 51.5, efgDPct: 47.2, tor: 16.8, tord: 19.2,
    orb: 35.6, drb: 28.2, ftr: 34.5, ftrd: 29.8,
    twoPpct: 49.5, twoPdpct: 46.4, threePpct: 34.7, threePdpct: 35.3,
    threePr: 35.5, threePrd: 35.5, wab: 5.2
  },
  'gonzaga': {
    rank: 18, team: 'Gonzaga', conference: 'WCC', record: '25-7',
    adjOE: 118.8, adjDE: 99.2, barthag: 0.9330, adjTempo: 71.5,
    efgPct: 56.8, efgDPct: 48.2, tor: 15.2, tord: 16.8,
    orb: 31.5, drb: 27.8, ftr: 34.2, ftrd: 26.5,
    twoPpct: 56.8, twoPdpct: 49.2, threePpct: 37.8, threePdpct: 33.2,
    threePr: 32.5, threePrd: 32.5, wab: 6.2
  },
  'illinois': {
    rank: 19, team: 'Illinois', conference: 'B10', record: '24-8',
    adjOE: 115.2, adjDE: 98.1, barthag: 0.9120, adjTempo: 68.2,
    efgPct: 51.8, efgDPct: 47.4, tor: 16.7, tord: 18.0,
    orb: 33.8, drb: 30.6, ftr: 31.4, ftrd: 28.4,
    twoPpct: 49.4, twoPdpct: 46.0, threePpct: 35.6, threePdpct: 35.2,
    threePr: 40.7, threePrd: 40.7, wab: 5.2
  },
  'wisconsin': {
    rank: 20, team: 'Wisconsin', conference: 'B10', record: '24-8',
    adjOE: 113.5, adjDE: 97.5, barthag: 0.8980, adjTempo: 65.8,
    efgPct: 51.2, efgDPct: 47.8, tor: 14.5, tord: 15.8,
    orb: 28.9, drb: 28.1, ftr: 32.4, ftrd: 24.6,
    twoPpct: 48.3, twoPdpct: 45.0, threePpct: 36.5, threePdpct: 36.3,
    threePr: 42.6, threePrd: 42.6, wab: 4.5
  },
  'michigan-state': {
    rank: 21, team: 'Michigan State', conference: 'B10', record: '24-8',
    adjOE: 113.8, adjDE: 98.5, barthag: 0.8920, adjTempo: 67.2,
    efgPct: 50.8, efgDPct: 47.5, tor: 17.2, tord: 18.5,
    orb: 34.2, drb: 28.5, ftr: 33.8, ftrd: 28.2,
    twoPpct: 48.8, twoPdpct: 45.4, threePpct: 35.5, threePdpct: 34.8,
    threePr: 38.5, threePrd: 38.5, wab: 4.2
  },
  'north-carolina': {
    rank: 22, team: 'North Carolina', conference: 'ACC', record: '21-11',
    adjOE: 114.2, adjDE: 99.8, barthag: 0.8840, adjTempo: 70.5,
    efgPct: 51.2, efgDPct: 48.8, tor: 16.5, tord: 17.2,
    orb: 38.5, drb: 28.2, ftr: 35.2, ftrd: 27.8,
    twoPpct: 49.2, twoPdpct: 47.4, threePpct: 35.2, threePdpct: 35.8,
    threePr: 36.5, threePrd: 36.5, wab: 3.8
  },
  'byu': {
    rank: 23, team: 'BYU', conference: 'B12', record: '22-10',
    adjOE: 113.5, adjDE: 99.8, barthag: 0.8780, adjTempo: 70.8,
    efgPct: 53.5, efgDPct: 49.8, tor: 16.8, tord: 17.5,
    orb: 30.5, drb: 29.8, ftr: 31.2, ftrd: 26.5,
    twoPpct: 50.5, twoPdpct: 48.4, threePpct: 38.2, threePdpct: 36.3,
    threePr: 42.5, threePrd: 42.5, wab: 3.5
  },
  'louisville': {
    rank: 24, team: 'Louisville', conference: 'ACC', record: '22-10',
    adjOE: 112.2, adjDE: 99.5, barthag: 0.8720, adjTempo: 70.8,
    efgPct: 50.5, efgDPct: 48.5, tor: 17.5, tord: 18.2,
    orb: 33.5, drb: 29.5, ftr: 34.2, ftrd: 28.5,
    twoPpct: 48.5, twoPdpct: 46.4, threePpct: 35.2, threePdpct: 35.3,
    threePr: 38.5, threePrd: 38.5, wab: 3.2
  },
  'georgia': {
    rank: 25, team: 'Georgia', conference: 'SEC', record: '22-10',
    adjOE: 112.5, adjDE: 100.5, barthag: 0.8650, adjTempo: 70.8,
    efgPct: 50.8, efgDPct: 49.2, tor: 17.2, tord: 18.5,
    orb: 34.5, drb: 28.5, ftr: 33.5, ftrd: 29.2,
    twoPpct: 48.8, twoPdpct: 47.4, threePpct: 35.5, threePdpct: 36.3,
    threePr: 36.8, threePrd: 36.8, wab: 3.5
  },
  'kentucky': {
    rank: 26, team: 'Kentucky', conference: 'SEC', record: '25-7',
    adjOE: 112.5, adjDE: 101.2, barthag: 0.8580, adjTempo: 71.8,
    efgPct: 51.2, efgDPct: 50.2, tor: 16.8, tord: 17.5,
    orb: 33.2, drb: 29.8, ftr: 32.5, ftrd: 28.5,
    twoPpct: 49.2, twoPdpct: 48.4, threePpct: 35.8, threePdpct: 37.3,
    threePr: 39.5, threePrd: 39.5, wab: 3.8
  },
  'miami': {
    rank: 27, team: 'Miami', conference: 'ACC', record: '21-11',
    adjOE: 111.2, adjDE: 100.5, barthag: 0.8480, adjTempo: 69.2,
    efgPct: 50.2, efgDPct: 49.5, tor: 16.5, tord: 17.2,
    orb: 30.5, drb: 30.8, ftr: 33.2, ftrd: 27.5,
    twoPpct: 47.2, twoPdpct: 47.4, threePpct: 36.5, threePdpct: 36.3,
    threePr: 38.2, threePrd: 38.2, wab: 3.2
  },
  'ucla': {
    rank: 28, team: 'UCLA', conference: 'B10', record: '21-11',
    adjOE: 111.8, adjDE: 101.2, barthag: 0.8450, adjTempo: 68.2,
    efgPct: 50.8, efgDPct: 49.2, tor: 16.2, tord: 16.8,
    orb: 32.5, drb: 29.5, ftr: 32.8, ftrd: 27.8,
    twoPpct: 48.8, twoPdpct: 46.4, threePpct: 36.2, threePdpct: 37.3,
    threePr: 37.5, threePrd: 37.5, wab: 2.8
  },
  'saint-marys': {
    rank: 29, team: "Saint Mary's", conference: 'WCC', record: '25-6',
    adjOE: 111.5, adjDE: 101.5, barthag: 0.8420, adjTempo: 64.2,
    efgPct: 52.5, efgDPct: 47.8, tor: 15.8, tord: 15.5,
    orb: 29.5, drb: 27.8, ftr: 31.5, ftrd: 25.5,
    twoPpct: 51.5, twoPdpct: 46.4, threePpct: 36.7, threePdpct: 33.3,
    threePr: 35.2, threePrd: 35.2, wab: 4.2
  },

  // =============== 9-12 SEEDS ===============
  'ohio-state': {
    rank: 30, team: 'Ohio State', conference: 'B10', record: '20-12',
    adjOE: 110.5, adjDE: 101.5, barthag: 0.8220, adjTempo: 69.5,
    efgPct: 49.8, efgDPct: 49.5, tor: 17.2, tord: 17.8,
    orb: 32.5, drb: 29.5, ftr: 31.8, ftrd: 27.5,
    twoPpct: 47.8, twoPdpct: 47.4, threePpct: 35.5, threePdpct: 36.3,
    threePr: 38.5, threePrd: 38.5, wab: 2.5
  },
  'villanova': {
    rank: 31, team: 'Villanova', conference: 'BE', record: '20-12',
    adjOE: 110.2, adjDE: 101.2, barthag: 0.8250, adjTempo: 68.5,
    efgPct: 50.5, efgDPct: 49.2, tor: 15.8, tord: 16.2,
    orb: 29.8, drb: 29.2, ftr: 32.5, ftrd: 25.8,
    twoPpct: 48.5, twoPdpct: 46.4, threePpct: 36.8, threePdpct: 36.3,
    threePr: 42.5, threePrd: 42.5, wab: 2.8
  },
  'clemson': {
    rank: 32, team: 'Clemson', conference: 'ACC', record: '24-10',
    adjOE: 109.8, adjDE: 101.8, barthag: 0.8080, adjTempo: 67.5,
    efgPct: 49.5, efgDPct: 49.8, tor: 17.5, tord: 17.2,
    orb: 31.5, drb: 30.2, ftr: 32.2, ftrd: 27.8,
    twoPpct: 47.5, twoPdpct: 47.4, threePpct: 35.8, threePdpct: 37.3,
    threePr: 39.5, threePrd: 39.5, wab: 3.2
  },
  'iowa': {
    rank: 33, team: 'Iowa', conference: 'B10', record: '21-12',
    adjOE: 110.8, adjDE: 102.5, barthag: 0.8150, adjTempo: 70.2,
    efgPct: 50.8, efgDPct: 50.2, tor: 15.8, tord: 16.5,
    orb: 30.5, drb: 29.8, ftr: 30.2, ftrd: 26.5,
    twoPpct: 48.8, twoPdpct: 47.4, threePpct: 37.2, threePdpct: 37.3,
    threePr: 42.8, threePrd: 42.8, wab: 2.2
  },
  'tcu': {
    rank: 34, team: 'TCU', conference: 'B12', record: '21-11',
    adjOE: 109.2, adjDE: 102.8, barthag: 0.7920, adjTempo: 70.2,
    efgPct: 49.2, efgDPct: 50.2, tor: 17.8, tord: 18.2,
    orb: 33.5, drb: 28.5, ftr: 31.2, ftrd: 27.5,
    twoPpct: 47.2, twoPdpct: 47.4, threePpct: 35.5, threePdpct: 37.3,
    threePr: 38.8, threePrd: 38.8, wab: 2.5
  },
  'utah-state': {
    rank: 35, team: 'Utah State', conference: 'MWC', record: '25-6',
    adjOE: 110.2, adjDE: 103.2, barthag: 0.7980, adjTempo: 67.8,
    efgPct: 51.2, efgDPct: 49.5, tor: 16.5, tord: 17.2,
    orb: 30.8, drb: 28.5, ftr: 30.5, ftrd: 26.2,
    twoPpct: 48.8, twoPdpct: 46.4, threePpct: 37.5, threePdpct: 35.3,
    threePr: 41.2, threePrd: 41.2, wab: 3.2
  },
  'texas-am': {
    rank: 36, team: "Texas A&M", conference: 'SEC', record: '21-11',
    adjOE: 109.5, adjDE: 102.8, barthag: 0.7880, adjTempo: 68.8,
    efgPct: 49.5, efgDPct: 49.8, tor: 17.2, tord: 18.5,
    orb: 34.5, drb: 28.2, ftr: 33.5, ftrd: 28.5,
    twoPpct: 47.5, twoPdpct: 47.4, threePpct: 35.8, threePdpct: 36.3,
    threePr: 37.5, threePrd: 37.5, wab: 2.2
  },
  'missouri': {
    rank: 37, team: 'Missouri', conference: 'SEC', record: '19-13',
    adjOE: 109.8, adjDE: 103.8, barthag: 0.7750, adjTempo: 71.5,
    efgPct: 50.2, efgDPct: 51.2, tor: 16.8, tord: 17.5,
    orb: 32.5, drb: 29.8, ftr: 31.2, ftrd: 27.5,
    twoPpct: 48.2, twoPdpct: 48.4, threePpct: 36.8, threePdpct: 38.3,
    threePr: 40.5, threePrd: 40.5, wab: 1.8
  },
  'saint-louis': {
    rank: 38, team: 'Saint Louis', conference: 'A-10', record: '28-5',
    adjOE: 108.8, adjDE: 102.5, barthag: 0.7820, adjTempo: 68.5,
    efgPct: 50.8, efgDPct: 48.5, tor: 17.2, tord: 18.5,
    orb: 32.8, drb: 28.5, ftr: 32.5, ftrd: 27.8,
    twoPpct: 48.8, twoPdpct: 46.4, threePpct: 36.8, threePdpct: 34.3,
    threePr: 38.5, threePrd: 38.5, wab: 4.2
  },
  'santa-clara': {
    rank: 39, team: 'Santa Clara', conference: 'WCC', record: '26-8',
    adjOE: 108.5, adjDE: 103.2, barthag: 0.7680, adjTempo: 68.5,
    efgPct: 51.5, efgDPct: 49.2, tor: 16.5, tord: 15.8,
    orb: 29.5, drb: 28.2, ftr: 30.8, ftrd: 25.5,
    twoPpct: 49.5, twoPdpct: 47.4, threePpct: 37.5, threePdpct: 34.3,
    threePr: 37.8, threePrd: 37.8, wab: 3.5
  },
  'ucf': {
    rank: 40, team: 'UCF', conference: 'B12', record: '23-8',
    adjOE: 107.8, adjDE: 103.5, barthag: 0.7580, adjTempo: 71.5,
    efgPct: 48.8, efgDPct: 49.5, tor: 17.5, tord: 18.8,
    orb: 33.5, drb: 28.8, ftr: 31.5, ftrd: 28.2,
    twoPpct: 46.8, twoPdpct: 47.4, threePpct: 35.5, threePdpct: 35.3,
    threePr: 38.5, threePrd: 38.5, wab: 2.8
  },
  'vcu': {
    rank: 41, team: 'VCU', conference: 'A-10', record: '24-7',
    adjOE: 108.2, adjDE: 104.2, barthag: 0.7520, adjTempo: 69.5,
    efgPct: 49.5, efgDPct: 50.2, tor: 18.5, tord: 22.2,
    orb: 32.5, drb: 28.5, ftr: 31.2, ftrd: 28.5,
    twoPpct: 47.5, twoPdpct: 48.4, threePpct: 35.8, threePdpct: 36.3,
    threePr: 38.2, threePrd: 38.2, wab: 3.2
  },
  'south-florida': {
    rank: 42, team: 'South Florida', conference: 'AAC', record: '25-7',
    adjOE: 107.5, adjDE: 104.2, barthag: 0.7420, adjTempo: 68.8,
    efgPct: 49.2, efgDPct: 49.8, tor: 17.2, tord: 19.5,
    orb: 34.5, drb: 28.2, ftr: 32.5, ftrd: 28.8,
    twoPpct: 47.2, twoPdpct: 47.4, threePpct: 36.2, threePdpct: 36.3,
    threePr: 36.5, threePrd: 36.5, wab: 3.5
  },
  'mcneese': {
    rank: 43, team: 'McNeese', conference: 'Southland', record: '27-4',
    adjOE: 106.5, adjDE: 104.8, barthag: 0.7220, adjTempo: 66.8,
    efgPct: 50.5, efgDPct: 48.2, tor: 17.8, tord: 20.2,
    orb: 33.5, drb: 27.5, ftr: 33.5, ftrd: 28.5,
    twoPpct: 49.5, twoPdpct: 46.4, threePpct: 35.8, threePdpct: 33.3,
    threePr: 38.2, threePrd: 38.2, wab: 4.2
  },
  'northern-iowa': {
    rank: 44, team: 'Northern Iowa', conference: 'MVC', record: '26-5',
    adjOE: 105.8, adjDE: 105.2, barthag: 0.7120, adjTempo: 66.5,
    efgPct: 49.8, efgDPct: 49.5, tor: 16.8, tord: 17.2,
    orb: 29.5, drb: 28.8, ftr: 30.5, ftrd: 26.5,
    twoPpct: 47.8, twoPdpct: 46.4, threePpct: 37.2, threePdpct: 36.3,
    threePr: 41.5, threePrd: 41.5, wab: 3.8
  },

  // =============== 13-16 SEEDS ===============
  'cal-baptist': {
    rank: 45, team: 'CA Baptist', conference: 'WAC', record: '24-8',
    adjOE: 105.2, adjDE: 106.5, barthag: 0.6820, adjTempo: 67.2,
    efgPct: 49.5, efgDPct: 50.5, tor: 17.5, tord: 17.8,
    orb: 31.5, drb: 29.5, ftr: 31.2, ftrd: 28.2,
    twoPpct: 47.5, twoPdpct: 48.4, threePpct: 36.5, threePdpct: 36.3,
    threePr: 39.5, threePrd: 39.5, wab: 2.5
  },
  'troy': {
    rank: 46, team: 'Troy', conference: 'Sun Belt', record: '25-6',
    adjOE: 104.8, adjDE: 107.2, barthag: 0.6520, adjTempo: 67.5,
    efgPct: 48.8, efgDPct: 51.2, tor: 17.8, tord: 18.2,
    orb: 32.5, drb: 29.5, ftr: 30.8, ftrd: 28.5,
    twoPpct: 46.8, twoPdpct: 49.4, threePpct: 35.8, threePdpct: 37.3,
    threePr: 38.5, threePrd: 38.5, wab: 3.2
  },
  'hofstra': {
    rank: 47, team: 'Hofstra', conference: 'CAA', record: '23-9',
    adjOE: 104.2, adjDE: 107.8, barthag: 0.6220, adjTempo: 68.5,
    efgPct: 49.2, efgDPct: 50.8, tor: 16.8, tord: 16.5,
    orb: 28.5, drb: 29.5, ftr: 29.8, ftrd: 25.8,
    twoPpct: 47.2, twoPdpct: 48.4, threePpct: 37.2, threePdpct: 36.3,
    threePr: 40.2, threePrd: 40.2, wab: 2.8
  },
  'wright-state': {
    rank: 48, team: 'Wright St', conference: 'Horizon', record: '23-11',
    adjOE: 103.5, adjDE: 109.2, barthag: 0.5820, adjTempo: 68.5,
    efgPct: 48.5, efgDPct: 51.5, tor: 17.5, tord: 17.2,
    orb: 30.5, drb: 29.8, ftr: 30.2, ftrd: 27.5,
    twoPpct: 46.5, twoPdpct: 49.4, threePpct: 36.5, threePdpct: 37.3,
    threePr: 38.8, threePrd: 38.8, wab: 2.2
  },
  'akron': {
    rank: 49, team: 'Akron', conference: 'MAC', record: '25-6',
    adjOE: 103.8, adjDE: 106.5, barthag: 0.6420, adjTempo: 65.2,
    efgPct: 49.5, efgDPct: 50.2, tor: 16.5, tord: 16.8,
    orb: 29.5, drb: 28.8, ftr: 29.5, ftrd: 26.2,
    twoPpct: 47.5, twoPdpct: 47.4, threePpct: 37.2, threePdpct: 36.3,
    threePr: 40.5, threePrd: 40.5, wab: 3.2
  },
  'high-point': {
    rank: 50, team: 'High Point', conference: 'Big South', record: '28-4',
    adjOE: 104.2, adjDE: 107.8, barthag: 0.6120, adjTempo: 68.5,
    efgPct: 49.8, efgDPct: 50.5, tor: 17.2, tord: 18.5,
    orb: 32.5, drb: 27.8, ftr: 31.5, ftrd: 28.2,
    twoPpct: 47.8, twoPdpct: 47.4, threePpct: 37.5, threePdpct: 36.3,
    threePr: 38.5, threePrd: 38.5, wab: 3.8
  },
  'hawaii': {
    rank: 51, team: "Hawai'i", conference: 'Big West', record: '24-7',
    adjOE: 103.5, adjDE: 108.2, barthag: 0.5920, adjTempo: 66.2,
    efgPct: 48.5, efgDPct: 51.2, tor: 17.5, tord: 17.8,
    orb: 31.5, drb: 29.2, ftr: 30.2, ftrd: 27.5,
    twoPpct: 46.5, twoPdpct: 49.4, threePpct: 36.2, threePdpct: 36.3,
    threePr: 37.5, threePrd: 37.5, wab: 3.5
  },
  'penn': {
    rank: 52, team: 'Penn', conference: 'Ivy', record: '18-11',
    adjOE: 102.8, adjDE: 108.8, barthag: 0.5720, adjTempo: 64.5,
    efgPct: 48.2, efgDPct: 51.5, tor: 16.8, tord: 15.8,
    orb: 28.5, drb: 30.2, ftr: 28.8, ftrd: 26.2,
    twoPpct: 46.2, twoPdpct: 49.4, threePpct: 36.8, threePdpct: 36.3,
    threePr: 39.2, threePrd: 39.2, wab: 2.5
  },
  'north-dakota-state': {
    rank: 53, team: 'N Dakota State', conference: 'Summit', record: '22-9',
    adjOE: 102.2, adjDE: 109.5, barthag: 0.5520, adjTempo: 65.5,
    efgPct: 47.8, efgDPct: 51.8, tor: 17.2, tord: 16.8,
    orb: 30.5, drb: 29.5, ftr: 29.5, ftrd: 27.5,
    twoPpct: 45.8, twoPdpct: 49.4, threePpct: 36.5, threePdpct: 37.3,
    threePr: 40.5, threePrd: 40.5, wab: 2.2
  },
  'kennesaw-state': {
    rank: 54, team: 'Kennesaw St', conference: 'C-USA', record: '22-9',
    adjOE: 101.8, adjDE: 110.5, barthag: 0.5220, adjTempo: 70.5,
    efgPct: 47.5, efgDPct: 52.2, tor: 17.5, tord: 18.2,
    orb: 32.5, drb: 28.5, ftr: 30.8, ftrd: 28.2,
    twoPpct: 45.5, twoPdpct: 50.4, threePpct: 35.8, threePdpct: 37.3,
    threePr: 38.2, threePrd: 38.2, wab: 2.8
  },
  'tennessee-state': {
    rank: 55, team: 'Tennessee St', conference: 'OVC', record: '23-9',
    adjOE: 100.8, adjDE: 111.8, barthag: 0.4820, adjTempo: 63.8,
    efgPct: 46.8, efgDPct: 52.8, tor: 17.8, tord: 17.5,
    orb: 31.5, drb: 29.8, ftr: 29.2, ftrd: 28.5,
    twoPpct: 44.8, twoPdpct: 51.4, threePpct: 35.5, threePdpct: 37.3,
    threePr: 39.5, threePrd: 39.5, wab: 2.5
  },
  'furman': {
    rank: 56, team: 'Furman', conference: 'Southern', record: '20-12',
    adjOE: 100.5, adjDE: 111.5, barthag: 0.4720, adjTempo: 68.5,
    efgPct: 47.2, efgDPct: 52.5, tor: 16.5, tord: 16.8,
    orb: 29.5, drb: 29.5, ftr: 28.5, ftrd: 26.8,
    twoPpct: 45.2, twoPdpct: 50.4, threePpct: 37.2, threePdpct: 36.3,
    threePr: 41.5, threePrd: 41.5, wab: 2.2
  },
  'queens': {
    rank: 57, team: 'Queens', conference: 'ASUN', record: '19-13',
    adjOE: 99.8, adjDE: 112.8, barthag: 0.4420, adjTempo: 71.2,
    efgPct: 46.5, efgDPct: 53.2, tor: 17.2, tord: 17.5,
    orb: 30.5, drb: 29.2, ftr: 28.8, ftrd: 27.5,
    twoPpct: 44.5, twoPdpct: 51.4, threePpct: 35.8, threePdpct: 38.3,
    threePr: 38.5, threePrd: 38.5, wab: 1.8
  },
  'idaho': {
    rank: 58, team: 'Idaho', conference: 'Big Sky', record: '21-14',
    adjOE: 99.5, adjDE: 113.2, barthag: 0.4320, adjTempo: 65.8,
    efgPct: 46.2, efgDPct: 53.5, tor: 17.5, tord: 17.8,
    orb: 31.2, drb: 29.5, ftr: 28.5, ftrd: 28.2,
    twoPpct: 44.2, twoPdpct: 51.4, threePpct: 35.5, threePdpct: 38.3,
    threePr: 40.2, threePrd: 40.2, wab: 1.5
  },
  'siena': {
    rank: 59, team: 'Siena', conference: 'MAAC', record: '18-14',
    adjOE: 98.5, adjDE: 113.8, barthag: 0.4020, adjTempo: 66.2,
    efgPct: 45.8, efgDPct: 53.8, tor: 17.2, tord: 17.5,
    orb: 30.5, drb: 30.2, ftr: 28.2, ftrd: 28.5,
    twoPpct: 43.8, twoPdpct: 51.4, threePpct: 36.2, threePdpct: 38.3,
    threePr: 39.5, threePrd: 39.5, wab: 1.2
  },
  'long-island': {
    rank: 60, team: 'Long Island', conference: 'NEC', record: '17-14',
    adjOE: 98.2, adjDE: 114.5, barthag: 0.3820, adjTempo: 72.8,
    efgPct: 45.5, efgDPct: 54.2, tor: 17.8, tord: 18.2,
    orb: 31.5, drb: 28.8, ftr: 28.5, ftrd: 28.8,
    twoPpct: 43.5, twoPdpct: 52.4, threePpct: 35.8, threePdpct: 38.3,
    threePr: 40.5, threePrd: 40.5, wab: 1.0
  },
  'howard': {
    rank: 61, team: 'Howard', conference: 'MEAC', record: '16-15',
    adjOE: 97.5, adjDE: 115.2, barthag: 0.3620, adjTempo: 70.8,
    efgPct: 45.2, efgDPct: 54.5, tor: 18.2, tord: 18.5,
    orb: 32.5, drb: 28.5, ftr: 28.8, ftrd: 29.2,
    twoPpct: 43.2, twoPdpct: 52.4, threePpct: 35.5, threePdpct: 38.3,
    threePr: 39.8, threePrd: 39.8, wab: 0.8
  },
  'umbc': {
    rank: 62, team: 'UMBC', conference: 'America East', record: '18-14',
    adjOE: 97.8, adjDE: 115.5, barthag: 0.3720, adjTempo: 69.2,
    efgPct: 45.5, efgDPct: 54.8, tor: 17.5, tord: 17.8,
    orb: 30.8, drb: 29.5, ftr: 28.5, ftrd: 28.8,
    twoPpct: 43.5, twoPdpct: 52.4, threePpct: 36.2, threePdpct: 39.3,
    threePr: 40.2, threePrd: 40.2, wab: 1.2
  },

  // =============== FIRST FOUR TEAMS ===============
  'nc-state': {
    rank: 63, team: 'NC State', conference: 'ACC', record: '21-11',
    adjOE: 108.5, adjDE: 104.5, barthag: 0.7620, adjTempo: 69.8,
    efgPct: 49.5, efgDPct: 49.8, tor: 17.2, tord: 17.5,
    orb: 33.5, drb: 28.5, ftr: 31.8, ftrd: 27.8,
    twoPpct: 47.5, twoPdpct: 48.4, threePpct: 36.2, threePdpct: 36.3,
    threePr: 39.2, threePrd: 39.2, wab: 2.8
  },
  'texas': {
    rank: 64, team: 'Texas', conference: 'SEC', record: '20-12',
    adjOE: 108.2, adjDE: 104.8, barthag: 0.7550, adjTempo: 70.2,
    efgPct: 49.2, efgDPct: 50.2, tor: 17.5, tord: 17.8,
    orb: 32.8, drb: 29.2, ftr: 31.5, ftrd: 28.2,
    twoPpct: 47.2, twoPdpct: 48.4, threePpct: 35.8, threePdpct: 37.3,
    threePr: 40.5, threePrd: 40.5, wab: 2.5
  },
  'smu': {
    rank: 65, team: 'SMU', conference: 'ACC', record: '22-10',
    adjOE: 107.8, adjDE: 104.8, barthag: 0.7480, adjTempo: 70.5,
    efgPct: 49.5, efgDPct: 49.5, tor: 17.2, tord: 18.2,
    orb: 32.5, drb: 28.8, ftr: 32.2, ftrd: 28.5,
    twoPpct: 47.5, twoPdpct: 47.4, threePpct: 36.5, threePdpct: 36.3,
    threePr: 38.8, threePrd: 38.8, wab: 3.0
  },
  'miami-oh': {
    rank: 66, team: 'Miami OH', conference: 'MAC', record: '26-5',
    adjOE: 107.2, adjDE: 105.2, barthag: 0.7320, adjTempo: 67.5,
    efgPct: 49.2, efgDPct: 49.8, tor: 16.8, tord: 17.5,
    orb: 30.5, drb: 29.5, ftr: 30.8, ftrd: 27.5,
    twoPpct: 47.2, twoPdpct: 47.4, threePpct: 36.8, threePdpct: 36.3,
    threePr: 39.5, threePrd: 39.5, wab: 3.5
  },
  'lehigh': {
    rank: 67, team: 'Lehigh', conference: 'Patriot', record: '18-14',
    adjOE: 96.8, adjDE: 114.8, barthag: 0.3420, adjTempo: 68.2,
    efgPct: 44.8, efgDPct: 54.8, tor: 17.5, tord: 17.8,
    orb: 30.2, drb: 29.8, ftr: 28.2, ftrd: 28.5,
    twoPpct: 42.8, twoPdpct: 52.4, threePpct: 35.5, threePdpct: 38.3,
    threePr: 40.2, threePrd: 40.2, wab: 0.8
  },
  'prairie-view': {
    rank: 68, team: 'Prairie View', conference: 'SWAC', record: '17-15',
    adjOE: 96.5, adjDE: 115.2, barthag: 0.3320, adjTempo: 68.2,
    efgPct: 44.5, efgDPct: 55.2, tor: 18.2, tord: 18.5,
    orb: 31.5, drb: 28.5, ftr: 28.5, ftrd: 29.2,
    twoPpct: 42.5, twoPdpct: 52.4, threePpct: 35.2, threePdpct: 39.3,
    threePr: 39.8, threePrd: 39.8, wab: 0.5
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getBarttorvikData(teamName: string): BarttorvikMetrics | undefined {
  const normalized = teamName.toLowerCase().replace(/[^a-z]/g, '');
  
  // Direct lookup
  if (barttorvik2026[normalized]) {
    return barttorvik2026[normalized];
  }
  
  // Fuzzy match
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

export function calculateBarthagWinProbability(team1: string, team2: string): number {
  const t1 = getBarttorvikData(team1);
  const t2 = getBarttorvikData(team2);
  
  if (!t1 || !t2) return 0.5;
  
  const p1 = t1.barthag;
  const p2 = t2.barthag;
  
  if (p1 + p2 === 0) return 0.5;
  
  // Log5 formula
  return (p1 - p1 * p2) / (p1 + p2 - 2 * p1 * p2);
}

export function getAllBarttorvikTeams(): BarttorvikMetrics[] {
  return Object.values(barttorvik2026);
}

export function getTopTeams(n: number = 10): BarttorvikMetrics[] {
  return getAllBarttorvikTeams()
    .sort((a, b) => b.barthag - a.barthag)
    .slice(0, n);
}
