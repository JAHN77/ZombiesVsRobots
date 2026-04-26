"use client"

import { createCharacter } from "@/app/actions/characters";
import { useState } from "react";

export default function CharacterForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createCharacter(formData);
    
    if (result.error) {
      setMsg({ type: 'error', text: result.error });
    } else {
      setMsg({ type: 'success', text: `¡${result.character?.name} creado con éxito!` });
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4">
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-4">Registrar Entidad</h3>
      
      {msg && (
        <div className={`p-3 rounded-lg text-sm font-bold ${msg.type === 'error' ? 'bg-red-500/20 text-red-200' : 'bg-lime-500/20 text-lime-200'}`}>
          {msg.text}
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Nombre</label>
        <input name="name" required className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-yellow-500" placeholder="Ej. Nemesis" />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Bando</label>
        <select name="type" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-yellow-500">
          <option value="Zombie">Zombie</option>
          <option value="Robot">Robot</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">HP (Vida)</label>
          <input name="health" type="number" required min="1" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white outline-none" defaultValue="100"/>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Velocidad</label>
          <input name="speed" type="number" required min="1" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white outline-none" defaultValue="10"/>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Ataque</label>
          <input name="attack" type="number" required min="1" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white outline-none" defaultValue="20"/>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-slate-400 mb-1">Defensa</label>
          <input name="defense" type="number" required min="1" className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2 text-white outline-none" defaultValue="10"/>
        </div>
      </div>

      <div className="pt-4">
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors uppercase tracking-widest text-sm disabled:opacity-50">
          {loading ? 'Procesando...' : 'Añadir Entidad'}
        </button>
      </div>
    </form>
  )
}
