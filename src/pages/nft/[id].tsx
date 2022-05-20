import Cart from '@/components/Game/Cart';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import ActionPanel from '@/components/Nft/ActionPanel';
import AttributesPanel from '@/components/Nft/AttributesPanel';
import CartSection from '@/components/Nft/CartSection';
import DetailPanel from '@/components/Nft/DetailPanel';
import InfoPanel from '@/components/Nft/InfoPanel';
import Button from '@/components/Shared/Button';
import DropdownMenu from '@/components/Shared/DropdownMenu';
import { useAppSelector } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface NftInfo {
  id: string | number;
  name: string;
  brand: string;
  description: string;
  price: string | number;
  image: string;
  auctionEndDate: string;
  saleEndDate: string;
  attributes: { traitType: string; value: string }[];
  royaltiesPercentage: number;
  mintAddress: string;
  owner: string;
}

const Nft = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [info, setInfo] = useState<NftInfo>({
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
  const [openCart, setOpenCart] = useState(false);

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
  }, [router]);

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
        <CartSection
          openCart={openCart}
          onToggleCart={(val) => setOpenCart(val)}
        />
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
          <InfoPanel info={info} />
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[12px]">
          <DetailPanel info={info} />
          <ActionPanel info={info} onCartOpen={(val) => setOpenCart(val)} />
          <AttributesPanel info={info} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Nft;
