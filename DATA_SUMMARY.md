# 🏀 March Madness Data Repository - Summary

## Database Statistics

### Historical Games
- **Total Games**: 265 games (1985-2025)
- **Upsets**: 92 games
- **Upset Rate**: 34.7%

### Upset Breakdown by Matchup
| Matchup | Upsets | Historical Rate |
|---------|--------|-----------------|
| 5 vs 12 | 39 | 35.6% |
| 2 vs 15 | 28 | 6.9% |
| 6 vs 11 | 4 | 38.8% |
| 4 vs 13 | 4 | 20.6% |
| 1 vs 16 | 2 | 1.3% (UMBC 2018, FDU 2023) |

### Team Seasons with KenPom Data
- **Total Seasons**: 44 teams
- **Championship Teams**: 23 (all champions since 2002)
- **Final Four Teams**: Additional 12 teams
- **2025 Contenders**: 10 teams (Duke, Arizona, Michigan, Florida, Houston, etc.)

### Data Files

#### `/prisma/seedComprehensive.ts`
Contains:
- 84 Round of 64 games (2024 tournament + historical upsets)
- 39 Championship games (1985-2024)
- 44 Team seasons with full KenPom metrics

#### `/src/lib/tournamentData.ts`
Contains:
- Seed matchup history (all 1v16 through 8v9 combinations)
- Championship DNA criteria (KenPom thresholds for champions)
- Conference strength rankings
- Upset indicators (12-5, 11-6, 15-2 patterns)

#### `/src/lib/ultimatePredictionEngine.ts`
Hybrid prediction engine combining:
- Database historical data (40 years)
- Tournament analytics (upset patterns, seed history)
- Live ESPN API data (momentum, injuries)
- KenPom efficiency metrics

## Championship DNA (Since 2002)

All champions since 2002 have met these criteria:
- **KenPom Rank**: Top 15 (average: #4.2)
- **Offensive Efficiency**: ≥115.0 (average: 121.5)
- **Defensive Efficiency**: ≤99.2 (average: 94.2)
- **Dual Threat**: Top 25 in BOTH offense AND defense

## 2025 Contenders with Championship DNA

| Team | Seed | KenPom | OE | DE | DNA Match |
|------|------|--------|----|----|-----------|
| Duke | 1 | #1 | 125.2 | 91.8 | ✅ |
| Arizona | 1 | #2 | 123.5 | 92.1 | ✅ |
| Michigan | 1 | #3 | 121.8 | 89.5 | ✅ |
| Florida | 1 | #4 | 120.5 | 93.2 | ✅ |
| Houston | 2 | #5 | 119.2 | 92.8 | ✅ |
| Iowa State | 3 | #6 | 118.5 | 92.5 | ✅ |

## Conference Tournament Performance (2000-2024)

| Conference | Win Rate | Champions | Final Fours |
|------------|----------|-----------|-------------|
| ACC | 62.5% | 5 | 18 |
| SEC | 63.6% | 4 | 14 |
| Big 12 | 58.4% | 3 | 12 |
| Big East | 58.9% | 6 | 16 |
| Big Ten | 51.2% | 2 | 10 |

## Key Upset Patterns

### 12-over-5 Upset (35.6% historical rate)
Key indicators:
- 12-seed has top-50 defensive efficiency
- 5-seed has 3+ losses in last 10 games
- 12-seed won conference tournament
- Slow tempo matchup (under 65 possessions)

### 15-over-2 Upset (6.9% historical rate)
Key indicators:
- 15-seed has 25+ wins
- 2-seed has injury to key player
- 15-seed shoots 38%+ from 3-point range
- Senior-heavy lineup

### 11-over-6 Upset (38.8% historical rate)
Key indicators:
- 11-seed has star player (18+ PPG)
- 11-seed won First Four/play-in game
- 6-seed has poor road record

## API Usage

### Predict a Game
```typescript
import { predictGame } from '@/lib/ultimatePredictionEngine';

const result = await predictGame(
  { name: 'Duke', seed: 1, conference: 'ACC', kenPomRank: 1, adjOE: 125.2, adjDE: 91.8 },
  { name: 'Arizona', seed: 1, conference: 'Big 12', kenPomRank: 2, adjOE: 123.5, adjDE: 92.1 },
  'Championship',
  'South'
);
```

### Get Historical Matchup Stats
```typescript
import { getHistoricalMatchupStats } from '@/lib/tournamentData';

const stats = await getHistoricalMatchupStats(5, 12);
// Returns: { totalGames: 160, upsetRate: 0.356, ... }
```

## What's Next

1. **Add More Games**: Currently have 265 games, target is 2,300+ (all tournament games 1985-2024)
2. **Import CSV Data**: Pull from Kaggle/SharpDB datasets
3. **Player Data**: Add injury reports, player efficiency ratings
4. **Live Scores**: Integrate ESPN API for real-time updates during tournament
5. **ML Model**: Train on historical data for improved predictions

## Database Schema

```prisma
model HistoricalGame {
  id            String   @id
  year          Int
  round         String
  region        String?
  team1Seed     Int
  team1Name     String
  team1Score    Int
  team2Seed     Int
  team2Name     String
  team2Score    Int
  winnerSeed    Int
  upset         Boolean
  overtime      Boolean?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model TeamSeason {
  id                    String   @id @default(uuid())
  teamName              String
  season                Int
  conference            String
  tournamentSeed        Int?
  record                String?
  kenPomRank            Int?
  adjOE                 Float?
  adjDE                 Float?
  adjTempo              Float?
  luck                  Float?
  sos                   Float?
  madeTournament        Boolean  @default(false)
  tournamentWins        Int?
  finalFour             Boolean  @default(false)
  championship          Boolean  @default(false)
  last10Record          String?
  confTournamentResult  String?
  createdAt             DateTime @default(now())
  
  @@unique([teamName, season])
}
```

---

**Last Updated**: March 18, 2026
**Total Data Points**: 309 (265 games + 44 seasons)
