import { NftInfo } from '@/pages/nft/[id]';
import { getTrimmedAddressEllipsisMiddle } from '@/utils/formatHelper';
import ClipboardText from '../Shared/ClipboardText';
import PrimaryGradientText from '../Shared/PrimaryGradientText';
import Tag from '../Shared/Tag';

const InfoPanel = ({ info }: { info: NftInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>
        <div className="flex justify-between">
          <div className="text-[14px] text-[#FFFFFF]">Mint Address</div>
          <PrimaryGradientText className="text-[14px]">
            <ClipboardText copyValue={info.mintAddress}>
              {getTrimmedAddressEllipsisMiddle(info.mintAddress, {
                length: 15,
              })}
            </ClipboardText>
          </PrimaryGradientText>
        </div>
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Owner</div>
        <PrimaryGradientText className="text-[14px]">
          <ClipboardText copyValue={info.owner}>
            {getTrimmedAddressEllipsisMiddle(info.owner, { length: 15 })}
          </ClipboardText>
        </PrimaryGradientText>
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
