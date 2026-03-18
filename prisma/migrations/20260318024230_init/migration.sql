-- CreateTable
CREATE TABLE "HistoricalGame" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "round" TEXT NOT NULL,
    "region" TEXT,
    "team1Seed" INTEGER NOT NULL,
    "team1Name" TEXT NOT NULL,
    "team1Score" INTEGER,
    "team2Seed" INTEGER NOT NULL,
    "team2Name" TEXT NOT NULL,
    "team2Score" INTEGER,
    "winnerSeed" INTEGER,
    "upset" BOOLEAN NOT NULL DEFAULT false,
    "overtime" BOOLEAN NOT NULL DEFAULT false,
    "team1KenPomRank" INTEGER,
    "team2KenPomRank" INTEGER,
    "team1AdjOE" DOUBLE PRECISION,
    "team1AdjDE" DOUBLE PRECISION,
    "team2AdjOE" DOUBLE PRECISION,
    "team2AdjDE" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoricalGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamSeason" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "conference" TEXT,
    "tournamentSeed" INTEGER,
    "record" TEXT,
    "kenPomRank" INTEGER,
    "adjOE" DOUBLE PRECISION,
    "adjDE" DOUBLE PRECISION,
    "adjTempo" DOUBLE PRECISION,
    "luck" DOUBLE PRECISION,
    "sos" DOUBLE PRECISION,
    "madeTournament" BOOLEAN NOT NULL DEFAULT false,
    "tournamentWins" INTEGER NOT NULL DEFAULT 0,
    "finalFour" BOOLEAN NOT NULL DEFAULT false,
    "championship" BOOLEAN NOT NULL DEFAULT false,
    "last10Record" TEXT,
    "confTournamentResult" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Injury" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "injuryType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT,
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturn" TIMESTAMP(3),
    "impactScore" DOUBLE PRECISION,

    CONSTRAINT "Injury_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveGame" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "round" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team1Name" TEXT NOT NULL,
    "team1Seed" INTEGER NOT NULL,
    "team1Score" INTEGER NOT NULL DEFAULT 0,
    "team2Id" TEXT NOT NULL,
    "team2Name" TEXT NOT NULL,
    "team2Seed" INTEGER NOT NULL,
    "team2Score" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "timeRemaining" TEXT,
    "possession" TEXT,
    "winner" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionCache" (
    "id" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "team1Id" TEXT NOT NULL,
    "team2Id" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "upsetProbability" DOUBLE PRECISION NOT NULL,
    "factors" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PredictionCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBracket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "picks" JSONB NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "maxPossible" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER,
    "strategy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBracket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSync" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "recordsCount" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "error" TEXT,

    CONSTRAINT "DataSync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoricalGame_year_idx" ON "HistoricalGame"("year");

-- CreateIndex
CREATE INDEX "HistoricalGame_team1Seed_team2Seed_idx" ON "HistoricalGame"("team1Seed", "team2Seed");

-- CreateIndex
CREATE INDEX "HistoricalGame_upset_idx" ON "HistoricalGame"("upset");

-- CreateIndex
CREATE INDEX "TeamSeason_season_idx" ON "TeamSeason"("season");

-- CreateIndex
CREATE INDEX "TeamSeason_kenPomRank_idx" ON "TeamSeason"("kenPomRank");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSeason_teamName_season_key" ON "TeamSeason"("teamName", "season");

-- CreateIndex
CREATE INDEX "Injury_teamName_season_idx" ON "Injury"("teamName", "season");

-- CreateIndex
CREATE INDEX "Injury_injuryType_idx" ON "Injury"("injuryType");

-- CreateIndex
CREATE UNIQUE INDEX "LiveGame_gameId_key" ON "LiveGame"("gameId");

-- CreateIndex
CREATE INDEX "LiveGame_status_idx" ON "LiveGame"("status");

-- CreateIndex
CREATE INDEX "LiveGame_year_round_idx" ON "LiveGame"("year", "round");

-- CreateIndex
CREATE UNIQUE INDEX "PredictionCache_cacheKey_key" ON "PredictionCache"("cacheKey");

-- CreateIndex
CREATE INDEX "PredictionCache_expiresAt_idx" ON "PredictionCache"("expiresAt");

-- CreateIndex
CREATE INDEX "UserBracket_year_score_idx" ON "UserBracket"("year", "score");

-- CreateIndex
CREATE UNIQUE INDEX "UserBracket_userId_year_name_key" ON "UserBracket"("userId", "year", "name");
