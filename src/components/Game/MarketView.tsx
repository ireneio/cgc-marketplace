import { useState } from 'react';
import SelectGroup from '../Shared/SelectGroup';
import ListCard from './ListCard';
import RowCard from './RowCard';

type SelectionView = 'Row' | 'List';

type SelectionFilter = 'Filter' | 'Cart' | '';

const MarketView = () => {
  const [info, setInfo] = useState({
    count: 1234,
  });
  const [currentView, setCurrentView] = useState<SelectionView>('Row');
  const [currentFilter, setCurrentFilter] = useState<SelectionFilter>('');
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleSelectView = (value: SelectionView) => {
    setCurrentView(value);
  };

  const handleSelectFilter = (value: SelectionFilter) => {
    setCurrentFilter(value);
  };

  const handleAddToCart = (id: string | number) => {
    console.log('handleAddToCart', id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-[40px]">
        <div className="flex items-center w-full">
          <div>
            <img
              src="/img/icon_refresh.png"
              alt="refresh"
              width={14}
              height={14}
            />
          </div>
          <div className="ml-[8px] text-[#FFFFFF] text-[14px]">
            {info.count} Items
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
                          src="/img/icon_filter.png"
                          alt="row"
                          width={12}
                          height={12}
                        />
                      </div>
                      <div className="text-[#FFFFFF] ml-[4px] text-[12px]">
                        Cart
                      </div>
                    </div>
                  ),
                  value: 'Cart',
                },
              ]}
              currentValue={currentFilter}
              onItemClick={(value) =>
                handleSelectFilter(value as SelectionFilter)
              }
            />
          </div>
          <div className="ml-[24px]">
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
        {currentView === 'List' &&
          items.map((item, index) => {
            return (
              <div key={index} className="mr-[34px] mb-[34px]">
                <ListCard
                  id={index}
                  image={'/img/chicks_nft1.png'}
                  brand={'SOLCHICKS'}
                  name={'Solchicks 3670'}
                  price={'5.6789'}
                  isAddedToCart={index % 2 === 0}
                  onAddToCart={(id) => handleAddToCart(id)}
                />
              </div>
            );
          })}
        {currentView === 'Row' &&
          items.map((item, index) => {
            return (
              <div key={index} className="mr-[34px] mb-[34px]">
                <RowCard
                  id={index}
                  image={'/img/chicks_nft1.png'}
                  brand={'SOLCHICKS'}
                  name={'Solchicks 3670'}
                  price={'5.6789'}
                  isAddedToCart={index % 2 === 0}
                  onAddToCart={(id) => handleAddToCart(id)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MarketView;
