import { getRecipeById } from '@/lib/recipes';
import Link from 'next/link';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Recipes
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
      <div className="flex gap-4 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
          {recipe.category}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
          {recipe.difficulty}
        </span>
        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded">
          Prep: {recipe.prepTime}min
        </span>
        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded">
          Cook: {recipe.cookTime}min
        </span>
      </div>

      <p className="text-gray-700 mb-8">{recipe.description}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}