import { useState } from 'react';
import Button from '../Shared/Button';
import Divider from '../Shared/Divider';
import Select from '../Shared/Select';
import Switch from '../Shared/Switch';
import Tag from '../Shared/Tag';

interface Props {
  onRankFilter: (min: string, max: string) => void | Promise<void>;
  onPriceFilter: (min: string, max: string) => void | Promise<void>;
  onTraitCountFilter: (count: string) => void | Promise<void>;
  onIsBuyNowFilter: (value: boolean) => void | Promise<void>;
  onIsRarityRankingFilter: (value: boolean) => void | Promise<void>;
  onClose: () => void | Promise<void>;
}

const Filter = ({
  onRankFilter,
  onPriceFilter,
  onTraitCountFilter,
  onIsBuyNowFilter,
  onIsRarityRankingFilter,
  onClose,
}: Props) => {
  const [rankMin, setRankMin] = useState('');
  const [rankMax, setRankMax] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [traitCount, setTraitCount] = useState('Select Trait Count');
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [isRarityRanking, setIsRarityRanking] = useState(false);

  return (
    <div>
      <div
        className="px-[2px] py-[2px] rounded-[5px] z-[101]"
        style={{
          background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
        }}
      >
        <Tag className="px-[28px] py-[28px] w-[354px]">
          <div className="h-[430.7px] overflow-auto hide-scrollbar">
            <div className="text-[#FFFFFF] font-semibold text-[16px] flex items-center">
              <div>
                <img
                  src="/img/icon_filter.svg"
                  alt="filter"
                  width={'16px'}
                  height={'16px'}
                />
              </div>
              <div className="ml-[8px]">Filter</div>
              <div
                className="ml-auto cursor-pointer"
                onClick={() => onClose && onClose()}
              >
                <img
                  src="/img/icon_double_chevron_left.png"
                  alt="cart"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div className="mt-[16px]">
              <Divider />
            </div>
            <div className="mt-[16px]">
              <div className="flex items-center justify-between">
                <div className="capitalize text-[14px] text-[#FFFFFF]">
                  Buy Now
                </div>
                <div>
                  <Switch
                    id="buy-now-switch"
                    checked={isBuyNow}
                    onChange={(val) => {
                      setIsBuyNow(val);
                      onIsBuyNowFilter(val);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-[12px]">
                <div className="capitalize text-[14px] text-[#FFFFFF]">
                  Rarity Ranking
                </div>
                <div>
                  <Switch
                    id="rarity-ranking-switch"
                    checked={isRarityRanking}
                    onChange={(val) => {
                      setIsRarityRanking(val);
                      onIsRarityRankingFilter(val);
                    }}
                  />
                </div>
              </div>
              <div className="mt-[12px]">
                <div className="capitalize text-[14px] text-[#FFFFFF]">
                  Rarity Rank Range
                </div>
                <div className="mt-[12px] flex">
                  <div>
                    <input
                      id="rankMin"
                      name="rankMin"
                      type="text"
                      placeholder="Min"
                      onChange={(e) => setRankMin(e.target.value)}
                      className="appearance-none block px-3 py-2 border-[2px] border-[#290030] rounded-md
                            shadow-sm focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook bg-[#13002B] w-[120px]"
                    />
                  </div>
                  <div className="ml-[12px]">
                    <input
                      id="rankMax"
                      name="rankMax"
                      type="text"
                      placeholder="Max"
                      onChange={(e) => setRankMax(e.target.value)}
                      className="appearance-none block px-3 py-2 border-[2px] border-[#290030] rounded-md
                            shadow-sm focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook bg-[#13002B] w-[120px]"
                    />
                  </div>
                </div>
                <div className="mt-[12px] w-[110px]">
                  <Button onClick={() => onRankFilter(rankMin, rankMax)}>
                    Apply
                  </Button>
                </div>
                <div className="mt-[12px] capitalize text-[14px] text-[#FFFFFF]">
                  Price Range
                </div>
                <div className="mt-[12px] flex">
                  <div>
                    <input
                      id="priceMin"
                      name="priceMin"
                      type="text"
                      placeholder="Min"
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="appearance-none block px-3 py-2 border-[2px] border-[#290030] rounded-md
                            shadow-sm focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook bg-[#13002B] w-[120px]"
                    />
                  </div>
                  <div className="ml-[12px]">
                    <input
                      id="priceMax"
                      name="priceMax"
                      type="text"
                      placeholder="Max"
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="appearance-none block px-3 py-2 border-[2px] border-[#290030] rounded-md
                            shadow-sm focus:outline-none focus:ring-indigo-500
                            focus:border-indigo-500 sm:text-sm font-circularstdbook bg-[#13002B] w-[120px]"
                    />
                  </div>
                </div>
                <div className="mt-[12px] w-[110px]">
                  <Button onClick={() => onPriceFilter(priceMin, priceMax)}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-[12px]">
              <Divider />
            </div>
            <div className="mt-[12px] capitalize text-[14px] text-[#FFFFFF]">
              Trait Count
            </div>
            <div className="mt-[12px]">
              <Select
                value={traitCount}
                options={['Select Trait Count', 0, 1, 2, 3, 4, 5, 6, 7, 8].map(
                  (item, index) => ({
                    text: String(item),
                    value: index === 0 ? '' : String(item),
                    // disabled: index === 0,
                  }),
                )}
                onChange={(val) => setTraitCount(val)}
              />
            </div>
            <div className="mt-[12px] w-[110px]">
              <Button onClick={() => onTraitCountFilter(traitCount)}>
                Apply
              </Button>
            </div>
          </div>
        </Tag>
      </div>
    </div>
  );
};

export default Filter;
