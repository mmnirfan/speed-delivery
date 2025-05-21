export default function ProductCarouselSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="w-48 shrink-0 border rounded-lg p-4 bg-white shadow-sm animate-pulse"
          >
            <div className="w-full h-40 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
            <div className="h-10 bg-gray-300 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
