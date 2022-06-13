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
  count,
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] auto-rows-auto">
          {_volume ||
            (_volume === 0 && (
              <div className="flex items-center justify-between">
                <div className="text-[#FFFFFF] font-light text-[14px]">
                  Volume
                  <div>
                    <DateViewSelector
                      onViewChange={(val) => setCurrentViewVolume(val)}
                      current={currentViewVolume}
                    />
                  </div>
                </div>
                <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                  {_volume ? <div>${getNumberWithCommas(_volume)}</div> : <></>}
                </div>
              </div>
            ))}
          {_change ||
            (_change === 0 && (
              <div className="flex items-center justify-between">
                <div className="text-[#FFFFFF] font-light text-[14px]">
                  Change
                  <div className="ml-auto">
                    <DateViewSelector
                      onViewChange={(val) => setCurrentViewChange(val)}
                      current={currentViewChange}
                    />
                  </div>
                </div>
                <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                  {_change ? <div>${getNumberWithCommas(_change)}</div> : <></>}
                </div>
              </div>
            ))}
          {_sales ||
            (_sales === 0 && (
              <div className="flex items-center justify-between">
                <div className="text-[#FFFFFF] font-light text-[14px]">
                  Sales
                  <div>
                    <DateViewSelector
                      onViewChange={(val) => setCurrentViewSales(val)}
                      current={currentViewSales}
                    />
                  </div>
                </div>
                <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                  {_sales ? <div>${getNumberWithCommas(_sales)}</div> : <></>}
                </div>
              </div>
            ))}
          <div className="flex items-center justify-between">
            {_averagePrice ||
              (_averagePrice === 0 && (
                <div className="text-[#FFFFFF] font-light text-[14px]">
                  Average Price
                  <div>
                    <DateViewSelector
                      onViewChange={(val) => setCurrentViewAveragePrice(val)}
                      current={currentViewAveragePrice}
                    />
                  </div>
                  <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                    {_averagePrice ? (
                      <div>${getNumberWithCommas(_averagePrice)}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            {totalVolume ||
              (totalVolume === 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-[#FFFFFF] font-light text-[14px]">
                    Total Volume
                  </div>
                  <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                    {totalVolume ? (
                      <div>${getNumberWithCommas(totalVolume)}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            {totalSupply ||
              (totalSupply === 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-[#FFFFFF] font-light text-[14px]">
                    Total Supply
                  </div>
                  <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                    {totalSupply ? (
                      <div>{getNumberWithCommas(totalSupply)}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            {owners ||
              (owners === 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-[#FFFFFF] font-light text-[14px]">
                    Owners
                  </div>
                  <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                    {owners ? (
                      <div>{getNumberWithCommas(owners, 0)}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            {count ||
              (count === 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-[#FFFFFF] font-light text-[14px]">
                    Count
                  </div>
                  <div className="mt-[4px] text-[#FFFFFF] font-normal text-[18px] flex">
                    {count ? <div>{getNumberWithCommas(count, 0)}</div> : <></>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default NftPricePanel;
