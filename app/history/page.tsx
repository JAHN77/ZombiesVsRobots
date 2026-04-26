import { getHistoricalBattles } from "../actions/battles";
import Link from "next/link";

export default async function HistoryPage() {
  const battles = await getHistoricalBattles();

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">Centro de Registros</h2>
          <p className="text-slate-400 mt-2">Bitácora de simulaciones previas extraídas de la base de datos.</p>
        </div>
        <Link href="/simulator">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
            Nueva Simulación
          </button>
        </Link>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 text-xs uppercase tracking-widest text-slate-400 border-b border-white/5">
                <th className="p-4 font-medium">Contendientes</th>
                <th className="p-4 font-medium">Vencedor</th>
                <th className="p-4 font-medium hidden md:table-cell">Turnos de Combate</th>
                <th className="p-4 font-medium hidden sm:table-cell">ID Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {battles.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                    Sin registros de batalla. La simulación está esperando.
                  </td>
                </tr>
              )}
              {battles.map((b) => (
                <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <span className={`font-bold ${b.character1.type === 'Zombie' ? 'text-lime-500' : 'text-cyan-500'}`}>{b.character1.name}</span>
                       <span className="text-slate-600 italic text-xs mx-1">vs</span>
                       <span className={`font-bold ${b.character2.type === 'Zombie' ? 'text-lime-500' : 'text-cyan-500'}`}>{b.character2.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <span className="text-yellow-500 text-lg">🏆</span> 
                       <span className={`font-black uppercase tracking-wider ${b.winner.type === 'Zombie' ? 'text-lime-400' : 'text-cyan-400'}`}>
                         {b.winner.name}
                       </span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400 font-mono hidden md:table-cell">
                    {b.turns}
                  </td>
                  <td className="p-4 text-slate-600 font-mono text-xs hidden sm:table-cell">
                    {b.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
