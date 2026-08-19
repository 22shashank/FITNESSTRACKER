import { useState } from 'react'
import { useFitness } from '../context/FitnessContext.jsx'
import { exportAllData, importAllData } from '../services/storage'
import Toast from '../components/Toast'

export default function SettingsPage() {
  const [msg, setMsg] = useState('')
  const [toast, setToast] = useState(null)
    const { loadDemoData, resetDemoData } = useFitness()

  function handleExport() {
    const json = exportAllData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fitness-data.json'
    a.click()
    URL.revokeObjectURL(url)
    setMsg('Exported data')
    setToast({ message: 'Exported data', type: 'success' })
  }

  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const ok = importAllData(text)
    setMsg(ok ? 'Imported data' : 'Import failed')
    setToast({ message: ok ? 'Imported data' : 'Import failed', type: ok ? 'success' : 'error' })
    if (ok) window.location.reload()
  }
  
    function handleLoadDemo() {
      loadDemoData()
      setToast({ message: 'Loaded demo data', type: 'success' })
      setTimeout(() => window.location.reload(), 250)
    }
  
    function handleReset() {
      resetDemoData()
      setToast({ message: 'Reset to defaults', type: 'info' })
      setTimeout(() => window.location.reload(), 250)
    }

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-white">Settings</h3>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card rounded-2xl p-5">
          <h4 className="text-xl font-semibold text-white">Data management</h4>
          <div className="mt-4 space-y-3">
            <button onClick={handleExport} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white">Export Data</button>
            <label className="w-full block rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white text-left">
              Import Data
              <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </label>
              <button onClick={handleLoadDemo} className="w-full rounded-xl border border-slate-700 bg-emerald-600/10 px-4 py-3 text-white">Load Demo Data</button>
              <button onClick={handleReset} className="w-full rounded-xl border border-red-700 bg-red-500/10 px-4 py-3 text-red-200">Reset Data</button>
            <p className="text-xs text-slate-400">{msg}</p>
          </div>
        </div>
      </div>
      {toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null}
    </div>
  )
}
