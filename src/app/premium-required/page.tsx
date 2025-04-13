import Link from 'next/link';

export default function PremiumRequired() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Premium Recipe Access Required</h1>
      <p className="text-gray-600 mb-8">
        This recipe is only available to premium users. Please upgrade your account or add the access parameter to view this recipe.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        ← Return to Homepage
      </Link>
    </div>
  );
}