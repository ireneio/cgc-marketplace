import { NftInfo } from '@/pages/nft/[id]';
import Tag from '../Shared/Tag';

const AttributesPanel = ({ info }: { info: NftInfo }) => {
  return (
    <Tag className="px-[24px] py-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[12px]">
        {info.attributes.map((attr, index) => {
          return (
            <div key={index}>
              <div className="text-[#FFFFFF] font-normal text-[14px] capitalize">
                {attr.traitType}
              </div>
              <div className="mt-[4px] text-[#FFFFFF] font-semibold text-[14px]">
                {attr.value}
              </div>
            </div>
          );
        })}
      </div>
    </Tag>
  );
};

export default AttributesPanel;
