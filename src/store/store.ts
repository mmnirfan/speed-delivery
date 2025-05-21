import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/features/cartSlice';
import { shopifyApi } from '@/features/shopifyApi';
import wishlistReducer from '@/features/wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [shopifyApi.reducerPath]: shopifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
