import { useSolanaWallet } from '@/contexts/SolanaWalletProvider';
import { LaunchpadNftInfo } from '@/pages/launchpad/nft/[id]';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dayjs from 'dayjs';
import Button from '../Shared/Button';
import Tag from '../Shared/Tag';

const NftInfoPanel = ({ info }: { info: LaunchpadNftInfo }) => {
  const solanaWallet = useSolanaWallet();
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
        {solanaWallet.connected && (
          <div className="mt-[30px] w-[100px]">
            <Button>Mint</Button>
          </div>
        )}
        {!solanaWallet.connected && (
          <div className="mt-[30px]">
            <WalletMultiButton />
          </div>
        )}
        <div className="mt-[50px] flex items-center flex-wrap">
          <div className="flex items-center text-[14px]">
            <div>Mint Ends In</div>
            <div className="ml-[8px] font-semibold">
              {dayjs(info.nextMintEndDate).format('DD MMM YYYY')}
            </div>
          </div>
          <div className="flex items-center ml-[20px] mr-[12px] text-[14px]">
            <div>Price</div>
            <div className="ml-[8px] font-semibold">
              {info.preSale.price.toFixed(2)}
            </div>
            <div className="ml-[4px]">
              <img
                src={'/img/icon_unit_sol.png'}
                alt={'sol'}
                width={14}
                height={14}
              />
            </div>
          </div>
          <div className="ml-auto flex items-center">
            <div
              className="cursor-pointer"
              onClick={() => handleLinkOpen('whitepaper')}
            >
              <img
                src="/img/icon_doc.png"
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
                src="/img/icon_twitter.png"
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
                src="/img/icon_discord.png"
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

export default NftInfoPanel;
