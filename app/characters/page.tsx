import CharacterForm from "../components/CharacterForm";
import { getCharacters, upgradeCharacterStat } from "../actions/characters";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const resolvedParams = await searchParams;
  const filter = resolvedParams.filter;
  const characters = await getCharacters(filter);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1">
        <CharacterForm />
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between glass-panel p-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-200">Catálogo</h2>
          <div className="space-x-2">
            <a href="/characters" className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${!filter ? 'bg-white text-black' : 'bg-slate-800 text-slate-400'}`}>Todos</a>
            <a href="/characters?filter=Zombie" className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${filter === 'Zombie' ? 'bg-lime-500 text-black' : 'bg-slate-800 text-slate-400'}`}>Zombies</a>
            <a href="/characters?filter=Robot" className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${filter === 'Robot' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'}`}>Robots</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.length === 0 && (
            <p className="text-slate-500 italic p-4">No hay personajes registrados en esta categoría.</p>
          )}
          {characters.map(char => (
            <div key={char.id} className={`p-4 rounded-xl border border-white/5 relative overflow-hidden group ${char.statPoints > 0 ? (char.type === 'Zombie' ? 'bg-lime-900/40 border-lime-500/50 shadow-[0_0_15px_rgba(132,204,22,0.2)]' : 'bg-cyan-900/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]') : 'bg-slate-900/40'}`}>
              <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full -z-10 transition-transform group-hover:scale-150 ${char.type === 'Zombie' ? 'bg-lime-500/10' : 'bg-cyan-500/10'}`}></div>
              
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-bold text-lg ${char.type === 'Zombie' ? 'text-lime-400' : 'text-cyan-400'}`}>{char.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white font-bold bg-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      LVL {char.level}
                    </span>
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div className="h-full bg-yellow-400 transition-all" style={{ width: `${Math.min(100, Math.max(0, char.experience))}%`}}></div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{char.experience}/100</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                   <span className="text-[10px] uppercase tracking-widest bg-slate-800 px-2 py-1 rounded text-slate-300 mb-1">{char.type}</span>
                   {char.statPoints > 0 && <span className="text-[10px] font-bold text-yellow-400 animate-pulse bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/30">+{char.statPoints} PUNTOS libres</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                {[
                  { key: 'health', label: 'HP' },
                  { key: 'speed', label: 'Velocidad' },
                  { key: 'attack', label: 'Ataque' },
                  { key: 'defense', label: 'Defensa' }
                ].map((stat) => (
                  <div key={stat.key} className="bg-slate-950/50 p-2 rounded flex justify-between items-center group">
                    <div>
                      <span className="text-slate-500 block uppercase text-[10px]">{stat.label}</span>
                      <span className="text-white font-mono">{String(char[stat.key as keyof typeof char])}</span>
                    </div>
                    {char.statPoints > 0 && (
                      <form action={upgradeCharacterStat.bind(null, char.id, stat.key as "health"|"attack"|"defense"|"speed")}>
                        <button type="submit" className="w-6 h-6 rounded-full bg-yellow-500 text-black font-black flex items-center justify-center transform hover:scale-110 active:scale-95 shadow shadow-yellow-500/50">
                          +
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
