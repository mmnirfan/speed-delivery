'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client search page (no SSR)
const SearchPageClient = dynamic(() => import('@/components/SearchPageClient'), {
  ssr: false,
});

export default function SearchPageWrapper() {
  return <SearchPageClient />;
}
