// src/features/wishlist/wishlistSlice.ts
import { WishlistItem } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: WishlistItem[];
}

const loadWishlistFromStorage = (): WishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items: WishlistItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
      saveWishlistToStorage(state.items);
    },
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.find(
        item =>
          item.id === action.payload.id &&
          item.variantId === action.payload.variantId
      );
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist(
      state,
      action: PayloadAction<{ id: string; variantId?: string }>
    ) {
      state.items = state.items.filter(
        item =>
          item.id !== action.payload.id ||
          item.variantId !== action.payload.variantId
      );
      saveWishlistToStorage(state.items);
    },
    updateWishlistNote(
      state,
      action: PayloadAction<{ id: string; variantId?: string; note: string }>
    ) {
      const item = state.items.find(
        item =>
          item.id === action.payload.id &&
          item.variantId === action.payload.variantId
      );
      if (item) {
        item.note = action.payload.note;
        saveWishlistToStorage(state.items);
      }
    },
    clearWishlist(state) {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  updateWishlistNote,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlist = (state: { wishlist: WishlistState }) => state.wishlist.items;
