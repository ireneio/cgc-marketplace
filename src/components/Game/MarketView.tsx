import { useAppDispatch, useAppSelector } from '@/store';
import { getNumberWithCommas } from '@/utils/formatters';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DropdownMenu from '../Shared/DropdownMenu';
import SelectGroup from '../Shared/SelectGroup';
import Cart from './Cart';
import Filter from './Filter';
import ListCard, { Attr } from './ListCard';
import ListCardLoading from './ListCardLoading';
import RowCard from './RowCard';
import RowCardLoading from './RowCardLoading';

type SelectionView = 'Row' | 'List';

type SelectionFilter = 'Filter' | 'Cart' | '';

const LOADING_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const MarketView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [info, setInfo] = useState({
    listedItemCount: 1234,
  });
  const [currentView, setCurrentView] = useState<SelectionView>('List');
  const [currentFilter, setCurrentFilter] = useState<SelectionFilter>('');
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState({
    status: false,
    itemId: '',
  });
  const [filters, setFilters] = useState({
    rankMin: '',
    rankMax: '',
    priceMin: '',
    priceMax: '',
    traitCount: '',
    isBuyNow: false,
    isRarityRanking: false,
  });

  const isItemAddedToCart = (id: string | number) => {
    return cartItems.find((item: Attr) => String(item.id) === String(id));
  };

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleSelectFilter = (value: SelectionFilter) => {
    setCurrentFilter(value);
  };

  const handleAddToCart = (params: Attr) => {
    // setAddToCartLoading({ itemId: String(params.id), status: true });
    // const tid = setTimeout(() => {
    //   setAddToCartLoading({ itemId: '', status: false });
    //   clearTimeout(tid);
    // }, 1200);
    dispatch({ type: 'ADD_CART_ITEM', payload: params });
  };

  const handleMoreInfo = (id: string | number) => {
    router.push(`/nft/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    const tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(tid);
    }, 1200);
  }, [currentView]);

  const getCart = () => {
    dispatch({ type: 'INIT_CART' });
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-[40px]">
        <div className="flex items-center w-full">
          <div className="cursor-pointer">
            <img
              src="/img/icon_refresh.png"
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">
            {getNumberWithCommas(info.listedItemCount, 0)} Items
          </div>
          <div className="ml-auto">
            <SelectGroup
              items={[
                {
                  text: (
                    <div className="flex items-center">
                      <div>
                        <img
                          src="/img/icon_filter.png"
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
                          src="/img/icon_cart.png"
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
                        src="/img/icon_view_row.png"
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
                        src="/img/icon_view_list.png"
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
          <div
            className="grid gap-y-[24px] gap-x-[12px] w-full justify-between"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 205px)',
            }}
          >
            {LOADING_ARR.map((item, index) => {
              return (
                <div key={index}>
                  <ListCardLoading />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'Row' && loading && (
          <div
            className="grid gap-y-[24px] gap-x-[12px] w-full justify-between"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 364px)',
            }}
          >
            {LOADING_ARR.map((item, index) => {
              return (
                <div key={index}>
                  <RowCardLoading />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'List' && !loading && (
          <div
            className="grid gap-y-[24px] gap-x-[12px] w-full justify-between"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 205px)',
            }}
          >
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <ListCard
                    id={index}
                    image={
                      'https://ipfs.io/ipfs/QmeN1gvQG97kAgvTBt9oV1Ddxmi1HNc6WQbbHbXhnTQvHa/solchicks-10001.png'
                    }
                    brand={'SOLCHICKS'}
                    name={'Solchicks 3670'}
                    price={'5.6789'}
                    isAddedToCart={isItemAddedToCart(index)}
                    onAddToCart={(params) => handleAddToCart(params)}
                    onMoreInfo={(id) => handleMoreInfo(id)}
                    addToCartLoading={
                      addToCartLoading.status &&
                      addToCartLoading.itemId === String(index)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        {currentView === 'Row' && !loading && (
          <div
            className="grid gap-y-[24px] gap-x-[12px] w-full justify-between"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, 364px)',
            }}
          >
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <RowCard
                    id={index}
                    image={
                      'https://ipfs.io/ipfs/QmeN1gvQG97kAgvTBt9oV1Ddxmi1HNc6WQbbHbXhnTQvHa/solchicks-10001.png'
                    }
                    brand={'SOLCHICKS'}
                    name={'Solchicks 3670'}
                    price={'5.6789'}
                    isAddedToCart={isItemAddedToCart(index)}
                    onAddToCart={(params) => handleAddToCart(params)}
                    onMoreInfo={(id) => handleMoreInfo(id)}
                    addToCartLoading={
                      addToCartLoading.status &&
                      addToCartLoading.itemId === String(index)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        {!items.length && (
          <div className="text-[#FFFFFF] text-semibold">
            No Items Available.
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketView;
