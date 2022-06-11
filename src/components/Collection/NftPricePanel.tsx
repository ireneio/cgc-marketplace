import { getNumberWithCommas } from '@/utils/formatHelper';
import { useMemo, useState } from 'react';
import Tag from '../Shared/Tag';
import DateViewSelector, { DateTypes } from './DateViewSelector';
import TickerText from './TickerText';

interface Props {
  name: string;
  volume: number;
  volumePercentage: number;
  volume7Days: number;
  volume30Days: number;
  change: number;
  changePercentage: number;
  change7Days: number;
  change30Days: number;
  sales: number;
  salesPercentage: number;
  sales7Days: number;
  sales30Days: number;
  averagePrice: number;
  averagePricePercentage: number;
  averagePrice7Days: number;
  averagePrice30Days: number;
  totalVolume: number;
  totalSupply: number;
  owners: number;
  count: number;
}

const NftPricePanel = ({
  name,
  totalVolume,
  totalSupply,
  owners,
  count,
  volume,
  volumePercentage,
  volume7Days,
  volume30Days,
  change,
  changePercentage,
  change7Days,
  change30Days,
  sales,
  salesPercentage,
  sales7Days,
  sales30Days,
  averagePrice,
  averagePricePercentage,
  averagePrice7Days,
  averagePrice30Days,
}: Props) => {
  const [currentViewVolume, setCurrentViewVolume] = useState<DateTypes>('day');
  const [currentViewChange, setCurrentViewChange] = useState<DateTypes>('day');
  const [currentViewSales, setCurrentViewSales] = useState<DateTypes>('day');
  const [currentViewAveragePrice, setCurrentViewAveragePrice] =
    useState<DateTypes>('day');

  const _change = useMemo(() => {
    switch (currentViewChange) {
      case 'day':
        return change;
      case 'week':
        return change7Days;
      case 'month':
        return change30Days;
    }
  }, [change, change7Days, change30Days, currentViewChange]);

  const _volume = useMemo(() => {
    switch (currentViewVolume) {
      case 'day':
        return volume;
      case 'week':
        return volume7Days;
      case 'month':
        return volume30Days;
    }
  }, [volume, volume7Days, volume30Days, currentViewVolume]);

  const _sales = useMemo(() => {
    switch (currentViewSales) {
      case 'day':
        return sales;
      case 'week':
        return sales7Days;
      case 'month':
        return sales30Days;
    }
  }, [sales, sales7Days, sales30Days, currentViewSales]);

  const _averagePrice = useMemo(() => {
    switch (currentViewAveragePrice) {
      case 'day':
        return averagePrice;
      case 'week':
        return averagePrice7Days;
      case 'month':
        return averagePrice30Days;
    }
  }, [
    averagePrice,
    averagePrice7Days,
    averagePrice30Days,
    currentViewAveragePrice,
  ]);

  return (
    <Tag>
      <div className="relative px-[18px] py-[24px]">
        <div className="mb-[10px] text-[#FFFFFF] font-bold text-[14px]">
          {name} NFT
        </div>
        <div className="flex flex-wrap gap-y-6 gap-x-12">
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Volume</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(_volume)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={volumePercentage}
                  direction={'up'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[24px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewVolume(val)}
                  current={currentViewVolume}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Change</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(_change)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={changePercentage}
                  direction={'up'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[24px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewChange(val)}
                  current={currentViewChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Sales</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(_sales)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={salesPercentage}
                  direction={'up'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[24px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewSales(val)}
                  current={currentViewSales}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Average Price
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(_averagePrice)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={averagePricePercentage}
                  direction={'down'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[14px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewAveragePrice(val)}
                  current={currentViewAveragePrice}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Total Volume
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(totalVolume)}</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Total Supply
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>{getNumberWithCommas(totalSupply, 0)}</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Owners</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>{getNumberWithCommas(owners, 0)}</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Count</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>{getNumberWithCommas(count, 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default NftPricePanel;
