import { Metadata } from 'next';
import SearchPageWrapper from './SearchPageWrapper';

export const metadata: Metadata = {
  title: 'Search',
};

// export const viewport = {
//   themeColor: '#ffffff',
// };

export default function SearchPage() {
  return <SearchPageWrapper />;
}
