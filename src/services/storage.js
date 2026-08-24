const DEFAULT_STORE = {
  fitness_user: null,
  fitness_profile: {
    name: 'Alex Carter',
    age: 29,
    gender: 'male',
    height: 176,
    weight: 74,
    goal: 'Maintain',
    activityLevel: 'moderate',
    dailyCalories: 2200,
    proteinTarget: 140,
    waterTarget: 3,
    stepTarget: 8000,
    fitnessGoal: 'Build consistency',
  },
  fitness_settings: {
    theme: 'dark',
    units: 'metric',
    notifications: true,
  },
  fitness_workouts: [],
  fitness_exercises: [],
  fitness_foods: [],
  fitness_meals: [],
  fitness_weight: [],
  fitness_water: [],
  fitness_activity: [],
  fitness_sleep: [],
  fitness_goals: [],
  fitness_habits: [
    { id: 1, name: 'Workout', completed: true },
    { id: 2, name: 'Drink water', completed: false },
    { id: 3, name: 'Hit protein target', completed: true },
    { id: 4, name: 'Sleep 7+ hours', completed: false },
    { id: 5, name: '8,000 steps', completed: true },
  ],
  fitness_records: [],
  fitness_notifications: [],
  fitness_xp: { xp: 420, level: 2 },
  fitness_runs: [],
  fitness_macro_targets: { calories: 2250, protein: 140, carbs: 260, fat: 65 },
  fitness_food_entries: [],
  fitness_custom_foods: [],
  fitness_favorite_foods: [],
  fitness_recent_foods: [],
};

export function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function loadPersistedFitnessState() {
  const state = {}

  Object.entries(DEFAULT_STORE).forEach(([key, value]) => {
    state[key] = safeRead(key, value)
  })

  return state
}

export function resetPersistedFitnessState() {
  Object.entries(DEFAULT_STORE).forEach(([key, value]) => {
    safeWrite(key, value)
  })
}

export function exportAllData() {
  const data = {}
  Object.keys(DEFAULT_STORE).forEach((k) => {
    data[k] = safeRead(k, DEFAULT_STORE[k])
  })
  return JSON.stringify(data, null, 2)
}

export function importAllData(json) {
  try {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false
    const allowedKeys = new Set(Object.keys(DEFAULT_STORE))
    const entries = Object.entries(parsed).filter(([key]) => allowedKeys.has(key))
    if (!entries.length) return false
    for (const [key, value] of entries) {
      if (value === undefined) return false
      if (Array.isArray(DEFAULT_STORE[key]) && !Array.isArray(value)) return false
      safeWrite(key, value)
    }
    return true
  } catch {
    return false
  }
}

export function loadDemoData() {
  const today = new Date()
  const base = 74
  const code = []
  for (let i = 29; i >= 0; i -= 1) {
    const d = new Date(today); d.setDate(today.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    const weight = Number((base - (29 - i) * 0.14).toFixed(1))
    code.push({ id: `w-${iso}`, date: iso, value: weight })
  }

  const workouts = [
    { id: 'w1', title: 'Upper Body Power', date: today.toISOString().slice(0,10), duration: 46, notes: 'Pressed well and felt strong.', exercises: [{ name: 'Bench Press', sets: [{ reps: 8, weight: 80 }, { reps: 8, weight: 80 }, { reps: 6, weight: 85 }] }] },
    { id: 'w2', title: 'Leg Day', date: new Date(today.getTime() - 86400000).toISOString().slice(0,10), duration: 52, notes: 'Squats and lunges felt explosive.', exercises: [{ name: 'Back Squat', sets: [{ reps: 8, weight: 100 }, { reps: 6, weight: 110 }, { reps: 5, weight: 110 }] }] },
  ]

  const meals = [
    { id: 'm1', type: 'Breakfast', date: today.toISOString().slice(0,10), foods: [{ name: 'Eggs', calories: 140, protein: 12, carbs: 1, fat:10 }, { name: 'Oats', calories: 150, protein: 5, carbs: 27, fat: 3 }] },
    { id: 'm2', type: 'Lunch', date: today.toISOString().slice(0,10), foods: [{ name: 'Chicken', calories: 250, protein: 40, carbs: 0, fat: 8 }, { name: 'Rice', calories: 200, protein: 4, carbs: 45, fat: 1 }] },
    { id: 'm3', type: 'Dinner', date: today.toISOString().slice(0,10), foods: [{ name: 'Paneer', calories: 220, protein: 20, carbs: 5, fat: 14 }, { name: 'Dal', calories: 180, protein: 14, carbs: 24, fat: 5 }] },
  ]

  const water = [
    { id: 'h1', amount: 500, date: today.toISOString().slice(0,10) },
    { id: 'h2', amount: 750, date: today.toISOString().slice(0,10) },
    { id: 'h3', amount: 600, date: new Date(today.getTime() - 86400000).toISOString().slice(0,10) },
  ]

  const activity = [
    { id: 'a1', date: today.toISOString().slice(0,10), steps: 10240, running: 4.3, cycling: 8.5, calories: 410 },
    { id: 'a2', date: new Date(today.getTime() - 86400000).toISOString().slice(0,10), steps: 9150, running: 3.1, cycling: 6.3, calories: 370 },
  ]

  const weightData = code
  const sleep = [
    { id: 's1', date: today.toISOString().slice(0,10), hours: 7.5, quality: 'Good' },
    { id: 's2', date: new Date(today.getTime() - 86400000).toISOString().slice(0,10), hours: 6.8, quality: 'Fair' },
  ]

  const runs = [
    { id: 'r1', date: today.toISOString().slice(0,10), distance: 6.2, duration: 32, pace: 5.16, calories: 420 },
    { id: 'r2', date: new Date(today.getTime() - 172800000).toISOString().slice(0,10), distance: 5.1, duration: 29, pace: 5.69, calories: 360 },
  ]

  const goals = [
    { id: 'g1', name: 'Lose 5 kg', category: 'Weight', target: 5, current: 2.4, deadline: new Date(today.getTime() + 30000000000).toISOString().slice(0,10), isComplete: false },
    { id: 'g2', name: 'Run 50 km', category: 'Cardio', target: 50, current: 32, deadline: new Date(today.getTime() + 20000000000).toISOString().slice(0,10), isComplete: false },
  ]

  const habits = [
    { id: 1, name: 'Workout', completed: true },
    { id: 2, name: 'Drink water', completed: true },
    { id: 3, name: 'Hit protein target', completed: true },
    { id: 4, name: 'Sleep 7+ hours', completed: false },
    { id: 5, name: '8,000 steps', completed: true },
  ]

  return {
    fitness_user: { id: 'demo-user', email: 'demo@fitness.app', name: 'Alex Carter' },
    fitness_profile: { ...DEFAULT_STORE.fitness_profile, weight: 74 },
    fitness_settings: DEFAULT_STORE.fitness_settings,
    fitness_workouts: workouts,
    fitness_exercises: [],
    fitness_foods: [],
    fitness_meals: meals,
    fitness_weight: weightData,
    fitness_water: water,
    fitness_activity: activity,
    fitness_sleep: sleep,
    fitness_goals: goals,
    fitness_habits: habits,
    fitness_records: [{ id: 'pr1', exercise: 'Bench Press', value: '100 kg', date: today.toISOString().slice(0,10) }],
    fitness_notifications: [{ id: 'n1', text: 'New PR unlocked: Bench Press', type: 'success', date: today.toISOString() }],
    fitness_xp: { xp: 820, level: 5 },
    fitness_runs: runs,
  }
}

export { DEFAULT_STORE }
