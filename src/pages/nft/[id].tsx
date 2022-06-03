import DefaultLayout from '@/components/Layout/DefaultLayout';
import ActionPanel from '@/components/Nft/ActionPanel';
import AttributesPanel from '@/components/Nft/AttributesPanel';
import CartSection from '@/components/Nft/CartSection';
import HistoryTable from '@/components/Nft/HistoryTable';
import InfoPanel from '@/components/Nft/InfoPanel';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import Pagination from '@/components/Shared/Pagination';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppDispatch } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  getBreadcrumbItemRoutes,
  getSelectGroupItems,
} from '@/utils/cgcConsts';
import { getNumberWithCommas } from '@/utils/formatHelper';

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
type Selection = 'About' | 'All Items' | 'Your Items' | 'Collection Item';

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
    image:
      'https://ipfs.io/ipfs/QmeN1gvQG97kAgvTBt9oV1Ddxmi1HNc6WQbbHbXhnTQvHa/solchicks-10001.png',
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
  const [currentSelection, setCurrentSelection] =
    useState<Selection>('Collection Item');

  const handleSelect = (value: Selection) => {
    setCurrentSelection(value);
    switch (value) {
      case 'About':
        router.push(`/collection/${router.query.id}`).then();
        setInfo((prev) => ({
          ...prev,
          header: info.name,
        }));
        return;
      case 'All Items':
        router.push(`/collection/${router.query.id}`).then();
        setInfo((prev) => ({
          ...prev,
          header: 'All Items',
        }));
        return;
      case 'Your Items':
        router.push(`/collection/${router.query.id}`).then();
        setInfo((prev) => ({
          ...prev,
          header: 'Your Items',
        }));
        return;
    }
  };

  const breadCrumbItems = useMemo(() => {
    return getBreadcrumbItemRoutes(
      currentSelection,
      info.brand,
      `${info.brand} ${info.name}`,
    );
  }, [currentSelection, info.brand, info.name]);

  useEffect(() => {
    if (router.query.id) {
      dispatch({ type: 'INIT_CART' });
      setInfo((prev) => {
        return {
          ...prev,
          id: String(router.query.id),
        };
      });
    }
  }, [dispatch, router]);

  return (
    <DefaultLayout>
      <div className="mb-[16px]">
        <Breadcrumb
          items={breadCrumbItems}
          currentValue={
            currentSelection === 'About' ? 'Collection' : currentSelection
          }
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/').then();
            } else if (val === 'Collection') {
              handleSelect('About');
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#FFFFFF] font-bold text-[24px]">
          {info.brand} {info.name}
        </div>
        <div>
          <SelectGroup
            items={getSelectGroupItems()}
            onItemClick={(value) => handleSelect(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[22px]">
        <Divider />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="cursor-pointer">
            <img
              src={'/img/icon_refresh.png'}
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">1 item</div>
        </div>
        <CartSection
          openCart={openCart}
          onToggleCart={(val) => setOpenCart(val)}
        />
      </div>
      <div className="flex mt-[24px] flex-wrap">
        <div style={{ flexBasis: '50%' }}>
          <div className="w-full">
            <img
              src={info.image}
              alt={info.name}
              width="100%"
              className="rounded-[5px]"
            />
          </div>
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[12px]">
          <ActionPanel info={info} onCartOpen={(val) => setOpenCart(val)} />
          <AttributesPanel info={info} />
          <InfoPanel info={info} />
        </div>
      </div>
      <div className="mt-[36px]">
        <Divider />
      </div>
      <div className="mt-[36px] mb-[24px]">
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
        <div className="mt-[32px] mb-[48px]">
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
