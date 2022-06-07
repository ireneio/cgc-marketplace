import { NftInfo } from '@/pages/nft/[id]';
import { useAppDispatch, useAppSelector } from '@/store';
import { useMemo } from 'react';
import { Attr } from '../Collection/RowCard';
import Button from '../Shared/Button';
import Tag from '../Shared/Tag';

const ActionPanel = ({
  info,
  onCartOpen,
  loading,
}: {
  loading: boolean;
  info: NftInfo;
  onCartOpen: (val: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const isItemAddedToCart = useMemo(() => {
    return cartItems.find(
      (item: Attr) => String(info.mintAddress) === String(item.tokenAddress),
    );
  }, [cartItems, info]);

  const handleBuy = async () => {
    console.log('handleBuy');
  };

  const handleAddToCart = () => {
    if (!isItemAddedToCart) {
      dispatch({
        type: 'ADD_CART_ITEM',
        payload: {
          ...info,
          isAddedToCart: true,
          tokenAddress: info.mintAddress,
        },
      });
      onCartOpen && onCartOpen(true);
    } else {
      dispatch({
        type: 'REMOVE_CART_ITEM',
        payload: String(info.mintAddress),
      });
    }
  };

  return (
    <Tag className="px-[28px] py-[24px]">
      <div>
        <div className="font-light text-[#FFFFFF] text-[14px]s">
          Current Price
        </div>
        <div className="flex items-center mt-[8px]">
          <div className="text-[24px] font-semibold text-[#FFFFFF]">
            {info.price}
          </div>
          <div className="mt-[2px] ml-[6px]">
            <img
              src={'/img/icon_unit_sol.png'}
              alt={'sol'}
              width={16}
              height={16}
            />
          </div>
          <div className="ml-[8px] self-center mt-[4px] text-[#9497AA]">
            (${info.price})
          </div>
        </div>
        <div className="mt-[34px] flex items-center flex-wrap">
          {!isItemAddedToCart && (
            <Button onClick={() => handleBuy()} disabled={loading}>
              Buy Now
            </Button>
          )}
          <div className={!isItemAddedToCart ? 'ml-[8px]' : ''}>
            <Button
              onClick={() => handleAddToCart()}
              style={{ paddingLeft: 12, paddingRight: 12 }}
              disabled={loading}
            >
              {isItemAddedToCart ? (
                'Remove From Cart'
              ) : (
                <img
                  src={'/img/icon_cart.svg'}
                  alt="cart"
                  width={21}
                  height={21}
                />
              )}
            </Button>
          </div>
          {!isItemAddedToCart && (
            <div className="ml-auto">
              <Button secondary disabled={!info.auctionEndDate || loading}>
                Make Offer
              </Button>
            </div>
          )}
        </div>
      </div>
    </Tag>
  );
};

export default ActionPanel;
