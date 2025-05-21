export default function HeroSliderSkeleton() {
  return (
    <div className="w-full overflow-hidden px-6 md:px-20 py-10 animate-pulse">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Skeleton */}
        <div className="space-y-4 md:w-1/2 text-center md:text-left">
          <div className="w-1/3 h-4 bg-gray-200 rounded mx-auto md:mx-0" />
          <div className="w-2/3 h-8 bg-gray-300 rounded mx-auto md:mx-0" />
          <div className="w-32 h-10 bg-gray-200 rounded-full mx-auto md:mx-0" />
        </div>

        {/* Image Skeleton */}
        <div className="md:w-1/2">
          <div className="w-full h-[300px] bg-gray-200 rounded-lg" />
        </div>
      </section>
    </div>
  );
}
