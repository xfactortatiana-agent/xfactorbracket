// Hybrid Data Architecture for xFactor March Madness
// PostgreSQL schema + API integrations + caching layer

// ============================================================================
// DATABASE SCHEMA (PostgreSQL via Prisma)
// ============================================================================

export const prismaSchema = `
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Historical tournament games (1985-present)
model HistoricalGame {
  id              String   @id @default(uuid())
  year            Int
  round           String   // R64, R32, S16, E8, F4, Championship
  region          String?
  team1Seed       Int
  team1Name       String
  team1Score      Int?
  team2Seed       Int
  team2Name       String
  team2Score      Int?
  winnerSeed      Int?
  upset           Boolean  @default(false)
  overtime        Boolean  @default(false)
  
  // Advanced metrics (when available)
  team1KenPomRank Int?
  team2KenPomRank Int?
  team1AdjOE      Float?
  team1AdjDE      Float?
  team2AdjOE      Float?
  team2AdjDE      Float?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([year])
  @@index([team1Seed, team2Seed])
  @@index([upset])
}

// Team metrics by season
model TeamSeason {
  id            String   @id @default(uuid())
  teamName      String
  season        Int
  
  // Basic info
  conference    String?
  tournamentSeed Int?
  record        String?
  
  // KenPom metrics
  kenPomRank    Int?
  adjOE         Float?   // Adjusted offensive efficiency
  adjDE         Float?   // Adjusted defensive efficiency
  adjTempo      Float?
  luck          Float?
  sos           Float?   // Strength of schedule
  
  // Historical performance
  madeTournament Boolean @default(false)
  tournamentWins Int     @default(0)
  finalFour      Boolean @default(false)
  championship   Boolean @default(false)
  
  // Pre-tournament momentum
  last10Record   String?
  confTournamentResult String?
  
  createdAt     DateTime @default(now())
  
  @@unique([teamName, season])
  @@index([season])
  @@index([kenPomRank])
}

// Player injuries
model Injury {
  id          String   @id @default(uuid())
  playerName  String
  teamName    String
  season      Int
  
  injuryType  String   // out, questionable, probable, returning
  severity    String   // critical, major, moderate, minor
  description String?
  
  reportedAt  DateTime @default(now())
  expectedReturn DateTime?
  
  // Impact on team (computed)
  impactScore Float?   // -0.15 to 0
  
  @@index([teamName, season])
  @@index([injuryType])
}

// Live game data (updated during tournament)
model LiveGame {
  id            String   @id @default(uuid())
  gameId        String   @unique // External API ID
  
  year          Int
  round         String
  scheduledAt   DateTime
  
  team1Id       String
  team1Name     String
  team1Seed     Int
  team1Score    Int      @default(0)
  
  team2Id       String
  team2Name     String
  team2Seed     Int
  team2Score    Int      @default(0)
  
  status        String   // scheduled, live, final
  timeRemaining String?
  possession    String?
  
  winner        String?  // team ID when final
  
  updatedAt     DateTime @updatedAt
  
  @@index([status])
  @@index([year, round])
}

// Cached predictions (invalidated when data changes)
model PredictionCache {
  id            String   @id @default(uuid())
  cacheKey      String   @unique
  
  team1Id       String
  team2Id       String
  winnerId      String
  probability   Float
  confidence    Float
  upsetProbability Float
  
  factors       Json     // PredictionFactors object
  
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  
  @@index([expiresAt])
}

// User brackets (for pool management)
model UserBracket {
  id          String   @id @default(uuid())
  userId      String
  year        Int
  name        String
  
  picks       Json     // Array of game predictions
  score       Int      @default(0)
  maxPossible Int      @default(0)
  rank        Int?
  
  strategy    String   // chalk, balanced, aggressive
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([userId, year, name])
  @@index([year, score])
}

// Data sync logs
model DataSync {
  id          String   @id @default(uuid())
  source      String   // espn, kenpom, manual
  dataType    String   // games, scores, injuries, metrics
  recordsCount Int
  startedAt   DateTime @default(now())
  completedAt DateTime?
  status      String   // running, success, failed
  error       String?
}
`;

// ============================================================================
// API INTEGRATIONS
// ============================================================================

export interface APISources {
  // ESPN API - Live scores, schedules, team info
  espn: {
    baseUrl: 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball';
    endpoints: {
      scoreboard: '/scoreboard';
      teams: '/teams';
      schedule: '/schedule';
      game: '/summary';
    };
    rateLimit: '100 req/min';
    features: ['live_scores', 'play_by_play', 'team_stats', 'player_stats'];
  };
  
  // Sports Reference / CFB Reference - Historical data
  sportsReference: {
    baseUrl: 'https://www.sports-reference.com/cbb';
    features: ['historical_games', 'season_stats', 'player_data'];
    note: 'Requires scraping, has rate limits';
  };
  
  // KenPom - Advanced metrics (requires subscription)
  kenpom: {
    baseUrl: 'https://kenpom.com';
    features: ['efficiency_metrics', 'tempo', 'luck', 'sos'];
    note: 'No official API, requires authenticated scraping';
    rateLimit: 'Manual CSV export or slow scraping';
  };
  
  // Bart Torvik - Alternative advanced metrics
  barttorvik: {
    baseUrl: 'https://www.barttorvik.com';
    features: ['t-rank', 'quadrant_wins', 'game_predictions'];
    note: 'Some free data via query parameters';
  };
  
  // NCAA Official API
  ncaa: {
    baseUrl: 'https://data.ncaa.com';
    features: ['official_bracket', 'tournament_history', 'team_records'];
    rateLimit: 'No limit for public data';
  };
  
  // Injury reports
  injurySources: {
    espn: 'ESPN injury report';
    foxSports: 'Fox Sports injury tracker';
    teamBeatWriters: 'Twitter/X feeds of beat reporters';
  };
}

// ============================================================================
// CACHING STRATEGY
// ============================================================================

export const cacheStrategy = {
  // Redis or in-memory cache layers
  layers: {
    hot: {
      store: 'memory',
      ttl: 60, // 1 minute
      data: ['live_scores', 'in_progress_games'],
    },
    warm: {
      store: 'redis',
      ttl: 3600, // 1 hour
      data: ['predictions', 'kenpom_metrics', 'injuries'],
    },
    cold: {
      store: 'database',
      ttl: 86400, // 24 hours
      data: ['historical_games', 'team_seasons'],
    },
  },
  
  invalidation: {
    onInjury: ['predictions', 'team_metrics'],
    onGameComplete: ['live_scores', 'bracket_predictions'],
    onNewData: ['kenpom_metrics', 'team_seasons'],
  },
};

// ============================================================================
// DATA PIPELINE
// ============================================================================

export const dataPipeline = {
  // Daily cron jobs
  daily: [
    {
      name: 'sync_kenpom',
      schedule: '0 6 * * *', // 6 AM daily
      source: 'kenpom',
      action: 'scrape_efficiency_metrics',
      fallback: 'use_cached_data',
    },
    {
      name: 'sync_injuries',
      schedule: '0 */4 * * *', // Every 4 hours
      source: ['espn', 'fox_sports'],
      action: 'fetch_injury_reports',
    },
    {
      name: 'sync_schedule',
      schedule: '0 8 * * *', // 8 AM daily
      source: 'espn',
      action: 'fetch_tournament_schedule',
    },
  ],
  
  // Real-time during tournament
  live: [
    {
      name: 'score_updates',
      interval: 30, // seconds
      source: 'espn',
      action: 'fetch_live_scores',
      webhooks: true,
    },
    {
      name: 'prediction_updates',
      trigger: 'on_score_change',
      action: 'recompute_probabilities',
      cache: 'invalidate_warm',
    },
  ],
  
  // Historical backfill (one-time)
  backfill: [
    {
      name: 'import_1985_2024',
      source: 'sports_reference',
      records: 2300, // Estimated tournament games
      priority: 'low',
    },
    {
      name: 'import_kenpom_historical',
      source: 'kenpom_archive',
      seasons: 20,
      priority: 'low',
    },
  ],
};

// ============================================================================
// HYBRID PREDICTOR (uses DB + APIs)
// ============================================================================

export interface HybridPredictionInput {
  team1: {
    id: string;
    currentSeason: number;
  };
  team2: {
    id: string;
    currentSeason: number;
  };
  useLiveData: boolean;
  simulationCount: number;
}

export const hybridPredictor = {
  // Fetch team data from multiple sources
  async getTeamProfile(teamId: string, season: number) {
    return {
      // From database (historical)
      historical: {
        tournamentAppearances: 'SELECT COUNT(*) FROM team_seasons WHERE team_name = $1 AND made_tournament = true',
        avgTournamentWins: 'SELECT AVG(tournament_wins) FROM team_seasons WHERE team_name = $1',
        seedHistory: 'SELECT * FROM historical_games WHERE team1_name = $1 OR team2_name = $1',
      },
      
      // From cache/API (current)
      current: {
        kenpomMetrics: 'cache:get:kenpom:2025:${teamId}',
        injuries: 'cache:get:injuries:2025:${teamId}',
        momentum: 'api:espn:last_10_games:${teamId}',
      },
      
      // Computed on the fly
      derived: {
        championshipDNA: 'top_25_both_efficiencies AND no_major_injuries',
        upsetFactor: 'seed_diff > 4 AND kenpom_diff < 10',
      },
    };
  },
  
  // Cache-aware prediction
  async predictWithCache(team1Id: string, team2Id: string) {
    const cacheKey = `pred:2025:${team1Id}:${team2Id}`;
    
    // 1. Check cache
    const cached = await cacheGet(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached;
    }
    
    // 2. Fetch fresh data
    const [team1, team2] = await Promise.all([
      this.getTeamProfile(team1Id, 2025),
      this.getTeamProfile(team2Id, 2025),
    ]);
    
    // 3. Run prediction
    const result = await runUltimatePrediction(team1, team2);
    
    // 4. Cache result
    await cacheSet(cacheKey, result, 3600); // 1 hour TTL
    
    return result;
  },
};

// Placeholder functions
async function cacheGet(key: string) { return null; }
async function cacheSet(key: string, value: any, ttl: number) {}
async function runUltimatePrediction(t1: any, t2: any) { return {}; }
