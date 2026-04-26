import Link from "next/link";
import { getCharacters } from "./actions/characters";
import { getHistoricalBattles } from "./actions/battles";

// Componente React SSR
export default async function Home() {
  const characters = await getCharacters();
  const battles = await getHistoricalBattles();

  const totalZombies = characters.filter(c => c.type === 'Zombie').length;
  const totalRobots = characters.filter(c => c.type === 'Robot').length;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="text-center py-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase italic">
          <span className="neon-text-zombie">Zombies</span>
          <span className="text-slate-500 mx-4">VS</span>
          <span className="neon-text-robot">Robots</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Simulador académico avanzado de combate. Utiliza inteligencia táctica, administra tus entidades y descubre quién dominará la arena.
        </p>
        
        <div className="pt-8 flex justify-center gap-6">
          <Link href="/simulator">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-yellow-500/30 transition-transform transform hover:scale-105 uppercase tracking-widest text-sm">
              Iniciar Simulación
            </button>
          </Link>
          <Link href="/characters">
            <button className="glass-panel hover:bg-white/5 font-bold py-4 px-8 rounded-full transition-transform transform hover:scale-105 uppercase tracking-widest text-sm text-slate-300">
              Ver Catálogo
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 text-center border-t-4 border-t-lime-500">
          <h3 className="text-lime-500 font-bold uppercase tracking-widest mb-2">Zombies Registrados</h3>
          <p className="text-6xl font-black text-white">{totalZombies}</p>
        </div>
        
        <div className="glass-panel p-8 text-center border-t-4 border-t-cyan-500">
          <h3 className="text-cyan-500 font-bold uppercase tracking-widest mb-2">Robots Registrados</h3>
          <p className="text-6xl font-black text-white">{totalRobots}</p>
        </div>

        <div className="glass-panel p-8 text-center border-t-4 border-t-yellow-500">
          <h3 className="text-yellow-500 font-bold uppercase tracking-widest mb-2">Batallas Libradas</h3>
          <p className="text-6xl font-black text-white">{battles.length}</p>
        </div>
      </section>
      
    </div>
  );
}
