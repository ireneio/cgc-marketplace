import { useAppDispatch, useAppSelector } from '@/store';
import { getNumberWithCommas, sortAlphabetical } from '@/utils/formatHelper';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import DropdownMenu from '../Shared/DropdownMenu';
import SelectGroup from '../Shared/SelectGroup';
import Cart from './Cart';
import Filter from './Filter';
import ListCard from './ListCard';
import ListCardLoading from './ListCardLoading';
import { useInView } from 'react-intersection-observer';
import { CollectionTabSelection } from '@/pages/collection/[id]';
import { useCart } from '@/hooks/cart';
import {
  useGetCollectionsBySlugV2,
  useGetNftByCollectionIdV2,
} from '@/hooks/services_collections';
import EmptyListTextDisplay from '../Shared/EmptyListTextDisplay';
import { initCart } from '@/store/reducers/cart';

type SelectionView = 'Row' | 'List';

type SelectionFilter = 'Filter' | 'Cart' | '';

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MarketView = ({ currentTab }: { currentTab: CollectionTabSelection }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const [currentFilter, setCurrentFilter] = useState<SelectionFilter>('');
  const [page, setPage] = useState(0);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { handleAddToCart, isItemAddedToCart } = useCart();
  const {
    collectionId,
    setCollectionId,
    data,
    loading,
    refresh: refreshCollection,
    setFilter,
  } = useGetNftByCollectionIdV2();
  const { data: currentCollection } = useGetCollectionsBySlugV2();

  const _items = useMemo(() => {
    let arr = [...data];
    arr = arr.filter((item) => item.image);
    if (currentTab === 'Listed Items') {
      arr = arr.filter((item) => item?.external_marketplace_listing?.length);
    } else if (currentTab === 'All Items') {
      arr = arr.sort((a, b) => {
        if (!isNaN(Number(a.name))) {
          return Number(b.name) - Number(a.name);
        } else {
          return sortAlphabetical(b.name, a.name);
        }
      });
    }
    return arr.slice(0, page + 19).map((item: any) => {
      return {
        ...item,
        is_listed: item?.external_marketplace_listing?.length,
      };
    });
  }, [data, page, currentTab]);

  useEffect(() => {
    if (inView && _items.length === data.length && currentTab === 'All Items') {
      setFilter('');
    }
  }, [inView, _items]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 19);
    }
  }, [inView]);

  const [, setFilters] = useState({
    rankMin: '',
    rankMax: '',
    priceMin: '',
    priceMax: '',
    traitCount: '',
    isBuyNow: false,
    isRarityRanking: false,
  });
  const [refresh, setRefresh] = useState(false);

  const itemCount = useMemo(() => {
    if (currentTab === 'All Items') {
      if (!currentCollection?.nftCollectionStats?.totalSupply) {
        return getNumberWithCommas(data.length, 0);
      }
      return getNumberWithCommas(
        currentCollection?.nftCollectionStats?.totalSupply,
        0,
      );
    } else if (currentTab === 'Listed Items') {
      if (!currentCollection?.nftCollectionStats?.meListingCount) {
        return getNumberWithCommas(data.length, 0);
      }
      return getNumberWithCommas(
        currentCollection?.nftCollectionStats?.meListingCount,
        0,
      );
    }
  }, [currentTab, data]);

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleSelectFilter = (value: SelectionFilter) => {
    setCurrentFilter(value);
  };

  const handleMoreInfo = (hash: string) => {
    router.push(`/nft/${hash}`).then();
  };

  useEffect(() => {
    if (collectionId === currentCollection?.metadata?.slug) {
      refreshCollection();
    } else if (currentCollection?.metadata?.slug) {
      setCollectionId(currentCollection?.metadata?.slug);
    }
  }, [currentCollection?.metadata, refresh]);

  const getCart = () => {
    dispatch(initCart());
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (router.query.tab && router.query.tab === 'listed_items') {
      setFilter('external_listing');
    } else if (router.query.tab && router.query.tab === 'all_items') {
      setFilter('external_listing');
    }
  }, [router.query.tab]);

  return (
    <div className="mb-[24px]">
      <div className="flex justify-between items-center mb-[24px]">
        <div className="flex items-center w-full">
          <div
            className="cursor-pointer"
            onClick={() => setRefresh((prev) => !prev)}
          >
            <img
              src={'/img/icon_refresh.svg'}
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">
            {itemCount} items
          </div>
          <div className="ml-auto">
            <SelectGroup
              items={[
                {
                  text: (
                    <div className="flex items-center">
                      <div>
                        <img
                          src={'/img/icon_filter.svg'}
                          alt="row"
                          width={12}
                          height={12}
                        />
                      </div>
                      <div className="text-[#FFFFFF] ml-[4px] text-[12px]">
                        Filter
                      </div>
                    </div>
                  ),
                  value: 'Filter',
                },
                {
                  text: (
                    <div className="flex items-center">
                      <div>
                        <img
                          src={'/img/icon_cart.svg'}
                          alt="cart"
                          width={12}
                          height={12}
                        />
                      </div>
                      <div className="text-[#FFFFFF] ml-[4px] text-[12px] flex items-center">
                        <div>Cart</div>
                        <div
                          className="ml-[4px] text-[#FFFFFF]"
                          style={{
                            background:
                              currentFilter === 'Cart'
                                ? 'transparent'
                                : 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                            backgroundClip:
                              currentFilter !== 'Cart' ? 'text' : '',
                            WebkitBackgroundClip:
                              currentFilter !== 'Cart' ? 'text' : '',
                            WebkitTextFillColor:
                              currentFilter !== 'Cart' ? 'transparent' : '',
                          }}
                        >
                          [{cartItems.length}]
                        </div>
                      </div>
                    </div>
                  ),
                  value: 'Cart',
                },
              ]}
              currentValue={currentFilter}
              onItemClick={(value) => {
                if (currentFilter === value) {
                  handleSelectFilter('');
                } else {
                  handleSelectFilter(value as SelectionFilter);
                }
              }}
            />
          </div>
          <div className="ml-[24px] relative">
            {currentFilter === 'Cart' && (
              <DropdownMenu bottom={-510} left={-266}>
                <Cart onClose={() => setCurrentFilter('')} />
              </DropdownMenu>
            )}
            {currentFilter === 'Filter' && (
              <DropdownMenu bottom={-506} left={-266}>
                <Filter
                  onRankFilter={(min, max) =>
                    setFilters((prev) => ({
                      ...prev,
                      rankMin: min,
                      rankMax: max,
                    }))
                  }
                  onPriceFilter={(min, max) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceMin: min,
                      priceMax: max,
                    }))
                  }
                  onTraitCountFilter={(count) =>
                    setFilters((prev) => ({
                      ...prev,
                      traitCount: count,
                    }))
                  }
                  onIsBuyNowFilter={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      isBuyNow: value,
                    }))
                  }
                  onIsRarityRankingFilter={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      isRarityRanking: value,
                    }))
                  }
                  onClose={() => setCurrentFilter('')}
                />
              </DropdownMenu>
            )}
            <SelectGroup
              items={[
                {
                  text: (
                    <div>
                      <img
                        src={'/img/icon_row.svg'}
                        alt="row"
                        width={18}
                        height={18}
                      />
                    </div>
                  ),
                  value: 'Row',
                },
                {
                  text: (
                    <div>
                      <img
                        src={'/img/icon_list.svg'}
                        alt="list"
                        width={18}
                        height={18}
                      />
                    </div>
                  ),
                  value: 'List',
                },
              ]}
              currentValue={currentView}
              onItemClick={(value) => handleSelectView(value as SelectionView)}
            />
          </div>
        </div>
      </div>
      <div>
        {currentView === 'List' && loading && (
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 pb-6">
            {LOADING_ARR.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <ListCardLoading />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'Row' && loading && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-6">
            {LOADING_ARR.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <ListCardLoading />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'List' && !loading && (
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 pb-6">
            {_items.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <ListCard
                    id={index}
                    image={item.image}
                    brand={item.brand}
                    name={item.name}
                    price={item.price || ' '}
                    selected={isItemAddedToCart(item.tokenAddress)}
                    rightBtnText={'Add To Cart'}
                    rightBtnDisabled={
                      isItemAddedToCart(item.tokenAddress) || !item.is_listed
                    }
                    rightBtnTextDisabled={
                      isItemAddedToCart(item.tokenAddress)
                        ? 'Added To Cart'
                        : 'Not Listed'
                    }
                    onLeftFn={() => handleMoreInfo(item.tokenAddress)}
                    onRightFn={(params) => {
                      item.is_listed &&
                        handleAddToCart({ ...params, priceUsd: item.usdPrice });
                      !item.is_listed && handleMoreInfo(item.tokenAddress);
                    }}
                    onCardClick={() => handleMoreInfo(item.tokenAddress)}
                    tokenAddress={item.tokenAddress}
                    type={'list'}
                    external_marketplace_listing_logo={
                      item.external_marketplace_listing_logo
                    }
                  />
                </div>
              );
            })}
            <div ref={ref} />
          </div>
        )}
        {currentView === 'Row' && !loading && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-6">
            {_items.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <ListCard
                    id={index}
                    image={item.image}
                    brand={item.brand}
                    name={item.name}
                    price={item.price || ' '}
                    selected={isItemAddedToCart(item.tokenAddress)}
                    rightBtnText={'Add To Cart'}
                    rightBtnDisabled={
                      isItemAddedToCart(item.tokenAddress) || !item.is_listed
                    }
                    rightBtnTextDisabled={
                      isItemAddedToCart(item.tokenAddress)
                        ? 'Added To Cart'
                        : 'Not Listed'
                    }
                    onLeftFn={() => handleMoreInfo(item.tokenAddress)}
                    onRightFn={(params) =>
                      handleAddToCart({ ...params, priceUsd: item.usdPrice })
                    }
                    onCardClick={() => handleMoreInfo(item.tokenAddress)}
                    tokenAddress={item.tokenAddress}
                    type={'row'}
                    external_marketplace_listing_logo={
                      item.external_marketplace_listing_logo
                    }
                  />
                </div>
              );
            })}
            <div ref={ref} />
          </div>
        )}
        {!_items.length && !loading && (
          <EmptyListTextDisplay>No items available.</EmptyListTextDisplay>
        )}
      </div>
    </div>
  );
};

export default MarketView;
