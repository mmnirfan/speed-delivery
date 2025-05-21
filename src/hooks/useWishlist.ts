// src/hooks/useWishlist.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToWishlist, removeFromWishlist, clearWishlist, selectWishlist } from '@/features/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlist);

  const addItem = (item: { id: string; title: string; handle: string; image: string }) => {
    dispatch(addToWishlist(item));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const clear = () => {
    dispatch(clearWishlist());
  };

  return {
    wishlistItems,
    addItem,
    removeItem,
    clear,
  };
};
