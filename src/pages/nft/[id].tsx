import DefaultLayout from '@/components/Layout/DefaultLayout';
import ActionPanel from '@/components/Nft/ActionPanel';
import AttributesPanel from '@/components/Nft/AttributesPanel';
import CartSection from '@/components/Nft/CartSection';
import DetailPanel from '@/components/Nft/DetailPanel';
import HistoryTable from '@/components/Nft/HistoryTable';
import InfoPanel from '@/components/Nft/InfoPanel';
import Divider from '@/components/Shared/Divider';
import Pagination from '@/components/Shared/Pagination';
import Snackbar from '@/components/Shared/Snackbar';
import { useAppDispatch } from '@/store';
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
  const dispatch = useAppDispatch();
  const router = useRouter();
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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (router.query.id) {
      dispatch({ type: 'INIT_CART' });
      setInfo((prev) => {
        return {
          ...prev,
          id: String(router.query.id),
        };
      });
    } else {
      // router.replace('/');
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
      <div className="flex mt-[12px] flex-wrap">
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
      <div className="mt-[24px]">
        <Divider />
      </div>
      <div className="mt-[24px]">
        <div className="flex justify-between items-center">
          <div className="text-[#FFFFFF] font-bold text-[20px]">
            Transaction History
          </div>
          <div>
            <Pagination
              totalPages={15}
              currentPage={currentPage}
              onPageChange={(val) => setCurrentPage(val)}
              onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
              onNextPage={() => setCurrentPage((prev) => prev + 1)}
            />
          </div>
        </div>
        <div className="mt-[32px]">
          <HistoryTable
            rows={[
              [
                'Listing',
                'AC95124da74ca921wdpk1134',
                'AC95124da74ca921wdpk1134',
                new Date().toISOString(),
                '12399999999.45678',
              ],
              [
                'Transfer',
                'AC95124da74ca921wdpk1134',
                'AC95124da74ca921wdpk1134',
                new Date().toISOString(),
                '12399999999.45678',
              ],
              [
                'Cancel',
                'AC95124da74ca921wdpk1134',
                'AC95124da74ca921wdpk1134',
                new Date().toISOString(),
                '12399999999.45678',
              ],
            ]}
            headers={['type', 'seller', 'buyer', 'time', 'price']}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Nft;
