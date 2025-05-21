// components/SearchPageClient.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useSearchQuery } from '@/features/shopifyApi';
import Link from 'next/link';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, isLoading, isError } = useSearchQuery(query, { skip: !query });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for &quot;{query}&quot;</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error fetching results.</p>}

      {!query && <p>Type something in the search bar...</p>}

      {data && (
        <>
          {/* Products */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.products.edges.map(({ node }: any) => (
                <Link
                  href={`/product/${node.handle}`}
                  key={node.id}
                  className="border p-4 rounded hover:shadow transition"
                >
                  <img
                    src={node.images.edges[0]?.node.url}
                    alt={node.images.edges[0]?.node.altText || node.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <p className="mt-2 font-medium">{node.title}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.collections.edges.map(({ node }: any) => (
                <Link
                  href={`/collection/${node.handle}`}
                  key={node.id}
                  className="border p-4 rounded hover:shadow transition"
                >
                  {node.image && (
                    <img
                      src={node.image.url}
                      alt={node.image.altText || node.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <p className="mt-2 font-medium">{node.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
