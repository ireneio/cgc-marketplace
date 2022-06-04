import { LaunchpadNftInfo } from '@/pages/launchpad/nft/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import dayjs from 'dayjs';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';

const NftPresalePanel = ({ info }: { info: LaunchpadNftInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px] flex items-center">
          <div>Presale Whitelist</div>
          <div className="ml-auto uppercase font-normal">
            <Tag>
              {dayjs(info.preSale.endDate) > dayjs() ? 'ongoing' : 'ended'}
            </Tag>
          </div>
        </div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="mt-[18px] flex flex-wrap justify-between">
          <div className="text-[#FFFFFF] mb-[20px]">
            <div className="text-[14px]">Whitelist</div>
            <div className="mt-[4px] font-bold">
              {getNumberWithCommas(info.preSale.whitelistTokens)}
            </div>
          </div>
          <div className="text-[#FFFFFF] mb-[20px]">
            <div className="text-[14px]">Max Tokens</div>
            <div className="mt-[4px] font-bold">
              {getNumberWithCommas(info.preSale.maxTokens)}
            </div>
          </div>
          <div className="text-[#FFFFFF] mb-[20px]">
            <div className="text-[14px]">Price</div>
            <div className="mt-[4px] font-bold flex items-center">
              <div className="mr-[6px]">{info.preSale.price}</div>
              <div>
                <img
                  src={'/img/icon_unit_sol.png'}
                  alt={'sol'}
                  width={14}
                  height={14}
                />
              </div>
              <div className="ml-[12px] text-[#9497AA]">
                (${getNumberWithCommas(info.preSale.priceToUSD)})
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default NftPresalePanel;
