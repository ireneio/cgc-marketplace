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
import { useEffect, useMemo, useState } from 'react';
import DetailPanel from '@/components/Nft/DetailPanel';
import { LoginModal } from '@/components/Auth/LoginModal';
import {
  useGetCollectionsBySlug,
  useGetNftByHash,
} from '@/hooks/services_collections';
import NftPageLoading from '@/components/Nft/NftPageLoading';
import Skeleton from '@/components/Shared/Skeleton';
import { initCart } from '@/store/reducers/cart';

export interface NftInfo {
  id: string | number;
  name: string;
  brand: string;
  description: string;
  price: string | number;
  usdPrice: string | number;
  image: string;
  auctionEndDate: string;
  saleEndDate: string;
  attributes: { traitType: string; value: string }[];
  royaltiesPercentage: number;
  mintAddress: string;
  owner: string;
  is_listed: boolean;
}

type Selection =
  | 'About'
  | 'All Items'
  | 'Your Items'
  | 'Collection Item'
  | 'Explore/All';

const handleImageLoad = (e: any, image: string) => {
  e.target.classList.remove('blur');
  e.target.src = image === 'undefined' || !image ? '/img/cgc_icon.png' : image;
  e.target.style.width = '100%';
  e.target.style.height = 'auto';
};

const handleImageError = (e: any) => {
  if (e.target.src === '/img/cgc_icon.png') {
    return;
  }
  e.target.src = '/img/cgc_icon.png';
};

const Nft = () => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    (state) => state.user.userInfo.access_token,
  );
  const router = useRouter();
  const [info, setInfo] = useState<NftInfo>({
    id: '',
    name: '',
    brand: '-',
    description: '',
    price: '0',
    usdPrice: '0',
    is_listed: false,
    image: '/img/cgc_icon.png',
    auctionEndDate: dayjs().toISOString(),
    saleEndDate: dayjs().toISOString(),
    attributes: [
      { traitType: 'background', value: '-' },
      { traitType: 'base', value: '-' },
      { traitType: 'clothing', value: '-' },
      { traitType: 'hats', value: '-' },
      { traitType: 'accessory', value: '-' },
      { traitType: 'rarity', value: '-' },
      { traitType: 'traitType', value: '-' },
    ],
    royaltiesPercentage: 0,
    mintAddress: '',
    owner: '',
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSelection] = useState<Selection>('Collection Item');
  const {
    setSlug,
    loading: collectionsLoading,
    data: currentCollection,
  } = useGetCollectionsBySlug();
  const { setTokenAddress, data, loading, refresh } = useGetNftByHash();

  const breadCrumbItems = useMemo(() => {
    switch (currentSelection) {
      case 'Collection Item':
      default:
        return [
          {
            text: 'Home',
            value: '/',
            disabled: loading || !currentCollection?.metadata?.name,
          },
          {
            text: 'Explore',
            value: '/explore',
            disabled: loading || !currentCollection?.metadata?.slug,
          },
          {
            text: currentCollection?.metadata?.name,
            value: `/collection/${currentCollection?.metadata?.slug}?tab=about`,
            disabled: loading || !currentCollection?.metadata?.slug,
          },
          {
            text: 'All Items',
            value: `/collection/${currentCollection?.metadata?.slug}?tab=all_items`,
            disabled: loading || !currentCollection?.metadata?.slug,
          },
          {
            text: info.name,
            value: info.name,
            disabled: loading || !currentCollection?.metadata?.slug,
          },
        ];
    }
  }, [currentCollection, currentSelection, info, loading]);

  const selectGroupItems = useMemo(() => {
    return [
      {
        text: 'About',
        value: 'About',
        disabled: !currentCollection?.metadata?.slug,
      },
      {
        text: 'All Items',
        value: 'All Items',
        disabled: !currentCollection?.metadata?.slug,
      },
      {
        text: 'Your Items',
        value: 'Your Items',
        disabled: !currentCollection?.metadata?.slug,
      },
      {
        text: '...',
        value: '...',
        disabled: !currentCollection?.metadata?.slug,
      },
    ];
  }, [currentCollection]);

  const handleSelect = (value: Selection) => {
    switch (value) {
      case 'About':
        router.push(`/collection/${currentCollection?.metadata.slug}`).then();
        return;
      case 'All Items':
        router
          .push(`/collection/${currentCollection?.metadata.slug}?tab=all_items`)
          .then();
        return;
      case 'Your Items': {
        if (!access_token) {
          setLoginModalOpen(true);
        } else {
          router.push(`/account?tab=items`).then();
        }
        return;
      }
      case currentCollection?.metadata.slug:
        router
          .push(`/collection/${currentCollection?.metadata.slug}?tab=about`)
          .then();
        return;
      case 'Explore/All':
        router.push('/explore').then();
        return;
    }
  };

  const handleRefresh = async () => {
    await refresh(currentCollection?.metadata.slug);
  };

  useEffect(() => {
    if (router.query.id) {
      dispatch(initCart());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (Object.keys(data).length && router.query.id) {
      setSlug(data?.brand.toLowerCase().split(' ').join('_'));
      setInfo({
        id: String(router.query.id),
        name: data?.name,
        brand: data?.brand,
        image: data?.image,
        description: data?.description,
        attributes: data?.attributes,
        auctionEndDate: '',
        saleEndDate: '',
        royaltiesPercentage: data?.royaltiesPercentage,
        mintAddress: data?.tokenAddress,
        owner: data?.walletAddress,
        price: data?.price,
        usdPrice: data?.usdPrice,
        is_listed: data?.is_listed,
      });
    }
  }, [data, router]);

  useEffect(() => {
    setTokenAddress(String(router.query.id));
  }, [router.query.id]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb
          items={breadCrumbItems}
          onItemClick={(val) => {
            handleSelect(val as Selection);
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[16px] flex-wrap">
        {!collectionsLoading && !loading && (
          <div className="basis-[100%] lg:basis-auto text-[#FFFFFF] font-bold text-[24px]">
            {info.brand} {info.name}
          </div>
        )}
        {(collectionsLoading || loading) && (
          <div className="basis-[100%] lg:basis-auto text-[#FFFFFF] font-bold text-[24px]">
            <Skeleton className="h-[35px] w-[120px] bg-[#290030]" />
          </div>
        )}
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
      {currentSelection !== 'Your Items' && (collectionsLoading || loading) && (
        <NftPageLoading />
      )}
      {currentSelection !== 'Your Items' && !collectionsLoading && !loading && (
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
            <div className="basis-[100%] lg:basis-[48%]">
              <div className="w-full mb-[24px]">
                <img
                  src={info.image}
                  alt={info.name}
                  width="100%"
                  className="rounded-[5px] blur"
                  onError={(e) => handleImageError(e)}
                  onLoad={(e) => handleImageLoad(e, info.image)}
                />
              </div>
              <div className="mb-[24px] lg:mb-0">
                <InfoPanel info={info} />
              </div>
            </div>
            <div className="basis-[100%] lg:basis-[48%]">
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
          <div className="mb-[24px] col-span-2">
            <Divider />
          </div>
          <div className="col-span-2">
            <div className="mb-[24px] flex justify-between items-center flex-wrap">
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
            <div className="mb-[48px]">
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
