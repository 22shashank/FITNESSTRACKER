import { useFitness } from '../context/FitnessContext'

export default function RecordsPage() {
  const { records = [] } = useFitness()

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Personal records</h3>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {records.length ? records.map((r) => (
          <div key={r.id} className="card rounded-2xl p-5">
            <p className="text-sm text-amber-400">PR</p>
            <p className="mt-3 text-xl font-semibold text-white">{r.exercise}</p>
            <p className="mt-2 text-sm text-slate-300">{r.metric || 'Personal record'}: {r.value}</p>
            <p className="mt-2 text-xs text-slate-500">Achieved {r.date || 'recently'}</p>
          </div>
        )) : <div className="text-slate-400">No records yet</div>}
      </div>
    </div>
  )
}
