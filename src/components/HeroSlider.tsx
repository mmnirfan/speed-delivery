'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';

import { useGetCollectionByHandleQuery } from '@/features/shopifyApi';

type HeroSliderProps = {
  collectionHandle: string;
};

export default function HeroSlider({ collectionHandle }: HeroSliderProps) {
  const { data, isLoading, error } = useGetCollectionByHandleQuery(collectionHandle);

  if (isLoading) return <div className="text-center py-10">Loading hero products...</div>;
  if (error || !data?.collectionByHandle?.products?.edges?.length) {
    return <div className="text-center text-red-500 py-10">No products found in this collection.</div>;
  }

  const products = data.collectionByHandle.products.edges;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000 }}
      loop
      pagination={{ clickable: true }}
      className="w-full"
    >
      {products.map(({ node }: any) => (
        <SwiperSlide key={node.id}>
          <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-20">
            {/* Text */}
            <div className="text-center md:text-left space-y-4 md:w-1/2 animate-fadeInUp">
              <p className="text-sm uppercase font-semibold text-gray-600 tracking-widest">
                Featured Product
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{node.title}</h1>
              <Link
                href={`/product/${node.handle}`}
                className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                View Product
              </Link>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              {node.images?.edges?.[0]?.node?.url ? (
                <Image
                  src={node.images.edges[0].node.url}
                  alt={node.images.edges[0].node.altText || node.title}
                  width={600}
                  height={400}
                  className="mx-auto"
                  priority
                />
              ) : (
                <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
