"use client";

import { useState, useEffect, useMemo } from 'react';
import { tournamentField2026 } from '../data/ultimateDataset';
import { predictWinner, runMonteCarloSimulation, findBestUpsetPicks, calculateChampionshipProbability, type Team, type PredictionFactors } from '../lib/ultimatePredictor';
import { Trophy, TrendingUp, Zap, Target, BarChart3, Clock, RefreshCw, Download, ChevronRight, Star, Grid3X3, Flame, AlertTriangle, Activity, Crown } from 'lucide-react';

// Type for the complete team data from ultimateDataset
interface CompleteTeam extends Team {
  kenPomRank?: number;
  adjOE?: number;
  adjDE?: number;
  tempo?: number;
  conference?: string;
  injuries?: string[];
  momentum?: 'hot' | 'neutral' | 'cold';
  record: string;
}

interface Game {
  id: string;
  round: number;
  team1: CompleteTeam;
  team2: CompleteTeam;
  winner?: CompleteTeam;
  confidence: number;
  upsetProbability: number;
  predictionFactors: PredictionFactors;
}

export default function Dashboard() {
  const [strategy, setStrategy] = useState('balanced');
  const [fullBracket, setFullBracket] = useState<Game[][]>([]);
  const [championshipOdds, setChampionshipOdds] = useState<Map<string, number>>(new Map());
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState<'dashboard' | 'bracket' | 'upsets' | 'dna'>('dashboard');
  const [upsetPicks, setUpsetPicks] = useState<ReturnType<typeof findBestUpsetPicks>>([]);

  const teams = tournamentField2026 as CompleteTeam[];

  const strategies = [
    { id: 'chalk', name: 'Chalk', desc: 'All favorites, maximum safety', icon: Target },
    { id: 'balanced', name: 'Balanced', desc: 'Smart upsets, optimal EV', icon: BarChart3 },
    { id: 'aggressive', name: 'Aggressive', desc: 'High variance, high ceiling', icon: Zap },
  ];

  useEffect(() => {
    generateNewBracket();
    runSimulation();
    setUpsetPicks(findBestUpsetPicks(teams));
  }, [strategy]);

  const generateNewBracket = () => {
    const rounds = generateFullBracket(teams, strategy);
    setFullBracket(rounds);
    setLastUpdated(new Date());
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const odds = runMonteCarloSimulation(teams, 5000);
    setChampionshipOdds(odds);
    setIsSimulating(false);
  };

  const topContenders = useMemo(() => {
    return Array.from(championshipOdds.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([teamId, odds]) => ({
        team: teams.find(t => t.id === teamId)!,
        odds: odds * 100,
        dna: calculateChampionshipProbability(teams.find(t => t.id === teamId)!)
      }));
  }, [championshipOdds, teams]);

  const upsetCount = useMemo(() => {
    if (!fullBracket[0]) return 0;
    return fullBracket[0].filter(g => 
      g.winner && 
      g.team1 && g.team2 && 
      g.winner.seed > Math.min(g.team1.seed, g.team2.seed)
    ).length;
  }, [fullBracket]);

  const avgConfidence = useMemo(() => {
    if (!fullBracket[0]) return 0;
    const total = fullBracket.flat().reduce((sum, g) => sum + g.confidence, 0);
    return (total / fullBracket.flat().length * 100).toFixed(1);
  }, [fullBracket]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">xFactor + Tatiana</h1>
                <p className="text-slate-400 text-sm">Ultimate March Madness Engine</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <NavButton 
                active={viewMode === 'dashboard'} 
                onClick={() => setViewMode('dashboard')}
                icon={BarChart3}
                label="Dashboard"
              />
              <NavButton 
                active={viewMode === 'bracket'} 
                onClick={() => setViewMode('bracket')}
                icon={Grid3X3}
                label="Bracket"
              />
              <NavButton 
                active={viewMode === 'upsets'} 
                onClick={() => setViewMode('upsets')}
                icon={Flame}
                label={`Upsets (${upsetPicks.length})`}
              />
              <NavButton 
                active={viewMode === 'dna'} 
                onClick={() => setViewMode('dna')}
                icon={Activity}
                label="Championship DNA"
              />
              <div className="w-px h-8 bg-slate-700 mx-2" />
              <button 
                onClick={() => { generateNewBracket(); runSimulation(); }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                Run
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors shadow-lg shadow-violet-600/20">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {viewMode === 'dashboard' && (
          <DashboardView 
            topContenders={topContenders}
            isSimulating={isSimulating}
            strategies={strategies}
            strategy={strategy}
            setStrategy={setStrategy}
            firstRound={fullBracket[0] || []}
            lastUpdated={lastUpdated}
            upsetCount={upsetCount}
            avgConfidence={avgConfidence}
          />
        )}
        {viewMode === 'bracket' && <BracketView fullBracket={fullBracket} />}
        {viewMode === 'upsets' && <UpsetsView upsetPicks={upsetPicks} />}
        {viewMode === 'dna' && <ChampionshipDnaView teams={teams} />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        active 
          ? 'bg-violet-600/20 text-violet-400 border border-violet-600/50' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function DashboardView({ 
  topContenders, 
  isSimulating, 
  strategies, 
  strategy, 
  setStrategy, 
  firstRound,
  lastUpdated,
  upsetCount,
  avgConfidence
}: any) {
  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Trophy} 
          label="Championship" 
          value={topContenders[0]?.team.name || 'Analyzing...'} 
          subtext={topContenders[0] ? `${topContenders[0].odds.toFixed(1)}% probability` : 'Running simulation...'}
          color="orange"
        />
        <StatCard 
          icon={Target} 
          label="Confidence" 
          value={`${avgConfidence}%`} 
          subtext="Average prediction confidence"
          color="violet"
        />
        <StatCard 
          icon={Flame} 
          label="Upsets" 
          value={upsetCount.toString()} 
          subtext={`${(upsetCount / 32 * 100).toFixed(0)}% of first round`}
          color="red"
        />
        <StatCard 
          icon={Clock} 
          label="Updated" 
          value={lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
          subtext="Real-time data"
          color="emerald"
        />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Strategy & Odds Column */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Strategy
            </h2>
            <div className="space-y-2">
              {strategies.map((s: any) => (
                <button
                  key={s.id}
                  onClick={() => setStrategy(s.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    strategy === s.id 
                      ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <s.icon className={`w-4 h-4 ${strategy === s.id ? 'text-violet-400' : 'text-slate-500'}`} />
                      <span className="font-medium text-white">{s.name}</span>
                    </div>
                    {strategy === s.id && <Star className="w-4 h-4 text-violet-400" />}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-500" />
              Championship Odds
            </h2>
            {isSimulating ? (
              <div className="flex flex-col items-center py-8">
                <RefreshCw className="w-8 h-8 text-violet-400 animate-spin mb-2" />
                <span className="text-slate-400 text-sm">Running 5,000 simulations...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {topContenders.map(({ team, odds }: any, idx: number) => (
                  <div key={team.id} className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-6 ${idx === 0 ? 'text-yellow-500' : 'text-slate-500'}`}>#{idx + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white text-sm">{team.name}</span>
                        <span className="text-violet-400 font-semibold">{odds.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(odds * 3, 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* First Round Picks */}
        <div className="col-span-2">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                First Round Predictions
              </h2>
              <div className="flex gap-2">
                <span className="text-xs text-slate-500 px-2 py-1 bg-slate-800 rounded">{firstRound.length} games</span>
              </div>
            </div>

            {firstRound.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {firstRound.map((game: Game) => {
                  const isUpset = game.winner && game.winner.seed > Math.min(game.team1.seed, game.team2.seed);
                  const favorite = game.team1.seed < game.team2.seed ? game.team1 : game.team2;
                  const underdog = game.team1.seed < game.team2.seed ? game.team2 : game.team1;
                  
                  return (
                    <div 
                      key={game.id} 
                      className={`bg-slate-800/50 rounded-lg p-3 border transition-all hover:border-slate-600 ${
                        isUpset ? 'border-orange-500/30' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          {isUpset && (
                            <span className="flex items-center gap-1 text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                              <Flame className="w-3 h-3" />
                              Upset!
                            </span>
                          )}
                          <span className="text-xs text-slate-500">{game.team1.region}</span>
                        </div>
                        <span className="text-xs text-slate-500">{(game.confidence * 100).toFixed(0)}% conf</span>
                      </div>
                      
                      <div className="space-y-1">
                        {/* Favorite */}
                        <div className={`flex items-center justify-between p-2 rounded ${
                          game.winner?.id === favorite.id ? 'bg-violet-500/20' : 'opacity-40'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-slate-300">
                              {favorite.seed}
                            </span>
                            <span className="text-sm text-white">{favorite.name}</span>
                          </div>
                          {game.winner?.id === favorite.id && <ChevronRight className="w-4 h-4 text-violet-400" />}
                        </div>
                        
                        {/* Underdog */}
                        <div className={`flex items-center justify-between p-2 rounded ${
                          game.winner?.id === underdog.id ? 'bg-orange-500/20' : 'opacity-40'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-slate-300">
                              {underdog.seed}
                            </span>
                            <span className="text-sm text-white">{underdog.name}</span>
                          </div>
                          {game.winner?.id === underdog.id && <ChevronRight className="w-4 h-4 text-orange-400" />}
                        </div>
                      </div>
                      
                      {game.upsetProbability > 0.25 && (
                        <div className="mt-2 text-xs text-orange-400/80 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {(game.upsetProbability * 100).toFixed(0)}% upset chance
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <RefreshCw className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-spin" />
                <p className="text-slate-400">Generating predictions...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function BracketView({ fullBracket }: { fullBracket: Game[][] }) {
  const roundNames = ['First Round', 'Second Round', 'Sweet 16', 'Elite 8', 'Final Four', 'Championship'];
  
  if (!fullBracket || fullBracket.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-12 h-12 text-violet-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Grid3X3 className="w-6 h-6 text-violet-400" />
        Full Tournament Bracket
      </h2>
      
      <div className="flex gap-6 min-w-max">
        {fullBracket.map((round, roundIdx) => (
          <div key={roundIdx} className="flex flex-col justify-center gap-3">
            <h3 className="text-sm font-semibold text-slate-400 text-center mb-2">{roundNames[roundIdx]}</h3>
            {round.filter(game => game.team1 && game.team2).map((game) => (
              <div 
                key={game.id} 
                className="w-44 bg-slate-800 rounded-lg p-2.5 border border-slate-700 hover:border-slate-600 transition-colors"
                style={{ 
                  marginTop: roundIdx > 0 ? `${Math.pow(2, roundIdx) * 12}px` : 0,
                  marginBottom: roundIdx > 0 ? `${Math.pow(2, roundIdx) * 12}px` : 0
                }}
              >
                <div className="space-y-0.5">
                  <div className={`flex items-center justify-between p-1.5 rounded ${game.winner?.id === game.team1?.id ? 'bg-violet-500/20' : ''}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 w-4">{game.team1?.seed}</span>
                      <span className={`text-xs truncate ${game.winner?.id === game.team1?.id ? 'text-white font-medium' : 'text-slate-400'}`}>
                        {game.team1?.name || 'TBD'}
                      </span>
                    </div>
                    {game.winner?.id === game.team1?.id && <ChevronRight className="w-3 h-3 text-violet-400" />}
                  </div>
                  <div className="h-px bg-slate-700/50" />
                  <div className={`flex items-center justify-between p-1.5 rounded ${game.winner?.id === game.team2?.id ? 'bg-violet-500/20' : ''}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 w-4">{game.team2?.seed}</span>
                      <span className={`text-xs truncate ${game.winner?.id === game.team2?.id ? 'text-white font-medium' : 'text-slate-400'}`}>
                        {game.team2?.name || 'TBD'}
                      </span>
                    </div>
                    {game.winner?.id === game.team2?.id && <ChevronRight className="w-3 h-3 text-violet-400" />}
                  </div>
                </div>
                <div className="mt-1.5 text-xs text-slate-500 text-center">
                  {(game.confidence * 100).toFixed(0)}% conf
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Champion */}
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-slate-400 text-center mb-2">Champion</h3>
          {fullBracket[5]?.[0]?.winner && (
            <div className="w-48 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{fullBracket[5][0].winner.name}</div>
              <div className="text-sm text-slate-400">{fullBracket[5][0].winner.seed} Seed</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                <Crown className="w-3 h-3" />
                National Champion
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UpsetsView({ upsetPicks }: { upsetPicks: ReturnType<typeof findBestUpsetPicks> }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          Best Upset Opportunities
        </h2>
        <p className="text-slate-400">
          Based on 40 years of historical data, KenPom metrics, and current injury reports.
          Historical 12-over-5 rate: 36%, 11-over-6 rate: 39%.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {upsetPicks.map((pick, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-orange-500/20 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">{pick.game}</div>
                <div className="text-lg font-bold text-white">
                  <span className="text-orange-400">{pick.underdog.name}</span> over {pick.favorite.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-400">{(pick.upsetProb * 100).toFixed(0)}%</div>
                <div className="text-xs text-slate-500">upset chance</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {pick.reasons.map((reason, ridx) => (
                <div key={ridx} className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  {reason}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChampionshipDnaView({ teams }: { teams: CompleteTeam[] }) {
  const contenders = teams
    .map(t => ({ team: t, prob: calculateChampionshipProbability(t) }))
    .filter(t => t.prob > 0.02)
    .sort((a, b) => b.prob - a.prob);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Activity className="w-6 h-6 text-violet-500" />
          Championship DNA Analysis
        </h2>
        <p className="text-slate-400">
          Since 2002, every national champion has ranked in the Top 25 for both adjusted offensive 
          and defensive efficiency. Teams with this dual-threat profile are shown below.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {contenders.map(({ team, prob }) => {
          const kpRank = team.kenPomRank || 50;
          const hasDna = kpRank <= 25 && (team.adjOE || 0) >= 115 && (team.adjDE || 100) <= 95;
          
          return (
            <div key={team.id} className={`bg-slate-900/50 border rounded-xl p-5 ${
              hasDna ? 'border-violet-500/30' : 'border-slate-800'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-white">{team.name}</div>
                  <div className="text-sm text-slate-400">{team.seed} Seed • {team.record}</div>
                </div>
                {hasDna && <Crown className="w-5 h-5 text-violet-400" />}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">KenPom</div>
                  <div className="text-lg font-semibold text-white">#{kpRank}</div>
                </div>
                <div className="bg-slate-800 rounded p-2">
                  <div className="text-xs text-slate-500">Title Prob</div>
                  <div className="text-lg font-semibold text-violet-400">{(prob * 100).toFixed(1)}%</div>
                </div>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Adj Offense</span>
                  <span className={team.adjOE && team.adjOE >= 115 ? 'text-green-400' : 'text-slate-300'}>
                    {team.adjOE?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Adj Defense</span>
                  <span className={team.adjDE && team.adjDE <= 95 ? 'text-green-400' : 'text-slate-300'}>
                    {team.adjDE?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Conference</span>
                  <span className="text-slate-300">{team.conference}</span>
                </div>
              </div>
              
              {team.injuries && team.injuries.length > 0 && (
                <div className="mt-3 text-xs text-orange-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {team.injuries.length} injury concern{team.injuries.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext, color }: any) {
  const colorClasses: Record<string, string> = {
    orange: 'from-orange-500/20 to-red-500/20 text-orange-400',
    violet: 'from-violet-500/20 to-purple-500/20 text-violet-400',
    red: 'from-red-500/20 to-pink-500/20 text-red-400',
    emerald: 'from-emerald-500/20 to-green-500/20 text-emerald-400',
  };
  
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm hover:border-slate-700 transition-colors">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-xl font-bold text-white mt-1 truncate">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtext}</p>
    </div>
  );
}

// Generate full tournament bracket
function generateFullBracket(teams: CompleteTeam[], strategy: string): Game[][] {
  const rounds: Game[][] = [[], [], [], [], [], []];
  
  // First round matchups - 2026 NCAA bracket
  const regionMatchups: Record<string, string[][]> = {
    'East': [
      ['duke', 'siena'], ['ohio-state', 'tcu'],
      ['st-johns', 'northern-iowa'], ['kansas', 'cal-baptist'],
      ['louisville', 'south-florida'], ['michigan-state', 'north-dakota-state'],
      ['ucla', 'ucf'], ['uconn', 'furman'],
    ],
    'South': [
      ['florida', 'prairie-view'], ['clemson', 'iowa'],
      ['vanderbilt', 'mcneese'], ['nebraska', 'troy'],
      ['north-carolina', 'vcu'], ['illinois', 'penn'],
      ['saint-marys', 'texas-am'], ['houston', 'idaho'],
    ],
    'Midwest': [
      ['michigan', 'howard'], ['alabama', 'memphis'],
      ['texas-tech', 'akron'], ['creighton', 'james-madison'],
      ['iowa-state', 'miami-oh'], ['kentucky', 'vermont'],
      ['oklahoma', 'mississippi-state'], ['auburn', 'south-dakota-state'],
    ],
    'West': [
      ['arizona', 'long-island'], ['villanova', 'utah-state'],
      ['wisconsin', 'high-point'], ['arkansas', 'hawaii'],
      ['byu', 'texas'], ['gonzaga', 'kennesaw-state'],
      ['miami', 'missouri'], ['purdue', 'queens'],
    ],
  };

  // Generate first round
  Object.entries(regionMatchups).forEach(([region, matchups]) => {
    matchups.forEach(([t1id, t2id], idx) => {
      const team1 = teams.find(t => t.id === t1id);
      const team2 = teams.find(t => t.id === t2id);
      
      if (!team1) {
        console.error(`Team not found: ${t1id}`);
      }
      if (!team2) {
        console.error(`Team not found: ${t2id}`);
      }
      
      if (team1 && team2) {
        const result = predictWinner(team1, team2);
        
        // Apply strategy
        let winner = result.winner;
        if (strategy === 'chalk') {
          winner = team1.seed < team2.seed ? team1 : team2;
        } else if (strategy === 'aggressive' && result.upsetProbability > 0.3) {
          if (Math.random() < 0.35) {
            winner = result.winner.id === team1.id ? team2 : team1;
          }
        }
        
        rounds[0].push({
          id: `${region}-r64-${idx}`,
          round: 1,
          team1,
          team2,
          winner,
          confidence: result.confidence,
          upsetProbability: result.upsetProbability,
          predictionFactors: result.factors,
        });
      }
    });
  });

  // Generate subsequent rounds
  for (let round = 1; round < 6; round++) {
    const prevRound = rounds[round - 1];
    const numGames = prevRound.length / 2;
    
    for (let i = 0; i < numGames; i++) {
      const game1 = prevRound[i * 2];
      const game2 = prevRound[i * 2 + 1];
      
      if (game1?.winner && game2?.winner) {
        const result = predictWinner(game1.winner, game2.winner);
        
        let winner = result.winner;
        if (strategy === 'chalk') {
          winner = game1.winner.seed < game2.winner.seed ? game1.winner : game2.winner;
        }
        
        rounds[round].push({
          id: `r${[32,16,8,4,2,1][round]}-${i}`,
          round: round + 1,
          team1: game1.winner,
          team2: game2.winner,
          winner,
          confidence: result.confidence,
          upsetProbability: result.upsetProbability,
          predictionFactors: result.factors,
        });
      }
    }
  }
  
  return rounds;
}
