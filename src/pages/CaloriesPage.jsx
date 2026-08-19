import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function CaloriesPage() {
  const { profile, setProfile } = useFitness()
  const [form, setForm] = useState({
    age: profile.age || 29,
    gender: profile.gender || 'male',
    height: profile.height || 176,
    weight: profile.weight || 74,
    activityLevel: profile.activityLevel || 'moderate',
    goal: profile.goal || 'Maintain',
  })

  const bmr = form.gender === 'male'
    ? 10 * form.weight + 6.25 * form.height - 5 * form.age + 5
    : 10 * form.weight + 6.25 * form.height - 5 * form.age - 161

  const activityMultipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }
  const tdee = Math.round(bmr * activityMultipliers[form.activityLevel])

  function save() {
    setProfile({ ...profile, ...form, dailyCalories: tdee })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Calorie calculator</h3>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="card rounded-2xl p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <input type="number" value={form.age} onChange={(e)=>setForm({...form, age: Number(e.target.value)})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <select value={form.gender} onChange={(e)=>setForm({...form, gender: e.target.value})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="number" value={form.height} onChange={(e)=>setForm({...form, height: Number(e.target.value)})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <input type="number" value={form.weight} onChange={(e)=>setForm({...form, weight: Number(e.target.value)})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <select value={form.activityLevel} onChange={(e)=>setForm({...form, activityLevel: e.target.value})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white sm:col-span-2">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
            <select value={form.goal} onChange={(e)=>setForm({...form, goal: e.target.value})} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white sm:col-span-2">
              <option value="Lose weight">Lose weight</option>
              <option value="Maintain">Maintain</option>
              <option value="Gain muscle">Gain muscle</option>
            </select>
          </div>
          <button onClick={save} className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Save target</button>
        </div>

        <div className="space-y-4">
          <div className="card rounded-2xl p-4">
            <p className="text-sm text-slate-400">Estimated TDEE</p>
            <p className="mt-2 text-2xl font-semibold text-white">{tdee} kcal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
