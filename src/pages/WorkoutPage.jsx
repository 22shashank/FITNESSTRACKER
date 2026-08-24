import { useState } from 'react'
import { Dumbbell, Plus, Save, Trash2 } from 'lucide-react'
import { useFitness } from '../context/FitnessContext'
import { calculateWorkoutMetrics, estimateOneRepMax } from '../utils/analytics'

const emptySet = { weight: 0, reps: 0 }

export default function WorkoutPage() {
  const { workouts = [], addWorkout, updateWorkout, deleteWorkout } = useFitness()
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ title: '', duration: 45, notes: '', exerciseName: 'Bench Press', sets: [{ ...emptySet }] })

  function updateSet(index, key, value) {
    setForm((previous) => ({ ...previous, sets: previous.sets.map((set, setIndex) => setIndex === index ? { ...set, [key]: Number(value) } : set) }))
  }

  function saveWorkout() {
    if (!form.title.trim() || !form.exerciseName.trim() || !form.sets.some((set) => set.weight > 0 && set.reps > 0)) return
    const workout = { id: editingId || `workout-${Date.now()}`, title: form.title.trim(), date: new Date().toISOString().slice(0, 10), duration: Number(form.duration), notes: form.notes.trim(), exercises: [{ name: form.exerciseName.trim(), sets: form.sets.filter((set) => set.weight > 0 && set.reps > 0) }] }
    editingId ? updateWorkout(editingId, workout) : addWorkout(workout)
    setEditingId(null)
    setForm({ title: '', duration: 45, notes: '', exerciseName: 'Bench Press', sets: [{ ...emptySet }] })
  }

  function editWorkout(workout) {
    const exercise = workout.exercises?.[0] || { name: 'Bench Press', sets: [{ ...emptySet }] }
    setEditingId(workout.id)
    setForm({ title: workout.title, duration: workout.duration || 45, notes: workout.notes || '', exerciseName: exercise.name, sets: exercise.sets?.length ? exercise.sets : [{ ...emptySet }] })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Workout tracker</p>
        <h3 className="mt-2 text-3xl font-semibold text-white">Training log</h3>
        <p className="mt-2 text-sm text-slate-400">Capture sets and load so progressive overload becomes visible.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {workouts.length ? workouts.map((w) => {
            const metrics = calculateWorkoutMetrics(w)
            const best = w.exercises?.[0]?.sets?.reduce((set, current) => Number(current.weight) > Number(set.weight) ? current : set, { weight: 0, reps: 0 })
            return (
            <div key={w.id} className="card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white">{w.title}</h4>
                  <p className="text-sm text-slate-400">{w.date} · {w.duration} min</p>
                </div>
                <div className="flex gap-2"><button onClick={() => editWorkout(w)} className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">Edit</button><button onClick={() => deleteWorkout(w.id)} className="rounded-lg bg-red-500/15 p-2 text-red-300" aria-label={`Delete ${w.title}`}><Trash2 size={15} /></button></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300"><span className="rounded-lg bg-slate-800 px-2 py-1">{metrics.sets} sets</span><span className="rounded-lg bg-slate-800 px-2 py-1">{metrics.reps} reps</span><span className="rounded-lg bg-slate-800 px-2 py-1">{metrics.volume.toLocaleString()} kg volume</span><span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-emerald-300">Est. 1RM {Math.round(estimateOneRepMax(best?.weight, best?.reps))} kg</span></div>
              {w.exercises?.map((exercise) => <div key={exercise.name} className="mt-4 border-t border-slate-800 pt-3"><p className="text-sm font-medium text-white">{exercise.name}</p><div className="mt-2 flex flex-wrap gap-2">{(exercise.sets || []).map((set, index) => <span key={`${w.id}-${index}`} className="rounded-lg bg-slate-950 px-2 py-1 text-xs text-slate-300">{set.weight}kg x {set.reps}</span>)}</div></div>)}
            </div>
            )
          }) : <div className="text-slate-400">No workouts yet</div>}
        </div>

        <div className="card rounded-2xl p-5">
          <div className="flex items-center gap-2"><Dumbbell size={18} className="text-emerald-400" /><h4 className="text-xl font-semibold text-white">{editingId ? 'Edit workout' : 'Log workout'}</h4></div>
          <div className="mt-4 space-y-3">
            <label className="block text-sm text-slate-300">Workout name<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="Push Day" /></label>
            <div className="grid grid-cols-2 gap-3"><label className="text-sm text-slate-300">Exercise<input value={form.exerciseName} onChange={(event) => setForm({ ...form, exerciseName: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" /></label><label className="text-sm text-slate-300">Duration<input type="number" min="1" value={form.duration} onChange={(event) => setForm({ ...form, duration: Number(event.target.value) })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" /></label></div>
            <div><div className="mb-2 flex items-center justify-between"><p className="text-sm text-slate-300">Sets</p><button type="button" onClick={() => setForm({ ...form, sets: [...form.sets, { ...emptySet }] })} className="flex items-center gap-1 text-xs text-emerald-300"><Plus size={14} /> Add set</button></div><div className="space-y-2">{form.sets.map((set, index) => <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2"><input type="number" min="0" value={set.weight} onChange={(event) => updateSet(index, 'weight', event.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" placeholder="kg" aria-label={`Set ${index + 1} weight`} /><input type="number" min="0" value={set.reps} onChange={(event) => updateSet(index, 'reps', event.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white" placeholder="reps" aria-label={`Set ${index + 1} reps`} /><button type="button" onClick={() => setForm({ ...form, sets: form.sets.filter((_, setIndex) => setIndex !== index) })} className="p-2 text-slate-500" aria-label={`Remove set ${index + 1}`}><Trash2 size={15} /></button></div>)}</div></div>
            <label className="block text-sm text-slate-300">Notes<textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-1 min-h-20 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" placeholder="How did the session feel?" /></label>
            <button type="button" onClick={saveWorkout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950"><Save size={16} /> {editingId ? 'Save changes' : 'Save workout'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
