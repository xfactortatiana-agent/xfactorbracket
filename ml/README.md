# 🤖 Machine Learning Training Pipeline

## Overview

This directory contains the ML training pipeline for March Madness predictions. The pipeline uses **XGBoost** (gradient boosted decision trees) trained on 20+ years of tournament data.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Historical DB  │────▶│  Feature Extract │────▶│  XGBoost Model  │
│  (265+ games)   │     │  (17 features)   │     │  (500 estimators)│
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                           ┌───────────────────────────────┘
                           ▼
                    ┌──────────────┐
                    │  Predictions │
                    │  (0-100%)    │
                    └──────────────┘
```

## Features (17 total)

### Seed-Based (2)
- `seed_diff`: Difference in tournament seeds
- `seed_product`: Multiplicative seed interaction

### KenPom Efficiency (5)
- `kenpom_rank_diff`: Rank difference
- `efficiency_diff`: Net efficiency (OE - DE)
- `offense_diff`: Adjusted offensive efficiency diff
- `defense_diff`: Adjusted defensive efficiency diff
- `tempo_diff`: Adjusted tempo difference

### Team Quality (3)
- `team1_has_championship_dna`: Top 25 in both O and D
- `team2_has_championship_dna`: Top 25 in both O and D
- `is_upset_matchup`: Seed difference >= 4

### Momentum (1)
- `momentum_diff`: Last 10 games win rate difference

### Conference (1)
- `conference_strength_diff`: Historical tournament win rate

### Round Context (5)
- `round_num`: 1-6 encoding
- `is_sweet_16`: Sweet 16 flag
- `is_elite_8`: Elite 8 flag
- `is_final_four`: Final Four flag
- `is_championship`: Championship flag

## Usage

### Train Model

```bash
npm run ml:train
```

This will:
1. Export all historical games from the database
2. Extract features for each game
3. Train XGBoost model
4. Run cross-validation
5. Output feature importance

### Cross-Validation

```bash
npm run ml:cv
```

Runs 5-fold cross-validation to estimate model performance.

### Manual Training (Python)

```bash
cd ml
echo '{"games": [...]}' | python3 trainer.py train
```

## Model Performance Targets

Based on research from top Kaggle competitors:

| Metric | Target | Current |
|--------|--------|---------|
| Test Accuracy | 75-80% | TBD |
| Log Loss | 0.50-0.55 | TBD |
| First Round Accuracy | 70-75% | TBD |

## Feature Importance (Expected)

Based on historical analysis:

1. **KenPom Rank Diff** (~25%): Best single predictor
2. **Seed Diff** (~20%): Tournament committee wisdom
3. **Efficiency Diff** (~15%): Net team strength
4. **Momentum Diff** (~12%): Recent form matters
5. **Championship DNA** (~10%): Elite teams separate
6. **Conference Strength** (~8%): Schedule quality
7. **Other** (~10%): Tempo, round, etc.

## Model Variants

### 1. XGBoost (Primary)
- Best overall accuracy
- Handles feature interactions
- Good with small datasets

### 2. Ensemble (Backup)
- Combines XGBoost + Random Forest + Logistic
- More robust to outliers
- Slightly better calibration

### 3. Heuristic (Fallback)
- No ML libraries needed
- Rule-based with learned weights
- 70%+ accuracy achievable

## Data Requirements

For optimal training, you need:
- **Minimum**: 100 games (10+ tournaments)
- **Optimal**: 500+ games (25+ tournaments)
- **Features per game**: KenPom metrics for both teams

## Prediction API

```typescript
import { MLPipeline } from '@/lib/mlPipeline';

const model = new MLPipeline.MarchMadnessModel();
await model.loadHistoricalData();
const trained = model.train();

// Predict a game
const prediction = trained.predict(features);
console.log(prediction.team1WinProb); // 0.73
console.log(prediction.confidence);    // 0.46
```

## Training Data Schema

```typescript
interface TrainingGame {
  season: number;
  team1: string;
  team2: string;
  team1Seed: number;
  team2Seed: number;
  team1Won: boolean;
  team1KenPomRank?: number;
  team2KenPomRank?: number;
  team1AdjOE?: number;
  team2AdjOE?: number;
  team1AdjDE?: number;
  team2AdjDE?: number;
  team1Last10WinRate?: number;
  team2Last10WinRate?: number;
  team1ConfStrength?: number;
  team2ConfStrength?: number;
  round: string;
}
```

## Hyperparameters

### XGBoost Config
```python
n_estimators=500      # Number of trees
max_depth=6           # Tree depth
learning_rate=0.05    # Shrinkage
subsample=0.8         # Row sampling
colsample_bytree=0.8  # Column sampling
```

Tuned for:
- Prevent overfitting (small dataset)
- Capture feature interactions
- Fast inference

## Files

- `trainer.py`: Python ML training script
- `mlPipeline.ts`: TypeScript ML interface
- `trainModel.ts`: Training runner script
- `../tmp/model_v1.json`: Saved model output

## Next Steps

1. **Expand Dataset**: Import full Kaggle MNCAATourneyCompactResults (2,300 games)
2. **Add Features**: Player-level stats, injury data, travel distance
3. **Hyperparameter Tuning**: Grid search for optimal params
4. **Ensemble Methods**: Stack multiple models
5. **Calibration**: Platt scaling for probability calibration

## References

- [XGBoost Documentation](https://xgboost.readthedocs.io/)
- [Kaggle March Madness Competition](https://www.kaggle.com/competitions/march-machine-learning-mania-2025)
- [KenPom Efficiency Metrics](https://kenpom.com/)
