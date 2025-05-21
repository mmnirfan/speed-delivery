'use client';

import Carousel from '@/components/Carousel';
import OfferBanner from '@/components/OfferBanner';
import { useGetProductsQuery } from '@/features/shopifyApi';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import HeroSliderSkeleton from '@/components/skeletons/HeroSliderSkeleton';
import ProductCarouselSkeleton from '@/components/skeletons/ProductCarouselSkeleton';

export default function HomePage() {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log('SHOPIFY URL:', `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`);
  console.log('ACCESS TOKEN:', process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);

  if (isLoading) return <HeroSliderSkeleton />;

  return (
    <div className="space-y-16">
      {/* Hero */}
      <HeroSlider collectionHandle="smart-accessories" />
      {/* Offers */}
      <OfferBanner />
      {/* Product Carousel */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Products</h2>
        {isLoading && <ProductCarouselSkeleton />}
        {error && (
          <p className="text-red-500">
            Failed to load products.
            <pre className="text-xs mt-2">{JSON.stringify(error, null, 2)}</pre>
          </p>
        )}
        {data && (
          <Carousel>
            {data.edges.map(({ node }: any) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </Carousel>
        )}

      </section>

      {/* About Section */}
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#f4f4f4] to-white shadow-sm p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Why Choose Speed Delivery?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Speed Delivery is your trusted partner in ultra-fast e-commerce fulfillment across the UAE. We specialize in
            delivering trending gadgets, fashion, and lifestyle essentials directly to your doorstep — often within hours.
            Our platform combines curated quality, seamless checkout, and real-time delivery tracking for a frictionless
            shopping experience.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left text-sm text-gray-700">
            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-xl">✓</span>
              <span><strong>Express UAE-wide Delivery</strong> — Same-day in major cities.</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-xl">✓</span>
              <span><strong>Genuine Products</strong> — Authorized from top brands.</span>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-green-600 text-xl">✓</span>
              <span><strong>Secure Checkout</strong> — Fast, localized payment options.</span>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-block mt-6 text-sm font-medium text-blue-600 hover:underline"
          >
            Learn More About Us →
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-white rounded-lg shadow-sm p-8 border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Whether it’s tracking an order, product inquiries, returns, or just general feedback — our dedicated support
            team is always happy to help. We’re available via email, WhatsApp, and live chat.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-700">
            <div>
              📧 <strong>Email:</strong>{' '}
              <a href="mailto:support@speeddelivery.ae" className="text-blue-600 hover:underline">
                support@speeddelivery.ae
              </a>
            </div>
            <div>
              💬 <strong>WhatsApp:</strong>{' '}
              <a href="https://wa.me/971501234567" className="text-blue-600 hover:underline" target="_blank">
                +971 50 123 4567
              </a>
            </div>
            <div>
              🕒 <strong>Support Hours:</strong> 9 AM – 9 PM, Sunday–Thursday
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-block mt-6 text-sm font-medium text-blue-600 hover:underline"
          >
            Contact Us →
          </Link>
        </div>
      </section>

    </div>
  );
}
