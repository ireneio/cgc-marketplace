import { NftInfo } from '@/pages/nft/[id]';
import Tag from '../Shared/Tag';

const DetailPanel = ({ info }: { info: NftInfo }) => {
  return (
    <Tag className="px-[24px] py-[24px]">
      <div>
        <div className="text-[18px]">
          {info.brand} {info.name}
        </div>
        <div className="mt-[24px] text-[#FFFFFF] text-[14px]">
          {info.description}
        </div>
      </div>
    </Tag>
  );
};

export default DetailPanel;
