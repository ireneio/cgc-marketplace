import { testData } from '@/data/test';
import { useAppDispatch, useAppSelector } from '@/store';
import { useContext, useEffect, useState } from 'react';
import ButtonLink from '../Shared/ButtonLink';
import LoadingNetflixCard from '../Shared/LoadingNetflixCard';
import SectionTitle from '../Shared/SectionTitle';
import CardCarousel from './CardCarousel';
import Divider from '@/components/Shared/Divider';
import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';

const AllCollections = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState(testData.recentlyAddedCollections);
  const [loading, setLoading] = useState(true);
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);
  const oAuthCtx = useContext(OAuthContext);

  const getCollections = async () => {
    const response = await api.getCollectionList(oAuthCtx.access_token);
    const map = response.map((item: any) => {
      return {
        ...item,
        splashSrc: item.metadata.splashSrcUrl,
        logoSrc: item.metadata.logoSrcUrl,
        videoSrc: item.metadata.videoSrcUrl,
        name: item.metadata.name,
        slug: item.metadata.name.toLowerCase().split(' ').join(''),
        tags: item.tags.length ? item.tags.map((item: any) => item.tag) : [],
        genre: Object.entries(item.metadata.genre).map(([, value]) => value),
        services: item.services,
        description: item.metadata.description,
      };
    });
    setItems(map);
  };

  useEffect(() => {
    if (oAuthCtx.access_token) {
      getCollections();
    }
  }, [oAuthCtx.access_token]);

  useEffect(() => {
    const _tid = setTimeout(() => {
      setLoading(false);
      clearTimeout(_tid);
    }, 1200);
    return () => {
      clearTimeout(_tid);
    };
  });

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <SectionTitle>all collections</SectionTitle>
      </div>
      {sideBarPath === 'Explore/All' && (
        <div className="mt-[16px] mb-[32px]">
          <Divider />
        </div>
      )}
      <div className="hide-scrollbar">
        {!loading && (
          <div className="mt-[24px]">
            <CardCarousel items={items} />
          </div>
        )}
        {loading && (
          <div className="flex mt-[24px]">
            {items.map((game, index) => {
              return (
                <div key={index} className="mr-[12px]">
                  <LoadingNetflixCard />
                </div>
              );
            })}
          </div>
        )}
        <div className="right-[0] flex justify-end">
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
