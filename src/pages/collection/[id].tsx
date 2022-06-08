import DetailView from '@/components/Collection/DetailView';
import MarketView from '@/components/Collection/MarketView';
import YourView from '@/components/Collection/YourView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { getBreadcrumbRoutes } from '@/utils/cgcConsts';
import api from '@/utils/api';
import { OAuthContext } from '@/contexts/OAuthProvider';

type Selection =
  | 'About'
  | 'All Items'
  | 'Your Items'
  | 'Activity'
  | 'Staking'
  | '...';

const Collection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentSelection, setCurrentSelection] = useState<Selection>('About');
  const oAuthCtx = useContext(OAuthContext);
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );

  const handleSelect = (value: Selection) => {
    setCurrentSelection(value);
    if (value === '...') {
      return;
    }
    if (!metadata.slug) {
      return;
    }
    router.push(
      `/collection/${metadata.slug}?tab=${value
        .split(' ')
        .join('_')
        .toLowerCase()}`,
    );
  };

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbRoutes(currentSelection, metadata.name || '...').map(
      (item) => ({
        ...item,
        disabled: !metadata.slug,
      }),
    );
  }, [metadata, currentSelection]);

  useEffect(() => {
    if (router.query.tab) {
      const tab = String(router.query.tab)
        .split('_')
        .map((item) => item[0].toUpperCase() + item.substring(1))
        .join(' ');
      setCurrentSelection(tab as Selection);
      router.query.tab = '';
    }
  }, [router.query]);

  const getCollectionData = async () => {
    const response = await api.getCollectionById(
      oAuthCtx.access_token,
      String(router.query.id),
    );
    if (response) {
      dispatch({
        type: 'SET_CURRENT_COLLECTION',
        payload: {
          ...response,
          metadata: {
            ...response.metadata,
            slug: response.metadata.name.toLowerCase().split(' ').join(''),
            id: response.id,
          },
        },
      });
    }
  };

  const getTokenData = async () => {
    const response = await api.getTokenListByCollectionId(
      oAuthCtx.access_token,
      String(router.query.id),
    );
    console.log(response);
    // if (response) {
    //   dispatch({
    //     type: 'SET_CURRENT_COLLECTION',
    //     payload: {
    //       ...response,
    //       metadata: {
    //         ...response.metadata,
    //         slug: response.metadata.name.toLowerCase().split(' ').join(''),
    //         id: response.id,
    //       },
    //     },
    //   });
    // }
  };

  useEffect(() => {
    if (oAuthCtx.access_token && router.query.id) {
      getCollectionData();
      getTokenData();
    }
  }, [oAuthCtx.access_token, router.query.id]);

  const selectgroupItems = useMemo(() => {
    return [
      { text: 'About', value: 'About', disabled: !metadata.slug },
      { text: 'All Items', value: 'All Items', disabled: !metadata.slug },
      {
        text: 'Your Items',
        value: 'Your Items',
        disabled: !metadata.slug,
      },
      { text: '...', value: '...', disabled: !metadata.slug },
    ];
  }, [metadata]);

  return (
    <DefaultLayout>
      <div className="mb-[32px]">
        <Breadcrumb
          items={breadcrumbItems}
          currentValue={
            currentSelection === 'About' ? 'Collection' : currentSelection
          }
          onItemClick={(val) => {
            if (val === 'Home') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: 'Home' });
              router.push('/').then();
            } else if (val === 'Collection') {
              handleSelect('About');
            } else if (val === 'Explore/All') {
              dispatch({ type: 'SET_NAVIGATION_PATH', payload: val });
              router.push('/').then();
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[16px]">
        <div className="text-[#FFFFFF] font-bold text-[24px]">
          {metadata.name}
        </div>
        <div>
          <SelectGroup
            items={selectgroupItems}
            currentValue={currentSelection}
            onItemClick={(value) => handleSelect(value as Selection)}
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      {currentSelection === 'About' && <DetailView />}
      {currentSelection === 'All Items' && <MarketView />}
      {currentSelection === 'Your Items' && <YourView />}
    </DefaultLayout>
  );
};

export default Collection;
