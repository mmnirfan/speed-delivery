'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectTotalQuantity,
} from '@/features/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const addItem = (item: Parameters<typeof addToCart>[0]) => dispatch(addToCart(item));
  const removeItem = (variantId: string) => dispatch(removeFromCart(variantId));
  const increment = (variantId: string) => dispatch(increaseQuantity(variantId));
  const decrement = (variantId: string) => dispatch(decreaseQuantity(variantId));
  const clear = () => dispatch(clearCart());

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    totalQuantity,
    totalPrice,
    addItem,
    removeItem,
    increment,
    decrement,
    clear,
  };
};
