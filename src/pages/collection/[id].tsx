import DetailView from '@/components/Collection/DetailView';
import MarketView from '@/components/Collection/MarketView';
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
import { LoginModal } from '@/components/Modals/LoginModal';

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
  const oAuthCtx = useContext(OAuthContext);
  const email = useAppSelector((state) => state.user.userInfo.email);
  const metadata = useAppSelector(
    (state) => state.collection.currentCollection.metadata,
  );
  const [currentSelection, setCurrentSelection] = useState<Selection>('About');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSelect = (value: Selection) => {
    if (value === 'Your Items') {
      if (email) {
        router.push('/account?tab=items').then();
      } else {
        setLoginModalOpen(true);
      }
      return;
    }
    if (value === '...') {
      return;
    }
    setCurrentSelection(value);
    if (!metadata.slug) {
      return;
    }
    router
      .push(
        `/collection/${metadata.slug}?tab=${value
          .split(' ')
          .join('_')
          .toLowerCase()}`,
      )
      .then();
  };

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbRoutes(currentSelection, metadata.name || '...').map(
      (item) => ({
        ...item,
        disabled: !metadata.slug,
      }),
    );
  }, [metadata, currentSelection]);

  const selectGroupItems = useMemo(() => {
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
            slug: response.metadata.name.toLowerCase().split(' ').join('_'),
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
    if (response?.data) {
      dispatch({
        type: 'SET_CURRENT_COLLECTION_TOKEN_DATA',
        payload: response?.data,
      });
    }
  };

  useEffect(() => {
    if (router.query.id) {
      Promise.all([getCollectionData(), getTokenData()]).then();
    }
  }, [router.query.id]);

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

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
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
            } else if (val === 'Your Items') {
              handleSelect('Your Items');
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[16px] max-w-full flex-wrap">
        <div className="basis-[100%] md:basis-[50%] text-[#FFFFFF] font-bold text-[24px]">
          {metadata.name}
        </div>
        <div className="basis-[100%] md:basis-auto mt-[12px] lg:mt-0">
          <SelectGroup
            items={selectGroupItems}
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
      <LoginModal
        isOpen={loginModalOpen}
        setIsOpen={setLoginModalOpen}
        redirectPath="/account?tab=items"
      />
    </DefaultLayout>
  );
};

export default Collection;
