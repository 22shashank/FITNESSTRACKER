import { useFitness } from '../context/FitnessContext'
import { Link } from 'react-router-dom'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function DashboardPage() {
  const { workouts = [], meals = [], waterEntries = [], weightEntries = [], profile = {}, macroEntries = [], macroTargets = {} } = useFitness()
  const today = new Date().toISOString().slice(0, 10)
  const macros = macroEntries.filter((entry) => entry.date === today).reduce((totals, entry) => ({
    calories: totals.calories + Number(entry.calories || 0),
    protein: totals.protein + Number(entry.protein || 0),
    carbs: totals.carbs + Number(entry.carbs || 0),
    fat: totals.fat + Number(entry.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

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

      <Link to="/macros" className="card block rounded-2xl p-5 transition hover:border-emerald-400/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-400">Today's Macros</p>
            <h4 className="mt-1 text-xl font-semibold text-white">Nutrition at a glance</h4>
          </div>
          <span className="text-sm text-emerald-300">View Macros →</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['Calories', macros.calories, macroTargets.calories, 'kcal'], ['Protein', macros.protein, macroTargets.protein, 'g'], ['Carbs', macros.carbs, macroTargets.carbs, 'g'], ['Fat', macros.fat, macroTargets.fat, 'g']].map(([label, value, target, unit]) => (
            <div key={label}>
              <p className="text-xs text-slate-400">{label}</p>
              <p className="mt-1 font-semibold text-white">{Math.round(value)} / {target || 0}{unit}</p>
            </div>
          ))}
        </div>
      </Link>

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
