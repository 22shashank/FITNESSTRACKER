import { useMemo, useState } from 'react'
import { defaultExercises } from '../data/exercises'
import { getExerciseVisual } from '../data/visualAssets'
import VisualImage from '../components/VisualImage'
import Modal from '../components/Modal'
import { getExerciseProgression } from '../utils/analytics'
import { useFitness } from '../context/FitnessContext'

export default function ExercisesPage() {
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState('All')
  const [selected, setSelected] = useState(null)
  const { workouts = [] } = useFitness()
  const exercises = useMemo(() => defaultExercises.filter((item) => (item.name.toLowerCase().includes(query.toLowerCase()) || item.muscle.toLowerCase().includes(query.toLowerCase())) && (muscle === 'All' || item.muscle === muscle)), [muscle, query])
  const muscles = ['All', ...new Set(defaultExercises.map((item) => item.muscle))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Exercise library</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">50+ exercises</h3>
        </div>
        <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="ex-search">Search exercises</label><input id="ex-search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search exercises" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" /><select value={muscle} onChange={(event) => setMuscle(event.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" aria-label="Filter by muscle">{muscles.map((item) => <option key={item}>{item}</option>)}</select></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {exercises.length === 0 && <div className="card rounded-2xl p-6 text-slate-400"><div className="h-40 overflow-hidden rounded-xl"><VisualImage src={undefined} kind="emptyWorkout" alt="No matching exercises" /></div><p className="mt-4">No matching exercises. Try another muscle group or search term.</p></div>}
        {exercises.map((exercise) => (
          <button type="button" key={exercise.name} onClick={() => setSelected(exercise)} className="card overflow-hidden rounded-2xl text-left transition hover:border-emerald-400/50">
            <div className="aspect-[16/8]"><VisualImage src={getExerciseVisual(exercise.muscle)} kind="exercise" alt={`${exercise.name} exercise illustration`} /></div>
            <div className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">{exercise.name}</h4>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">{exercise.muscle}</span>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p>Equipment: {exercise.equipment}</p>
              <p>Difficulty: {exercise.difficulty}</p>
            </div>
            <p className="mt-3 text-sm text-slate-400">{exercise.instructions}</p></div>
          </button>
        ))}
      </div>
      {selected && <Modal title={selected.name} onClose={() => setSelected(null)}><div className="overflow-hidden rounded-xl"><VisualImage src={getExerciseVisual(selected.muscle)} kind="exercise" alt={`${selected.name} exercise illustration`} loading="eager" /></div><div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-lg bg-slate-800 px-2 py-1">{selected.muscle}</span><span className="rounded-lg bg-slate-800 px-2 py-1">{selected.equipment}</span><span className="rounded-lg bg-slate-800 px-2 py-1">{selected.difficulty}</span></div><h4 className="mt-5 font-semibold text-white">How to perform</h4><p className="mt-2 text-sm leading-6 text-slate-300">{selected.instructions}</p><h4 className="mt-5 font-semibold text-white">Your progress</h4>{getExerciseProgression(workouts, selected.name).length ? <div className="mt-2 space-y-2">{getExerciseProgression(workouts, selected.name).map((item) => <div key={item.date} className="flex justify-between rounded-lg bg-slate-950/60 px-3 py-2 text-sm text-slate-300"><span>{item.date}</span><span>{item.weight}kg x {item.reps}</span></div>)}</div> : <p className="mt-2 text-sm text-slate-500">Log this exercise in a workout to see progression here.</p>}</Modal>}
    </div>
  )
}
