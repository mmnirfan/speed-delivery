// src/hooks/useWishlist.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToWishlist,
  removeFromWishlist,
  updateWishlistNote,
  selectWishlist,
} from '@/features/wishlistSlice';
import type { WishlistItem } from '@/types';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectWishlist);

  const isInWishlist = (id: string, variantId?: string) => {
    return wishlist.some(
      (item) => item.id === id && item.variantId === variantId
    );
  };

  const add = (item: WishlistItem) => {
    dispatch(addToWishlist(item));
  };

  const remove = (id: string, variantId?: string) => {
    dispatch(removeFromWishlist({ id, variantId }));
  };

  const toggle = (item: WishlistItem) => {
    const exists = isInWishlist(item.id, item.variantId);
    if (exists) {
      remove(item.id, item.variantId);
    } else {
      add(item);
    }
  };

  const updateNote = (id: string, variantId: string | undefined, note: string) => {
    dispatch(updateWishlistNote({ id, variantId, note }));
  };

  return {
    wishlist,
    isInWishlist,
    add,
    remove,
    toggle,
    updateNote,
  };
};
