import { NftInfo } from '@/pages/nft/[id]';
import { getTrimmedAddressEllipsisMiddle } from '@/utils/formatHelper';
import ClipboardText from '../Shared/ClipboardText';
import PrimaryGradientText from '../Catheon/PrimaryGradientText';
import Tag from '../Shared/Tag';
import { NftListingInfo } from '@/pages/nft/listing/[id]';

const ListingInfoPanel = ({ info }: { info: NftListingInfo }) => {
  return (
    <Tag className="px-[24px] py-[24px]">
      <div>
        <div className="flex justify-between">
          <div className="text-[14px] text-[#FFFFFF]">Mint Address</div>
          {info?.mintAddress ? (
            <PrimaryGradientText className="text-[14px]">
              <ClipboardText copyValue={info.mintAddress}>
                {getTrimmedAddressEllipsisMiddle(info.mintAddress, {
                  length: 15,
                })}
              </ClipboardText>
            </PrimaryGradientText>
          ) : (
            '-'
          )}
        </div>
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Owner</div>
        {info.owner ? (
          <PrimaryGradientText className="text-[14px]">
            <ClipboardText copyValue={info.owner}>
              {getTrimmedAddressEllipsisMiddle(info.owner, { length: 15 })}
            </ClipboardText>
          </PrimaryGradientText>
        ) : (
          '-'
        )}
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Royalties</div>
        <div className="text-[14px] text-[#FFFFFF]">
          {isNaN(info.royaltiesPercentage)
            ? '-'
            : info.royaltiesPercentage + '%'}
        </div>
      </div>
      <div className="mt-[14px] flex justify-between">
        <div className="text-[14px] text-[#FFFFFF]">Transaction Fee</div>
        <div className="text-[14px] text-[#FFFFFF]">
          {isNaN(info.transactionFee) ? '-' : info.transactionFee + '%'}
        </div>
      </div>
    </Tag>
  );
};

export default ListingInfoPanel;
