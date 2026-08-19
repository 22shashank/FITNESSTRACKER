import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function GoalsPage() {
  const { goals = [], addGoal, completeGoal } = useFitness()
  const [form, setForm] = useState({ name: 'Run 50 km', category: 'Cardio', target: 50, current: 0, deadline: '' })

  function save() {
    addGoal({ ...form, id: String(Date.now()), current: form.current || 0, isComplete: false })
    setForm({ name: '', category: 'Cardio', target: 0, current: 0, deadline: '' })
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">{goal.name}</h4>
                  <p className="text-sm text-slate-400">{goal.category}</p>
                </div>
                <button onClick={() => completeGoal(goal.id)} className="rounded-xl bg-emerald-500/20 px-3 py-1.5 text-sm text-emerald-300">Complete</button>
              </div>
              <div className="mt-5 h-2 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{goal.current}/{goal.target}</p>
            </div>
          ))}
        </div>

        <div className="card rounded-2xl p-5">
          <h4 className="text-xl font-semibold text-white">Create goal</h4>
          <div className="mt-4 space-y-3">
            <label className="sr-only" htmlFor="goal-name">Goal name</label>
            <input id="goal-name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Goal name" />
            <label className="sr-only" htmlFor="goal-target">Target</label>
            <input id="goal-target" type="number" value={form.target} onChange={(e)=>setForm({...form, target: Number(e.target.value)})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Target" />
            <input type="date" value={form.deadline} onChange={(e)=>setForm({...form, deadline: e.target.value})} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <button onClick={save} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Save goal</button>
          </div>
        </div>
      </div>
    </div>
  )
}
