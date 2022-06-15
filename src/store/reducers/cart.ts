import { CartAttr } from '@/hooks/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const CART_STORAGE_KEY = 'CART_STORAGE_KEY';

interface CartState {
  cartItems: CartAttr[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartAttr>) => {
      const _added = [...state.cartItems, action.payload];
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(_added));
      state.cartItems = _added;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const _removed = [
        ...state.cartItems.filter(
          (item) => String(item.tokenAddress) !== String(action.payload),
        ),
      ];
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(_removed));
      state.cartItems = _removed;
    },
    clearCart: (state) => {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      state.cartItems = [];
    },
    initCart: (state) => {
      const cart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (cart) {
        const _cart = JSON.parse(cart);
        state.cartItems = _cart;
      }
    },
  },
});

export const { addCartItem, removeCartItem, clearCart, initCart } =
  cartSlice.actions;

export default cartSlice.reducer;
