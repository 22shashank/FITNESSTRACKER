import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  loadPersistedFitnessState,
  safeWrite,
  resetPersistedFitnessState,
  loadDemoData,
  DEFAULT_STORE,
} from '../services/storage'
import { loadMacroState, writeMacroState } from '../services/macroStorage'
import { detectNewPersonalRecords, derivePersonalRecords } from '../utils/analytics'
import { fetchRemoteState, getApiToken, loginAccount, registerAccount, saveRemoteState, setApiToken } from '../services/api'

const FitnessContext = createContext(null)

export function FitnessProvider({ children }) {
  const persisted = loadPersistedFitnessState()

  const [user, setUser] = useState(persisted.fitness_user)
  const [profile, setProfileState] = useState(persisted.fitness_profile)
  const [settings, setSettings] = useState(persisted.fitness_settings)

  const [workouts, setWorkouts] = useState(persisted.fitness_workouts || [])
  const [exercises, setExercises] = useState(persisted.fitness_exercises || [])
  const [foods, setFoods] = useState(persisted.fitness_foods || [])
  const [meals, setMeals] = useState(persisted.fitness_meals || [])
  const [weightEntries, setWeightEntries] = useState(persisted.fitness_weight || [])
  const [waterEntries, setWaterEntries] = useState(persisted.fitness_water || [])
  const [activityEntries, setActivityEntries] = useState(persisted.fitness_activity || [])
  const [sleepEntries, setSleepEntries] = useState(persisted.fitness_sleep || [])
  const [goals, setGoals] = useState(persisted.fitness_goals || [])
  const [habits, setHabits] = useState(persisted.fitness_habits || [])
  const [records, setRecords] = useState(persisted.fitness_records || [])
  const [notifications, setNotifications] = useState(persisted.fitness_notifications || [])
  const [xp, setXp] = useState(persisted.fitness_xp || { xp: 0, level: 1 })
  const [runs, setRuns] = useState(persisted.fitness_runs || [])
  const macroState = loadMacroState()
  const [macroTargets, setMacroTargetsState] = useState(macroState.targets)
  const [macroEntries, setMacroEntries] = useState(macroState.entries)
  const [customFoods, setCustomFoods] = useState(macroState.customFoods)
  const [favoriteFoods, setFavoriteFoods] = useState(macroState.favorites)
  const [recentFoods, setRecentFoods] = useState(macroState.recents)
  const [remoteReady, setRemoteReady] = useState(false)
  const [syncStatus, setSyncStatus] = useState(getApiToken() ? 'connecting' : 'local')

  useEffect(() => { safeWrite('fitness_user', user) }, [user])

  useEffect(() => { safeWrite('fitness_profile', profile) }, [profile])

  useEffect(() => { safeWrite('fitness_settings', settings) }, [settings])

  useEffect(() => { safeWrite('fitness_workouts', workouts) }, [workouts])
  useEffect(() => { safeWrite('fitness_exercises', exercises) }, [exercises])
  useEffect(() => { safeWrite('fitness_foods', foods) }, [foods])
  useEffect(() => { safeWrite('fitness_meals', meals) }, [meals])
  useEffect(() => { safeWrite('fitness_weight', weightEntries) }, [weightEntries])
  useEffect(() => { safeWrite('fitness_water', waterEntries) }, [waterEntries])
  useEffect(() => { safeWrite('fitness_activity', activityEntries) }, [activityEntries])
  useEffect(() => { safeWrite('fitness_sleep', sleepEntries) }, [sleepEntries])
  useEffect(() => { safeWrite('fitness_goals', goals) }, [goals])
  useEffect(() => { safeWrite('fitness_habits', habits) }, [habits])
  useEffect(() => { safeWrite('fitness_records', records) }, [records])
  useEffect(() => { safeWrite('fitness_notifications', notifications) }, [notifications])
  useEffect(() => { safeWrite('fitness_xp', xp) }, [xp])
  useEffect(() => { safeWrite('fitness_runs', runs) }, [runs])
  useEffect(() => { writeMacroState('targets', macroTargets) }, [macroTargets])
  useEffect(() => { writeMacroState('entries', macroEntries) }, [macroEntries])
  useEffect(() => { writeMacroState('customFoods', customFoods) }, [customFoods])
  useEffect(() => { writeMacroState('favorites', favoriteFoods) }, [favoriteFoods])
  useEffect(() => { writeMacroState('recents', recentFoods) }, [recentFoods])

  function getStateSnapshot() {
    return {
      fitness_user: user, fitness_profile: profile, fitness_settings: settings, fitness_workouts: workouts,
      fitness_exercises: exercises, fitness_foods: foods, fitness_meals: meals, fitness_weight: weightEntries,
      fitness_water: waterEntries, fitness_activity: activityEntries, fitness_sleep: sleepEntries, fitness_goals: goals,
      fitness_habits: habits, fitness_records: records, fitness_notifications: notifications, fitness_xp: xp,
      fitness_runs: runs, fitness_macro_targets: macroTargets, fitness_food_entries: macroEntries,
      fitness_custom_foods: customFoods, fitness_favorite_foods: favoriteFoods, fitness_recent_foods: recentFoods,
    }
  }

  function applyRemoteState(state) {
    if (!state) return
    setUser(state.fitness_user || null)
    setProfileState(state.fitness_profile || {})
    setSettings(state.fitness_settings || {})
    setWorkouts(state.fitness_workouts || [])
    setExercises(state.fitness_exercises || [])
    setFoods(state.fitness_foods || [])
    setMeals(state.fitness_meals || [])
    setWeightEntries(state.fitness_weight || [])
    setWaterEntries(state.fitness_water || [])
    setActivityEntries(state.fitness_activity || [])
    setSleepEntries(state.fitness_sleep || [])
    setGoals(state.fitness_goals || [])
    setHabits(state.fitness_habits || [])
    setRecords(state.fitness_records || [])
    setNotifications(state.fitness_notifications || [])
    setXp(state.fitness_xp || { xp: 0, level: 1 })
    setRuns(state.fitness_runs || [])
    setMacroTargetsState(state.fitness_macro_targets || macroState.targets)
    setMacroEntries(state.fitness_food_entries || [])
    setCustomFoods(state.fitness_custom_foods || [])
    setFavoriteFoods(state.fitness_favorite_foods || [])
    setRecentFoods(state.fitness_recent_foods || [])
  }

  useEffect(() => {
    if (!getApiToken()) { setRemoteReady(true); return }
    fetchRemoteState().then(({ state }) => {
      applyRemoteState(state)
      setSyncStatus('synced')
    }).catch(() => setSyncStatus('offline')).finally(() => setRemoteReady(true))
  }, [])

  useEffect(() => {
    if (!remoteReady || !getApiToken()) return
    setSyncStatus('syncing')
    saveRemoteState(getStateSnapshot()).then(() => setSyncStatus('synced')).catch(() => setSyncStatus('offline'))
  }, [remoteReady, user, profile, settings, workouts, exercises, foods, meals, weightEntries, waterEntries, activityEntries, sleepEntries, goals, habits, records, notifications, xp, runs, macroTargets, macroEntries, customFoods, favoriteFoods, recentFoods])

  async function login({ email, name, password }) {
    if (password) {
      try {
        const result = await loginAccount({ email, password })
        setApiToken(result.token)
        applyRemoteState(await fetchRemoteState().then((response) => response.state))
        setSyncStatus('synced')
        return result.user
      } catch {
        setSyncStatus('offline')
      }
    }
    const u = { id: `user-${Date.now()}`, email, name }
    setUser(u)
    safeWrite('fitness_user', u)
    // ensure profile has name
    setProfileState((p) => ({ ...p, name: name || p.name }))
    return u
  }

  async function register({ email, name, password }) {
    if (password) {
      try {
        const result = await registerAccount({ email, name, password })
        setApiToken(result.token)
        await saveRemoteState(getStateSnapshot())
        setUser(result.user)
        setSyncStatus('synced')
        return result.user
      } catch {
        setSyncStatus('offline')
      }
    }
    return login({ email, name, password })
  }

  function logout() {
    setUser(null)
    setApiToken(null)
    setSyncStatus('local')
    safeWrite('fitness_user', null)
  }

  function loadDemoDataAction() {
    const demo = loadDemoData()
    // write all keys
    Object.entries(demo).forEach(([k, v]) => safeWrite(k, v))
    // update state
    setUser(demo.fitness_user)
    setProfileState(demo.fitness_profile)
    setSettings(demo.fitness_settings)
    setWorkouts(demo.fitness_workouts || [])
    setExercises(demo.fitness_exercises || [])
    setFoods(demo.fitness_foods || [])
    setMeals(demo.fitness_meals || [])
    setWeightEntries(demo.fitness_weight || [])
    setWaterEntries(demo.fitness_water || [])
    setActivityEntries(demo.fitness_activity || [])
    setSleepEntries(demo.fitness_sleep || [])
    setGoals(demo.fitness_goals || [])
    setHabits(demo.fitness_habits || [])
    setRecords(demo.fitness_records || [])
    setNotifications(demo.fitness_notifications || [])
    setXp(demo.fitness_xp || { xp: 0, level: 1 })
    setRuns(demo.fitness_runs || [])
    const macros = loadMacroState()
    setMacroTargetsState(macros.targets)
    setMacroEntries(macros.entries)
    setCustomFoods(macros.customFoods)
    setFavoriteFoods(macros.favorites)
    setRecentFoods(macros.recents)
  }

  function resetDemoDataAction() {
    resetPersistedFitnessState()
    // reload defaults
    const defaults = { ...DEFAULT_STORE }
    Object.entries(defaults).forEach(([k, v]) => safeWrite(k, v))
    setUser(defaults.fitness_user)
    setProfileState(defaults.fitness_profile)
    setSettings(defaults.fitness_settings)
    setWorkouts(defaults.fitness_workouts || [])
    setExercises(defaults.fitness_exercises || [])
    setFoods(defaults.fitness_foods || [])
    setMeals(defaults.fitness_meals || [])
    setWeightEntries(defaults.fitness_weight || [])
    setWaterEntries(defaults.fitness_water || [])
    setActivityEntries(defaults.fitness_activity || [])
    setSleepEntries(defaults.fitness_sleep || [])
    setGoals(defaults.fitness_goals || [])
    setHabits(defaults.fitness_habits || [])
    setRecords(defaults.fitness_records || [])
    setNotifications(defaults.fitness_notifications || [])
    setXp(defaults.fitness_xp || { xp: 0, level: 1 })
    setRuns(defaults.fitness_runs || [])
    setMacroTargetsState(loadMacroState().targets)
    setMacroEntries([])
    setCustomFoods([])
    setFavoriteFoods([])
    setRecentFoods([])
  }

  // CRUD helpers
  function addWorkout(item) {
    setWorkouts((s) => {
      const next = [item, ...s]
      const newRecords = detectNewPersonalRecords(s, next)
      if (newRecords.length) {
        setRecords((existing) => [...newRecords, ...existing.filter((record) => !newRecords.some((nextRecord) => nextRecord.id === record.id))])
        setNotifications((existing) => [{ id: `notification-${Date.now()}`, text: `New PR unlocked: ${newRecords[0].exercise}`, type: 'success', date: new Date().toISOString() }, ...existing])
        setXp((existing) => ({ ...existing, xp: existing.xp + (newRecords.length * 100) }))
      }
      safeWrite('fitness_workouts', next)
      return next
    })
  }

  function deleteWorkout(id) {
    setWorkouts((s) => {
      const next = s.filter((w) => w.id !== id)
      setRecords(derivePersonalRecords(next))
      return next
    })
  }

  function updateWorkout(id, changes) {
    setWorkouts((s) => {
      const next = s.map((workout) => (workout.id === id ? { ...workout, ...changes } : workout))
      const newRecords = detectNewPersonalRecords(s, next)
      if (newRecords.length) {
        setRecords((existing) => [...newRecords, ...existing.filter((record) => !newRecords.some((nextRecord) => nextRecord.id === record.id))])
        setXp((existing) => ({ ...existing, xp: existing.xp + (newRecords.length * 100) }))
      }
      return next
    })
  }

  function addMeal(item) {
    setMeals((s) => {
      const next = [item, ...s]
      safeWrite('fitness_meals', next)
      return next
    })
  }

  function addFood(item) {
    setFoods((s) => {
      const next = [item, ...s]
      safeWrite('fitness_foods', next)
      return next
    })
  }

  function setMacroTargets(targets) {
    setMacroTargetsState((previous) => ({ ...previous, ...targets }))
  }

  function addMacroEntry(entry) {
    setMacroEntries((previous) => [entry, ...previous])
    setRecentFoods((previous) => [entry.foodId, ...previous.filter((id) => id !== entry.foodId)].slice(0, 8))
  }

  function updateMacroEntry(id, changes) {
    setMacroEntries((previous) => previous.map((entry) => (entry.id === id ? { ...entry, ...changes } : entry)))
  }

  function deleteMacroEntry(id) {
    setMacroEntries((previous) => previous.filter((entry) => entry.id !== id))
  }

  function saveCustomFood(food) {
    setCustomFoods((previous) => [food, ...previous.filter((item) => item.id !== food.id)])
  }

  function deleteCustomFood(id) {
    setCustomFoods((previous) => previous.filter((food) => food.id !== id))
  }

  function toggleFavoriteFood(id) {
    setFavoriteFoods((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [id, ...previous])
  }

  function addWeightEntry(entry) {
    setWeightEntries((s) => {
      const next = [...s, entry]
      safeWrite('fitness_weight', next)
      return next
    })
    // update profile weight
    setProfileState((p) => ({ ...p, weight: entry.value }))
  }

  function addActivity(entry) {
    setActivityEntries((s) => {
      const next = [entry, ...s]
      safeWrite('fitness_activity', next)
      return next
    })
  }

  function addWater(entry) {
    setWaterEntries((s) => {
      const next = [entry, ...s]
      safeWrite('fitness_water', next)
      return next
    })
  }

  function addSleep(entry) {
    setSleepEntries((s) => {
      const next = [entry, ...s]
      safeWrite('fitness_sleep', next)
      return next
    })
  }

  function addGoal(goal) {
    setGoals((s) => {
      const next = [goal, ...s]
      safeWrite('fitness_goals', next)
      return next
    })
  }

  function completeGoal(id) {
    setGoals((s) => s.map((g) => (g.id === id ? { ...g, isComplete: true } : g)))
  }

  function toggleHabit(id, date = new Date().toISOString().slice(0, 10)) {
    setHabits((current) => current.map((habit) => {
      if (habit.id !== id) return habit
      const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : (habit.completed ? [date] : [])
      const nextDates = completedDates.includes(date) ? completedDates.filter((item) => item !== date) : [...completedDates, date]
      if (!completedDates.includes(date)) setXp((previous) => ({ ...previous, xp: previous.xp + 20 }))
      return { ...habit, completed: nextDates.includes(date), completedDates: nextDates }
    }))
  }

  function addHabit(name) {
    const trimmedName = String(name || '').trim()
    if (!trimmedName) return false
    setHabits((current) => [{ id: `habit-${Date.now()}`, name: trimmedName, completed: false, completedDates: [] }, ...current])
    return true
  }

  function setProfile(p) {
    setProfileState((prev) => {
      const next = { ...prev, ...p }
      safeWrite('fitness_profile', next)
      return next
    })
  }

  const value = {
    // data
    user,
    profile,
    settings,
    workouts,
    exercises,
    foods,
    meals,
    weightEntries,
    waterEntries,
    activityEntries,
    sleepEntries,
    goals,
    habits,
    records,
    notifications,
    xp,
    runs,
    // auth
    login,
    register,
    logout,
    loadDemoData: loadDemoDataAction,
    resetDemoData: resetDemoDataAction,
    // operations
    addWorkout,
    deleteWorkout,
    updateWorkout,
    addMeal,
    addFood,
    addWeightEntry,
    addActivity,
    addWater,
    addSleep,
    addGoal,
    completeGoal,
    toggleHabit,
    addHabit,
    setProfile,
    setSettings,
    macroTargets,
    macroEntries,
    customFoods,
    favoriteFoods,
    recentFoods,
    setMacroTargets,
    addMacroEntry,
    updateMacroEntry,
    deleteMacroEntry,
    saveCustomFood,
    deleteCustomFood,
    toggleFavoriteFood,
    syncStatus,
  }

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>
}

export function useFitness() {
  const ctx = useContext(FitnessContext)
  if (!ctx) throw new Error('useFitness must be used within FitnessProvider')
  return ctx
}

export default FitnessContext
