import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';

const TokenomicsPanel = ({ info }: { info: CollectionInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px]">Tokenomics</div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="text-[#FFFFFF] text-[14px]">
          <div className="mt-[14px]">Total Raised</div>
          <div className="mt-[10px] font-bold">
            ${getNumberWithCommas(info.totalRaised)}
          </div>
        </div>
        <div className="text-[#FFFFFF] text-[14px]">
          <div className="mt-[14px]">Initial Values</div>
          <div className="mt-[10px] font-bold flex items-center">
            <div>Market Cap:</div>
            <div className="ml-[8px]">
              ${getNumberWithCommas(info.marketCap)}
            </div>
            <div className="ml-[18px]">FDMC:</div>
            <div className="ml-[8px]">${getNumberWithCommas(info.fdmc)}</div>
          </div>
        </div>
        <div className="text-[#FFFFFF] text-[14px]">
          <div className="mt-[14px]">Total Allocation</div>
          <div className="mt-[10px] font-bold flex items-center">
            <div>Total Supply:</div>
            <div className="ml-[8px]">
              {getNumberWithCommas(info.totalSupply)}
            </div>
          </div>
          <div className="mt-[2px] font-bold flex items-center">
            <div>Private/Presale:</div>
            <div className="ml-[8px]">
              {getNumberWithCommas(info.preSale)} (
              {((info.preSale / info.totalSupply) * 100).toFixed(2)}%)
            </div>
          </div>
          <div className="mt-[2px] font-bold flex items-center">
            <div>Public Sale:</div>
            <div className="ml-[8px]">
              {getNumberWithCommas(info.publicSale)} (
              {((info.publicSale / info.totalSupply) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default TokenomicsPanel;
