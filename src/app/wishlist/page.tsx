// app/wishlist/page.tsx
'use client';

import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 6;

export default function WishlistPage() {
  const { wishlist, remove, updateNote } = useWishlist();
  const { addItem } = useCart();
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = wishlist.slice(offset, offset + ITEMS_PER_PAGE);
  console.log(wishlist)

  const handleMoveToCart = (item: any) => {
  addItem({
    id: item.id,
    title: item.title,
    handle: item.handle,
    variantId: item.variantId,
    variantTitle: item.variantTitle || '', // Provide empty string if not available
    price: item.price,
    image: item.image,
    quantity: 1,
  });
  remove(item.id, item.variantId);
  toast.success('Item moved to cart!');
};

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-600">
          <Image
            src="/svg/empty-wishlist.svg"
            alt="Empty Wishlist"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <p>Your wishlist is empty.</p>
          <Link href="/" className="text-primary hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div
                key={`${item.id}-${item.variantId}`}
                className="border rounded-lg shadow-sm p-4 bg-white"
              >
                <Link href={`/product/${item.handle}`} className="block mb-3">
                  <div className="aspect-[4/5] relative mb-2 overflow-hidden rounded">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-sm font-medium text-gray-800 truncate">
                    {item.title}
                  </h2>
                  {item.variantTitle && (
                    <p className="text-xs text-gray-500">{item.variantTitle}</p>
                  )}
                </Link>

                <textarea
                  value={item.note || ''}
                  onChange={(e) =>
                    updateNote(item.id, item.variantId, e.target.value)
                  }
                  placeholder="Add a note..."
                  className="w-full mt-2 p-2 text-sm border rounded resize-none"
                />

                <div className="mt-3 flex space-x-4">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="text-sm px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => remove(item.id, item.variantId)}
                    className="text-sm px-4 py-2 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-6 flex justify-center">
              <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                breakLabel={'...'}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName={'flex space-x-2'}
                pageClassName={'px-3 py-1 border rounded'}
                activeClassName={'bg-primary text-white'}
                previousClassName={'px-3 py-1 border rounded'}
                nextClassName={'px-3 py-1 border rounded'}
                breakClassName={'px-3 py-1'}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
