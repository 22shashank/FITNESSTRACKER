import { aggregateMacroEntries } from '../utils/analytics'

export function createFitnessAssistant({ workouts = [], macroEntries = [], macroTargets = {} } = {}) {
  return {
    async ask(question) {
      const text = question.toLowerCase()
      const today = new Date().toISOString().slice(0, 10)
      const macros = aggregateMacroEntries(macroEntries, today)
      if (text.includes('protein') || text.includes('eat')) return `You have logged ${Math.round(macros.protein)}g protein today against a ${macroTargets.protein || 0}g target. Consider a balanced meal built around a lean protein, vegetables, and a carbohydrate source.`
      if (text.includes('workout') || text.includes('push')) return 'A practical push session could include bench press, an incline press, a shoulder press, lateral raises, and triceps work. Start with a warm-up and keep 1-3 controlled reps in reserve.'
      if (text.includes('progress') || text.includes('analy')) return `You have ${workouts.length} logged workout${workouts.length === 1 ? '' : 's'} in your local history. Look for gradual improvements in reps, load, volume, recovery, and consistency rather than one isolated session.`
      return 'I can help interpret your logged nutrition and training patterns, suggest a workout structure, or offer general meal ideas. Responses are educational fitness information, not medical advice.'
    },
  }
}
