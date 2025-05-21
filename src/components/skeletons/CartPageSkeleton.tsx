export default function CartPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8" />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Items Skeleton */}
        <div className="flex-1 space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="w-20 h-20 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="w-2/3 h-4 bg-gray-200 rounded" />
                <div className="w-1/2 h-3 bg-gray-100 rounded" />
                <div className="w-1/4 h-3 bg-gray-100 rounded" />
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Summary Skeleton */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="p-6 bg-gray-50 border rounded-lg shadow-sm space-y-4">
            <div className="h-6 bg-gray-200 w-1/2 rounded" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="w-1/3 h-4 bg-gray-100 rounded" />
                <div className="w-1/4 h-4 bg-gray-100 rounded" />
              </div>
            ))}
            <div className="w-full h-12 bg-gray-300 rounded-full mt-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
