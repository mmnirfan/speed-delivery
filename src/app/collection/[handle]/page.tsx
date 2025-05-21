"use client";

import { useParams } from 'next/navigation';
import { useGetCollectionByHandleQuery } from '@/features/shopifyApi';
import AnimatedProductCard from '@/components/AnimatedProductCard';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const { data, isLoading, isError } = useGetCollectionByHandleQuery(handle);

  const collection = data?.collectionByHandle;
  const products = collection?.products?.edges?.map((edge: any) => edge.node) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        {isLoading ? (
          <>
            <div className="h-8 w-60 mx-auto bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-80 mx-auto mt-4 bg-gray-100 rounded animate-pulse" />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-primary mb-2">{collection?.title}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{collection?.description}</p>
          </>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
          : products.map((product: any) => (
              <AnimatedProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Error state */}
      {isError && (
        <div className="text-red-500 text-center py-10 text-lg font-medium col-span-full">
          🚫 Collection not found.
        </div>
      )}
    </div>
  );
}
