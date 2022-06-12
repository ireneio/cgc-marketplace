import {
  getNumberWithCommas,
  getTrimmedAddressEllipsisMiddle,
} from '@/utils/formatHelper';
import { useMemo, useState } from 'react';
import ClipboardText from '../Shared/ClipboardText';
import Divider from '../Shared/Divider';
import ProgressBar from '../Shared/ProgressBar';
import Tag from '../Shared/Tag';
import DateViewSelector, { DateTypes } from './DateViewSelector';
import TickerText from './TickerText';

interface Props {
  brandImg: string;
  brandName: string;
  symbol: string;
  price: number;
  priceToBTC: number;
  priceToETH: number;
  priceFluctuation: number;
  priceToBTCFluctuation: number;
  priceToETHFluctuation: number;
  lowDay: number;
  lowMonth: number;
  lowWeek: number;
  highDay: number;
  highWeek: number;
  highMonth: number;
  marketCap: number;
  fullyDilutedMarketCap: number;
  volume: number;
  circulatingSupply: number;
  circulatingSupplyPercentage: number;
  totalSupply: number;
  contractAddress: string;
  priceChangePercentage7d: number;
  priceChangePercentage30d: number;
}

const TokenPricePanel = ({
  brandImg,
  brandName,
  symbol,
  price,
  priceToBTC,
  priceToETH,
  priceFluctuation,
  priceToBTCFluctuation,
  priceToETHFluctuation,
  lowDay,
  lowMonth,
  lowWeek,
  highDay,
  highMonth,
  highWeek,
  marketCap,
  fullyDilutedMarketCap,
  volume,
  circulatingSupply,
  circulatingSupplyPercentage,
  totalSupply,
  contractAddress,
  priceChangePercentage7d,
  priceChangePercentage30d,
}: Props) => {
  const [currentView, setCurrentView] = useState<DateTypes>('day');

  const low = useMemo(() => {
    switch (currentView) {
      case 'day':
        return lowDay;
      case 'week':
        return lowWeek;
      case 'month':
        return lowMonth;
      default:
        return 0;
    }
  }, [currentView, lowDay, lowMonth, lowWeek]);

  const high = useMemo(() => {
    switch (currentView) {
      case 'day':
        return highDay;
      case 'week':
        return highWeek;
      case 'month':
        return highMonth;
      default:
        return 0;
    }
  }, [currentView, highDay, highWeek, highMonth]);

  const handleGoAddress = (value: string) => {
    window.open(`https://solscan.io/token/${value}`, '_blank');
  };

  const _priceFluctuation = useMemo(() => {
    switch (currentView) {
      case 'day':
        return priceFluctuation;
      case 'week':
        return priceChangePercentage7d;
      case 'month':
        return priceChangePercentage30d;
    }
  }, [
    currentView,
    priceFluctuation,
    priceChangePercentage7d,
    priceChangePercentage30d,
  ]);

  return (
    <Tag className="relative px-[24px] py-[24px]">
      <div className="absolute right-[24px] top-[24px]">
        <img
          src={brandImg}
          alt={brandName}
          width={105}
          height={105}
          className="md:opacity-100 opacity-20"
        />
      </div>
      <div>
        <div className="text-[#FFFFFF] font-semibold text-[14px] mb-[12px]">
          {brandName} Token Price ({symbol})
        </div>
        <div className="flex items-center mb-[14px]">
          <div className="font-bold text-[36px] text-[#FFFFFF]">${price}</div>
          <div className="ml-[14px]">
            <TickerText
              text={Number(getNumberWithCommas(_priceFluctuation, 2))}
              direction={_priceFluctuation > 0 ? 'up' : 'down'}
              fontSize={14}
            />
          </div>
        </div>
        <div className="flex items-center mb-[8px]">
          <div className="font-bold text-[14px] text-[#FFFFFF]">
            ${priceToBTC}
          </div>
          <div className="ml-[14px] text-[12px]">
            <TickerText
              text={priceToBTCFluctuation}
              direction={priceToBTCFluctuation > 0 ? 'up' : 'down'}
              fontSize={12}
            />
          </div>
        </div>
        <div className="flex items-center mb-[14px]">
          <div className="font-bold text-[14px] text-[#FFFFFF]">
            ${priceToETH}
          </div>
          <div className="ml-[14px] text-[12px]">
            <TickerText
              text={priceToETHFluctuation}
              direction={priceToETHFluctuation > 0 ? 'up' : 'down'}
              fontSize={12}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center mb-[24px] flex-wrap max-w-[800px]">
          <div className="text-[#FFFFFF] text-[14px] font-semibold">
            Low: ${low}
          </div>
          <div className="ml-0 lg:ml-[12px] basis-[100%] md:basis-auto mt-[12px] md:mt-0">
            <ProgressBar
              width={221}
              percentage={(price / (low + high)) * 100}
              showIndicator
            />
          </div>
          <div className="text-[#FFFFFF] text-[14px] font-semibold ml-0 lg:ml-[12px] mt-[12px] md:mt-0">
            High: ${high}
          </div>
          <DateViewSelector
            className="xl:ml-[24px] mt-[12px] md:mt-0 ml-0"
            onViewChange={(val) => setCurrentView(val)}
            current={currentView}
          />
        </div>
        <div className="mb-[24px]">
          <Divider />
        </div>
        <div className="mb-[24px] grid gap-[24px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5">
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Market Cap
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(marketCap, 2)}
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Fully Diluted Market Cap
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(fullyDilutedMarketCap, 2)}
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Volume (24hr)
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              ${getNumberWithCommas(volume, 2)}
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Circulating Supply
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px] flex">
              <span>{getNumberWithCommas(circulatingSupply, 0)}</span>
              <span className="ml-[4px]">{symbol}</span>
              <span className="ml-auto font-light">
                {circulatingSupplyPercentage}%
              </span>
            </div>
            <div className="mt-[6px]">
              <ProgressBar
                width={221}
                percentage={circulatingSupplyPercentage}
              />
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF] font-light text-[14px]">
              Max Supply
            </div>
            <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
              {getNumberWithCommas(totalSupply)}
            </div>
          </div>
        </div>
        <div className="mb-[12px]">
          <Divider />
        </div>
        <div className="flex">
          <div>
            <div className="text-[#FFFFFF] text-[14px]">Contract Address</div>
            <ClipboardText copyValue={contractAddress}>
              <div
                className="mt-[4px] cursor-pointer"
                style={{
                  background:
                    'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                onClick={() => handleGoAddress(contractAddress)}
              >
                <div className="hidden xl:block">{contractAddress}</div>
                <div className="xl:hidden">
                  {getTrimmedAddressEllipsisMiddle(contractAddress, {
                    length: 15,
                  })}
                </div>
              </div>
            </ClipboardText>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default TokenPricePanel;
