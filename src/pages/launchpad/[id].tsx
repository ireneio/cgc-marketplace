import AllocationPanel from '@/components/Collections/AllocationPanel';
import BasicInfoPanel from '@/components/Collections/BasicInfoPanel';
import IdoPanel from '@/components/Collections/IdoPanel';
import PresaleWhitelistPanel from '@/components/Collections/PresaleWhitelistPanel';
import TokenomicsPanel from '@/components/Collections/TokenomicsPanel';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import BreadCrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import Tag from '@/components/Shared/Tag';
import { useAppDispatch } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export interface CollectionInfo {
  name: string;
  symbol: string;
  tags: string[];
  image: string;
  logo: string;
  description: string;
  nextTokenSaleStartDate: string;
  nextTokenSaleEndDate: string;
  raising: number;
  totalRaised: number;
  marketCap: number;
  fdmc: number;
  totalSupply: number;
  preSale: number;
  publicSale: number;
  socialMedia: Record<string, string>;
  preSaleTiers: {
    icon: string;
    name: string;
    allocation: number;
    salePecentage: number;
    description: string;
  }[];
  allocation: {
    name: string;
    percentage: number;
  }[];
}

const Collection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [info, setInfo] = useState<CollectionInfo>({
    name: 'Tank Metaverse',
    symbol: 'TNK',
    tags: ['Upcoming', 'IDO'],
    image: '/img/launchpad_image_placeholder.png',
    logo: '/img/launchpad_logo_placeholder.png',
    description:
      'Tank Metaverse is a multi-platform and cross-reality ecosystem for true immersion and qualitative interaction with the game world. Various platforms will be implemented in stages. Tank Metaverse is a Worldwide NFT metaverse for play‑to‑earn and fun.',
    nextTokenSaleStartDate: dayjs().toISOString(),
    nextTokenSaleEndDate: dayjs().toISOString(),
    raising: 290000,
    totalRaised: 3357200,
    marketCap: 1253250,
    fdmc: 12000000,
    totalSupply: 1500000000,
    preSale: 462350000,
    publicSale: 27700000,
    socialMedia: {
      twitter: '',
      discord: '',
      link: '',
      whitePaper: '',
    },
    preSaleTiers: [
      {
        icon: '/img/icon_bronze.png',
        name: 'Bronze',
        allocation: 500,
        salePecentage: 0,
        description: '1 NFT OR 10 Discord/Telegram Invites',
      },
      {
        icon: '/img/icon_silver.png',
        name: 'Silver',
        allocation: 1500,
        salePecentage: 0,
        description: '1 NFT OR 10 Discord/Telegram Invites',
      },
      {
        icon: '/img/icon_gold.png',
        name: 'Gold',
        allocation: 5000,
        salePecentage: 5,
        description: '1 NFT OR 10 Discord/Telegram Invites',
      },
    ],
    allocation: [
      { name: 'VIP Round', percentage: 6 },
      { name: 'Seed', percentage: 7.83 },
      { name: 'Private', percentage: 17 },
      { name: 'Founders & Team', percentage: 5 },
      { name: 'Airdrop', percentage: 1 },
      { name: 'Ecosystem', percentage: 12 },
      { name: 'Reserve', percentage: 100 - 54.83 },
    ],
  });

  return (
    <DefaultLayout>
      <div className="mb-[12px]">
        <BreadCrumb
          items={[
            { text: 'Home', value: 'Home' },
            { text: 'Launchpad', value: 'Launchpad' },
            { text: info.name, value: 'Launchpad' },
          ]}
          currentValue={'Launchpad'}
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/');
            }
          }}
        />
      </div>
      <div className="flex items-center mb-[28px]">
        <div className="text-[#FFFFFF] font-bold text-[20px]">
          {info.name} [{info.symbol.toUpperCase()}]
        </div>
        <div className="ml-[20px] flex items-center">
          {info.tags.map((tag, index) => {
            return (
              <Tag key={index} className="mr-[20px]">
                {tag}
              </Tag>
            );
          })}
        </div>
      </div>
      <div className="mb-[28px]">
        <Divider />
      </div>
      <div className="flex flex-wrap">
        <div style={{ flexBasis: '50%' }}>
          <div className="max-w-[552px]">
            <img
              src={info.image}
              alt={info.name}
              width="552px"
              height="552px"
              className="rounded-[5px]"
            />
          </div>
          <TokenomicsPanel info={info} />
        </div>
        <div style={{ flexBasis: '50%' }} className="pl-[12px]">
          <BasicInfoPanel info={info} />
          <PresaleWhitelistPanel info={info} />
          <IdoPanel info={info} />
        </div>
      </div>
      <div className="mt-[24px]">
        <AllocationPanel info={info} />
      </div>
    </DefaultLayout>
  );
};

export default Collection;
