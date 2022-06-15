import { useAppDispatch, useAppSelector } from '@/store';
import { addCartItem, removeCartItem } from '@/store/reducers/cart';

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
    return !!cartItems.find(
      (item: CartAttr) => String(item.tokenAddress) === String(tokenAddress),
    );
  };

  const handleAddToCart = (params: CartAttr) => {
    if (isItemAddedToCart(params.tokenAddress)) {
      dispatch(removeCartItem(String(params.tokenAddress)));
    } else {
      dispatch(addCartItem(params));
    }
  };

  return {
    isItemAddedToCart,
    handleAddToCart,
  };
};
