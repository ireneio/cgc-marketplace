import { Attr } from '@/components/Collection/ListCard';
import { useAppDispatch, useAppSelector } from '@/store';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const isItemAddedToCart = (tokenAddress: string) => {
    return cartItems.find(
      (item: Attr) => String(item.tokenAddress) === String(tokenAddress),
    );
  };

  const handleAddToCart = (params: Attr) => {
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
    handleAddToCart,
    isItemAddedToCart,
  };
};
