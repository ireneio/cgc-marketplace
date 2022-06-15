import {
  useGetCollectionsV2,
  useGetNftByCollectionIdV2,
} from '@/hooks/services_collections';
// import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import ListCard from '../Collection/ListCard';
import ListCardLoading from '../Collection/ListCardLoading';
import SelectGroup from '../Shared/SelectGroup';
import Menu from './Menu';

type SelectionView = 'Row' | 'List';

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ListingView = () => {
  // const router = useRouter();
  const [, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState('All');
  const [listed] = useState([]);
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const { data: collections } = useGetCollectionsV2();
  const { loading } = useGetNftByCollectionIdV2();

  const _collections = useMemo(() => {
    return collections.map((collection) => {
      return {
        text: collection.name,
        value: collection.id,
      };
    });
  }, [collections]);

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  // const handleMoreInfo = (tokenAddress: string | number) => {
  //   router.push(`/nft/${tokenAddress}?collection_id=${metadata.id}`).then();
  // };

  return (
    <div className="flex flex-wrap">
      <div className="lg:basis-[250px] basis-[100%] lg:pr-[6px] mb-[24px] lg:mb-0">
        <Menu
          items={[{ text: 'All Listed Items', value: 'All' }, ..._collections]}
          currentValue={sidebar}
          onItemClick={(value) => setSidebar(value?.value)}
        />
        {/* <select name="" id="">
          {_collections.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
            );
          })}
        </select> */}
      </div>
      <div className="lg:flex-1 lg:pl-[6px] w-full">
        {/* {!listed.length && (
          <div className="mb-[28px] text-[#FFFFFF] rounded-[5px] text-semibold w-full border-[#290030] border-[2px] bg-[#13002B] h-[115px] flex items-center justify-center">
            <div>
              <img
                src="/img/icon_warning_triangle.svg"
                alt="warning"
                width={32}
                height={32}
              />
            </div>
            <div className="ml-[20px]">
              <div className="font-bold text-[16px]">
                We could not find any items in your wallet.
              </div>
              <div className="font-light text-[14px]">
                Here’s a few suggested items from current collections that you
                can purchase.
              </div>
            </div>
          </div>
        )} */}
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
                {listed.length} items
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
                    <ListCardLoading />
                  </div>
                );
              })}
            </div>
          )}
          {currentView === 'List' && !loading && (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8 pb-6">
              {listed.map((item: any, index) => {
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
                      // onLeftFn={(id) => {}}
                      // onRightFn={(params) => {}}
                      // onCardClick={(id) => {}}
                      selected={false}
                      rightBtnText={'Cancel Listing'}
                      rightBtnDisabled={false}
                      rightBtnTextDisabled={''}
                      tokenAddress={item.tokenAddress}
                      type={'list'}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {currentView === 'Row' && !loading && (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8 pb-6">
              {listed.map((item: any, index) => {
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
                      // onLeftFn={(id) => {}}
                      // onRightFn={(params) => {}}
                      // onCardClick={(id) => {}}
                      selected={false}
                      rightBtnText={'Cancel Listing'}
                      rightBtnDisabled={false}
                      rightBtnTextDisabled={''}
                      tokenAddress={item.tokenAddress}
                      type={'row'}
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

export default ListingView;
