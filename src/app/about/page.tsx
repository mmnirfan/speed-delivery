'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-600">About Speed Delivery</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-4">
              Welcome to <strong>Speed Delivery</strong> — your trusted destination for fast, reliable, and effortless online shopping.
              We bring you a handpicked selection of high-quality products with lightning-fast delivery right to your door.
            </p>
            <p className="text-lg mb-4">
              Whether you're shopping for daily essentials, trending gadgets, or lifestyle must-haves, our goal is to make your experience seamless and satisfying.
              With a focus on exceptional service, quality assurance, and customer care, Speed Delivery is more than just an e-commerce store — it’s a promise of speed, satisfaction, and trust.
            </p>
            <p className="text-lg mb-4">
              We work directly with manufacturers and brands to ensure the best prices and genuine products. Our fulfillment network is optimized for same-day or next-day delivery across major cities.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Start Shopping
            </Link>
          </div>

          <div className="relative h-80 md:h-96">
            <Image
              src="/images/about-illustration.jpg"
              alt="Fast Delivery Illustration"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Mission</h2>
          <p className="text-md text-gray-700 max-w-2xl mx-auto">
            To redefine convenience in e-commerce by providing ultra-fast, dependable delivery with an exceptional customer experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold text-green-600">Fast & Reliable</h3>
            <p className="text-gray-600 mt-2">Lightning-fast shipping and real-time tracking for every order.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-600">Top Quality</h3>
            <p className="text-gray-600 mt-2">Curated catalog of premium, vetted products you can trust.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-600">Customer First</h3>
            <p className="text-gray-600 mt-2">24/7 support and a 100% satisfaction guarantee.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
