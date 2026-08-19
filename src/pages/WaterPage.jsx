import { useFitness } from '../context/FitnessContext'
import { useState } from 'react'

export default function WaterPage() {
  const { waterEntries = [], addWater } = useFitness()
  const [amt, setAmt] = useState(250)

  function add() {
    addWater({ id: String(Date.now()), amount: Number(amt), date: new Date().toISOString().slice(0,10) })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Water tracker</h3>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="card rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-300">Daily intake</span>
            <span className="text-lg font-semibold text-white">{waterEntries.filter(e=>e.date===new Date().toISOString().slice(0,10)).reduce((s,o)=>s+(Number(o.amount)||0),0)} ml</span>
          </div>
          <div className="mt-5 flex gap-3">
            <input type="number" value={amt} onChange={(e)=>setAmt(e.target.value)} className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" />
            <button onClick={add} className="rounded-xl bg-emerald-500 px-3 py-2.5 text-white">+Add</button>
          </div>
        </div>

        <div className="card rounded-2xl p-5">
          <h4 className="text-xl font-semibold text-white">Recent entries</h4>
          <div className="mt-4 space-y-2">
            {waterEntries.slice(-5).reverse().map((entry) => (
              <div key={entry.id} className="flex justify-between rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-300"><span>{entry.date}</span><span>{entry.amount} ml</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
