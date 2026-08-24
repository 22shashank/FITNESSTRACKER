import React from 'react'
import { FitnessProvider } from './context/FitnessContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage from './pages/DashboardPage'
import WorkoutPage from './pages/WorkoutPage'
import NutritionPage from './pages/NutritionPage'
import SettingsPage from './pages/SettingsPage'
import CaloriesPage from './pages/CaloriesPage'
import WeightPage from './pages/WeightPage'
import ActivityPage from './pages/ActivityPage'
import WaterPage from './pages/WaterPage'
import SleepPage from './pages/SleepPage'
import ProgressPage from './pages/ProgressPage'
import GoalsPage from './pages/GoalsPage'
import RecordsPage from './pages/RecordsPage'
import HistoryPage from './pages/HistoryPage'
import ExercisesPage from './pages/ExercisesPage'
import MacrosPage from './pages/MacrosPage'

export default function App() {
  return (
    <FitnessProvider>
      <div className="app-shell min-h-screen text-slate-100">
        <Sidebar />
        <main className="ml-0 md:ml-72 pb-20 md:pb-10">
          <Header />
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/workout" element={<WorkoutPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/macros" element={<MacrosPage />} />
              <Route path="/calories" element={<CaloriesPage />} />
              <Route path="/weight" element={<WeightPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/water" element={<WaterPage />} />
              <Route path="/sleep" element={<SleepPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/records" element={<RecordsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </FitnessProvider>
  )
}
