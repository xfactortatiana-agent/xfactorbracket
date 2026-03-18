// ============================================================================
// MODEL TRAINING RUNNER
// Exports data and trains ML models
// ============================================================================

import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

interface TrainingData {
  games: Array<{
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
    team1Tempo?: number;
    team2Tempo?: number;
    round: string;
  }>;
}

async function exportTrainingData(): Promise<TrainingData> {
  console.log('📊 Exporting training data from database...\n');
  
  const games: TrainingData['games'] = [];
  
  // Get all historical games with team season data
  const historicalGames = await prisma.historicalGame.findMany({
    where: {
      year: { gte: 2002 }, // KenPom era only
    },
    orderBy: [{ year: 'asc' }, { round: 'asc' }],
  });
  
  console.log(`   Found ${historicalGames.length} historical games`);
  
  for (const game of historicalGames) {
    // Get team season data
    const [team1Season, team2Season] = await Promise.all([
      prisma.teamSeason.findFirst({
        where: {
          teamName: game.team1Name,
          season: game.year,
        },
      }),
      prisma.teamSeason.findFirst({
        where: {
          teamName: game.team2Name,
          season: game.year,
        },
      }),
    ]);
    
    // Parse win rates from record strings
    const parseLast10 = (record?: string) => {
      if (!record) return 0.6;
      const [w, l] = record.split('-').map(Number);
      return w / (w + l) || 0.6;
    };
    
    // Get conference strength
    const confStrength: Record<string, number> = {
      'ACC': 0.625, 'Big 12': 0.584, 'SEC': 0.636, 'Big Ten': 0.512,
      'Big East': 0.589, 'Pac-12': 0.545, 'WCC': 0.412, 'MWC': 0.425,
      'Other': 0.45
    };
    
    games.push({
      season: game.year,
      team1: game.team1Name,
      team2: game.team2Name,
      team1Seed: game.team1Seed,
      team2Seed: game.team2Seed,
      team1Won: game.winnerSeed === game.team1Seed,
      team1KenPomRank: team1Season?.kenPomRank || undefined,
      team2KenPomRank: team2Season?.kenPomRank || undefined,
      team1AdjOE: team1Season?.adjOE || undefined,
      team2AdjOE: team2Season?.adjOE || undefined,
      team1AdjDE: team1Season?.adjDE || undefined,
      team2AdjDE: team2Season?.adjDE || undefined,
      team1Last10WinRate: parseLast10(team1Season?.last10Record ?? undefined),
      team2Last10WinRate: parseLast10(team2Season?.last10Record ?? undefined),
      team1ConfStrength: confStrength[team1Season?.conference || 'Other'],
      team2ConfStrength: confStrength[team2Season?.conference || 'Other'],
      team1Tempo: team1Season?.adjTempo || undefined,
      team2Tempo: team2Season?.adjTempo || undefined,
      round: game.round || 'R64',
    });
  }
  
  console.log(`   Exported ${games.length} games with features\n`);
  
  return { games };
}

async function trainModel() {
  console.log('🤖 MARCH MADNESS ML TRAINING PIPELINE\n');
  console.log('='.repeat(50));
  
  try {
    // 1. Export data
    const trainingData = await exportTrainingData();
    
    // 2. Save to temp file
    const tempFile = path.join(__dirname, '../../tmp/training_data.json');
    fs.mkdirSync(path.dirname(tempFile), { recursive: true });
    fs.writeFileSync(tempFile, JSON.stringify(trainingData, null, 2));
    
    console.log('💾 Training data saved to tmp/training_data.json\n');
    
    // 3. Check if Python is available
    try {
      await execAsync('python3 --version');
    } catch {
      console.log('⚠️  Python not available, using Node.js fallback model\n');
      await trainFallbackModel(trainingData);
      return;
    }
    
    // 4. Run Python trainer
    console.log('🐍 Running Python ML trainer...\n');
    
    // Write training data to temp file
    const tmpFile = path.join(__dirname, '../../tmp/training_data.json');
    fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
    fs.writeFileSync(tmpFile, JSON.stringify(trainingData));
    
    const { stdout, stderr } = await execAsync(
      `python3 ml/trainer.py train --input ${tmpFile}`,
      {
        cwd: path.join(__dirname, '../..'),
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      }
    );
    
    if (stderr) {
      console.error('Trainer stderr:', stderr);
    }
    
    // Parse results
    const results = JSON.parse(stdout);
    
    console.log('\n📈 TRAINING RESULTS:\n');
    console.log(`   Model Type: ${results.model_type}`);
    console.log(`   Train Accuracy: ${(results.train_accuracy * 100).toFixed(1)}%`);
    console.log(`   Test Accuracy: ${(results.test_accuracy * 100).toFixed(1)}%`);
    console.log(`   Log Loss: ${results.log_loss?.toFixed(4) || 'N/A'}`);
    
    if (results.feature_importance) {
      console.log('\n🔍 TOP FEATURES:\n');
      const featureNames = [
        'seed_diff', 'seed_product', 'kenpom_rank_diff', 'efficiency_diff',
        'offense_diff', 'defense_diff', 'momentum_diff', 'conf_strength_diff',
        'tempo_diff', 'is_upset_matchup', 'team1_dna', 'team2_dna',
        'round_num', 'is_sweet_16', 'is_elite_8', 'is_final_four', 'is_championship'
      ];
      
      results.feature_importance
        .map((imp: number, idx: number) => ({ name: featureNames[idx] || `f${idx}`, importance: imp }))
        .sort((a: any, b: any) => b.importance - a.importance)
        .slice(0, 8)
        .forEach((f: any, i: number) => {
          console.log(`   ${i + 1}. ${f.name}: ${(f.importance * 100).toFixed(1)}%`);
        });
    }
    
    // Save model
    const modelPath = path.join(__dirname, '../../tmp/model_v1.json');
    fs.writeFileSync(modelPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Model saved to ${modelPath}\n`);
    
  } catch (error) {
    console.error('❌ Training failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function trainFallbackModel(data: TrainingData) {
  // Simple heuristic-based model without Python
  console.log('🎯 Training heuristic fallback model...\n');
  
  const games = data.games;
  const splitIdx = Math.floor(games.length * 0.8);
  const trainGames = games.slice(0, splitIdx);
  const testGames = games.slice(splitIdx);
  
  // Simple prediction logic
  const predict = (game: typeof games[0]) => {
    let score = 0;
    
    // Seed advantage
    score += (game.team2Seed - game.team1Seed) * 0.1;
    
    // KenPom advantage
    if (game.team1KenPomRank && game.team2KenPomRank) {
      score += (game.team2KenPomRank - game.team1KenPomRank) * 0.02;
    }
    
    // Efficiency advantage
    if (game.team1AdjOE && game.team1AdjDE && game.team2AdjOE && game.team2AdjDE) {
      const eff1 = game.team1AdjOE - game.team1AdjDE;
      const eff2 = game.team2AdjOE - game.team2AdjDE;
      score += (eff1 - eff2) * 0.02;
    }
    
    // Momentum
    score += ((game.team1Last10WinRate ?? 0.5) - (game.team2Last10WinRate ?? 0.5)) * 0.5;
    
    // Conference
    score += ((game.team1ConfStrength ?? 0.45) - (game.team2ConfStrength ?? 0.45)) * 0.3;
    
    return score > 0;
  };
  
  // Evaluate
  let correct = 0;
  for (const game of testGames) {
    const pred = predict(game);
    if (pred === game.team1Won) correct++;
  }
  
  const accuracy = correct / testGames.length;
  console.log(`   Test Accuracy: ${(accuracy * 100).toFixed(1)}%`);
  console.log(`   Samples: ${games.length}`);
  console.log('\n✅ Fallback model trained\n');
}

async function runCrossValidation() {
  console.log('🔍 Running Cross-Validation\n');
  
  const data = await exportTrainingData();
  
  // Write data to temp file
  const tmpFile = path.join(__dirname, '../../tmp/cv_data.json');
  fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
  fs.writeFileSync(tmpFile, JSON.stringify(data));
  
  try {
    const { stdout } = await execAsync(
      `python3 ml/trainer.py cross_validate --input ${tmpFile}`,
      {
        cwd: path.join(__dirname, '../..'),
      }
    );
    
    const results = JSON.parse(stdout);
    
    console.log('📊 CROSS-VALIDATION RESULTS:\n');
    console.log(`   Mean Accuracy: ${(results.mean_accuracy * 100).toFixed(1)}%`);
    console.log(`   Std Dev: ${(results.std_accuracy * 100).toFixed(1)}%`);
    console.log(`   Fold Scores: ${results.fold_scores.map((s: number) => (s * 100).toFixed(0) + '%').join(', ')}\n`);
    
  } catch (error) {
    console.error('Cross-validation failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Main execution
const command = process.argv[2];

if (command === 'cv' || command === 'cross-validate') {
  runCrossValidation();
} else {
  trainModel();
}
