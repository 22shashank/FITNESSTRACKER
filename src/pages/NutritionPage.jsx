import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function NutritionPage() {
  const { meals = [], addMeal, foods = [], addFood } = useFitness()
  const [name, setName] = useState('Eggs')

  function handleAdd() {
    const food = { id: String(Date.now()), name, calories: 150 }
    addFood(food)
    addMeal({ id: String(Date.now()+1), type: 'Meal', date: new Date().toISOString().slice(0,10), foods: [food] })
    setName('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Nutrition</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Meals</h3>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {meals.length ? meals.map((m) => (
            <div key={m.id} className="card rounded-2xl p-4">
              <div className="flex justify-between">
                <h4 className="text-lg font-medium text-white">{m.type}</h4>
                <span className="text-sm text-slate-400">{m.date}</span>
              </div>
              <div className="mt-3 space-y-2">
                {m.foods.map((f, i) => <div key={i} className="flex justify-between text-sm text-slate-300"><span>{f.name}</span><span>{f.calories} kcal</span></div>)}
              </div>
            </div>
          )) : <div className="text-slate-400">No meals logged yet</div>}
        </div>

        <div className="card rounded-2xl p-5">
          <h4 className="text-xl font-semibold text-white">Add food</h4>
          <div className="mt-4 space-y-3">
            <label className="sr-only" htmlFor="food-name">Food name</label>
            <input id="food-name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Food name" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <button type="button" onClick={handleAdd} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white">Add to meal</button>
          </div>
        </div>
      </div>
    </div>
  )
}
