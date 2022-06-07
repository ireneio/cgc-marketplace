import { useAppDispatch, useAppSelector } from '@/store';
import { getNumberWithCommas } from '@/utils/formatHelper';
import { useMemo } from 'react';
import Button from '../Shared/Button';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';
import { Attr } from './ListCard';

const Cart = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc: number, curr: Attr) => {
      acc += Number(curr.price);
      return acc;
    }, 0);
  }, [cartItems]);

  const totalPriceToUSD = useMemo(() => {
    return totalPrice;
  }, [totalPrice]);

  const handleRemoveItem = (tokenAddress: string) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: String(tokenAddress) });
  };

  const handleBuy = async () => {
    // TODO batch buy
  };

  return (
    <div>
      <div
        className="px-[2px] py-[2px] rounded-[5px]"
        style={{
          background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        }}
      >
        <Tag className="px-[28px] py-[28px] w-[354px] drop-shadow-2xl z-[101] border-[4px]">
          <div>
            <div className="text-[#FFFFFF] font-semibold text-[16px] flex items-center">
              <div>
                <img
                  src="/img/icon_cart.svg"
                  alt="cart"
                  width={'16px'}
                  height={'16px'}
                />
              </div>
              <div className="ml-[8px]">My Cart</div>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => onClose && onClose()}
              >
                <img
                  src="/img/icon_double_chevron_left.png"
                  alt="cart"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div className="mt-[16px]">
              <Divider />
            </div>
            <div className="mt-[16px] h-[243px] pt-[2px] pr-[12px] overflow-auto">
              {!cartItems.length && (
                <div className="text-[#FFFFFF] w-full flex justify-center flex-col items-center h-[150px] mx-auto">
                  <div className="text-[16px]">You shopping cart is Empty.</div>
                  <div
                    className="text[-18px] mt-[8px] text-[#9497AA] cursor-pointer underline"
                    onClick={() => onClose && onClose()}
                  >
                    Continue Shopping!
                  </div>
                </div>
              )}
              {cartItems.map((item: Attr, index: number) => {
                return (
                  <div key={index} className="mb-[12px]">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={65}
                          height={65}
                          className="rounded-[5px]"
                        />
                        <div
                          className="absolute right-[-2px] top-[-2px] cursor-pointer hover:scale-[1.35] transition-all"
                          onClick={() => handleRemoveItem(item.tokenAddress)}
                        >
                          <img
                            src="/img/icon_purple_rounded_close.png"
                            alt="cart"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                      <div className="ml-[15px]">
                        <div className="text-[#FFFFFF] text-[14px]">
                          {item.name}
                        </div>
                        <div className="text-[#9497AA] text-[14px] mt-[4px] text-left">
                          {item.brand.toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <div className="text-[#FFFFFF] text-[14px] font-semibold">
                          {item.price}
                        </div>
                        <div className="mt-[1px] ml-[4px]">
                          <img
                            src="/img/icon_unit_sol.png"
                            alt="sol"
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Divider />
            <div className="mt-[18px] flex justify-between items-start">
              <div className="text-[#FFFFFF] text-[16px] font-semibold mt-[4px]">
                You Pay
              </div>
              <div>
                <div className="flex items-center">
                  <div className="text-[#FFFFFF] text-[24px] font-semibold">
                    {getNumberWithCommas(totalPrice)}
                  </div>
                  <div className="mt-[8px] ml-[4px]">
                    <img
                      src="/img/icon_unit_sol.png"
                      alt="sol"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
                <div className="text-[14px] text-[#9497AA] text-right mt-[-4px]">
                  (${getNumberWithCommas(totalPriceToUSD)})
                </div>
              </div>
            </div>
            <div className="mt-[22px] flex justify-center items-center">
              <Button
                disabled={cartItems.length === 0}
                onClick={() => handleBuy()}
                style={{ paddingLeft: 72, paddingRight: 72 }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </Tag>
      </div>
    </div>
  );
};

export default Cart;
