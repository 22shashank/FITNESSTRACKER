import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Dumbbell, Utensils, Settings } from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/workout', label: 'Workout', icon: Dumbbell },
  { to: '/nutrition', label: 'Nutrition', icon: Utensils },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside role="navigation" aria-label="Main navigation" className="fixed left-0 top-0 z-20 hidden h-screen w-72 flex-col border-r border-slate-700/60 bg-slate-950/80 p-5 md:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="rounded-2xl bg-emerald-500/20 p-2 text-emerald-400">FG</div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Fitness</p>
          <h1 className="text-lg font-semibold text-white">FitGrid</h1>
        </div>
      </div>

      <nav className="space-y-1 overflow-y-auto">
        {links.map((l) => {
          const Icon = l.icon
          return (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              aria-label={l.label}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Icon size={16} aria-hidden="true" />
              {l.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
