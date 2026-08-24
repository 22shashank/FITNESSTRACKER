export const MACRO_FOODS = [
  { id: 'chicken-breast', name: 'Chicken Breast', serving: 100, unit: 'g', calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Protein' },
  { id: 'eggs', name: 'Eggs', serving: 2, unit: ' eggs', calories: 140, protein: 12, carbs: 1, fat: 10, category: 'Protein' },
  { id: 'egg-whites', name: 'Egg Whites', serving: 100, unit: 'g', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, category: 'Protein' },
  { id: 'paneer', name: 'Paneer', serving: 100, unit: 'g', calories: 265, protein: 18, carbs: 6, fat: 20, category: 'Protein' },
  { id: 'soya-chunks', name: 'Soya Chunks', serving: 50, unit: 'g dry', calories: 173, protein: 26, carbs: 16, fat: 0.3, category: 'Protein' },
  { id: 'greek-yogurt', name: 'Greek Yogurt', serving: 170, unit: 'g', calories: 100, protein: 17, carbs: 6, fat: 0, category: 'Protein' },
  { id: 'milk', name: 'Milk', serving: 250, unit: 'ml', calories: 150, protein: 8, carbs: 12, fat: 8, category: 'Protein' },
  { id: 'fish', name: 'Fish', serving: 100, unit: 'g', calories: 140, protein: 26, carbs: 0, fat: 3, category: 'Protein' },
  { id: 'whey', name: 'Whey Protein', serving: 30, unit: 'g', calories: 120, protein: 24, carbs: 3, fat: 2, category: 'Protein' },
  { id: 'rice', name: 'Rice', serving: 100, unit: 'g cooked', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, category: 'Carbohydrates' },
  { id: 'roti', name: 'Roti', serving: 1, unit: ' roti', calories: 120, protein: 4, carbs: 18, fat: 3, category: 'Carbohydrates' },
  { id: 'oats', name: 'Oats', serving: 100, unit: 'g', calories: 389, protein: 17, carbs: 66, fat: 7, category: 'Carbohydrates' },
  { id: 'banana', name: 'Banana', serving: 1, unit: ' banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'Carbohydrates' },
  { id: 'potato', name: 'Potato', serving: 100, unit: 'g', calories: 87, protein: 1.9, carbs: 20, fat: 0.1, category: 'Carbohydrates' },
  { id: 'sweet-potato', name: 'Sweet Potato', serving: 100, unit: 'g', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, category: 'Carbohydrates' },
  { id: 'bread', name: 'Bread', serving: 2, unit: ' slices', calories: 160, protein: 6, carbs: 28, fat: 2, category: 'Carbohydrates' },
  { id: 'poha', name: 'Poha', serving: 150, unit: 'g', calories: 220, protein: 5, carbs: 40, fat: 5, category: 'Carbohydrates' },
  { id: 'idli', name: 'Idli', serving: 2, unit: ' idli', calories: 120, protein: 4, carbs: 24, fat: 1, category: 'Carbohydrates' },
  { id: 'dosa', name: 'Dosa', serving: 1, unit: ' dosa', calories: 168, protein: 4, carbs: 29, fat: 4, category: 'Carbohydrates' },
  { id: 'dal', name: 'Dal', serving: 150, unit: 'g', calories: 180, protein: 12, carbs: 27, fat: 4, category: 'Indian foods' },
  { id: 'rajma', name: 'Rajma', serving: 150, unit: 'g', calories: 190, protein: 13, carbs: 34, fat: 1, category: 'Indian foods' },
  { id: 'chole', name: 'Chole', serving: 150, unit: 'g', calories: 240, protein: 12, carbs: 36, fat: 6, category: 'Indian foods' },
  { id: 'peanut-butter', name: 'Peanut Butter', serving: 32, unit: 'g', calories: 190, protein: 8, carbs: 7, fat: 16, category: 'Indian foods' },
  { id: 'sattu', name: 'Sattu', serving: 50, unit: 'g', calories: 190, protein: 11, carbs: 30, fat: 3, category: 'Indian foods' },
  { id: 'curd', name: 'Curd', serving: 150, unit: 'g', calories: 95, protein: 5, carbs: 7, fat: 5, category: 'Indian foods' },
  { id: 'biryani', name: 'Biryani', serving: 300, unit: 'g', calories: 480, protein: 22, carbs: 58, fat: 18, category: 'Indian foods' },
  { id: 'samosa', name: 'Samosa', serving: 1, unit: ' samosa', calories: 260, protein: 5, carbs: 32, fat: 12, category: 'Indian foods' },
  { id: 'paratha', name: 'Paratha', serving: 1, unit: ' paratha', calories: 260, protein: 6, carbs: 35, fat: 11, category: 'Indian foods' },
]

export function scaleMacroFood(food, servingSize) {
  const multiplier = Number(servingSize) / food.serving
  return {
    calories: Math.round(food.calories * multiplier),
    protein: Number((food.protein * multiplier).toFixed(1)),
    carbs: Number((food.carbs * multiplier).toFixed(1)),
    fat: Number((food.fat * multiplier).toFixed(1)),
  }
}
