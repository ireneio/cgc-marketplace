import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithCommas } from '@/utils/formatters';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';

const IdoPanel = ({ info }: { info: CollectionInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div>
          <div className="text-[#FFFFFF] font-bold text-[16px]">Allocation</div>
          <div className="mt-[14px]">
            <Divider />
          </div>
          <div className="mt-[18px] flex flex-wrap justify-between">
            <div className="text-[#FFFFFF] mb-[20px]">
              <div className="text-[14px]">Price</div>
              <div className="mt-[4px] font-bold">
                ${getNumberWithCommas(info.nextIdoInfo.price)}
              </div>
            </div>
            <div className="text-[#FFFFFF] mb-[20px]">
              <div className="text-[14px]">Tokens For Sale</div>
              <div className="mt-[4px] font-bold">
                {getNumberWithCommas(info.nextIdoInfo.tokensForSale)}
              </div>
            </div>
            <div className="text-[#FFFFFF] mb-[20px]">
              <div className="text-[14px]">Raise</div>
              <div className="mt-[4px] font-bold">
                ${getNumberWithCommas(info.nextIdoInfo.raise)}
              </div>
            </div>
            <div className="text-[#FFFFFF] mb-[20px]">
              <div className="text-[14px]">Platform</div>
              <div className="mt-[4px] font-bold flex items-center">
                <div>
                  <img
                    src={info.nextIdoInfo.platformIcon}
                    alt={info.nextIdoInfo.platform}
                    width={14}
                    height={14}
                  />
                </div>
                <div className="ml-[6px]">{info.nextIdoInfo.platform}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#FFFFFF]">
              <div className="text-[14px]">Lock Up</div>
              <div className="mt-[4px] font-bold">
                {info.nextIdoInfo.lockUp}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default IdoPanel;
