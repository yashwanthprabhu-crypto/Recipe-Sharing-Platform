'use client'

import { getRecipes } from '@/lib/recipes';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import RecipeFilters from '@/components/RecipeFilters';
import { FaStar, FaHeart, FaSearch } from 'react-icons/fa';

export default function Home() {
  const allRecipes = getRecipes().map(recipe => ({
    ...recipe,
    rating: 4.5 // Adding a default rating
  }));
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleFilterChange = (filters: {
    category: string;
    difficulty: string;
    maxPrepTime: number;
  }) => {
    const filtered = allRecipes.filter(recipe => {
      const categoryMatch = !filters.category || recipe.category === filters.category;
      const difficultyMatch = !filters.difficulty || recipe.difficulty === filters.difficulty;
      const timeMatch = !filters.maxPrepTime || recipe.prepTime <= filters.maxPrepTime;
      const searchMatch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryMatch && difficultyMatch && timeMatch && searchMatch;
    });

    setFilteredRecipes(filtered);
  };

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Featured Recipes</h1>
      
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-2 border-2 rounded-lg text-gray-800 bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange({category: '', difficulty: '', maxPrepTime: 60});
            }}
          />
        </div>
      </div>

      <RecipeFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="relative border-2 border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className="absolute top-4 right-4"
            >
              <FaHeart 
                className={`text-2xl ${
                  favorites.includes(recipe.id) ? 'text-red-500' : 'text-gray-300'
                }`}
              />
            </button>

            <Link href={`/recipes/${recipe.id}`}>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{recipe.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
              
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className="text-gray-300 hover:text-yellow-400 cursor-pointer"
                  />
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.category}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.difficulty}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.prepTime + recipe.cookTime} mins total
                </span>
                {recipe.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Premium
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
