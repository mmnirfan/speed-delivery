import { CartItem } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const loadCart = (): CartState => {
  if (typeof window === 'undefined') return { items: [], totalQuantity: 0, totalPrice: 0 };

  const stored = localStorage.getItem('cart');
  const items: CartItem[] = stored ? JSON.parse(stored) : [];
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return { items, totalQuantity, totalPrice };
};

const initialState: CartState = loadCart();

const persistCart = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { variantId, quantity, price } = action.payload;
      const existing = state.items.find(i => i.variantId === variantId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...action.payload });
      }

      state.totalQuantity += quantity;
      state.totalPrice += price * quantity;
      persistCart(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(i => i.variantId === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(index, 1);
        persistCart(state);
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.variantId === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
        persistCart(state);
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(i => i.variantId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
        persistCart(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectTotalQuantity = (state: { cart: CartState }) => state.cart.totalQuantity;