import { getNumberWithCommas } from '@/utils/formatHelper';
import { useMemo, useState } from 'react';
import Tag from '../Shared/Tag';
import DateViewSelector, { DateTypes } from './DateViewSelector';

interface Props {
  name: string;
  volume: number;
  volume7Days: number;
  volume30Days: number;
  change: number;
  change7Days: number;
  change30Days: number;
  sales: number;
  sales7Days: number;
  sales30Days: number;
  averagePrice: number;
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
  volume,
  volume7Days,
  volume30Days,
  change,
  change7Days,
  change30Days,
  sales,
  sales7Days,
  sales30Days,
  averagePrice,
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
        <div className="mb-[8px] text-[#FFFFFF] font-bold text-[14px]">
          {name} NFT
        </div>
        <div className="grid gap-[24px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5">
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">Volume</div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {_volume || _volume === 0
                ? `\$${getNumberWithCommas(_volume, 2)}`
                : 'N/A'}
            </div>
            <div>
              <DateViewSelector
                onViewChange={(val) => setCurrentViewVolume(val)}
                current={currentViewVolume}
              />
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">Change</div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {_change || _change === 0
                ? `\$${getNumberWithCommas(_change, 2)}`
                : 'N/A'}
            </div>
            <div>
              <DateViewSelector
                onViewChange={(val) => setCurrentViewChange(val)}
                current={currentViewChange}
              />
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">Sales</div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {_sales || _sales === 0
                ? `\$${getNumberWithCommas(_sales, 2)}`
                : 'N/A'}
            </div>
            <div>
              <DateViewSelector
                onViewChange={(val) => setCurrentViewSales(val)}
                current={currentViewSales}
              />
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">
              Average Price
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {_averagePrice || _averagePrice === 0
                ? `\$${getNumberWithCommas(_averagePrice, 2)}`
                : 'N/A'}
            </div>
            <div>
              <DateViewSelector
                onViewChange={(val) => setCurrentViewAveragePrice(val)}
                current={currentViewAveragePrice}
              />
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">
              Total Volume
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {totalVolume || totalVolume === 0
                ? `\$${getNumberWithCommas(totalVolume, 2)}`
                : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">Owners</div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {owners || owners === 0
                ? `${getNumberWithCommas(owners, 0)}`
                : 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-[#AAAAAA] font-light text-[14px]">Count</div>
            <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px]">
              {totalSupply || totalSupply === 0
                ? getNumberWithCommas(totalSupply, 0)
                : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default NftPricePanel;
