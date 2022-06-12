import {
  useGetCollections,
  useGetNftByCollectionId,
} from '@/hooks/collections';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ListCard, { Attr } from '../Collection/ListCard';
import ListCardLoading from '../Collection/ListCardLoading';
import RowCard from '../Collection/RowCard';
import RowCardLoading from '../Collection/RowCardLoading';
import SelectGroup from '../Shared/SelectGroup';
import Menu from './Menu';

type SelectionView = 'Row' | 'List';

type Sidebar = {
  text: string;
  collection_id: string;
  value: string;
};

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MyItemsView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const [, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState<Sidebar>({
    text: '',
    collection_id: '',
    value: '',
  });
  const [myItems, setMyItems] = useState([]);
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const { data: collections } = useGetCollections();
  const {
    data: recommendedItems,
    loading,
    getData: getNftDataByCollectionId,
  } = useGetNftByCollectionId();
  const [myItemLoading, setMyItemLoading] = useState(false);

  // TODO get my items
  const getMyItemsData = async () => {
    return [];
  };

  const setMyItemsData = async () => {
    setMyItemLoading(true);
    const items = await getMyItemsData();
    if (items && items.length) {
      // TODO map data to grid/card
      setMyItems(items);
    }
    const tid = setTimeout(() => {
      setMyItemLoading(false);
      clearTimeout(tid);
    }, 800);
  };

  const _collections = useMemo(() => {
    return collections.map((collection) => {
      return {
        text: collection.name,
        value: collection.name.toLowerCase(),
        collection_id: collection.id,
      };
    });
  }, [collections]);

  // set default to first collection
  useEffect(() => {
    if (_collections.length) {
      const first = _collections[0];
      setSidebar(first);
    }
  }, [_collections]);

  // when there are collections and no owned items, get recommended items
  useEffect(() => {
    if (sidebar && !myItems.length) {
      getNftDataByCollectionId(sidebar.value);
    }
  }, [sidebar, myItems]);

  const _recommendedItems = useMemo(() => {
    return recommendedItems
      .filter((item) => item.collection_id === sidebar.collection_id)
      .slice(0, 5);
  }, [recommendedItems, sidebar]);

  const _itemsDisplay = useMemo(() => {
    if (!myItems.length) {
      return _recommendedItems;
    }
    return myItems;
  }, [myItems, _recommendedItems]);

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleAddToCart = (params: Attr) => {
    if (isItemAddedToCart(params.tokenAddress)) {
      dispatch({
        type: 'REMOVE_CART_ITEM',
        payload: String(params.tokenAddress),
      });
    } else {
      dispatch({ type: 'ADD_CART_ITEM', payload: params });
    }
  };

  const isItemAddedToCart = (tokenAddress: string) => {
    return cartItems.find(
      (item: Attr) => String(item.tokenAddress) === String(tokenAddress),
    );
  };

  const handleMoreInfo = (tokenAddress: string | number) => {
    router.push(`/nft/${tokenAddress}?collection_id=${metadata.id}`).then();
  };

  const handleSidebarChange = (value: Sidebar) => {
    setSidebar(value);
  };

  return (
    <div className="flex flex-wrap">
      <div className="md:hidden basis-[100%]">
        {!myItems.length && (
          <div className="mb-[28px] text-[#FFFFFF] rounded-[5px] text-semibold w-full border-[#290030] border-[2px] bg-[#13002B] h-[115px] flex items-center justify-center">
            <div className="hidden lg:block">
              <img
                src="/img/icon_warning_triangle.svg"
                alt="warning"
                className="w-[32px] h-[32px]"
              />
            </div>
            <div className="ml-[20px]">
              <div className="font-bold md:text-[16px] text-[14px]">
                We could not find any items in your wallet.
              </div>
              <div className="font-light md:text-[14px] text-[12px]">
                Here’s a few suggested items from current collections that you
                can purchase.
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:basis-[250px] basis-[100%] lg:pr-[6px] mb-[24px] lg:mb-0">
        <Menu
          items={_collections}
          currentValue={sidebar.value}
          onItemClick={(value) => handleSidebarChange(value)}
        />
      </div>
      <div className="lg:flex-1 lg:pl-[6px]">
        <div className="hidden md:block">
          {!myItems.length && (
            <div className="mb-[28px] text-[#FFFFFF] rounded-[5px] text-semibold w-full border-[#290030] border-[2px] bg-[#13002B] h-[115px] flex items-center justify-center">
              <div className="hidden lg:block">
                <img
                  src="/img/icon_warning_triangle.svg"
                  alt="warning"
                  className="w-[32px] h-[32px]"
                />
              </div>
              <div className="ml-[20px]">
                <div className="font-bold md:text-[16px] text-[14px]">
                  We could not find any items in your wallet.
                </div>
                <div className="font-light md:text-[14px] text-[12px]">
                  Here’s a few suggested items from current collections that you
                  can purchase.
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-[24px] w-full">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
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
                {myItems.length} items
              </div>
            </div>
            <div className="ml-auto relative">
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
                onItemClick={(value) =>
                  handleSelectView(value as SelectionView)
                }
              />
            </div>
          </div>
        </div>
        <div>
          {!myItems.length && (
            <div className="mt-[24px] mb-[24px] font-semibold text-[24px] text-[#FFFFFF]">
              Suggested Items
            </div>
          )}
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
              {_itemsDisplay.map((item: any, index) => {
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
                      price={item.price}
                      isAddedToCart={isItemAddedToCart(item.tokenAddress)}
                      onAddToCart={(params) => handleAddToCart(params)}
                      onMoreInfo={() => handleMoreInfo(item.tokenAddress)}
                      addToCartLoading={false}
                      tokenAddress={item.tokenAddress}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {currentView === 'Row' && !loading && (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-6">
              {_itemsDisplay.map((item: any, index) => {
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
                      tokenAddress={item.tokenAddress}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyItemsView;
