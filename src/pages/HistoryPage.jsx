import { useFitness } from '../context/FitnessContext'

export default function HistoryPage() {
  const { workouts = [], weightEntries = [], waterEntries = [], sleepEntries = [], activityEntries = [], records = [] } = useFitness()
  const items = [
    ...workouts.map(i => ({ ...i, type: 'Workout' })),
    ...weightEntries.map(i => ({ ...i, type: 'Weight' })),
    ...waterEntries.map(i => ({ ...i, type: 'Water' })),
    ...sleepEntries.map(i => ({ ...i, type: 'Sleep' })),
    ...activityEntries.map(i => ({ ...i, type: 'Activity' })),
    ...records.map(i => ({ ...i, type: 'PR' })),
  ].sort((a,b)=> new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">History</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="card flex items-center justify-between rounded-2xl p-4 text-sm text-slate-300">
            <div>
              <p className="font-medium text-white">{item.type}</p>
              <p>{item.title || item.exercise || item.name || item.value || 'Entry'}</p>
            </div>
            <span>{item.date || 'Today'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
