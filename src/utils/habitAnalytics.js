export function habitIsComplete(habit, date) {
  return Array.isArray(habit?.completedDates) ? habit.completedDates.includes(date) : Boolean(habit?.completed)
}

export function calculateStreak(habit, fromDate = new Date()) {
  const dates = new Set(habit?.completedDates || [])
  let streak = 0
  const cursor = new Date(fromDate)
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function calculateLongestStreak(habit) {
  const dates = [...new Set(habit?.completedDates || [])].sort()
  let longest = 0
  let current = 0
  dates.forEach((date, index) => {
    const previous = dates[index - 1]
    const difference = previous ? (new Date(`${date}T12:00:00`) - new Date(`${previous}T12:00:00`)) / 86400000 : 0
    current = index === 0 || difference === 1 ? current + 1 : 1
    longest = Math.max(longest, current)
  })
  return longest
}
