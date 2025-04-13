'use client'

import { useState } from 'react'

type FilterProps = {
  onFilterChange: (filters: {
    category: string;
    difficulty: string;
    maxPrepTime: number;
  }) => void;
}

export default function RecipeFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    maxPrepTime: 60
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Category:</label>
        <select 
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="p-2 border rounded bg-white text-gray-800 shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Difficulty:</label>
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          className="p-2 border rounded bg-white text-gray-800 shadow-sm"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Max Prep Time:</label>
        <input
          type="number"
          name="maxPrepTime"
          value={filters.maxPrepTime}
          onChange={handleChange}
          className="p-2 border rounded bg-white text-gray-800 shadow-sm w-20"
          min="0"
        />
        <span className="text-gray-700 font-medium">minutes</span>
      </div>
    </div>
  )
}