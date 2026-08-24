import { useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import { getExerciseProgression } from '../utils/analytics'

export default function ProgressPage() {
  const { goals = [], workouts = [] } = useFitness()
  const exerciseNames = [...new Set(workouts.flatMap((workout) => (workout.exercises || []).map((exercise) => exercise.name)).filter(Boolean))]
  const [selectedExercise, setSelectedExercise] = useState(exerciseNames[0] || '')
  const progression = getExerciseProgression(workouts, selectedExercise)
  const latest = progression.at(-1)
  const previous = progression.at(-2)
  const weightChange = latest && previous ? latest.weight - previous.weight : 0
  const completion = goals.length ? Math.round((goals.filter(g => g.isComplete).length / goals.length) * 100) : 0
  const consistency = Math.min(Math.round((workouts.length / 20) * 100), 100)

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Progress</h3>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="card rounded-2xl p-5">
          <p className="text-sm text-slate-400">Goal completion</p>
          <p className="mt-2 text-2xl font-semibold text-white">{completion}%</p>
        </div>
        <div className="card rounded-2xl p-5">
          <p className="text-sm text-slate-400">Workout consistency</p>
          <p className="mt-2 text-2xl font-semibold text-white">{consistency}%</p>
        </div>
      </div>
      <section className="card rounded-2xl p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div><div className="flex items-center gap-2"><TrendingUp size={18} className="text-emerald-400" /><h4 className="text-xl font-semibold text-white">Progressive overload</h4></div><p className="mt-1 text-sm text-slate-400">Compare load, volume, and estimated 1RM across logged sessions.</p></div>
          {exerciseNames.length ? <select value={selectedExercise} onChange={(event) => setSelectedExercise(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white" aria-label="Select exercise">{exerciseNames.map((name) => <option key={name}>{name}</option>)}</select> : null}
        </div>
        {progression.length ? <><div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="rounded-xl bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Best load</p><p className="mt-1 text-lg font-semibold text-white">{latest.weight} kg</p></div><div className="rounded-xl bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Latest volume</p><p className="mt-1 text-lg font-semibold text-white">{latest.volume.toLocaleString()} kg</p></div><div className="rounded-xl bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Estimated 1RM</p><p className="mt-1 text-lg font-semibold text-white">{latest.estimatedOneRepMax} kg</p></div><div className="rounded-xl bg-slate-950/60 p-3"><p className="text-xs text-slate-400">Since last session</p><p className={`mt-1 text-lg font-semibold ${weightChange >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{weightChange >= 0 ? '+' : ''}{weightChange} kg</p></div></div><div className="mt-5 h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={progression}><CartesianGrid strokeDasharray="3 3" stroke="#334155" /><XAxis dataKey="date" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} /><Legend /><Line type="monotone" dataKey="weight" name="Best load" stroke="#34d399" strokeWidth={2} dot /><Line type="monotone" dataKey="estimatedOneRepMax" name="Estimated 1RM" stroke="#60a5fa" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></> : <p className="mt-6 text-sm text-slate-400">Log workouts with sets to unlock exercise progression analytics.</p>}
      </section>
    </div>
  )
}
