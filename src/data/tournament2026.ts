// ============================================================================
// 2026 NCAA TOURNAMENT FIELD - REAL BRACKET DATA
// Source: Selection Sunday March 16, 2026
// ============================================================================

export interface TournamentTeam2026 {
  id: string;
  name: string;
  seed: number;
  region: 'EAST' | 'SOUTH' | 'MIDWEST' | 'WEST';
  conference: string;
}

// East Region (Duke's Region)
const eastTeams: TournamentTeam2026[] = [
  { id: 'duke', name: 'Duke', seed: 1, region: 'EAST', conference: 'ACC' },
  { id: 'uconn', name: 'UConn', seed: 2, region: 'EAST', conference: 'Big East' },
  { id: 'michigan-state', name: 'Michigan State', seed: 3, region: 'EAST', conference: 'Big Ten' },
  { id: 'kansas', name: 'Kansas', seed: 4, region: 'EAST', conference: 'Big 12' },
  { id: 'st-johns', name: 'St. John\'s', seed: 5, region: 'EAST', conference: 'Big East' },
  { id: 'louisville', name: 'Louisville', seed: 6, region: 'EAST', conference: 'ACC' },
  { id: 'ucla', name: 'UCLA', seed: 7, region: 'EAST', conference: 'Big Ten' },
  { id: 'ohio-state', name: 'Ohio State', seed: 8, region: 'EAST', conference: 'Big Ten' },
  { id: 'tcu', name: 'TCU', seed: 9, region: 'EAST', conference: 'Big 12' },
  { id: 'ucf', name: 'UCF', seed: 10, region: 'EAST', conference: 'Big 12' },
  { id: 'south-florida', name: 'South Florida', seed: 11, region: 'EAST', conference: 'AAC' },
  { id: 'northern-iowa', name: 'Northern Iowa', seed: 12, region: 'EAST', conference: 'MVC' },
  { id: 'cal-baptist', name: 'Cal Baptist', seed: 13, region: 'EAST', conference: 'WAC' },
  { id: 'north-dakota-state', name: 'North Dakota State', seed: 14, region: 'EAST', conference: 'Summit' },
  { id: 'furman', name: 'Furman', seed: 15, region: 'EAST', conference: 'Southern' },
  { id: 'siena', name: 'Siena', seed: 16, region: 'EAST', conference: 'MAAC' },
];

// South Region (Florida's Region - Defending Champs)
const southTeams: TournamentTeam2026[] = [
  { id: 'florida', name: 'Florida', seed: 1, region: 'SOUTH', conference: 'SEC' },
  { id: 'houston', name: 'Houston', seed: 2, region: 'SOUTH', conference: 'Big 12' },
  { id: 'illinois', name: 'Illinois', seed: 3, region: 'SOUTH', conference: 'Big Ten' },
  { id: 'nebraska', name: 'Nebraska', seed: 4, region: 'SOUTH', conference: 'Big Ten' },
  { id: 'vanderbilt', name: 'Vanderbilt', seed: 5, region: 'SOUTH', conference: 'SEC' },
  { id: 'north-carolina', name: 'North Carolina', seed: 6, region: 'SOUTH', conference: 'ACC' },
  { id: 'saint-marys', name: 'Saint Mary\'s', seed: 7, region: 'SOUTH', conference: 'WCC' },
  { id: 'clemson', name: 'Clemson', seed: 8, region: 'SOUTH', conference: 'ACC' },
  { id: 'iowa', name: 'Iowa', seed: 9, region: 'SOUTH', conference: 'Big Ten' },
  { id: 'texas-am', name: 'Texas A\'M', seed: 10, region: 'SOUTH', conference: 'SEC' },
  { id: 'vcu', name: 'VCU', seed: 11, region: 'SOUTH', conference: 'A-10' },
  { id: 'mcneese', name: 'McNeese', seed: 12, region: 'SOUTH', conference: 'Southland' },
  { id: 'troy', name: 'Troy', seed: 13, region: 'SOUTH', conference: 'Sun Belt' },
  { id: 'penn', name: 'Penn', seed: 14, region: 'SOUTH', conference: 'Ivy' },
  { id: 'idaho', name: 'Idaho', seed: 15, region: 'SOUTH', conference: 'Big Sky' },
  { id: 'prairie-view', name: 'Prairie View', seed: 16, region: 'SOUTH', conference: 'SWAC' },
  { id: 'lehigh', name: 'Lehigh', seed: 16, region: 'SOUTH', conference: 'Patriot' },
];

// Midwest Region (Michigan's Region)
const midwestTeams: TournamentTeam2026[] = [
  { id: 'michigan', name: 'Michigan', seed: 1, region: 'MIDWEST', conference: 'Big Ten' },
  { id: 'auburn', name: 'Auburn', seed: 2, region: 'MIDWEST', conference: 'SEC' },
  { id: 'kentucky', name: 'Kentucky', seed: 3, region: 'MIDWEST', conference: 'SEC' },
  { id: 'creighton', name: 'Creighton', seed: 4, region: 'MIDWEST', conference: 'Big East' },
  { id: 'texas-tech', name: 'Texas Tech', seed: 5, region: 'MIDWEST', conference: 'Big 12' },
  { id: 'iowa-state', name: 'Iowa State', seed: 6, region: 'MIDWEST', conference: 'Big 12' },
  { id: 'oklahoma', name: 'Oklahoma', seed: 7, region: 'MIDWEST', conference: 'SEC' },
  { id: 'alabama', name: 'Alabama', seed: 8, region: 'MIDWEST', conference: 'SEC' },
  { id: 'memphis', name: 'Memphis', seed: 9, region: 'MIDWEST', conference: 'AAC' },
  { id: 'mississippi-state', name: 'Mississippi State', seed: 10, region: 'MIDWEST', conference: 'SEC' },
  { id: 'miami-oh', name: 'Miami (OH)', seed: 11, region: 'MIDWEST', conference: 'MAC' },
  { id: 'smu', name: 'SMU', seed: 11, region: 'MIDWEST', conference: 'ACC' },
  { id: 'akron', name: 'Akron', seed: 12, region: 'MIDWEST', conference: 'MAC' },
  { id: 'james-madison', name: 'James Madison', seed: 13, region: 'MIDWEST', conference: 'Sun Belt' },
  { id: 'vermont', name: 'Vermont', seed: 14, region: 'MIDWEST', conference: 'America East' },
  { id: 'south-dakota-state', name: 'South Dakota State', seed: 15, region: 'MIDWEST', conference: 'Summit' },
  { id: 'howard', name: 'Howard', seed: 16, region: 'MIDWEST', conference: 'MEAC' },
  { id: 'umbc', name: 'UMBC', seed: 16, region: 'MIDWEST', conference: 'America East' },
];

// West Region (Arizona's Region)
const westTeams: TournamentTeam2026[] = [
  { id: 'arizona', name: 'Arizona', seed: 1, region: 'WEST', conference: 'Big 12' },
  { id: 'purdue', name: 'Purdue', seed: 2, region: 'WEST', conference: 'Big Ten' },
  { id: 'gonzaga', name: 'Gonzaga', seed: 3, region: 'WEST', conference: 'WCC' },
  { id: 'arkansas', name: 'Arkansas', seed: 4, region: 'WEST', conference: 'SEC' },
  { id: 'wisconsin', name: 'Wisconsin', seed: 5, region: 'WEST', conference: 'Big Ten' },
  { id: 'byu', name: 'BYU', seed: 6, region: 'WEST', conference: 'Big 12' },
  { id: 'miami', name: 'Miami', seed: 7, region: 'WEST', conference: 'ACC' },
  { id: 'villanova', name: 'Villanova', seed: 8, region: 'WEST', conference: 'Big East' },
  { id: 'utah-state', name: 'Utah State', seed: 9, region: 'WEST', conference: 'MWC' },
  { id: 'missouri', name: 'Missouri', seed: 10, region: 'WEST', conference: 'SEC' },
  { id: 'texas', name: 'Texas', seed: 11, region: 'WEST', conference: 'SEC' },
  { id: 'nc-state', name: 'NC State', seed: 11, region: 'WEST', conference: 'ACC' },
  { id: 'high-point', name: 'High Point', seed: 12, region: 'WEST', conference: 'Big South' },
  { id: 'hawaii', name: 'Hawaii', seed: 13, region: 'WEST', conference: 'Big West' },
  { id: 'kennesaw-state', name: 'Kennesaw State', seed: 14, region: 'WEST', conference: 'C-USA' },
  { id: 'queens', name: 'Queens', seed: 15, region: 'WEST', conference: 'ASUN' },
  { id: 'long-island', name: 'Long Island', seed: 16, region: 'WEST', conference: 'NEC' },
];

// All 68 teams
export const tournamentTeams2026: TournamentTeam2026[] = [
  ...eastTeams,
  ...southTeams,
  ...midwestTeams,
  ...westTeams,
];

// Helper function to get team by ID
export function getTeam2026(teamId: string): TournamentTeam2026 | undefined {
  return tournamentTeams2026.find(t => t.id === teamId.toLowerCase().replace(/\s+/g, '-'));
}

// Helper function to get team by name
export function getTeamByName2026(name: string): TournamentTeam2026 | undefined {
  const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
  return tournamentTeams2026.find(t => 
    t.name.toLowerCase().replace(/[^a-z]/g, '') === normalized ||
    t.id === normalized
  );
}

// First round matchups by region
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
    ['florida', 'prairie-view'],
    ['clemson', 'iowa'],
    ['vanderbilt', 'mcneese'],
    ['nebraska', 'troy'],
    ['north-carolina', 'vcu'],
    ['illinois', 'penn'],
    ['saint-marys', 'texas-am'],
    ['houston', 'idaho'],
  ],
  MIDWEST: [
    ['michigan', 'howard'],
    ['alabama', 'memphis'],
    ['texas-tech', 'akron'],
    ['creighton', 'james-madison'],
    ['iowa-state', 'miami-oh'],
    ['kentucky', 'vermont'],
    ['oklahoma', 'mississippi-state'],
    ['auburn', 'south-dakota-state'],
  ],
  WEST: [
    ['arizona', 'long-island'],
    ['villanova', 'utah-state'],
    ['wisconsin', 'high-point'],
    ['arkansas', 'hawaii'],
    ['byu', 'texas'],
    ['gonzaga', 'kennesaw-state'],
    ['miami', 'missouri'],
    ['purdue', 'queens'],
  ],
};
