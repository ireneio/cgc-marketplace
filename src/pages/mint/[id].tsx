import ImageCarousel from '@/components/Collections/ImageCarousel';
import NftInfoPanel from '@/components/Collections/NftInfoPanel';
import NftPresalePanel from '@/components/Collections/NftPresalePanel';
import NftPublicSalePanel from '@/components/Collections/NftPublicSalePanel';
import PageLoading from '@/components/Collections/PageLoading';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import Tag from '@/components/Shared/Tag';
import { useAppDispatch } from '@/store';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { sleep } from '@/utils/helper';
import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';

export interface LaunchpadNftInfo {
  name: string;
  symbol: string;
  tags: string[];
  images: string[];
  logo: string;
  description: string;
  nextMintStartDate: string;
  nextMintEndDate: string;
  socialMedia: Record<string, string>;
  preSale: {
    whitelistTokens: number;
    maxTokens: number;
    price: number;
    priceToUSD: number;
    startDate: string;
    endDate: string;
  };
  publicSale: {
    mintedTokens: number;
    maxTokens: number;
    price: number;
    priceToUSD: number;
    startDate: string;
    endDate: string;
  };
}

const MintNFT = () => {
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const router = useRouter();
  const id = 4;
  const contract = 'G17ksqA9jiLUvEAtQg5B4kGJGAPCC9EtkgPP9w28JFRV';
  const [info] = useState<LaunchpadNftInfo>({
    name: 'Tank Metaverse',
    symbol: 'TNK',
    tags: ['Upcoming', 'IDO'],
    images: [
      '/img/launchpad_image_placeholder.png',
      '/img/launchpad_image_placeholder.png',
    ],
    logo: '/img/launchpad_logo_placeholder.png',
    description:
      'Tank Metaverse is a multi-platform and cross-reality ecosystem for true immersion and qualitative interaction with the game world. Various platforms will be implemented in stages. Tank Metaverse is a Worldwide NFT metaverse for play???to???earn and fun.',
    nextMintStartDate: dayjs().toISOString(),
    nextMintEndDate: dayjs().toISOString(),
    socialMedia: {
      twitter: '',
      discord: '',
      link: '',
      whitePaper: '',
    },
    preSale: {
      whitelistTokens: 1200,
      maxTokens: 1,
      price: 1.2,
      priceToUSD: 1200,
      startDate: dayjs().toISOString(),
      endDate: dayjs('2022-08-01').toISOString(),
    },
    publicSale: {
      mintedTokens: 1200,
      maxTokens: 5000,
      price: 1.2,
      priceToUSD: 1200,
      startDate: dayjs().toISOString(),
      endDate: dayjs('2022-05-31').toISOString(),
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getCollectionInfo(), getContractInfo()]).then(() => {
      setLoading(false);
    });
  }, []);

  const getCollectionInfo = async () => {
    const response = await api.getCollectionById(3);
    console.log(response?.data);
  };

  const getContractInfo = async () => {
    await sleep(5000);
    console.log('Get Contract Info');
  };

  return (
    <DefaultLayout>
      {loading && <PageLoading />}
      {!loading && (
        <div>
          <div className="mb-[12px]">
            <Breadcrumb
              items={[
                { text: 'Home', value: '/' },
                { text: 'Launchpad', value: '/launchpad' },
                { text: info.name, value: '/launchpad' + info.name },
              ]}
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
            <div style={{ flexBasis: '50%' }} className="flex-1">
              <div className="max-w-[552px] mb-[30px]">
                <ImageCarousel images={info.images} />
              </div>
            </div>
            <div style={{ flexBasis: '50%' }} className="pl-[30px] flex-1">
              <NftInfoPanel info={info} />
              <NftPresalePanel info={info} />
              <NftPublicSalePanel info={info} />
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default MintNFT;
