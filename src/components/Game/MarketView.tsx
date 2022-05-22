import { useAppDispatch, useAppSelector } from '@/store';
import { CART_STORAGE_KEY } from '@/store/reducers/cart';
import { getNumberWithCommas } from '@/utils/formatters';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DropdownMenu from '../Shared/DropdownMenu';
import SelectGroup from '../Shared/SelectGroup';
import Cart from './Cart';
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
    setAddToCartLoading({ itemId: String(params.id), status: true });
    const tid = setTimeout(() => {
      setAddToCartLoading({ itemId: '', status: false });
      clearTimeout(tid);
    }, 1200);
    dispatch({ type: 'ADD_CART_ITEM', payload: params });
  };

  const handleMoreInfo = (id: string | number) => {
    console.log('handleMoreInfo', id);
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
            {getNumberWithCommas(info.listedItemCount)} Items
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
                          className="ml-[4px]"
                          style={{
                            background:
                              'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
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
                <Cart />
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
      <div className="flex flex-wrap">
        {loading &&
          LOADING_ARR.map((item, index) => {
            return (
              <div key={index} className="mr-[34px] mb-[34px]">
                {currentView === 'List' && <ListCardLoading />}
                {currentView === 'Row' && <RowCardLoading />}
              </div>
            );
          })}
        {!loading &&
          items.map((item, index) => {
            return (
              <div key={index} className="mr-[34px] mb-[34px]">
                {currentView === 'List' && (
                  <ListCard
                    id={index}
                    image={'/img/chicks_nft1.png'}
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
                )}
                {currentView === 'Row' && (
                  <RowCard
                    id={index}
                    image={'/img/chicks_nft1.png'}
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
                )}
              </div>
            );
          })}
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
