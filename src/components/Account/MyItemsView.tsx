import { useCart } from '@/hooks/cart';
import {
  useGetCollections,
  useGetNftByCollectionId,
} from '@/hooks/collections';
import { useAppDispatch, useAppSelector } from '@/store';
import * as anchor from '@project-serum/anchor';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ListCard from '../Collection/ListCard';
import ListCardLoading from '../Collection/ListCardLoading';
import RowCard from '../Collection/RowCard';
import RowCardLoading from '../Collection/RowCardLoading';
import SelectGroup from '../Shared/SelectGroup';
import Menu from './Menu';
import api from '@/utils/api';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useProgram } from '@/solana/usePrograms';

type SelectionView = 'Row' | 'List';

type Sidebar = {
  id: string;
  text: string;
  value: string;
  slug: string;
};

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const endpoint = 'https://api.devnet.solana.com';
const connection = new anchor.web3.Connection(endpoint);

const MyItemsView = () => {
  const router = useRouter();
  const wallet: any = useAnchorWallet();
  console.log('Wallet: ', wallet);
  const { program } = useProgram({ connection, wallet });
  const dispatch = useAppDispatch();
  /*const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );*/
  const [, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState<Sidebar>({
    id: '',
    text: '',
    value: '',
    slug: '',
  });
  const [collections, setCollections] = useState<Sidebar[]>([]);
  const [loading, setLoading] = useState(false);
  const [myItems, setMyItems] = useState([]);
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const [myItemLoading, setMyItemLoading] = useState(false);
  const { handleAddToCart, isItemAddedToCart } = useCart();

  useEffect(() => {
    _getCollections();
  }, []);

  const _getCollections = async () => {
    setLoading(true);
    const response = await api.getCollectionList();
    if (response.success) {
      const results: Sidebar[] = [];
      response?.data.map((collection: any) => {
        results.push({
          text: collection['metadata'].name,
          value: collection['metadata'].name.toLowerCase(),
          id: collection.id,
          slug: collection['metadata'].name.toLowerCase(),
        });
      });
      setCollections(results);
    } else {
      dispatch({
        type: 'SHOW_SNACKBAR',
        payload: { title: 'error', text: response.message },
      });
    }
    setLoading(false);
  };

  // set default to first collection
  useEffect(() => {
    if (collections.length) {
      const first = collections[0];
      setSidebar(first);
    }
  }, [collections]);

  /*const { data: collections } = useGetCollections();
  const {
    data: recommendedItems,
    loading,
    getData: getNftDataByCollectionId,
  } = useGetNftByCollectionId();
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



  // when there are collections and no owned items, get recommended items
  useEffect(() => {
    if (sidebar && !myItems.length) {
      getNftDataByCollectionId(sidebar.value);
    }
  }, [sidebar, myItems]);

  const _recommendedItems = useMemo(() => {
    return recommendedItems
      .filter((item) => item.collection_id === sidebar.collection_id)
      .filter((item) => item?.is_listed)
      .slice(0, 4)
      .map((item) => {
        return {
          ...item,
          is_listed: item?.external_marketplace_listing?.length,
        };
      });
  }, [recommendedItems, sidebar]);

  const _itemsDisplay = useMemo(() => {
    if (!myItems.length) {
      return _recommendedItems;
    }
    return myItems;
  }, [myItems, _recommendedItems]);*/

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleMoreInfo = (tokenAddress: string | number) => {
    //router.push(`/nft/${tokenAddress}?collection_id=${metadata.id}`).then();
  };

  const handleSidebarChange = (value: any) => {
    console.log(value);
    //setSidebar(value);
  };

  return (
    <div className="flex flex-wrap">
      <div className="lg:basis-[250px] basis-[100%] lg:pr-[6px] mb-[24px] lg:mb-0">
        <Menu
          items={collections}
          currentValue={sidebar.value}
          onItemClick={(value) => handleSidebarChange(value)}
        />
      </div>
      <div className="lg:flex-1 lg:pl-[6px] w-full">
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
        {/*<div>
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
                      addToCartDisabled={!item.is_listed}
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
                      addToCartDisabled={!item.is_listed}
                      tokenAddress={item.tokenAddress}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>*/}
      </div>
      <div className="md:hidden basis-[100%]">
        {!myItems.length && (
          <div className="mb-[24px] text-[#FFFFFF] rounded-[5px] text-semibold w-full border-[#290030] border-[2px] bg-[#13002B] px-[16px] py-[16px] flex items-center justify-center">
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
    </div>
  );
};

export default MyItemsView;
