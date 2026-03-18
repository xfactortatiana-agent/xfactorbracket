// ESPN API Integration for Live Tournament Data
// https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball

const ESPN_BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball';

interface ESPNGame {
  id: string;
  date: string;
  name: string;
  shortName: string;
  competitions: ESPNCompetition[];
  status: ESPNStatus;
}

interface ESPNCompetition {
  id: string;
  competitors: ESPNCompetitor[];
  status: ESPNStatus;
  situation?: ESPNSituation;
}

interface ESPNCompetitor {
  id: string;
  team: ESPNTeam;
  score: string;
  seed?: string;
  winner?: boolean;
  homeAway: 'home' | 'away';
}

interface ESPNTeam {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
  displayName: string;
}

interface ESPNStatus {
  type: {
    state: 'pre' | 'in' | 'post';
    completed: boolean;
    description: string;
    detail: string;
    shortDetail: string;
  };
  period: number;
  clock: number;
  displayClock: string;
}

interface ESPNSituation {
  possession: string;
  lastPlay: string;
}

// ============================================================================
// SCOREBOARD API
// ============================================================================

export async function getTournamentScoreboard(date?: string): Promise<ESPNGame[]> {
  // Tournament dates for 2025: March 18 (First Four) through April 7 (Championship)
  const dates = date ? [date] : getTournamentDates(2025);
  
  const allGames: ESPNGame[] = [];
  
  for (const d of dates) {
    try {
      const response = await fetch(`${ESPN_BASE_URL}/scoreboard?dates=${d}`, {
        next: { revalidate: 30 }, // Cache for 30 seconds
      });
      
      if (!response.ok) {
        console.error(`ESPN API error: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      allGames.push(...(data.events || []));
    } catch (error) {
      console.error('Failed to fetch scoreboard:', error);
    }
  }
  
  return allGames;
}

export async function getLiveGames(): Promise<LiveGameUpdate[]> {
  const games = await getTournamentScoreboard();
  
  return games
    .filter(g => g.status.type.state === 'in')
    .map(transformToLiveGame);
}

export async function getCompletedGames(date?: string): Promise<LiveGameUpdate[]> {
  const games = await getTournamentScoreboard(date);
  
  return games
    .filter(g => g.status.type.state === 'post')
    .map(transformToLiveGame);
}

// ============================================================================
// GAME DETAILS API
// ============================================================================

export async function getGameDetails(gameId: string): Promise<LiveGameUpdate | null> {
  try {
    const response = await fetch(`${ESPN_BASE_URL}/summary?event=${gameId}`, {
      next: { revalidate: 10 },
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return transformToLiveGame(data);
  } catch (error) {
    console.error('Failed to fetch game details:', error);
    return null;
  }
}

// ============================================================================
// TEAM INFO API
// ============================================================================

export async function getTeamInfo(teamId: string) {
  try {
    const response = await fetch(`${ESPN_BASE_URL}/teams/${teamId}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.team;
  } catch (error) {
    console.error('Failed to fetch team info:', error);
    return null;
  }
}

export async function getTeamSchedule(teamId: string, season: number = 2025) {
  try {
    const response = await fetch(
      `${ESPN_BASE_URL}/teams/${teamId}/schedule?season=${season}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Failed to fetch team schedule:', error);
    return null;
  }
}

// ============================================================================
// INJURY REPORTS
// ============================================================================

export async function getTeamInjuries(teamId: string): Promise<InjuryReport[]> {
  try {
    // ESPN doesn't have a dedicated injury API, we scrape from team page
    // In production, this would use a dedicated injury service
    const response = await fetch(`${ESPN_BASE_URL}/teams/${teamId}`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    // Extract injury info from roster if available
    const injuries: InjuryReport[] = [];
    const roster = data.team?.athletes || [];
    
    for (const player of roster) {
      if (player.injuries?.[0]) {
        injuries.push({
          playerName: player.fullName,
          playerId: player.id,
          status: player.injuries[0].status,
          details: player.injuries[0].details,
          expectedReturn: player.injuries[0].returnDate,
        });
      }
    }
    
    return injuries;
  } catch (error) {
    console.error('Failed to fetch injuries:', error);
    return [];
  }
}

// ============================================================================
// MOMENTUM CALCULATION
// ============================================================================

export async function calculateTeamMomentum(teamId: string): Promise<MomentumMetrics> {
  const schedule = await getTeamSchedule(teamId);
  
  if (!schedule) {
    return { games: 0, wins: 0, winRate: 0, streak: 0, avgMargin: 0 };
  }
  
  // Get last 10 completed games before tournament
  const last10 = schedule
    .filter((g: any) => g.competitions[0].status.type.completed)
    .slice(-10);
  
  const wins = last10.filter((g: any) => {
    const comp = g.competitions[0];
    const team = comp.competitors.find((c: any) => c.id === teamId);
    return team?.winner;
  }).length;
  
  // Calculate streak
  let streak = 0;
  for (let i = last10.length - 1; i >= 0; i--) {
    const comp = last10[i].competitions[0];
    const team = comp.competitors.find((c: any) => c.id === teamId);
    if (team?.winner) {
      streak++;
    } else {
      break;
    }
  }
  
  // Calculate average margin
  let totalMargin = 0;
  for (const g of last10) {
    const comp = g.competitions[0];
    const team = comp.competitors.find((c: any) => c.id === teamId);
    const opponent = comp.competitors.find((c: any) => c.id !== teamId);
    totalMargin += parseInt(team?.score || 0) - parseInt(opponent?.score || 0);
  }
  
  return {
    games: last10.length,
    wins,
    winRate: last10.length > 0 ? wins / last10.length : 0,
    streak,
    avgMargin: last10.length > 0 ? totalMargin / last10.length : 0,
    last10Record: `${wins}-${last10.length - wins}`,
  };
}

// ============================================================================
// DATA TRANSFORMERS
// ============================================================================

interface LiveGameUpdate {
  gameId: string;
  status: 'scheduled' | 'live' | 'final';
  period?: number;
  timeRemaining?: string;
  possession?: string;
  
  team1: {
    id: string;
    name: string;
    seed?: number;
    score: number;
    winner?: boolean;
  };
  
  team2: {
    id: string;
    name: string;
    seed?: number;
    score: number;
    winner?: boolean;
  };
}

interface InjuryReport {
  playerName: string;
  playerId: string;
  status: string;
  details?: string;
  expectedReturn?: string;
}

interface MomentumMetrics {
  games: number;
  wins: number;
  winRate: number;
  streak: number;
  avgMargin: number;
  last10Record?: string;
}

function transformToLiveGame(game: ESPNGame): LiveGameUpdate {
  const comp = game.competitions[0];
  const team1 = comp.competitors.find(c => c.homeAway === 'home') || comp.competitors[0];
  const team2 = comp.competitors.find(c => c.homeAway === 'away') || comp.competitors[1];
  
  const statusMap: Record<string, 'scheduled' | 'live' | 'final'> = {
    'pre': 'scheduled',
    'in': 'live',
    'post': 'final',
  };
  
  return {
    gameId: game.id,
    status: statusMap[game.status.type.state] || 'scheduled',
    period: game.status.period,
    timeRemaining: game.status.displayClock,
    possession: comp.situation?.possession,
    
    team1: {
      id: team1.id,
      name: team1.team.name,
      seed: team1.seed ? parseInt(team1.seed) : undefined,
      score: parseInt(team1.score) || 0,
      winner: team1.winner,
    },
    
    team2: {
      id: team2.id,
      name: team2.team.name,
      seed: team2.seed ? parseInt(team2.seed) : undefined,
      score: parseInt(team2.score) || 0,
      winner: team2.winner,
    },
  };
}

// ============================================================================
// HELPERS
// ============================================================================

function getTournamentDates(year: number): string[] {
  // 2025 NCAA Tournament dates
  // First Four: March 18-19
  // First Round: March 20-21
  // Second Round: March 22-23
  // Sweet 16: March 27-28
  // Elite 8: March 29-30
  // Final Four: April 5
  // Championship: April 7
  
  return [
    `${year}0318`,
    `${year}0319`,
    `${year}0320`,
    `${year}0321`,
    `${year}0322`,
    `${year}0323`,
    `${year}0327`,
    `${year}0328`,
    `${year}0329`,
    `${year}0330`,
    `${year}0405`,
    `${year}0407`,
  ];
}

// ============================================================================
// WEBSOCKET SIMULATION (for real-time updates)
// ============================================================================

export function createLiveGamePoller(callback: (games: LiveGameUpdate[]) => void, interval: number = 30000) {
  let isRunning = false;
  
  const poll = async () => {
    if (!isRunning) return;
    
    const games = await getLiveGames();
    callback(games);
    
    setTimeout(poll, interval);
  };
  
  return {
    start: () => {
      isRunning = true;
      poll();
    },
    stop: () => {
      isRunning = false;
    },
  };
}

// ============================================================================
// PREDICTION INTEGRATION
// ============================================================================

export async function getEnhancedTeamProfile(teamId: string, teamName: string, season: number = 2025) {
  const [momentum, schedule, injuries] = await Promise.all([
    calculateTeamMomentum(teamId),
    getTeamSchedule(teamId, season),
    getTeamInjuries(teamId),
  ]);
  
  return {
    momentum,
    upcomingGames: schedule?.slice(0, 5) || [],
    injuries,
    last10Record: momentum.last10Record,
    isHot: momentum.streak >= 3 || momentum.winRate >= 0.8,
    isCold: momentum.winRate <= 0.4,
    hasInjuries: injuries.length > 0,
    criticalInjuries: injuries.filter(i => 
      i.status.toLowerCase().includes('out') ||
      i.status.toLowerCase().includes('injured')
    ).length,
  };
}
