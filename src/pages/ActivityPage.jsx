import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function ActivityPage() {
  const { activityEntries = [], addActivity } = useFitness()
  const [form, setForm] = useState({ steps: 5000, running: 0, calories: 200 })

  function save() {
    addActivity({ id: String(Date.now()), date: new Date().toISOString().slice(0,10), ...form })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Activity tracker</h3>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="card rounded-2xl p-5">
          <div className="h-64 overflow-auto">
            {activityEntries.slice(-7).map((a) => (
              <div key={a.id} className="mb-2 rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                <div className="flex justify-between text-sm text-slate-300"><span>{a.date}</span><span>{a.steps} steps</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card rounded-2xl p-5">
          <div className="space-y-3">
            <input type="number" value={form.steps} onChange={(e)=>setForm({...form, steps: Number(e.target.value)})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Steps" />
            <input type="number" value={form.running} onChange={(e)=>setForm({...form, running: Number(e.target.value)})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Running km" />
            <input type="number" value={form.calories} onChange={(e)=>setForm({...form, calories: Number(e.target.value)})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Active calories" />
            <button onClick={save} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Save activity</button>
          </div>
        </div>
      </div>
    </div>
  )
}
