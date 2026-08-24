import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'
import { Link } from 'react-router-dom'
import { Activity, Flame, Footprints, Moon, Scale, Trophy, Utensils } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { aggregateMacroEntries, percentage } from '../utils/analytics'

export default function DashboardPage() {
  const { workouts = [], waterEntries = [], weightEntries = [], activityEntries = [], sleepEntries = [], profile = {}, macroEntries = [], macroTargets = {} } = useFitness()
  const today = new Date().toISOString().slice(0, 10)
  const [range, setRange] = useState(7)
  const macros = aggregateMacroEntries(macroEntries, today)
  const water = waterEntries.filter((entry) => entry.date === today).reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  const activity = activityEntries.filter((entry) => entry.date === today).reduce((total, entry) => ({ steps: total.steps + Number(entry.steps || 0), running: total.running + Number(entry.running || 0) }), { steps: 0, running: 0 })
  const sleep = sleepEntries.find((entry) => entry.date === today)?.hours || 0
  const todayWorkouts = workouts.filter((workout) => workout.date === today)
  const trend = Array.from({ length: range }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (range - index - 1))
    const key = date.toISOString().slice(0, 10)
    const dayMacros = aggregateMacroEntries(macroEntries, key)
    const dayActivity = activityEntries.filter((entry) => entry.date === key).reduce((sum, entry) => sum + Number(entry.steps || 0), 0)
    const dayWorkouts = workouts.filter((workout) => workout.date === key).length
    const dayWeight = weightEntries.find((entry) => entry.date === key)?.value
    return { date: key.slice(5), calories: Math.round(dayMacros.calories), calorieTarget: macroTargets.calories, protein: Math.round(dayMacros.protein), proteinTarget: macroTargets.protein, steps: dayActivity, workouts: dayWorkouts, weight: dayWeight }
  })
  const weekWorkouts = workouts.filter((workout) => trend.some((day) => workout.date.slice(5) === day.date))
  const averageProtein = trend.reduce((sum, day) => sum + day.protein, 0) / trend.length
  const weightData = trend.filter((day) => day.weight)
  const metricCards = [
    ['Calories', `${Math.round(macros.calories)} / ${macroTargets.calories || 0} kcal`, Flame, '#34d399'],
    ['Protein', `${Math.round(macros.protein)} / ${macroTargets.protein || 0} g`, Trophy, '#60a5fa'],
    ['Water', `${(water / 1000).toFixed(1)} / ${(profile.waterTarget || 3).toFixed(1)} L`, Utensils, '#22d3ee'],
    ['Steps', `${activity.steps.toLocaleString()} / ${(profile.stepTarget || 8000).toLocaleString()}`, Footprints, '#fbbf24'],
    ['Sleep', `${sleep || 0} / 8 hrs`, Moon, '#c084fc'],
    ['Workout', todayWorkouts.length ? `${todayWorkouts.length} completed` : 'Not logged', Activity, '#fb7185'],
  ]

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">How am I doing today?</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Today's overview</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">Track the signals that matter, then use the trends to decide what to do next.</p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metricCards.map(([label, value, Icon, color]) => <div key={label} className="card rounded-2xl p-4"><div className="flex items-center gap-2 text-sm text-slate-400"><Icon size={16} style={{ color }} />{label}</div><p className="mt-3 text-xl font-semibold text-white">{value}</p></div>)}</div>

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

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="card rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-slate-400">Performance analytics</p><h3 className="mt-1 text-xl font-semibold text-white">Nutrition and activity trend</h3></div><div className="flex gap-1">{[7, 30, 90].map((days) => <button key={days} onClick={() => setRange(days)} className={`rounded-lg px-3 py-1.5 text-xs ${range === days ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>{days}D</button>)}</div></div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
              <Legend />
              <Line type="monotone" dataKey="calories" name="Calories" stroke="#34d399" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="protein" name="Protein" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-6"><div className="card rounded-2xl p-5"><div className="flex items-center gap-2"><Scale size={17} className="text-emerald-400" /><h3 className="text-lg font-semibold text-white">Weight trend</h3></div><p className="mt-2 text-3xl font-semibold text-white">{(weightEntries.at(-1)?.value || profile.weight || 0)} <span className="text-sm font-normal text-slate-400">kg</span></p><div className="mt-4 h-24"><ResponsiveContainer width="100%" height="100%"><LineChart data={weightData}><Line type="monotone" dataKey="weight" stroke="#34d399" strokeWidth={2} dot /><XAxis dataKey="date" hide /><YAxis domain={['dataMin - 1', 'dataMax + 1']} hide /></LineChart></ResponsiveContainer></div></div><div className="card rounded-2xl p-5"><h3 className="text-lg font-semibold text-white">Live insights</h3><div className="mt-4 space-y-3 text-sm text-slate-300"><p>Protein average: <strong className="text-white">{Math.round(averageProtein)}g</strong> over the last {range} days.</p><p>You logged <strong className="text-white">{weekWorkouts.length}</strong> workout{weekWorkouts.length === 1 ? '' : 's'} in this period.</p><p>Today's calorie progress is <strong className="text-emerald-300">{percentage(macros.calories, macroTargets.calories)}%</strong>.</p></div></div></div>
      </section>
    </div>
  )
}
