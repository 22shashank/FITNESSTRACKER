import { useFitness } from '../context/FitnessContext'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function DashboardPage() {
  const { workouts = [], meals = [], waterEntries = [], weightEntries = [], profile = {} } = useFitness()

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">How am I doing today?</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Momentum is building</h3>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card rounded-2xl p-4">
          <p className="text-sm text-slate-400">Workouts</p>
          <p className="mt-2 text-2xl font-semibold text-white">{workouts.length}</p>
        </div>
        <div className="card rounded-2xl p-4">
          <p className="text-sm text-slate-400">Meals</p>
          <p className="mt-2 text-2xl font-semibold text-white">{meals.length}</p>
        </div>
        <div className="card rounded-2xl p-4">
          <p className="text-sm text-slate-400">Water (today)</p>
          <p className="mt-2 text-2xl font-semibold text-white">{waterEntries.filter((e) => e.date === new Date().toISOString().slice(0,10)).reduce((s,o)=>s+(Number(o.amount)||0),0)} ml</p>
        </div>
      </div>

      <div className="card rounded-2xl p-4">
        <p className="text-sm text-slate-400">Current weight</p>
        <div className="mt-2 text-2xl font-semibold text-white">{(weightEntries.length ? weightEntries[weightEntries.length-1].value : profile.weight) || '-'} kg</div>
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightEntries.slice(-7).map(w => ({ date: w.date.slice(5), value: w.value }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
