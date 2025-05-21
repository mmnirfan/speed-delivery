export default function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="w-full h-[500px] bg-gray-200 rounded-xl" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex-1 space-y-6">
          <div className="h-8 bg-gray-200 w-3/4 rounded" />
          <div className="h-6 bg-gray-200 w-1/2 rounded" />
          <div className="flex gap-3 items-center">
            <div className="w-24 h-10 bg-gray-200 rounded" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
          <div className="h-6 bg-gray-200 w-32 rounded" />
          <div className="h-6 bg-gray-200 w-24 rounded" />
          <div className="flex gap-4">
            <div className="w-full h-12 bg-gray-200 rounded-full" />
            <div className="w-full h-12 bg-gray-200 rounded-full" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
            <div className="w-1/2 h-4 bg-gray-200 rounded" />
          </div>
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
