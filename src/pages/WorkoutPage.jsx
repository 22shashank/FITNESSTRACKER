import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function WorkoutPage() {
  const { workouts = [], addWorkout, deleteWorkout } = useFitness()
  const [title, setTitle] = useState('Push Day')

  function handleAdd() {
    if (!title) return
    addWorkout({ id: String(Date.now()), title, date: new Date().toISOString().slice(0,10), duration: 45, exercises: [] })
    setTitle('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Workout tracker</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Training log</h3>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {workouts.length ? workouts.map((w) => (
            <div key={w.id} className="card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">{w.title}</h4>
                  <p className="text-sm text-slate-400">{w.date} · {w.duration} min</p>
                </div>
                <button onClick={() => deleteWorkout(w.id)} className="rounded-lg bg-red-500/20 px-3 py-1.5 text-sm text-red-300">Delete</button>
              </div>
            </div>
          )) : <div className="text-slate-400">No workouts yet</div>}
        </div>

        <div className="card rounded-2xl p-5">
          <h4 className="text-xl font-semibold text-white">Add workout</h4>
          <div className="mt-4 space-y-3">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Workout name" />
            <button onClick={handleAdd} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Save workout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
