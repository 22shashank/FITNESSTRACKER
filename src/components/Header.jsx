import React from 'react'
import { useFitness } from '../context/FitnessContext'
import { Link } from 'react-router-dom'

export default function Header({ showUser = true }) {
  const { user, logout, syncStatus } = useFitness()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-700/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Welcome back</p>
          <h2 className="text-xl font-semibold text-white">{user?.name || 'Athlete'}</h2>
        </div>
        {showUser ? (
          <div className="flex items-center gap-3">
            <span className={`hidden text-xs sm:inline ${syncStatus === 'synced' ? 'text-emerald-300' : 'text-slate-400'}`}>● {syncStatus}</span>
            <Link to="/account" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300">{user ? 'Account' : 'Sign in'}</Link>
            <button type="button" onClick={logout} aria-label="Logout" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-white">Logout</button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
