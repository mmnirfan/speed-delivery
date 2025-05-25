'use client';

import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { useGetCollectionsQuery } from '@/features/shopifyApi';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  HeartIcon as OutlineHeart,
} from '@heroicons/react/24/outline';
import { useWishlist } from '@/hooks/useWishlist';

export default function Header() {
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: collectionsData } = useGetCollectionsQuery();
  const collections = collectionsData?.collections?.edges || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Speed Delivery
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/search" className="hover:text-primary">Search</Link>

          <Menu as="div" className="relative">
            <Menu.Button className="hover:text-primary">Collections ⌄</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md focus:outline-none z-50">
                <div className="py-1">
                  {collections.map(({ node }: any) => (
                    <Menu.Item key={node.id}>
                      {({ active }) => (
                        <Link
                          href={`/collection/${node.handle}`}
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-primary' : 'text-gray-700'}`}
                        >
                          {node.title}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative flex items-center hover:text-primary">
            <OutlineHeart className="w-5 h-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="ml-1 text-sm">({wishlistCount})</span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative flex items-center hover:text-primary">
            <ShoppingBagIcon className="w-5 h-5" />
            {isMounted && cartCount > 0 && (
              <span className="ml-1 text-sm">({cartCount})</span>
            )}
          </Link>
        </nav>

        {/* Mobile Icons & Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/wishlist" className="relative flex items-center hover:text-primary">
            <OutlineHeart className="w-5 h-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="ml-1 text-sm">({wishlistCount})</span>
            )}
          </Link>
          <Link href="/cart" className="relative flex items-center hover:text-primary">
            <ShoppingBagIcon className="w-5 h-5" />
            {isMounted && cartCount > 0 && (
              <span className="ml-1 text-sm">({cartCount})</span>
            )}
          </Link>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col p-4 space-y-4 text-sm font-medium text-gray-700">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link href="/search" onClick={() => setMobileMenuOpen(false)}>Search</Link>

            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    as="div"
                    className="flex justify-between items-center w-full text-left"
                  >
                    <span>Collections</span>
                    <span>{open ? '−' : '+'}</span>
                  </Disclosure.Button>

                  <Disclosure.Panel as="div" className="pl-4 mt-2 space-y-1">
                    {collections.map(({ node }: any) => (
                      <Link
                        key={node.id}
                        href={`/collection/${node.handle}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-primary"
                      >
                        {node.title}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </nav>
        </div>
      )}
    </header>
  );
}
