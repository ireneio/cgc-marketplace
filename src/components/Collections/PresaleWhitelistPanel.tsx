import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithCommas } from '@/utils/formatHelper';
import Divider from '../Shared/Divider';
import Tag from '../Shared/Tag';

const PresaleWhitelistPanel = ({ info }: { info: CollectionInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[16px]">
          Presale Whitelist
        </div>
        <div className="mt-[14px]">
          <Divider />
        </div>
        <div className="mt-[18px]">
          {info.preSaleTiers.map((tier, index, array) => {
            return (
              <div
                key={index}
                className="flex flex-wrap items-center text-[#FFFFFF] text-[14px] tracking-widest"
                style={{
                  marginBottom: index === array.length - 1 ? '0' : '14px',
                }}
              >
                <div>
                  <img src={tier.icon} alt={tier.name} width={14} height={14} />
                </div>
                <div className="ml-[10px]">{tier.name}</div>
                <div className="ml-[4px]">
                  ${getNumberWithCommas(tier.allocation)}
                </div>
                <div className="ml-[4px]">allocation:</div>
                <div className="ml-[8px] font-bold tracking-normal">
                  {tier.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Tag>
  );
};

export default PresaleWhitelistPanel;
