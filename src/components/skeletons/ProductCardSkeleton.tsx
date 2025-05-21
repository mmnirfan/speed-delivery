// components/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 p-4 shadow bg-white">
      <div className="aspect-square bg-gray-200 rounded-md w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
}
