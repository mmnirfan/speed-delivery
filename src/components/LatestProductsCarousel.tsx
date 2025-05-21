import Carousel from './Carousel';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '@/features/shopifyApi';

export default function LatestProductsCarousel() {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;

  const products = data?.products?.edges || [];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
      <Carousel>
        {products.map(({ node }: any) => (
          <ProductCard key={node.id} product={node} />
        ))}
      </Carousel>
    </section>
  );
}
