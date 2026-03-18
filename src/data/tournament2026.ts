// ============================================================================
// 2026 NCAA TOURNAMENT FIELD - CORRECTED FROM ESPN BRACKET
// Source: https://www.espn.com/mens-college-basketball/bracket (March 18, 2026)
// ============================================================================

export interface TournamentTeam2026 {
  id: string;
  name: string;
  seed: number;
  region: 'EAST' | 'SOUTH' | 'MIDWEST' | 'WEST';
  conference: string;
  record: string;
}

// EAST REGION (Brooklyn)
const eastTeams: TournamentTeam2026[] = [
  { id: 'duke', name: 'Duke', seed: 1, region: 'EAST', conference: 'ACC', record: '28-3' },
  { id: 'uconn', name: 'UConn', seed: 2, region: 'EAST', conference: 'Big East', record: '27-5' },
  { id: 'michigan-state', name: 'Michigan State', seed: 3, region: 'EAST', conference: 'Big Ten', record: '24-8' },
  { id: 'kansas', name: 'Kansas', seed: 4, region: 'EAST', conference: 'Big 12', record: '23-9' },
  { id: 'st-johns', name: "St. John's", seed: 5, region: 'EAST', conference: 'Big East', record: '25-6' },
  { id: 'louisville', name: 'Louisville', seed: 6, region: 'EAST', conference: 'ACC', record: '22-10' },
  { id: 'ucla', name: 'UCLA', seed: 7, region: 'EAST', conference: 'Big Ten', record: '21-11' },
  { id: 'ohio-state', name: 'Ohio State', seed: 8, region: 'EAST', conference: 'Big Ten', record: '20-12' },
  { id: 'tcu', name: 'TCU', seed: 9, region: 'EAST', conference: 'Big 12', record: '21-11' },
  { id: 'ucf', name: 'UCF', seed: 10, region: 'EAST', conference: 'Big 12', record: '23-8' },
  { id: 'south-florida', name: 'South Florida', seed: 11, region: 'EAST', conference: 'AAC', record: '25-7' },
  { id: 'northern-iowa', name: 'Northern Iowa', seed: 12, region: 'EAST', conference: 'MVC', record: '26-5' },
  { id: 'cal-baptist', name: 'CA Baptist', seed: 13, region: 'EAST', conference: 'WAC', record: '24-8' },
  { id: 'north-dakota-state', name: 'N Dakota State', seed: 14, region: 'EAST', conference: 'Summit', record: '22-9' },
  { id: 'furman', name: 'Furman', seed: 15, region: 'EAST', conference: 'Southern', record: '20-12' },
  { id: 'siena', name: 'Siena', seed: 16, region: 'EAST', conference: 'MAAC', record: '18-14' },
];

// SOUTH REGION (Houston)
const southTeams: TournamentTeam2026[] = [
  { id: 'florida', name: 'Florida', seed: 1, region: 'SOUTH', conference: 'SEC', record: '29-4' },
  { id: 'houston', name: 'Houston', seed: 2, region: 'SOUTH', conference: 'Big 12', record: '28-5' },
  { id: 'illinois', name: 'Illinois', seed: 3, region: 'SOUTH', conference: 'Big Ten', record: '24-8' },
  { id: 'nebraska', name: 'Nebraska', seed: 4, region: 'SOUTH', conference: 'Big Ten', record: '26-6' },
  { id: 'vanderbilt', name: 'Vanderbilt', seed: 5, region: 'SOUTH', conference: 'SEC', record: '23-9' },
  { id: 'north-carolina', name: 'North Carolina', seed: 6, region: 'SOUTH', conference: 'ACC', record: '21-11' },
  { id: 'saint-marys', name: "Saint Mary's", seed: 7, region: 'SOUTH', conference: 'WCC', record: '25-6' },
  { id: 'clemson', name: 'Clemson', seed: 8, region: 'SOUTH', conference: 'ACC', record: '24-10' },
  { id: 'iowa', name: 'Iowa', seed: 9, region: 'SOUTH', conference: 'Big Ten', record: '21-12' },
  { id: 'texas-am', name: "Texas A&M", seed: 10, region: 'SOUTH', conference: 'SEC', record: '21-11' },
  { id: 'vcu', name: 'VCU', seed: 11, region: 'SOUTH', conference: 'A-10', record: '24-7' },
  { id: 'mcneese', name: 'McNeese', seed: 12, region: 'SOUTH', conference: 'Southland', record: '27-4' },
  { id: 'troy', name: 'Troy', seed: 13, region: 'SOUTH', conference: 'Sun Belt', record: '25-6' },
  { id: 'penn', name: 'Penn', seed: 14, region: 'SOUTH', conference: 'Ivy', record: '18-11' },
  { id: 'idaho', name: 'Idaho', seed: 15, region: 'SOUTH', conference: 'Big Sky', record: '21-14' },
  // 16-seed First Four winner
];

// MIDWEST REGION (Chicago)
const midwestTeams: TournamentTeam2026[] = [
  { id: 'michigan', name: 'Michigan', seed: 1, region: 'MIDWEST', conference: 'Big Ten', record: '30-4' },
  { id: 'iowa-state', name: 'Iowa State', seed: 2, region: 'MIDWEST', conference: 'Big 12', record: '22-10' },
  { id: 'virginia', name: 'Virginia', seed: 3, region: 'MIDWEST', conference: 'ACC', record: '25-7' },
  { id: 'alabama', name: 'Alabama', seed: 4, region: 'MIDWEST', conference: 'SEC', record: '22-10' },
  { id: 'texas-tech', name: 'Texas Tech', seed: 5, region: 'MIDWEST', conference: 'Big 12', record: '24-8' },
  { id: 'tennessee', name: 'Tennessee', seed: 6, region: 'MIDWEST', conference: 'SEC', record: '24-8' },
  { id: 'kentucky', name: 'Kentucky', seed: 7, region: 'MIDWEST', conference: 'SEC', record: '25-7' },
  { id: 'georgia', name: 'Georgia', seed: 8, region: 'MIDWEST', conference: 'SEC', record: '22-10' },
  { id: 'saint-louis', name: 'Saint Louis', seed: 9, region: 'MIDWEST', conference: 'A-10', record: '28-5' },
  { id: 'santa-clara', name: 'Santa Clara', seed: 10, region: 'MIDWEST', conference: 'WCC', record: '26-8' },
  { id: 'smu', name: 'SMU', seed: 11, region: 'MIDWEST', conference: 'ACC', record: '22-10' },
  { id: 'miami-oh', name: 'Miami OH', seed: 11, region: 'MIDWEST', conference: 'MAC', record: '26-5' },
  { id: 'akron', name: 'Akron', seed: 12, region: 'MIDWEST', conference: 'MAC', record: '25-6' },
  { id: 'hofstra', name: 'Hofstra', seed: 13, region: 'MIDWEST', conference: 'CAA', record: '23-9' },
  { id: 'wright-state', name: 'Wright St', seed: 14, region: 'MIDWEST', conference: 'Horizon', record: '23-11' },
  { id: 'tennessee-state', name: 'Tennessee St', seed: 15, region: 'MIDWEST', conference: 'OVC', record: '23-9' },
  { id: 'howard', name: 'Howard', seed: 16, region: 'MIDWEST', conference: 'MEAC', record: '16-15' },
  { id: 'umbc', name: 'UMBC', seed: 16, region: 'MIDWEST', conference: 'America East', record: '18-14' },
];

// WEST REGION (San Jose)
const westTeams: TournamentTeam2026[] = [
  { id: 'arizona', name: 'Arizona', seed: 1, region: 'WEST', conference: 'Big 12', record: '27-4' },
  { id: 'purdue', name: 'Purdue', seed: 2, region: 'WEST', conference: 'Big Ten', record: '26-6' },
  { id: 'gonzaga', name: 'Gonzaga', seed: 3, region: 'WEST', conference: 'WCC', record: '25-7' },
  { id: 'arkansas', name: 'Arkansas', seed: 4, region: 'WEST', conference: 'SEC', record: '23-9' },
  { id: 'wisconsin', name: 'Wisconsin', seed: 5, region: 'WEST', conference: 'Big Ten', record: '24-8' },
  { id: 'byu', name: 'BYU', seed: 6, region: 'WEST', conference: 'Big 12', record: '22-10' },
  { id: 'miami', name: 'Miami', seed: 7, region: 'WEST', conference: 'ACC', record: '21-11' },
  { id: 'villanova', name: 'Villanova', seed: 8, region: 'WEST', conference: 'Big East', record: '20-12' },
  { id: 'utah-state', name: 'Utah State', seed: 9, region: 'WEST', conference: 'MWC', record: '25-6' },
  { id: 'missouri', name: 'Missouri', seed: 10, region: 'WEST', conference: 'SEC', record: '19-13' },
  { id: 'nc-state', name: 'NC State', seed: 11, region: 'WEST', conference: 'ACC', record: '21-11' },
  { id: 'texas', name: 'Texas', seed: 11, region: 'WEST', conference: 'SEC', record: '20-12' },
  { id: 'high-point', name: 'High Point', seed: 12, region: 'WEST', conference: 'Big South', record: '28-4' },
  { id: 'hawaii', name: "Hawai'i", seed: 13, region: 'WEST', conference: 'Big West', record: '24-7' },
  { id: 'kennesaw-state', name: 'Kennesaw St', seed: 14, region: 'WEST', conference: 'C-USA', record: '22-9' },
  { id: 'queens', name: 'Queens', seed: 15, region: 'WEST', conference: 'ASUN', record: '19-13' },
  { id: 'long-island', name: 'Long Island', seed: 16, region: 'WEST', conference: 'NEC', record: '17-14' },
];

// First Four teams (play-in games)
export const firstFourGames = [
  { region: 'WEST', seed: 11, team1: 'NC State', team2: 'Texas', winner: null },
  { region: 'MIDWEST', seed: 11, team1: 'SMU', team2: 'Miami OH', winner: null },
  { region: 'MIDWEST', seed: 16, team1: 'Howard', team2: 'UMBC', winner: null },
  { region: 'SOUTH', seed: 16, team1: 'Lehigh', team2: 'Prairie View', winner: null },
];

// All teams
export const tournamentTeams2026: TournamentTeam2026[] = [
  ...eastTeams,
  ...southTeams,
  ...midwestTeams,
  ...westTeams,
];

// First round matchups from ESPN bracket
export const firstRoundMatchups2026 = {
  EAST: [
    ['duke', 'siena'],
    ['ohio-state', 'tcu'],
    ['st-johns', 'northern-iowa'],
    ['kansas', 'cal-baptist'],
    ['louisville', 'south-florida'],
    ['michigan-state', 'north-dakota-state'],
    ['ucla', 'ucf'],
    ['uconn', 'furman'],
  ],
  SOUTH: [
    ['florida', 'first-four-south-16'],  // Winner of Lehigh/Prairie View
    ['clemson', 'iowa'],
    ['vanderbilt', 'mcneese'],
    ['nebraska', 'troy'],
    ['north-carolina', 'vcu'],
    ['illinois', 'penn'],
    ['saint-marys', 'texas-am'],
    ['houston', 'idaho'],
  ],
  MIDWEST: [
    ['michigan', 'first-four-midwest-16'],  // Winner of Howard/UMBC
    ['georgia', 'saint-louis'],
    ['texas-tech', 'akron'],
    ['alabama', 'hofstra'],
    ['tennessee', 'first-four-midwest-11'],  // Winner of SMU/Miami OH
    ['virginia', 'wright-state'],
    ['kentucky', 'santa-clara'],
    ['iowa-state', 'tennessee-state'],
  ],
  WEST: [
    ['arizona', 'long-island'],
    ['villanova', 'utah-state'],
    ['wisconsin', 'high-point'],
    ['arkansas', 'hawaii'],
    ['byu', 'first-four-west-11'],  // Winner of NC State/Texas
    ['gonzaga', 'kennesaw-state'],
    ['miami', 'missouri'],
    ['purdue', 'queens'],
  ],
};

// Helper functions
export function getTeam2026(teamId: string): TournamentTeam2026 | undefined {
  return tournamentTeams2026.find(t => t.id === teamId.toLowerCase());
}

export function getTeamByName2026(name: string): TournamentTeam2026 | undefined {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
  return tournamentTeams2026.find(t => 
    t.name.toLowerCase().replace(/[^a-z]/g, '') === normalized ||
    t.id === normalized
  );
}

export function getTeamsByRegion(region: 'EAST' | 'SOUTH' | 'MIDWEST' | 'WEST'): TournamentTeam2026[] {
  return tournamentTeams2026.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
}
