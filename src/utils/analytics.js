export function sumBy(items, selector) {
  return items.reduce((sum, item) => sum + Number(selector(item) || 0), 0)
}

export function calculateWorkoutMetrics(workout) {
  const sets = (workout?.exercises || []).flatMap((exercise) => exercise.sets || [])
  const reps = sumBy(sets, (set) => set.reps)
  const volume = sumBy(sets, (set) => Number(set.reps || 0) * Number(set.weight || 0))
  return {
    sets: sets.length,
    reps,
    volume,
    estimatedCalories: Math.round((Number(workout?.duration) || 0) * 7),
  }
}

export function estimateOneRepMax(weight, reps) {
  const safeWeight = Number(weight) || 0
  const safeReps = Number(reps) || 0
  return safeReps > 0 ? safeWeight * (1 + safeReps / 30) : 0
}

export function getExerciseProgression(workouts, exerciseName) {
  return workouts
    .filter((workout) => workout?.exercises?.some((exercise) => exercise.name === exerciseName))
    .sort((a, b) => String(a.date).localeCompare(String(b.date)))
    .map((workout) => {
      const exercise = workout.exercises.find((item) => item.name === exerciseName)
      const sets = exercise?.sets || []
      const bestSet = sets.reduce((best, set) => (Number(set.weight) > Number(best.weight) ? set : best), { weight: 0, reps: 0 })
      return {
        date: workout.date,
        weight: Number(bestSet.weight) || 0,
        reps: Number(bestSet.reps) || 0,
        volume: sumBy(sets, (set) => Number(set.weight || 0) * Number(set.reps || 0)),
        estimatedOneRepMax: Math.round(estimateOneRepMax(bestSet.weight, bestSet.reps)),
      }
    })
}

export function aggregateMacroEntries(entries, date) {
  return entries.filter((entry) => !date || entry.date === date).reduce((total, entry) => ({
    calories: total.calories + Number(entry.calories || 0),
    protein: total.protein + Number(entry.protein || 0),
    carbs: total.carbs + Number(entry.carbs || 0),
    fat: total.fat + Number(entry.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
}

export function percentage(current, target) {
  return target > 0 ? Math.round((Number(current) || 0) / target * 100) : 0
}

export function calculateGoalProgress(goal) {
  const target = Number(goal?.target) || 0
  const current = Number(goal?.current) || 0
  return target > 0 ? Math.min(Math.max(Math.round(current / target * 100), 0), 100) : 0
}

export function derivePersonalRecords(workouts) {
  const byExercise = new Map()
  workouts.forEach((workout) => {
    ;(workout.exercises || []).forEach((exercise) => {
      const sets = exercise.sets || []
      const current = byExercise.get(exercise.name) || { weight: 0, reps: 0, volume: 0, estimatedOneRepMax: 0, date: workout.date }
      const bestSet = sets.reduce((best, set) => Number(set.weight) > Number(best.weight) ? set : best, { weight: 0, reps: 0 })
      const volume = sumBy(sets, (set) => Number(set.weight || 0) * Number(set.reps || 0))
      byExercise.set(exercise.name, {
        weight: Math.max(current.weight, Number(bestSet.weight) || 0),
        reps: Math.max(current.reps, sumBy(sets, (set) => set.reps)),
        volume: Math.max(current.volume, volume),
        estimatedOneRepMax: Math.max(current.estimatedOneRepMax, estimateOneRepMax(bestSet.weight, bestSet.reps)),
        date: workout.date,
      })
    })
  })
  return [...byExercise.entries()].flatMap(([exercise, values]) => [
    { id: `pr-${exercise}-weight`, exercise, metric: 'Heaviest weight', value: `${values.weight} kg`, numericValue: values.weight, date: values.date },
    { id: `pr-${exercise}-reps`, exercise, metric: 'Highest reps', value: `${values.reps} reps`, numericValue: values.reps, date: values.date },
    { id: `pr-${exercise}-volume`, exercise, metric: 'Highest volume', value: `${values.volume} kg`, numericValue: values.volume, date: values.date },
    { id: `pr-${exercise}-1rm`, exercise, metric: 'Estimated 1RM', value: `${Math.round(values.estimatedOneRepMax)} kg`, numericValue: values.estimatedOneRepMax, date: values.date },
  ])
}

export function detectNewPersonalRecords(previousWorkouts, nextWorkouts) {
  const previous = new Map(derivePersonalRecords(previousWorkouts).map((record) => [record.id, record.numericValue]))
  return derivePersonalRecords(nextWorkouts).filter((record) => !previous.has(record.id) || record.numericValue > previous.get(record.id))
}
