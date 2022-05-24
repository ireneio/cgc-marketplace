import { NftInfo } from '@/pages/nft/[id]';
import { useAppDispatch, useAppSelector } from '@/store';
import { useMemo } from 'react';
import { Attr } from '../Game/RowCard';
import Button from '../Shared/Button';
import Tag from '../Shared/Tag';

const ActionPanel = ({
  info,
  onCartOpen,
}: {
  info: NftInfo;
  onCartOpen: (val: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const isItemAddedToCart = useMemo(() => {
    return cartItems.find((item: Attr) => String(info.id) === String(item.id));
  }, [cartItems, info]);

  const handleBuy = async () => {
    console.log('handleBuy');
  };

  const handleAddToCart = () => {
    if (!isItemAddedToCart) {
      dispatch({
        type: 'ADD_CART_ITEM',
        payload: { ...info, isAddedToCart: true },
      });
    }
    onCartOpen && onCartOpen(true);
  };

  return (
    <Tag className="px-[28px] py-[24px] mt-[30px]">
      <div>
        <div className="font-light text-[#FFFFFF] text-[14px]s">
          Current Price
        </div>
        <div className="flex items-center mt-[8px]">
          <div className="text-[24px] font-semibold text-[#FFFFFF]">
            {info.price}
          </div>
          <div className="mt-[6px] ml-[6px]">
            <img
              src={'/img/icon_unit_sol.png'}
              alt={'sol'}
              width={16}
              height={16}
            />
          </div>
          <div className="ml-[8px] self-center mt-[6px] text-[#9497AA]">
            (${info.price})
          </div>
        </div>
        <div className="mt-[34px] flex items-center flex-wrap">
          <Button onClick={() => handleBuy()}>Buy Now</Button>
          <div className="ml-[8px]">
            <Button
              onClick={() => handleAddToCart()}
              style={{ paddingLeft: 12, paddingRight: 12 }}
              disabled={isItemAddedToCart}
            >
              {isItemAddedToCart ? (
                'In Cart'
              ) : (
                <img
                  src="/img/icon_cart.png"
                  alt="cart"
                  width={21}
                  height={21}
                />
              )}
            </Button>
          </div>
          <div className="ml-[20px]">
            <Button disabled={!info.auctionEndDate}>Make Offer</Button>
          </div>
        </div>
        <div className="mt-[14px] text-[14px] font-light text-[#9497AA]">
          By proceeding, you agree to our Terms and Privacy
        </div>
      </div>
    </Tag>
  );
};

export default ActionPanel;
