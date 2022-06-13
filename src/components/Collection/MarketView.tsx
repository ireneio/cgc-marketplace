import { OAuthContext } from '@/contexts/OAuthProvider';
import { useAppDispatch, useAppSelector } from '@/store';
import api from '@/utils/api';
import { getNumberWithCommas } from '@/utils/formatHelper';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext, useMemo } from 'react';
import DropdownMenu from '../Shared/DropdownMenu';
import SelectGroup from '../Shared/SelectGroup';
import Cart from './Cart';
import Filter from './Filter';
import ListCard, { Attr } from './ListCard';
import ListCardLoading from './ListCardLoading';
import RowCard from './RowCard';
import RowCardLoading from './RowCardLoading';
import { useInView } from 'react-intersection-observer';
import { CollectionTabSelection } from '@/pages/collection/[id]';
import { useCart } from '@/hooks/cart';

type SelectionView = 'Row' | 'List';

type SelectionFilter = 'Filter' | 'Cart' | '';

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MarketView = ({ currentTab }: { currentTab: CollectionTabSelection }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const currentCollection = useAppSelector(
    (state) => state.collection.currentCollection,
  );
  const oAuthCtx = useContext(OAuthContext);
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const [currentFilter, setCurrentFilter] = useState<SelectionFilter>('');
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(0);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const { handleAddToCart, isItemAddedToCart } = useCart();

  const _items = useMemo(() => {
    let arr = [...items];
    if (currentTab === 'Listed Items') {
      arr = arr.filter((item) => item?.external_marketplace_listing?.length);
    }
    return arr.slice(0, page + 19).map((item: any) => {
      return {
        ...item,
        is_listed: item?.external_marketplace_listing?.length,
      };
    });
  }, [items, page, currentTab]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 19);
    }
  }, [inView]);

  const [loading, setLoading] = useState(true);
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
      return getNumberWithCommas(
        currentCollection?.nftCollectionStats?.totalSupply,
        0,
      );
    } else if (currentTab === 'Listed Items') {
      const listed = items.filter(
        (item: any) => item?.external_marketplace_listing?.length,
      );
      return getNumberWithCommas(listed.length, 0);
    }
  }, [currentTab]);

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleSelectFilter = (value: SelectionFilter) => {
    setCurrentFilter(value);
  };

  const handleMoreInfo = (hash: string) => {
    router.push(`/nft/${hash}`).then();
  };

  const getData = async () => {
    const response = await api.getNftListByCollectionId(
      oAuthCtx.access_token,
      metadata.slug,
    );
    const map =
      response && response.length
        ? response
            .map((item: any) => {
              const manifest = item?.splNftInfo?.data?.manifest;
              return {
                // default image
                image: manifest?.image || '/img/cgc_icon.png',
                brand: manifest?.collection?.name,
                name: manifest?.name,
                price: 0,
                tokenAddress: item?.tokenAddress,
                id: item?.id,
                is_listed: item?.external_marketplace_listing?.length,
                external_marketplace_listing:
                  item?.external_marketplace_listing || [],
                external_marketplace_listing_logo: item
                  ?.external_marketplace_listing.length
                  ? item?.external_marketplace_listing[0]?.logoSrcUrl
                  : '',
              };
            })
            .sort((a: any, b: any) => {
              return (
                b.external_marketplace_listing.length -
                a.external_marketplace_listing.length
              );
            })
        : [];
    return map;
  };

  const initData = async () => {
    setLoading(true);
    const nfts = await getData();
    setItems(nfts);
    const tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(tid);
    }, 800);
  };

  useEffect(() => {
    if (metadata.slug) {
      initData();
    }
  }, [metadata, refresh]);

  const getCart = () => {
    dispatch({ type: 'INIT_CART' });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="mb-[32px]">
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
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8 pb-6">
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
                  <RowCardLoading />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'List' && !loading && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8 pb-6">
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
                    isAddedToCart={isItemAddedToCart(item.tokenAddress)}
                    onAddToCart={(params) => handleAddToCart(params)}
                    onMoreInfo={() => handleMoreInfo(item.tokenAddress)}
                    addToCartLoading={false}
                    addToCartDisabled={!item.is_listed}
                    tokenAddress={item.tokenAddress}
                    external_marketplace_listing_logo={
                      item.external_marketplace_listing_logo
                    }
                  />
                </div>
              );
            })}
            <div ref={ref}></div>
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
                  <RowCard
                    id={index}
                    image={item.image}
                    brand={item.brand}
                    name={item.name}
                    price={item.price}
                    isAddedToCart={isItemAddedToCart(item.tokenAddress)}
                    onAddToCart={(params) => handleAddToCart(params)}
                    onMoreInfo={() => handleMoreInfo(item.tokenAddress)}
                    addToCartLoading={false}
                    addToCartDisabled={!item.is_listed}
                    tokenAddress={item.tokenAddress}
                    external_marketplace_listing_logo={
                      item.external_marketplace_listing_logo
                    }
                  />
                </div>
              );
            })}
            <div ref={ref}></div>
          </div>
        )}
        {!items.length && !loading && (
          <div className="text-[#FFFFFF] text-semibold">
            No Items Available.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketView;
