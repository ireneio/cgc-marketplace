import { CollectionInfo } from '@/pages/launchpad/[id]';
import { getNumberWithUnits } from '@/utils/formatHelper';
import dayjs from 'dayjs';
import Tag from '../Shared/Tag';

const BasicInfoPanel = ({ info }: { info: CollectionInfo }) => {
  const handleLinkOpen = (
    type: 'discord' | 'twitter' | 'link' | 'whitepaper',
  ) => {
    window.open(info.socialMedia[type], '_blank');
  };

  return (
    <Tag className="px-[28px] py-[24px]">
      <div>
        <div>
          <img src={info.logo} alt={info.name} width="229px" height="30px" />
        </div>
        <div className="mt-[20px] text-[#FFFFFF] text-[14px] font-normals">
          {info.description}
        </div>
        <div className="mt-[50px] flex items-center flex-wrap">
          <div className="flex items-center text-[14px]">
            <div>Next Token Sale</div>
            <div className="ml-[8px] font-semibold">
              {dayjs(info.nextTokenSaleStartDate).format('DD MMM YYYY')}
            </div>
          </div>
          <div className="flex items-center ml-[20px] mr-[12px] text-[14px]">
            <div>Raising</div>
            <div className="ml-[8px] font-semibold">
              ${getNumberWithUnits(info.raising)}
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <div
              className="cursor-pointer"
              onClick={() => handleLinkOpen('whitepaper')}
            >
              <img
                src="/img/icon_link.svg"
                width={12}
                height={12}
                alt="whitepaper"
              />
            </div>
            <div
              className="ml-[16px] cursor-pointer"
              onClick={() => handleLinkOpen('twitter')}
            >
              <img
                src="/img/icon_twitter.svg"
                width={16}
                height={16}
                alt="twitter"
              />
            </div>
            <div
              className="ml-[16px] cursor-pointer"
              onClick={() => handleLinkOpen('discord')}
            >
              <img
                src="/img/icon_discord.svg"
                width={16}
                height={16}
                alt="discord"
              />
            </div>
            <div
              className="ml-[16px] cursor-pointer"
              onClick={() => handleLinkOpen('link')}
            >
              <img src="/img/icon_link.png" width={16} height={16} alt="link" />
            </div>
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default BasicInfoPanel;
