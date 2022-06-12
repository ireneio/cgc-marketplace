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
import { LoginModal } from '@/components/Auth/LoginModal';

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

const handleImageLoad = (e: any, image: string) => {
  e.target.classList.remove('blur');
  e.target.src = image === 'undefined' ? '/img/cgc_icon.png' : image;
  e.target.style.width = '100%';
  e.target.style.height = 'auto';
};

const handleImageError = (e: any) => {
  e.target.src = '/img/cgc_icon.png';
};

const Nft = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.userInfo.email);
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentSelection] = useState<Selection>('Collection Item');

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

  const selectGroupItems = useMemo(() => {
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

  const handleSelect = (value: Selection) => {
    switch (value) {
      case 'About':
        router.push(`/collection/${metadata.slug}`).then();
        return;
      case 'All Items':
        router.push(`/collection/${metadata.slug}?tab=all_items`).then();
        return;
      case 'Your Items': {
        if (!email) {
          setLoginModalOpen(true);
        } else {
          router.push(`/account?tab=items`).then();
        }
        return;
      }
      case metadata.slug:
        router.push(`/collection/${metadata.slug}?tab=about`).then();
        return;
      case 'Explore/All':
        dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Explore/All' });
        router.push(`/`).then();
        return;
    }
  };

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
            slug: response.metadata.name.toLowerCase().split(' ').join('_'),
            id: response.id,
          },
        },
      });
    }
  };

  const getNftData = async () => {
    setLoading(true);
    const response = await api.getNftListByHash(
      oAuthCtx.access_token,
      String(router.query.id),
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
    getNftData().then();
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

  useEffect(() => {
    if (router.query.id) {
      getCollectionData().then(() => {
        getNftData().then();
      });
    }
  }, [router.query.id]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
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
      <div className="flex justify-between items-center mb-[16px] flex-wrap">
        <div className="basis-[100%] lg:basis-auto text-[#FFFFFF] font-bold text-[24px]">
          {info.brand} {info.name}
        </div>
        <div className="basis-[100%] lg:basis-auto mt-[12px] lg:mt-0">
          <SelectGroup
            items={selectGroupItems}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[24px] pt-[12px]">
          <div className="flex items-center justify-between col-span-2">
            <div className="flex items-center">
              <div className="cursor-pointer" onClick={() => handleRefresh()}>
                <img
                  src={'/img/icon_refresh.svg'}
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
          <div className="flex flex-wrap justify-between col-span-2">
            <div className="basis-[100%] md:basis-[48%]">
              <div className="w-full mb-[24px] md:mb-0">
                <img
                  src={info.image}
                  alt={info.name}
                  width="100%"
                  className="rounded-[5px] blur"
                  onError={(e) => handleImageError(e)}
                  onLoad={(e) => handleImageLoad(e, info.image)}
                />
              </div>
              <div className="mb-[24px] md:mb-0">
                <InfoPanel info={info} />
              </div>
            </div>
            <div className="basis-[100%] md:basis-[48%]">
              <div className="mb-[24px]">
                <DetailPanel info={info} />
              </div>
              <div className="mb-[24px]">
                <ActionPanel
                  info={info}
                  onCartOpen={(val) => setOpenCart(val)}
                  loading={loading}
                />
              </div>
              <div className="mb-[0px]">
                <AttributesPanel info={info} />
              </div>
            </div>
          </div>
          <div className="mt-[24px] col-span-2">
            <Divider />
          </div>
          <div className="mt-[24px] col-span-2">
            <div className="flex justify-between items-center flex-wrap">
              <div className="text-[#FFFFFF] font-bold text-[20px]">
                Transaction History
              </div>
              <div className="basis-[50%] md:basis[100%] mt-[12px] md:mt-0 flex justify-end">
                <Pagination
                  totalPages={15}
                  currentPage={currentPage}
                  onPageChange={(val) => setCurrentPage(val)}
                  onPreviousPage={() => setCurrentPage((prev) => prev - 1)}
                  onNextPage={() => setCurrentPage((prev) => prev + 1)}
                />
              </div>
            </div>
            <div className="mt-[24px] mb-[48px]">
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
      <LoginModal
        isOpen={loginModalOpen}
        setIsOpen={setLoginModalOpen}
        redirectPath="/account?tab=items"
      />
    </DefaultLayout>
  );
};

export default Nft;
