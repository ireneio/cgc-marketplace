import { useAppDispatch, useAppSelector } from '@/store';
import { useContext, useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import FloatingCardLoading from './FloatingCardLoading';
import SectionTitle from '../Shared/SectionTitle';
import Divider from '@/components/Shared/Divider';
import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';
import FloatingCard from './FloatingCard';
import { useRouter } from 'next/router';
import { useWindowWidth } from '@/hooks/window';

const AllCollections = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);
  const collections = useAppSelector((state) => state.collection.collections);
  const oAuthCtx = useContext(OAuthContext);
  const [loading, setLoading] = useState(true);
  const windowWidth = useWindowWidth();

  const getCollections = async () => {
    const response = await api.getCollectionList(oAuthCtx.access_token);
    return response.map((item: any) => {
      return {
        ...item,
        splashSrc: item.metadata.splashSrcUrl,
        logoSrc: item.metadata.logoSrcUrl,
        videoSrc: item.metadata.videoSrcUrl,
        name: item.metadata.name,
        slug: item.metadata.name.toLowerCase().split(' ').join('_'),
        tags: item.tags.length ? item.tags.map((item: any) => item.tag) : [],
        genre: [item.metadata.genre, ...item.tags.slice(0, 2)],
        services: item.services,
        description: item.metadata.description,
        totalSupply: item?.nftCollectionStats?.totalSupply || null,
        marketCap: item?.nftCollectionStats?.usdMarketCap || null,
        network: 'SOL',
      };
    });
  };

  const initCollections = async () => {
    setLoading(true);
    const collections = await getCollections();
    dispatch({ type: 'SET_COLLECTIONS', payload: collections });
    const tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(tid);
    }, 800);
  };

  useEffect(() => {
    initCollections().then();
  }, []);

  const handleGoDetail = (slug: string) => {
    router.push(`/collection/${slug}`);
  };

  const [currentHoverId, setCurrentHoverId] = useState('-1');

  useEffect(() => {
    setCurrentHoverId('-1');
  }, [sideBarPath, router.pathname]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <SectionTitle>all collections</SectionTitle>
      </div>
      {sideBarPath === 'Explore/All' && (
        <div className="mt-[24px] mb-[24px]">
          <Divider />
        </div>
      )}
      <div className="hide-scrollbar">
        {!loading && (
          <div className="mt-[24px]">
            <div className="grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cold-6">
              {collections.map((collection: any, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleGoDetail(collection.slug)}
                  >
                    <FloatingCard
                      // isDefaultFloating={windowWidth < 768}
                      isDefaultFloating={false}
                      isFloatRight={false}
                      logo={collection.logoSrc}
                      currentHoverId={currentHoverId}
                      id={String(index)}
                      bg={collection.splashSrc}
                      bgOnHover={collection.videoSrc}
                      title={collection.description}
                      categories={collection.genre}
                      network={collection.network}
                      marketCap={collection.marketCap}
                      coinSupply={collection.totalSupply}
                      onPlay={() => handleGoDetail(collection.slug)}
                      onCardClick={() => handleGoDetail(collection.slug)}
                      onMouseOver={() => setCurrentHoverId(String(index))}
                      onMouseLeave={() => setCurrentHoverId('-1')}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {loading && (
          <div className="mt-[24px] grid gap-[12px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cold-6 auto-rows-auto">
            {[0, 1, 2].map((game, index) => {
              return (
                <div key={index}>
                  <FloatingCardLoading />
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-[12px] flex justify-end">
          {sideBarPath === 'Home' && (
            <ButtonLink
              onClick={() => {
                dispatch({
                  type: 'SET_NAVIGATION_PATH',
                  payload: 'Explore/All',
                });
                window.scroll(0, 0);
              }}
            >
              see all
            </ButtonLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCollections;
