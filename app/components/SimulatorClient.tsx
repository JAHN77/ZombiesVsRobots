"use client"

import { useState } from "react";
import { simulateCombat, BattleResult } from "../actions/battles";

type Character = {
  id: string;
  name: string;
  type: string;
  health: number;
  attack: number;
  defense: number;
  speed: number;
};

export default function SimulatorClient({ characters }: { characters: Character[] }) {
  const [char1, setChar1] = useState<string>(characters[0]?.id || "");
  const [char2, setChar2] = useState<string>(characters[1]?.id || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BattleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSimulation = async () => {
    if (char1 === char2) {
      setError("No puedes enfrentar al mismo personaje contra sí mismo.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await simulateCombat(char1, char2);

    if (res.error) {
      setError(res.error);
    } else if (res.result) {
      setResult(res.result);
    }
    
    setLoading(false);
  };

  const getCharObj = (id: string) => characters.find(c => c.id === id);

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-lg text-center font-bold">{error}</div>
      )}

      {/* Selector Cards */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Contender 1 */}
        <div className="glass-panel p-6 w-full max-w-sm">
          <label className="block text-center text-xs uppercase tracking-widest text-slate-400 mb-4">Contendiente 1</label>
          <select 
            value={char1} 
            onChange={(e) => setChar1(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-white text-lg font-bold outline-none cursor-pointer"
          >
            {characters.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
            ))}
          </select>

          {/* Stats Preview */}
          {getCharObj(char1) && (
            <div className={`mt-6 pt-6 border-t ${getCharObj(char1)?.type === 'Zombie' ? 'border-lime-500/30' : 'border-cyan-500/30'}`}>
              <div className="grid grid-cols-2 gap-3 text-center">
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">HP (Vida)</span>
                   <span className="font-mono text-white text-xl font-black">{getCharObj(char1)?.health}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Ataque</span>
                   <span className="font-mono text-rose-500 text-xl font-black neon-text-rose">{getCharObj(char1)?.attack}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Defensa</span>
                   <span className="font-mono text-indigo-400 text-xl font-black">{getCharObj(char1)?.defense}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Velocidad</span>
                   <span className="font-mono text-yellow-500 text-xl font-black">{getCharObj(char1)?.speed}</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-4xl font-black text-slate-600 italic">VS</div>

        {/* Contender 2 */}
        <div className="glass-panel p-6 w-full max-w-sm">
          <label className="block text-center text-xs uppercase tracking-widest text-slate-400 mb-4">Contendiente 2</label>
          <select 
            value={char2} 
            onChange={(e) => setChar2(e.target.value)}
            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-white text-lg font-bold outline-none cursor-pointer"
          >
            {characters.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
            ))}
          </select>

          {/* Stats Preview */}
          {getCharObj(char2) && (
            <div className={`mt-6 pt-6 border-t ${getCharObj(char2)?.type === 'Zombie' ? 'border-lime-500/30' : 'border-cyan-500/30'}`}>
              <div className="grid grid-cols-2 gap-3 text-center">
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">HP (Vida)</span>
                   <span className="font-mono text-white text-xl font-black">{getCharObj(char2)?.health}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Ataque</span>
                   <span className="font-mono text-rose-500 text-xl font-black neon-text-rose">{getCharObj(char2)?.attack}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Defensa</span>
                   <span className="font-mono text-indigo-400 text-xl font-black">{getCharObj(char2)?.defense}</span>
                 </div>
                 <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 shadow-inner shadow-black">
                   <span className="text-slate-500 block uppercase tracking-widest text-[10px] mb-1">Velocidad</span>
                   <span className="font-mono text-yellow-500 text-xl font-black">{getCharObj(char2)?.speed}</span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <button 
          onClick={startSimulation}
          disabled={loading || char1 === char2}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 px-12 rounded-full uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? 'Simulando Batalla...' : 'EJECUTAR SIMULACIÓN'}
        </button>
      </div>

      {result && (
        <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto border-t-8 border-t-yellow-500 animate-in slide-in-from-bottom-8">
          <h3 className="text-4xl font-black text-center mb-8 uppercase italic text-yellow-500 neon-text-brand">
            ¡GANADOR: {result.winnerName}!
          </h3>
          
          <div className="bg-slate-950/80 rounded-xl p-4 max-h-[400px] overflow-y-auto font-mono text-sm space-y-2">
            {result.logs.map((log, idx) => (
              <div key={idx} className="border-b border-slate-800 pb-2 mb-2">
                <span className="text-slate-500">[Turno {log.turn}]</span>{' '}
                <span className="text-white font-bold">{log.attackerName}</span>{' '}
                <span className="text-slate-400">ataca a</span>{' '}
                <span className="text-white font-bold">{log.defenderName}</span>{' '}
                <span className="text-yellow-500">(-{log.damage} DMG)</span>.{' '}
                <span className="text-slate-400">{log.defenderName} queda con <span className={log.defenderRemainingHealth <= 0 ? 'text-red-500 line-through' : 'text-lime-500'}>{log.defenderRemainingHealth} HP</span>.</span>
              </div>
            ))}
            <div className="text-center pt-4 text-green-400 font-bold uppercase tracking-widest text-lg">
              FIN DE LA SIMULACIÓN
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
