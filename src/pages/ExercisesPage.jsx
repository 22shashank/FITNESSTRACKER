import { useMemo, useState } from 'react'
import { defaultExercises } from '../data/exercises'

export default function ExercisesPage() {
  const [query, setQuery] = useState('')
  const exercises = useMemo(() => defaultExercises.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.muscle.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Exercise library</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">50+ exercises</h3>
        </div>
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search exercises" className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {exercises.map((exercise) => (
          <div key={exercise.name} className="card rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">{exercise.name}</h4>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">{exercise.muscle}</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Equipment: {exercise.equipment}</p>
              <p>Difficulty: {exercise.difficulty}</p>
            </div>
            <p className="mt-3 text-sm text-slate-400">{exercise.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
