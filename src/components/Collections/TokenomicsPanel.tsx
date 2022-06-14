import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';

const TokenomicsPanel = ({ info }: { info: CollectionInfo }) => {
  return (
    <Tag className="px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px]">Tokenomics</div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="text-[#FFFFFF] text-[14px]">
          <div className="mt-[14px] font-normal">Total Raised</div>
          <div className="mt-[10px] font-semibold text-[18px]">
            ${getNumberWithCommas(info.totalRaised)}
          </div>
        </div>
        <div className="text-[#FFFFFF] text-[14px] mt-[14px]">
          <div>Initial Values</div>
          <div className="mt-[10px] font-semibold grid grid-cols-1 md:grid-cols-2 gap-[8px]">
            <div className="flex items-center">
              <div className="font-normal text-[#AAAAAA]">Market Cap:</div>
              <div className="ml-[8px] text-[18px]">
                ${getNumberWithCommas(info.marketCap)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-normal text-[#AAAAAA]">FDMC:</div>
              <div className="ml-[8px] text-[18px]">
                ${getNumberWithCommas(info.fdmc)}
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#FFFFFF] text-[14px] mt-[14px]">
          <div>Total Allocation</div>
          <div className="mt-[10px] font-semibold flex items-center">
            <div className="font-normal text-[#AAAAAA]">Total Supply:</div>
            <div className="ml-[8px] text-[18px]">
              {getNumberWithCommas(info.totalSupply)}
            </div>
          </div>
          <div className="mt-[4px] font-semibold flex items-center">
            <div className="font-normal text-[#AAAAAA]">Private/Presale:</div>
            <div className="ml-[8px] text-[18px]">
              {getNumberWithCommas(info.preSale)}
              <span className="text-[14px] ml-[4px] font-normal">
                ({((info.preSale / info.totalSupply) * 100).toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="mt-[4px] font-semibold flex items-center">
            <div className="font-normal text-[#AAAAAA]">Public Sale:</div>
            <div className="ml-[8px] text-[18px]">
              {getNumberWithCommas(info.publicSale)}
              <span className="text-[14px] ml-[4px] font-normal">
                ({((info.publicSale / info.totalSupply) * 100).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default TokenomicsPanel;
