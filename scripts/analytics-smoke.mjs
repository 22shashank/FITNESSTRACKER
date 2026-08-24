import assert from 'node:assert/strict'
import { aggregateMacroEntries, calculateGoalProgress, calculateWorkoutMetrics, estimateOneRepMax, getExerciseProgression } from '../src/utils/analytics.js'

const workout = { date: '2026-08-25', duration: 45, exercises: [{ name: 'Bench Press', sets: [{ weight: 80, reps: 10 }, { weight: 85, reps: 8 }] }] }
assert.deepEqual(calculateWorkoutMetrics(workout), { sets: 2, reps: 18, volume: 1480, estimatedCalories: 315 })
assert.equal(Math.round(estimateOneRepMax(80, 10)), 107)
assert.deepEqual(getExerciseProgression([workout], 'Bench Press')[0], { date: '2026-08-25', weight: 85, reps: 8, volume: 1480, estimatedOneRepMax: 108 })
assert.deepEqual(aggregateMacroEntries([{ date: '2026-08-25', calories: 500, protein: 40 }, { date: '2026-08-24', calories: 300, fat: 10 }], '2026-08-25'), { calories: 500, protein: 40, carbs: 0, fat: 0 })
assert.equal(calculateGoalProgress({ current: 25, target: 50 }), 50)
console.log('Analytics smoke tests passed')
