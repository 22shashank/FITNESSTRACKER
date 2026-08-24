import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import { useFitness } from '../context/FitnessContext'

export default function AuthPage() {
  const navigate = useNavigate()
  const { login, register, syncStatus } = useFitness()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const isRegister = mode === 'register'

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (!form.email.includes('@') || form.password.length < 8 || (isRegister && !form.name.trim())) {
      setError(isRegister ? 'Enter your name, a valid email, and a password of at least 8 characters.' : 'Enter a valid email and a password of at least 8 characters.')
      return
    }
    try {
      const action = isRegister ? register : login
      await action(form)
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100"><div className="mx-auto max-w-md"><Link to="/" className="text-sm text-emerald-300">← Back to FitGrid</Link><div className="card mt-6 rounded-2xl p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-300">FG</div><div><p className="text-xs uppercase tracking-[0.2em] text-slate-400">FitGrid account</p><h1 className="text-2xl font-semibold text-white">{isRegister ? 'Create your account' : 'Welcome back'}</h1></div></div><p className="mt-4 text-sm text-slate-400">Your fitness data will sync to the connected server database. Local storage remains available when offline.</p><form onSubmit={submit} className="mt-6 space-y-4">{isRegister && <label className="block text-sm text-slate-300">Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" autoComplete="name" /></label>}<label className="block text-sm text-slate-300">Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" autoComplete="email" /></label><label className="block text-sm text-slate-300">Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white" autoComplete={isRegister ? 'new-password' : 'current-password'} /></label>{error && <p role="alert" className="text-sm text-rose-300">{error}</p>}<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950">{isRegister ? <UserPlus size={17} /> : <LogIn size={17} />}{isRegister ? 'Create account' : 'Sign in'}</button></form><button onClick={() => { setMode(isRegister ? 'login' : 'register'); setError('') }} className="mt-5 text-sm text-emerald-300">{isRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}</button><p className="mt-3 text-xs text-slate-500">Connection status: {syncStatus}</p></div></div></main>
}
