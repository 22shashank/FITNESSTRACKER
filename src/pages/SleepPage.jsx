import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function SleepPage() {
  const { sleepEntries = [], addSleep } = useFitness()
  const [hours, setHours] = useState(7.5)

  function save() {
    addSleep({ id: String(Date.now()), date: new Date().toISOString().slice(0,10), hours: Number(hours), quality: 'Good' })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Sleep tracker</h3>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card rounded-2xl p-5">
          <div className="h-64 overflow-auto">
            {sleepEntries.slice(-7).map((s) => (
              <div key={s.id} className="mb-2 rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                <div className="flex justify-between text-sm text-slate-300"><span>{s.date}</span><span>{s.hours} hrs</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card rounded-2xl p-5">
          <div className="space-y-3">
            <input type="number" value={hours} onChange={(e)=>setHours(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <button onClick={save} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Save sleep</button>
          </div>
        </div>
      </div>
    </div>
  )
}
