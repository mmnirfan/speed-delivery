'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchQuery, useGetCollectionsQuery } from '@/features/shopifyApi';
import { ProductNode } from '@/types';

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawQuery = searchParams.get('q') || '';
  const collectionHandle = searchParams.get('collection') || 'all';

  const [searchInput, setSearchInput] = useState(rawQuery);
  const { data: searchData, isLoading } = useSearchQuery(rawQuery, { skip: !rawQuery });
  const { data: collectionsData } = useGetCollectionsQuery();

  const filteredProducts = useMemo(() => {
    const products = searchData?.products?.edges || [];

    if (collectionHandle === 'all') return products;

    return products.filter((p: ProductNode) =>
      p.node.collections?.edges?.some((c: any) => c.node.handle === collectionHandle)
    );
  }, [searchData, collectionHandle]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set('q', searchInput);
    router.push(`/search?${params.toString()}`);
  };

  const handleCollectionClick = (handle: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('collection', handle);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 animate-fadeIn">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 space-y-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 transition"
          >
            Search
          </button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-2">Collections</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleCollectionClick('all')}
                className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${collectionHandle === 'all' ? 'bg-gray-200 font-medium' : ''
                  }`}
              >
                All Products
              </button>
            </li>
            {collectionsData?.collections?.edges.map(({ node }: any) => (
              <li key={node.id}>
                <button
                  onClick={() => handleCollectionClick(node.handle)}
                  className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${collectionHandle === node.handle ? 'bg-gray-200 font-medium' : ''
                    }`}
                >
                  {node.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4">
        <h1 className="text-2xl font-bold mb-6">
          Results for &quot;{rawQuery}&quot; ({filteredProducts.length} products)
        </h1>

        {isLoading && <p>Loading products...</p>}
        {!rawQuery && <p className="text-gray-500">Type something to search products...</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(({ node }: any) => (
            <Link
              key={node.id}
              href={`/product/${node.handle}`}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <Image
                src={node.images.edges[0]?.node.url}
                alt={node.images.edges[0]?.node.altText || node.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold truncate">{node.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && !isLoading && (
          <p className="text-center text-gray-600 mt-10">No products found.</p>
        )}
      </main>
    </div>
  );
}
