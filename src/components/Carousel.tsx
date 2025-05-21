'use client';

import { ReactNode, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Carousel({ children }: { children: ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {children}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border shadow rounded-full p-2"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border shadow rounded-full p-2"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
