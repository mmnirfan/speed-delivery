'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '@/features/cartSlice';
import { useCreateCartMutation } from '@/features/shopifyApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartPageSkeleton from '@/components/skeletons/CartPageSkeleton';
import Image from 'next/image';

export default function CartPage() {
  const { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [createCart, { isLoading }] = useCreateCartMutation();
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const estimatedTaxRate = 0.05; // 5% VAT
  const taxAmount = totalPrice * estimatedTaxRate;
  const finalTotal = totalPrice + taxAmount;

  const cartItems = items.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
  }));

  const handleCheckout = async () => {
    try {
      const response = await createCart(cartItems).unwrap();
      console.log('Cart Create Response:', response);

      if (response?.cartCreate?.cart?.checkoutUrl) {
        window.location.href = response.cartCreate.cart.checkoutUrl;
      } else if (response?.cartCreate?.userErrors?.length) {
        console.error('Shopify Cart Errors:', response.cartCreate.userErrors);
      } else {
        console.error('Unknown checkout error:', response);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  if (!isMounted || isLoading) return <CartPageSkeleton />;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-gray-600">
          <p>Your cart is empty.</p>
          <Link href="/search" className="text-blue-600 hover:underline mt-2 block">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-start gap-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded border"
                    width={80}
                    height={80}
                  />
                  <div className="space-y-1">
                    <Link
                      href={`/product/${item.handle}?variant=${encodeURIComponent(item.variantId)}`}
                      className="font-semibold text-lg text-blue-700 hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">{item.variantTitle}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() => dispatch(decreaseQuantity(item.variantId))}
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() => dispatch(increaseQuantity(item.variantId))}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.variantId))}
                      className="text-xs text-red-500 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-800 w-full sm:w-auto text-right">
                  AED {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Checkout */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="border rounded-lg p-6 bg-gray-50 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Items:</span>
                <span className="font-medium">{totalQuantity}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium">AED {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Tax (5% VAT):</span>
                <span className="font-medium">AED {taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-gray-800 border-t pt-3">
                <span>Total:</span>
                <span>AED {finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition text-center font-medium mt-4"
              >
                {isLoading ? 'Redirecting...' : 'Proceed to Checkout'}
              </button>

              <Link
                href="/search/frontpage"
                className="block text-center text-sm text-blue-600 hover:underline mt-2"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
