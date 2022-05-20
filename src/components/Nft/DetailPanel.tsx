import { NftInfo } from '@/pages/nft/[id]';
import dayjs from 'dayjs';
import Tag from '../Shared/Tag';

const DetailPanel = ({ info }: { info: NftInfo }) => {
  return (
    <Tag className="px-[28px] py-[24px]">
      <div>
        <div className="text-[#FFFFFF] font-bold text-[36px]">{info.name}</div>
        <div className="mt-[4px] text-[14px] text-[#9497AA] flex items-start">
          <div>{info.brand}</div>
          <div className="mt-[3px] ml-[3px]">
            <img src="/img/icon_cr.png" alt="copyright" width={6} height={6} />
          </div>
        </div>
        <div className="mt-[24px] text-[#FFFFFF] text-[14px]">
          {info.description}
        </div>
        <div className="mt-[16px] text-[#FFFFFF] text-[16px] flex">
          <div>Sale Ends At</div>
          <div className="ml-[8px] font-semibold">
            {dayjs(info.auctionEndDate || info.saleEndDate).format(
              'DD MMM YYYY hh:mm',
            )}
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default DetailPanel;
