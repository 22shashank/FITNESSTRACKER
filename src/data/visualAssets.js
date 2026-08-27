import exerciseIllustration from '../assets/exercise-illustration.svg'
import foodIllustration from '../assets/food-illustration.svg'
import achievementIllustration from '../assets/achievement-illustration.svg'
import emptyWorkout from '../assets/empty-workout.svg'

export const visualAssets = {
  exercise: exerciseIllustration,
  food: foodIllustration,
  achievement: achievementIllustration,
  emptyWorkout,
}

export function getExerciseVisual(muscle = '') {
  return visualAssets.exercise
}

export function getFoodVisual(category = '') {
  return category === 'Protein' ? visualAssets.exercise : visualAssets.food
}
