import DetailView from '@/components/Collection/DetailView';
import MarketView from '@/components/Collection/MarketView';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Breadcrumb from '@/components/Shared/Breadcrumb';
import Divider from '@/components/Shared/Divider';
import SelectGroup from '@/components/Shared/SelectGroup';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getBreadcrumbRoutes } from '@/utils/cgcConsts';
import { LoginModal } from '@/components/Auth/LoginModal';
import { useGetCollectionsBySlug } from '@/hooks/services_collections';

export type CollectionTabSelection =
  | 'About'
  | 'All Items'
  | 'Your Items'
  | 'Listed Items'
  | 'Activity'
  | 'Staking'
  | '...';

const Collection = () => {
  const router = useRouter();
  const access_token = useAppSelector(
    (state) => state.user.userInfo.access_token,
  );
  const [currentSelection, setCurrentSelection] =
    useState<CollectionTabSelection>('About');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { data } = useGetCollectionsBySlug();

  const handleSelect = (value: CollectionTabSelection) => {
    if (value === 'Your Items') {
      if (access_token) {
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
    if (!data?.metadata?.slug) {
      return;
    }
    router
      .push(
        `/collection/${data?.metadata?.slug}?tab=${value
          .split(' ')
          .join('_')
          .toLowerCase()}`,
      )
      .then();
  };

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbRoutes(
      currentSelection,
      data?.metadata.name || '...',
    ).map((item) => ({
      ...item,
      disabled: !data?.metadata?.slug,
    }));
  }, [data, currentSelection]);

  const selectGroupItems = useMemo(() => {
    return [
      { text: 'About', value: 'About', disabled: !data?.metadata?.slug },
      {
        text: 'All Items',
        value: 'All Items',
        disabled: !data?.metadata?.slug,
      },
      {
        text: 'Your Items',
        value: 'Your Items',
        disabled: !data?.metadata?.slug,
      },
      {
        text: 'Listed Items',
        value: 'Listed Items',
        disabled: !data?.metadata.slug,
      },
      { text: '...', value: '...', disabled: !data?.metadata?.slug },
    ];
  }, [data]);

  useEffect(() => {
    if (router.query.tab) {
      const tab = String(router.query.tab)
        .split('_')
        .map((item) => item[0].toUpperCase() + item.substring(1))
        .join(' ');
      setCurrentSelection(tab as CollectionTabSelection);
      router.query.tab = '';
    }
  }, [router.query]);

  return (
    <DefaultLayout>
      <div className="mb-[24px]">
        <Breadcrumb
          items={breadcrumbItems}
          onItemClick={(val) => {
            if (val === 'Your Items') {
              handleSelect('Your Items');
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center mb-[12px] max-w-full flex-wrap">
        <div className="basis-[100%] md:basis-[50%] text-[#FFFFFF] font-bold text-[24px]">
          {data?.metadata?.name}
        </div>
        <div className="basis-[100%] lg:basis-auto mt-[12px] lg:mt-0">
          <SelectGroup
            items={selectGroupItems}
            currentValue={currentSelection}
            onItemClick={(value) =>
              handleSelect(value as CollectionTabSelection)
            }
          />
        </div>
      </div>
      <div className="mb-[24px]">
        <Divider />
      </div>
      {currentSelection === 'About' && <DetailView />}
      {(currentSelection === 'All Items' ||
        currentSelection === 'Listed Items') && (
        <MarketView currentTab={currentSelection} />
      )}
      <LoginModal
        isOpen={loginModalOpen}
        setIsOpen={setLoginModalOpen}
        redirectPath="/account?tab=items"
      />
    </DefaultLayout>
  );
};

export default Collection;
