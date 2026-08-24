import { MACRO_FOODS } from '../data/macroFoods'
import { safeRead, safeWrite } from './storage'

export const MACRO_KEYS = {
  targets: 'fitness_macro_targets',
  entries: 'fitness_food_entries',
  customFoods: 'fitness_custom_foods',
  favorites: 'fitness_favorite_foods',
  recents: 'fitness_recent_foods',
}

export const DEFAULT_MACRO_TARGETS = { calories: 2250, protein: 140, carbs: 260, fat: 65 }

export function loadMacroState() {
  return {
    targets: safeRead(MACRO_KEYS.targets, DEFAULT_MACRO_TARGETS),
    entries: safeRead(MACRO_KEYS.entries, []),
    customFoods: safeRead(MACRO_KEYS.customFoods, []),
    favorites: safeRead(MACRO_KEYS.favorites, []),
    recents: safeRead(MACRO_KEYS.recents, []),
  }
}

export function writeMacroState(key, value) {
  return safeWrite(MACRO_KEYS[key], value)
}

export function getAllMacroFoods(customFoods = []) {
  return [...customFoods, ...MACRO_FOODS]
}
