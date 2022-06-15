import { useAppDispatch, useAppSelector } from '@/store';

export interface CartAttr {
  image: string;
  name: string;
  brand: string;
  price: string | number;
  id: string | number;
  tokenAddress: string;
}

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const isItemAddedToCart = (tokenAddress: string) => {
    return cartItems.find(
      (item: CartAttr) => String(item.tokenAddress) === String(tokenAddress),
    );
  };

  const handleAddToCart = (params: CartAttr) => {
    if (isItemAddedToCart(params.tokenAddress)) {
      dispatch({
        type: 'REMOVE_CART_ITEM',
        payload: String(params.tokenAddress),
      });
    } else {
      dispatch({ type: 'ADD_CART_ITEM', payload: params });
    }
  };

  return {
    isItemAddedToCart,
    handleAddToCart,
  };
};
