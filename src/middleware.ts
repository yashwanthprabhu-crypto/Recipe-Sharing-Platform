import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRecipeById } from './lib/recipes'

export function middleware(request: NextRequest) {
  const recipeId = request.nextUrl.pathname.split('/').pop()
  
  if (recipeId && request.nextUrl.pathname.startsWith('/recipes/')) {
    // Log access
    console.log(`Accessing recipe: ${recipeId} at ${new Date().toISOString()}`)

    // Check premium access
    const recipe = getRecipeById(recipeId)
    if (recipe?.isPremium) {
      const hasAccess = request.nextUrl.searchParams.get('access') === 'true'
      if (!hasAccess) {
        return NextResponse.redirect(new URL('/premium-required', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/recipes/:path*',
}