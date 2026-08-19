import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function WeightPage() {
  const { weightEntries = [], addWeightEntry, profile = {} } = useFitness()
  const [entry, setEntry] = useState('')

  function add() {
    if (!entry) return
    addWeightEntry({ id: String(Date.now()), date: new Date().toISOString().slice(0,10), value: Number(entry) })
    setEntry('')
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Weight & body</h3>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card rounded-2xl p-5">
          <div className="mt-4 flex gap-3">
            <input type="number" value={entry} onChange={(e)=>setEntry(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Weight in kg" />
            <button onClick={add} className="rounded-xl bg-emerald-500 px-4 py-2.5 text-white">Add</button>
          </div>
          <div className="mt-5 space-y-2">
            {weightEntries.slice(-7).map((w) => <div key={w.id} className="flex justify-between text-sm text-slate-300"><span>{w.date}</span><span>{w.value} kg</span></div>)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card rounded-2xl p-4 text-sm text-slate-300">Current weight: <span className="font-medium text-white">{profile.weight || '-'}</span></div>
        </div>
      </div>
    </div>
  )
}
