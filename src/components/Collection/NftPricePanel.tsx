import { getNumberWithCommas } from '@/utils/formatHelper';
import { useState } from 'react';
import Tag from '../Shared/Tag';
import DateViewSelector from './DateViewSelector';
import TickerText from './TickerText';

interface Props {
  name: string;
  volume: number;
  volumePercentage: number;
  change: number;
  changePercentage: number;
  sales: number;
  salesPercentage: number;
  averagePrice: number;
  averagePricePercentage: number;
  totalVolume: number;
  totalSales: number;
  totalSupply: number;
  owners: number;
  count: number;
}

const NftPricePanel = ({
  name,
  volume,
  change,
  sales,
  averagePrice,
  totalVolume,
  // totalSales,
  totalSupply,
  owners,
  count,
  volumePercentage,
  changePercentage,
  salesPercentage,
  averagePricePercentage,
}: Props) => {
  const [, setCurrentViewVolume] = useState('day');

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
              <div>${getNumberWithCommas(volume)}</div>
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
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Change</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(change)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={changePercentage}
                  direction={'up'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[24px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewVolume(val)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Sales</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(sales)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={salesPercentage}
                  direction={'up'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[24px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewVolume(val)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Average Price
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>${getNumberWithCommas(averagePrice)}</div>
              <div className="text-[12px] text-green ml-[10px] mt-[2px]">
                <TickerText
                  text={averagePricePercentage}
                  direction={'down'}
                  fontSize={12}
                />
              </div>
              <div className="ml-[14px]">
                <DateViewSelector
                  onViewChange={(val) => setCurrentViewVolume(val)}
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
              <div>${getNumberWithCommas(totalSupply)}</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Owners</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>{getNumberWithCommas(owners)}</div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">Count</div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <div>{getNumberWithCommas(count)}</div>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default NftPricePanel;
