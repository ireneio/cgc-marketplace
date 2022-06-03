import { LaunchpadNftInfo } from '@/pages/launchpad/nft/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';
import Countdown from '../Shared/Countdown';
import Divider from '../Shared/Divider';
import ProgressBar from '../Shared/ProgressBar';
import Tag from '../Shared/Tag';

dayjs.extend(relativeTime);

const NftPublicSalePanel = ({ info }: { info: LaunchpadNftInfo }) => {
  const mintedTokenPercentage = useMemo(() => {
    return (
      Number(info.publicSale.mintedTokens / info.publicSale.maxTokens) * 100
    );
  }, [info.publicSale.mintedTokens, info.publicSale.maxTokens]);

  const isEnded = useMemo(() => {
    return dayjs(info.publicSale.endDate) < dayjs();
  }, [info.publicSale.endDate]);

  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px] flex items-center">
          <div>Public Sale</div>
          <div className="ml-auto">
            <Tag>
              {isEnded ? (
                'ENDED'
              ) : (
                <Countdown endDate={info.publicSale.endDate} />
              )}
            </Tag>
          </div>
        </div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="mt-[18px] flex flex-wrap justify-between">
          <div className="text-[#FFFFFF] mb-[20px]">
            <div className="text-[14px]">Price</div>
            <div className="mt-[4px] font-bold flex items-center">
              <div className="mr-[6px]">{info.publicSale.price}</div>
              <div>
                <img
                  src={'/img/icon_unit_sol.png'}
                  alt={'sol'}
                  width={14}
                  height={14}
                />
              </div>
              <div className="ml-[12px] text-[#9497AA]">
                (${getNumberWithCommas(info.publicSale.priceToUSD)})
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[18px] flex flex-wrap justify-between">
          <div className="text-[#FFFFFF] mb-[20px] flex items-center justify-between w-full">
            <div className="text-[14px]">Total Minted</div>
            <div className="flex items-center ml-auto font-semibold">
              {mintedTokenPercentage.toFixed(0)}%
              <div className="text-[#9497AA] ml-[2px]">
                ({info.publicSale.mintedTokens}/{info.publicSale.maxTokens})
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[-12px]">
          <ProgressBar percentage={mintedTokenPercentage} showIndicator />
        </div>
      </div>
    </Tag>
  );
};

export default NftPublicSalePanel;
