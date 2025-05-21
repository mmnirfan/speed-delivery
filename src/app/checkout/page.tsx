'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useCreateCartMutation } from '@/features/shopifyApi';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [createCheckout, { data, isLoading, isError }] = useCreateCartMutation();
  const router = useRouter();

  useEffect(() => {
    // Redirect to cart if empty
    if (cartItems.length === 0) {
      router.push('/cart');
      return;
    }

    // Trigger checkout creation
    const lineItems = cartItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    createCheckout(lineItems).unwrap().catch(() => {
      // Error handled by `isError`
    });
  }, [cartItems, createCheckout, router]);

  useEffect(() => {
    // Redirect to Shopify checkout once webUrl is available
    if (data?.cartCreate?.cart?.checkoutUrl) {
      window.location.href = data.cartCreate.cart.checkoutUrl;
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {isLoading ? (
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Redirecting to secure checkout…</p>
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : isError ? (
        <p className="text-red-600">Failed to initiate checkout. Please try again.</p>
      ) : (
        <p className="text-gray-600">Preparing your checkout...</p>
      )}
    </div>
  );
}
