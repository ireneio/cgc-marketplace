import Cart from '@/components/Game/Cart';
import { Attr } from '@/components/Game/ListCard';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Button from '@/components/Shared/Button';
import DropdownMenu from '@/components/Shared/DropdownMenu';
import Tag from '@/components/Shared/Tag';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTrimmedAddress } from '@/utils/formatters';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const Nft = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [info, setInfo] = useState({
    id: '',
    name: '3670',
    brand: 'SolChicks',
    description:
      'SolChicks is One of The Best Play To Earn Crypto Games with exceptional PvP gaming. Our mission is simple: to be the leading fantasy NFT PvP and P2E crypto gaming ecosystem on the Solana blockchain. Buy & sell SolChicks with the community. Create collections & earn rewards. Breed adorable SolChicks to unlock rare traits. Play games in the SolChicks universe',
    price: '3.5',
    image: '/img/chicks_nft1.png',
    auctionEndDate: dayjs().toISOString(),
    saleEndDate: dayjs().toISOString(),
    attributes: [
      { traitType: 'background', value: 'Mountains' },
      { traitType: 'base', value: 'Mountains' },
      { traitType: 'clothing', value: 'Mountains' },
      { traitType: 'hats', value: 'Mountains' },
      { traitType: 'accessory', value: 'Mountains' },
      { traitType: 'rarity', value: 'Mountains' },
      { traitType: 'traitType', value: 'Mountains' },
    ],
    royaltiesPercentage: 5,
    mintAddress: 'wtS75q4ecvUjBkDesTbiEw3Y88c7eCh49nLzzuPy72t',
    owner: 'wtS75q4ecvUjBkDesTbiEw3Y88c7eCh49nLzzuPy72t',
  });
  const [openCart, setOpenCart] = useState(true);

  useEffect(() => {
    if (router.query.id) {
      setInfo((prev) => {
        return {
          ...prev,
          id: String(router.query.id),
        };
      });
    } else {
      router.replace('/');
    }
  }, [router.query]);

  const isItemAddedToCart = useMemo(() => {
    return cartItems.find((item: Attr) => String(info.id) === String(item.id));
  }, [cartItems]);

  const handleBuy = async () => {
    console.log('handleBuy');
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...info, isAddedToCart: true },
    });
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="cursor-pointer">
            <img
              src="/img/icon_refresh.png"
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">1 Item</div>
        </div>
        <div className="relative">
          {openCart && (
            <DropdownMenu bottom={-505} left={-228}>
              <Cart />
            </DropdownMenu>
          )}
          <Button onClick={() => setOpenCart((prev) => !prev)}>
            <div className="flex items-center">
              <div>
                <img
                  src="/img/icon_cart.png"
                  alt="cart"
                  width={12}
                  height={12}
                />
              </div>
              <div className="text-[#FFFFFF] ml-[4px] text-[12px] flex items-center">
                <div>Cart</div>
                <div
                  className="ml-[4px]"
                  style={{
                    background:
                      'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  [{cartItems.length}]
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex mt-[12px]">
        <div style={{ flexBasis: '50%' }}>
          <div className="max-w-[552px]">
            <img
              src={info.image}
              alt={info.name}
              width="552px"
              height="552px"
              className="rounded-[5px]"
            />
          </div>
          <Tag className="mt-[30px] px-[28px] py-[24px]">
            <div>
              <div className="flex justify-between">
                <div className="text-[14px] text-[#FFFFFF]">Mint Address</div>
                <div
                  style={{
                    background:
                      'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  className="text-[14px]"
                >
                  {getTrimmedAddress(info.mintAddress, { length: 10 })}
                </div>
              </div>
            </div>
            <div className="mt-[14px] flex justify-between">
              <div className="text-[14px] text-[#FFFFFF]">Owner</div>
              <div
                style={{
                  background:
                    'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="text-[14px]"
              >
                {getTrimmedAddress(info.owner, { length: 10 })}
              </div>
            </div>
            <div className="mt-[14px] flex justify-between">
              <div className="text-[14px] text-[#FFFFFF]">Royalties</div>
              <div className="text-[14px] text-[#FFFFFF] font-semibold">
                {info.royaltiesPercentage}%
              </div>
            </div>
          </Tag>
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[12px]">
          <Tag className="px-[28px] py-[24px]">
            <div>
              <div className="text-[#FFFFFF] font-bold text-[36px]">
                {info.name}
              </div>
              <div className="mt-[4px] text-[14px] text-[#9497AA] flex items-start">
                <div>{info.brand}</div>
                <div className="mt-[3px] ml-[3px]">
                  <img
                    src="/img/icon_cr.png"
                    alt="copyright"
                    width={6}
                    height={6}
                  />
                </div>
              </div>
              <div className="mt-[24px] text-[#FFFFFF] text-[14px]">
                {info.description}
              </div>
              <div className="mt-[16px] text-[#FFFFFF] text-[16px] flex">
                <div>Sale Ends At</div>
                <div className="ml-[8px] font-semibold">
                  {dayjs(info.auctionEndDate || info.saleEndDate).format(
                    'DD MMM YYYY hh:mm',
                  )}
                </div>
              </div>
            </div>
          </Tag>
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
              <div className="mt-[34px] flex items-center">
                <Button onClick={() => handleBuy()}>Buy Now</Button>
                <div className="ml-[8px]">
                  <Button
                    disabled={isItemAddedToCart}
                    onClick={() => handleAddToCart()}
                    style={{ paddingLeft: 12, paddingRight: 12 }}
                  >
                    <img
                      src="/img/icon_cart.png"
                      alt="cart"
                      width={21}
                      height={21}
                    />
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
          <Tag className="px-[28px] py-[24px] mt-[30px]">
            <div className="grid grid-cols-3 gap-[12px]">
              {info.attributes.map((attr, index) => {
                return (
                  <div key={index}>
                    <div className="text-[#FFFFFF] font-normal text-[14px] capitalize">
                      {attr.traitType}
                    </div>
                    <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
                      {attr.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </Tag>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Nft;
