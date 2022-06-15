import { LoginModal } from '@/components/Auth/LoginModal';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import AttributesPanel from '@/components/Nft/AttributesPanel';
import DetailPanel from '@/components/Nft/DetailPanel';
import HistoryTable from '@/components/Nft/HistoryTable';
import ListingActionPanel from '@/components/Nft/ListingActionPanel';
import ListingInfoPanel from '@/components/Nft/ListingInfoPanel';
import NftPageLoading from '@/components/Nft/NftPageLoading';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import Pagination from '@/components/Shared/Pagination';
import SelectGroup from '@/components/Shared/SelectGroup';
import Skeleton from '@/components/Shared/Skeleton';
import {
  useGetCollectionsBySlug,
  useGetNftByHash,
} from '@/hooks/services_collections';
import { useAppSelector } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export interface NftListingInfo {
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
  transactionFee: number;
}

type Selection =
  | 'About'
  | 'All Items'
  | 'My Items'
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

const NftListing = () => {
  const router = useRouter();
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const access_token = useAppSelector(
    (state) => state.user.userInfo.access_token,
  );
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [info, setInfo] = useState<NftListingInfo>({
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
    royaltiesPercentage: NaN,
    mintAddress: '',
    owner: '',
    transactionFee: NaN,
  });
  const { setSlug, loading: collectionsLoading } = useGetCollectionsBySlug();
  const { setTokenAddress, data, loading, refresh } = useGetNftByHash();

  const breadCrumbItems = useMemo(() => {
    return [
      { text: 'Home', value: '/', disabled: loading || !metadata.name },
      {
        text: 'Explore',
        value: '/explore',
        disabled: loading || !metadata.slug,
      },
      {
        text: metadata?.name,
        value: `/collection/${metadata.slug}?tab=about`,
        disabled: loading || !metadata.slug,
      },
      {
        text: 'My Items',
        value: `/account?tab=items`,
        disabled: loading || !metadata.slug,
      },
      {
        text: info.name,
        value: info.name,
        disabled: loading || !metadata.slug,
      },
    ];
  }, [metadata, info, loading]);

  const handleSelect = (value: Selection) => {
    switch (value) {
      case 'About':
        router.push(`/collection/${metadata.slug}`).then();
        return;
      case 'All Items':
        router.push(`/collection/${metadata.slug}?tab=all_items`).then();
        return;
      case 'My Items': {
        if (!access_token) {
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
        router.push('/explore').then();
        return;
    }
  };

  const handleRefresh = async () => {
    await refresh();
  };

  const handleSelectTab = (query: string) => {
    router.push(`/account?tab=${query}`);
  };

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
        transactionFee: NaN,
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
            items={[
              { text: 'Wallets', value: 'wallet' },
              { text: 'Profile', value: 'profile' },
              { text: 'My Items', value: 'items' },
              { text: 'Listed', value: 'listed' },
              // { text: 'Offers', value: 'offers' },
              // { text: 'Activities', value: 'activities' },
            ]}
            currentValue={'items'}
            onItemClick={(value) => handleSelectTab(value)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      {(collectionsLoading || loading) && <NftPageLoading />}
      {!collectionsLoading && !loading && (
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
          </div>
          <div className="flex flex-wrap justify-between col-span-2">
            <div className="basis-[100%] md:basis-[48%]">
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
              <div className="mb-[24px] md:mb-0">
                <ListingInfoPanel info={info} />
              </div>
            </div>
            <div className="basis-[100%] md:basis-[48%]">
              <div className="mb-[24px]">
                <DetailPanel info={info} />
              </div>
              <div className="mb-[24px]">
                <ListingActionPanel info={info} loading={loading} />
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

export default NftListing;
