import { useFitness } from '../context/FitnessContext'

export default function ProgressPage() {
  const { goals = [], workouts = [] } = useFitness()
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
    </div>
  )
}
