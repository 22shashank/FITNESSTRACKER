import { JSDOM } from 'jsdom'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.localStorage = dom.window.localStorage

import { exportAllData, importAllData } from '../src/services/storage.js'

async function run() {
  const before = JSON.parse(exportAllData())
  console.log('Initial counts:', {
    workouts: (before.fitness_workouts || []).length,
    meals: (before.fitness_meals || []).length,
    weight: (before.fitness_weight || []).length,
    water: (before.fitness_water || []).length,
    sleep: (before.fitness_sleep || []).length,
    activity: (before.fitness_activity || []).length,
  })

  const now = new Date().toISOString().slice(0,10)

  const newWorkout = { id: 'automated-w-' + Date.now(), title: 'Automation Test', date: now, duration: 30, exercises: [] }
  const newMeal = { id: 'automated-m-' + Date.now(), type: 'Snack', date: now, foods: [{ name: 'Banana', calories: 100, protein: 1, carbs: 27, fat: 0 }] }
  const newWeight = { id: 'automated-weight-' + Date.now(), date: now, value: 73.5 }
  const newWater = { id: 'automated-water-' + Date.now(), amount: 500, date: now }
  const newSleep = { id: 'automated-sleep-' + Date.now(), date: now, hours: 7.2, quality: 'Good' }
  const newActivity = { id: 'automated-act-' + Date.now(), date: now, steps: 2000, running: 0, cycling: 0, calories: 100 }

  const updated = { ...before }
  updated.fitness_workouts = [newWorkout, ...(updated.fitness_workouts || [])]
  updated.fitness_meals = [newMeal, ...(updated.fitness_meals || [])]
  updated.fitness_weight = [...(updated.fitness_weight || []), newWeight]
  updated.fitness_water = [newWater, ...(updated.fitness_water || [])]
  updated.fitness_sleep = [newSleep, ...(updated.fitness_sleep || [])]
  updated.fitness_activity = [newActivity, ...(updated.fitness_activity || [])]

  const ok = importAllData(JSON.stringify(updated))
  console.log('importAllData ok:', ok)

  const after = JSON.parse(exportAllData())
  console.log('After counts:', {
    workouts: (after.fitness_workouts || []).length,
    meals: (after.fitness_meals || []).length,
    weight: (after.fitness_weight || []).length,
    water: (after.fitness_water || []).length,
    sleep: (after.fitness_sleep || []).length,
    activity: (after.fitness_activity || []).length,
  })

  // verify new IDs present
  const checks = {
    workout: after.fitness_workouts?.some(w => w.id === newWorkout.id),
    meal: after.fitness_meals?.some(m => m.id === newMeal.id),
    weight: after.fitness_weight?.some(wt => wt.id === newWeight.id),
    water: after.fitness_water?.some(w => w.id === newWater.id),
    sleep: after.fitness_sleep?.some(s => s.id === newSleep.id),
    activity: after.fitness_activity?.some(a => a.id === newActivity.id),
  }
  console.log('Presence checks:', checks)
}

run().catch(e => { console.error(e); process.exit(1) })
