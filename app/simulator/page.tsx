import SimulatorClient from "../components/SimulatorClient";
import { getCharacters } from "../actions/characters";

export default async function SimulatorPage() {
  const characters = await getCharacters();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black uppercase italic tracking-widest text-white">Anfiteatro de Simulaciones</h2>
        <p className="text-slate-400 mt-2">Selecciona dos entidades para calcular probabilística de combate.</p>
      </div>
      
      {characters.length < 2 ? (
        <div className="glass-panel p-8 text-center text-yellow-500 font-bold uppercase">
          Necesitas al menos 2 personajes registrados para simular una batalla.
        </div>
      ) : (
        <SimulatorClient characters={characters} />
      )}
    </div>
  );
}
