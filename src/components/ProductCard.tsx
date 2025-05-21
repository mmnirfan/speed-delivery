import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="min-w-[220px] max-w-[240px] flex-shrink-0 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-t">
        {image ? (
          <Image
            src={image?.url || '/placeholder.png'}
            alt={image?.altText || 'Product image'}
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
        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
        <p className="text-xs text-gray-600 mt-1">AED {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}</p>
      </div>
    </Link>
  );
}
