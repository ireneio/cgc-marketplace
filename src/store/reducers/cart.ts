import { Attr } from '@/components/Collection/ListCard';

export const CART_STORAGE_KEY = 'CART_STORAGE_KEY';

interface CartState {
  cartItems: Attr[];
}

const initialState: CartState = {
  cartItems: [],
};

type Action =
  | {
      type: 'ADD_CART_ITEM';
      payload: Attr;
    }
  | {
      type: 'REMOVE_CART_ITEM';
      payload: string;
    }
  | {
      type: 'CLEAR_CART';
    }
  | {
      type: 'INIT_CART';
    };

export default function cartReducer(
  state: CartState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const _added = [...state.cartItems, action.payload];
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(_added));
      return {
        ...state,
        cartItems: _added,
      };
    case 'REMOVE_CART_ITEM':
      const _removed = [
        ...state.cartItems.filter(
          (item) => String(item.tokenAddress) !== String(action.payload),
        ),
      ];
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(_removed));
      return {
        ...state,
        cartItems: _removed,
      };
    case 'CLEAR_CART':
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return {
        ...state,
        cartItems: [],
      };
    case 'INIT_CART':
      const cart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (cart) {
        const _cart = JSON.parse(cart);
        return {
          ...state,
          cartItems: _cart,
        };
      } else {
        return {
          ...state,
          cartItems: [],
        };
      }
    default:
      return state;
  }
}
