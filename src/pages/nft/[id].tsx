import YourView from '@/components/Collection/YourView';
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
import { useAppDispatch, useAppSelector } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import DetailPanel from '@/components/Nft/DetailPanel';
import api from '@/utils/api';
import { OAuthContext } from '@/contexts/OAuthProvider';

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
type Selection =
  | 'About'
  | 'All Items'
  | 'Your Items'
  | 'Collection Item'
  | 'Explore/All';

const Nft = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const oAuthCtx = useContext(OAuthContext);
  const router = useRouter();
  const [info, setInfo] = useState<NftInfo>({
    id: '',
    name: '',
    brand: '-',
    description: '',
    price: '0',
    image: '/img/cgc_icon.png',
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
    mintAddress: '',
    owner: '',
  });
  const [openCart, setOpenCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentSelection, setCurrentSelection] =
    useState<Selection>('Collection Item');

  const handleSelect = (value: Selection) => {
    setCurrentSelection(value);
    switch (value) {
      case 'About':
        router.push(`/collection/${metadata.slug}`);
        return;
      case 'All Items':
        router.push(`/collection/${metadata.slug}?tab=all_items`);
        return;
      case 'Your Items':
        router.push(`/collection/${metadata.slug}?tab=your_items`);
        return;
      case metadata.slug:
        router.push(`/collection/${metadata.slug}?tab=about`);
        return;
      case 'Explore/All':
        dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Explore/All' });
        router.push(`/`);
        return;
    }
  };

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

  const getCollectionData = async () => {
    const response = await api.getCollectionById(
      oAuthCtx.access_token,
      String(router.query.slug),
    );
    if (response) {
      dispatch({
        type: 'SET_CURRENT_COLLECTION',
        payload: {
          ...response,
          metadata: {
            ...response.metadata,
            slug: response.metadata.name.toLowerCase().split(' ').join(''),
            id: response.id,
          },
        },
      });
    }
  };

  const getNftData = async () => {
    setLoading(true);
    const response = await api.getNftListByCollectionId(
      oAuthCtx.access_token,
      String(router.query.slug),
    );
    if (response && response.length) {
      const filter = response.filter(
        (item: any) => item.tokenAddress === router.query.id,
      );
      if (!filter.length) return;
      const item = filter[0];
      const manifest = item?.splNftInfo?.data?.manifest;

      setInfo({
        id: item.id,
        name: manifest?.name,
        brand: manifest?.collection?.name,
        image: manifest?.image,
        description: manifest?.description,
        attributes:
          manifest?.attributes.map((item: any) => ({
            traitType: item.trait_type,
            value: item.value,
          })) || [],
        auctionEndDate: '',
        saleEndDate: '',
        royaltiesPercentage: 0,
        mintAddress: item.tokenAddress,
        owner: item?.splNftInfo?.walletAddress,
        price: '0',
      });
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    getNftData();
  };

  useEffect(() => {
    if (oAuthCtx.access_token && router.query.slug) {
      getCollectionData().then(() => {
        getNftData();
      });
    }
  }, [oAuthCtx.access_token, router.query.slug]);

  const breadCrumbItems = useMemo(() => {
    switch (currentSelection) {
      case 'Collection Item':
      default:
        return [
          { text: 'Home', value: 'Home', disabled: loading || !metadata.name },
          {
            text: 'Explore',
            value: 'Explore/All',
            disabled: loading || !metadata.slug,
          },
          {
            text: metadata?.name,
            value: 'About',
            disabled: loading || !metadata.slug,
          },
          {
            text: 'All Items',
            value: 'All Items',
            disabled: loading || !metadata.slug,
          },
          {
            text: info.name,
            value: info.name,
            disabled: loading || !metadata.slug,
          },
        ];
    }
  }, [metadata, currentSelection, info, loading]);

  const selectgroupItems = useMemo(() => {
    return [
      { text: 'About', value: 'About', disabled: !metadata.slug },
      { text: 'All Items', value: 'All Items', disabled: !metadata.slug },
      {
        text: 'Your Items',
        value: 'Your Items',
        disabled: !metadata.slug,
      },
      { text: '...', value: '...', disabled: !metadata.slug },
    ];
  }, [metadata]);

  return (
    <DefaultLayout>
      <div className="mb-[32px]">
        <Breadcrumb
          items={breadCrumbItems}
          currentValue={currentSelection}
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/').then();
            } else {
              handleSelect(val as Selection);
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
            items={selectgroupItems}
            currentValue={currentSelection}
            onItemClick={(value) => handleSelect(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      {currentSelection === 'Your Items' && <YourView />}
      {currentSelection !== 'Your Items' && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="cursor-pointer" onClick={() => handleRefresh()}>
                <img
                  src="/img/icon_refresh.svg"
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
              disabled={loading}
            />
          </div>
          <div className="flex mt-[12px] flex-wrap">
            <div style={{ flexBasis: '50%' }}>
              <div className="w-full">
                <img
                  src={info.image}
                  alt={info.name}
                  width="100%"
                  className="rounded-[5px]"
                />
              </div>
              <InfoPanel info={info} />
            </div>
            <div style={{ flexBasis: '50%' }} className="pl-[12px]">
              <DetailPanel info={info} />
              <ActionPanel
                info={info}
                onCartOpen={(val) => setOpenCart(val)}
                loading={loading}
              />
              <AttributesPanel info={info} />
            </div>
          </div>
          <div className="mt-[32px]">
            <Divider />
          </div>
          <div className="mt-[32px]">
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
        </div>
      )}
    </DefaultLayout>
  );
};

export default Nft;
