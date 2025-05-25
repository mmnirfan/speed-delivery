'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { useWishlist } from '@/hooks/useWishlist';
import type { WishlistItem } from '@/types';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: { node: { url: string; altText: string | null } }[];
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    variants?: {
      edges: {
        node: {
          id: string;
        };
      }[];
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const variantId = product.variants?.edges?.[0]?.node?.id;

  // ❗ Don't render card if no variantId (avoid invalid cart items)
  if (!variantId) return null;

  const { isInWishlist, toggle } = useWishlist();

  const item: WishlistItem = {
    id: product.id,
    title: product.title,
    handle: product.handle,
    image: image?.url || '',
    variantId, // ✅ Always a valid ProductVariant GID
    price: parseFloat(product.priceRange.minVariantPrice.amount),
  };

  return (
    <div className="relative w-full min-w-[220px] bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => toggle(item)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow hover:scale-105 transition"
        aria-label="Add to Wishlist"
      >
        {isInWishlist(product.id, variantId) ? (
          <SolidHeart className="h-5 w-5 text-red-500" />
        ) : (
          <OutlineHeart className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <Link href={`/product/${product.handle}`} className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-t">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || 'Product image'}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            AED {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}
