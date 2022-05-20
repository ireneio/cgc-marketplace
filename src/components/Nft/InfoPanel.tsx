import { NftInfo } from '@/pages/nft/[id]';
import { getTrimmedAddress } from '@/utils/formatters';
import Tag from '../Shared/Tag';

const InfoPanel = ({ info }: { info: NftInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="flex justify-between">
          <div className="text-[14px] text-[#FFFFFF]">Mint Address</div>
          <div
            style={{
              background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="text-[14px]"
          >
            {getTrimmedAddress(info.mintAddress, { length: 10 })}
          </div>
        </div>
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Owner</div>
        <div
          style={{
            background: 'linear-gradient(180deg, #F41786 0%, #A713ED 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          className="text-[14px]"
        >
          {getTrimmedAddress(info.owner, { length: 10 })}
        </div>
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Royalties</div>
        <div className="text-[14px] text-[#FFFFFF] font-semibold">
          {info.royaltiesPercentage}%
        </div>
      </div>
    </Tag>
  );
};

export default InfoPanel;
