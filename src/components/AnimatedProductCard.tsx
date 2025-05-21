// components/AnimatedProductCard.tsx
'use client';

import ProductCard from './ProductCard';

export default function AnimatedProductCard({ product }: { product: any }) {
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-200 shadow hover:shadow-xl transition duration-300 bg-white hover:-translate-y-1 hover:border-primary hover:bg-primary/5">
      <ProductCard product={product} />
    </div>
  );
}
