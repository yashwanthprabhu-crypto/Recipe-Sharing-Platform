import recipes from './recipes.json';

export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isPremium: boolean;
}

export function getRecipes() {
  return recipes.recipes as Recipe[];
}

export function getRecipeById(id: string) {
  return recipes.recipes.find(recipe => recipe.id === id) as Recipe;
}