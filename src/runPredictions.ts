// ============================================================================
// RUN BARTTORVIK PREDICTIONS - Full Tournament Simulation
// ============================================================================

import { 
  tournamentTeams2026, 
  firstRoundMatchups2026,
  getTeam2026 
} from './data/tournament2026';
import { 
  predictWithBarttorvik, 
  simulateTournament,
  BarttorvikPrediction 
} from './lib/barttorvikPredictor';

console.log('🏀 XFACTOR BARTTORVIK PREDICTION ENGINE 🏀');
console.log('===========================================\n');

// Build first round matchups
const firstRound: Array<[typeof tournamentTeams2026[0], typeof tournamentTeams2026[0]]> = [];

const regions = ['EAST', 'SOUTH', 'MIDWEST', 'WEST'] as const;

for (const region of regions) {
  const matchups = firstRoundMatchups2026[region];
  console.log(`\n📍 ${region} REGION`);
  console.log('─'.repeat(40));
  
  for (const [t1id, t2id] of matchups) {
    const t1 = getTeam2026(t1id);
    const t2 = getTeam2026(t2id);
    
    if (t1 && t2) {
      firstRound.push([t1, t2]);
      console.log(`${t1.seed} ${t1.name} vs ${t2.seed} ${t2.name}`);
    } else {
      console.log(`⚠️ Missing team: ${t1id} or ${t2id}`);
    }
  }
}

console.log('\n\n🎲 RUNNING SIMULATIONS...\n');

// Run full tournament simulation
const simulation = simulateTournament(firstRound);

// Display Round of 64
console.log('\n📊 ROUND OF 64 PREDICTIONS');
console.log('═'.repeat(60));
simulation.roundOf64.forEach((game, i) => {
  const upset = game.upsetProbability > 0.25 ? ' 🔥' : '';
  console.log(
    `${i+1}. ${game.winner.seed} ${game.winner.name} beats ${game.loser.seed} ${game.loser.name} ` +
    `(${(game.winProbability*100).toFixed(1)}%)${upset}`
  );
});

// Display champion
console.log('\n\n🏆 CHAMPION');
console.log('═'.repeat(60));
if (simulation.champion) {
  console.log(`${simulation.champion.seed} ${simulation.champion.name}`);
  console.log(`\nPath to championship:`);
  
  // Find champion's games
  const allGames = [
    ...simulation.roundOf64,
    ...simulation.roundOf32,
    ...simulation.sweet16,
    ...simulation.elite8,
    ...simulation.finalFour,
  ];
  
  if (simulation.championship) {
    allGames.push(simulation.championship);
  }
  
  const champGames = allGames.filter(g => 
    g.winner.id === simulation.champion!.id
  );
  
  champGames.forEach((game, i) => {
    const round = ['R64', 'R32', 'S16', 'E8', 'F4', 'CHAMP'][i];
    console.log(`  ${round}: beat ${game.loser.seed} ${game.loser.name} (${(game.winProbability*100).toFixed(1)}%)`);
  });
}

// Upset predictions
console.log('\n\n⚠️  UPSET ALERTS (>25% upset probability)');
console.log('═'.repeat(60));
const upsets = simulation.roundOf64.filter(g => g.upsetProbability > 0.25);
if (upsets.length > 0) {
  upsets.forEach(game => {
    console.log(`${game.loser.seed} ${game.loser.name} over ${game.winner.seed} ${game.winner.name}: ${(game.upsetProbability*100).toFixed(1)}%`);
  });
} else {
  console.log('No high-probability upsets in Round of 64');
}

console.log('\n\n✅ Simulation complete!');

// Export for use in other modules
export { simulation };
