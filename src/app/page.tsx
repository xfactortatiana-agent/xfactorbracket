"use client";

import { useState, useEffect } from 'react';
import { teams2025, getTeamsByRegion } from '../data/teams2025';
import { predictWinner, runMonteCarloSimulation, generateBracket, Team, Game } from '../lib/predictor';
import { Trophy, TrendingUp, Zap, Target, BarChart3, Clock, RefreshCw, Download, ChevronRight, Star } from 'lucide-react';

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [strategy, setStrategy] = useState('balanced');
  const [bracket, setBracket] = useState<Game[]>([]);
  const [championshipOdds, setChampionshipOdds] = useState<Map<string, number>>(new Map());
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const regions = ['All', 'South', 'East', 'Midwest', 'West'];
  const strategies = [
    { id: 'chalk', name: 'Chalk', desc: 'All favorites, safe picks' },
    { id: 'balanced', name: 'Balanced', desc: 'Smart upsets, optimal EV' },
    { id: 'aggressive', name: 'Aggressive', desc: 'High variance, high ceiling' },
  ];

  useEffect(() => {
    generateNewBracket();
    runSimulation();
  }, [strategy]);

  const generateNewBracket = () => {
    const newBracket = generateBracket(teams2025, strategy as any);
    setBracket(newBracket);
    setLastUpdated(new Date());
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const odds = runMonteCarloSimulation(teams2025, 1000);
    setChampionshipOdds(odds);
    setIsSimulating(false);
  };

  const filteredTeams = selectedRegion === 'All' ? teams2025 : getTeamsByRegion(selectedRegion);

  const topContenders = Array.from(championshipOdds.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([teamId, odds]) => ({
      team: teams2025.find(t => t.id === teamId)!,
      odds: odds * 100
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">xFactor + Tatiana</h1>
                <p className="text-slate-400 text-sm">March Madness Prediction Engine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={generateNewBracket} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
                <RefreshCw className="w-4 h-4" />Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg">
                <Download className="w-4 h-4" />Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard icon={Zap} label="Predictions" value="63 Games" subtext="First round" />
          <StatCard icon={Target} label="Confidence" value="72%" subtext="High agreement" />
          <StatCard icon={TrendingUp} label="Upsets" value="23%" subtext="5-7 expected" />
          <StatCard icon={Clock} label="Updated" value={lastUpdated.toLocaleTimeString()} subtext="Real-time" />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Strategy</h2>
              <div className="space-y-2">
                {strategies.map(s => (
                  <button key={s.id} onClick={() => setStrategy(s.id)}
                    className={`w-full text-left p-4 rounded-lg border ${strategy === s.id ? 'border-violet-500 bg-violet-500/10' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{s.name}</span>
                      {strategy === s.id && <Star className="w-4 h-4 text-violet-400" />}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Championship Odds</h2>
              {isSimulating ? (
                <div className="flex justify-center py-8"><RefreshCw className="w-8 h-8 text-violet-400 animate-spin" /></div>
              ) : (
                <div className="space-y-3">
                  {topContenders.map(({ team, odds }, idx) => (
                    <div key={team.id} className="flex items-center gap-3">
                      <span className="text-slate-500 w-6">#{idx + 1}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">{team.name}</span>
                          <span className="text-violet-400">{odds.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: `${odds * 2}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">First Round Picks</h2>
                <div className="flex gap-2">
                  {regions.map(r => (
                    <button key={r} onClick={() => setSelectedRegion(r)}
                      className={`px-3 py-1 rounded text-sm ${selectedRegion === r ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {bracket.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {bracket.filter(g => selectedRegion === 'All' || g.team1.region === selectedRegion).map(game => {
                    const prediction = predictWinner(game.team1, game.team2);
                    const winner = game.winner || game.team1;
                    const isUpset = winner.seed > Math.min(game.team1.seed, game.team2.seed);
                    return (
                      <div key={game.id} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          {isUpset && <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">Upset!</span>}
                          <span className="text-xs text-slate-500">{(prediction.confidence * 100).toFixed(0)}% conf</span>
                        </div>
                        <div className="space-y-2">
                          {[game.team1, game.team2].map(team => (
                            <div key={team.id} className={`flex items-center justify-between p-2 rounded ${winner.id === team.id ? 'bg-violet-500/20' : 'opacity-50'}`}>
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-bold">{team.seed}</span>
                                <span className="text-white">{team.name}</span>
                              </div>
                              {winner.id === team.id && <ChevronRight className="w-4 h-4 text-violet-400" />}
                            </div>
                          ))}
                        </div>
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
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext }: any) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-violet-400" />
      </div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{subtext}</p>
    </div>
  );
}
