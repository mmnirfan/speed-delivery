// src/hooks/useCheckout.ts
import { useCreateCartMutation } from '@/features/shopifyApi';
import { useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectCartItems } from '@/features/cartSlice';

export const useCheckout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const [createCart, { isLoading, error }] = useCreateCartMutation();

  const initiateCheckout = useCallback(async () => {
    const items = cartItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const res = await createCart(items).unwrap();
    return res?.cartCreate?.cart?.checkoutUrl;
  }, [cartItems, createCart]);

  return {
    initiateCheckout,
    isLoading,
    error,
  };
};
