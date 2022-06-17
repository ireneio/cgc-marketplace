// import { useAppDispatch } from '@/store';
import { fetcher } from '@/utils/swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useGetCollections = () => {
  // const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const { data, error, mutate, isValidating } = useSWR(
    '/v1/api/collection/list',
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data.map((item: any) => {
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
      // dispatch({ type: 'SET_COLLECTIONS', payload: _transformed });
      setItems(_transformed);
    }
  }, [data]);

  return {
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};

export const useGetCollectionsV2 = () => {
  // const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const { data, error, mutate, isValidating } = useSWR(
    '/v2/api/collection/list',
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
      // revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data
        .filter((item: any) => item.active)
        .map((item: any) => {
          return {
            ...item,
            splashSrc: item.metadata.splashSrcUrl,
            logoSrc: item.metadata.logoSrcUrl,
            videoSrc: item.metadata.videoSrcUrl,
            name: item.metadata.name,
            slug: item.metadata.name.toLowerCase().split(' ').join('_'),
            tags: item.tags.length
              ? item.tags.map((item: any) => item.tag)
              : [],
            genre: [item.metadata.genre, ...item.tags.slice(0, 2)],
            services: item.services,
            description: item.metadata.description,
            totalSupply: item?.nftCollectionStats?.totalSupply || null,
            marketCap: item?.nftCollectionStats?.usdMarketCap || null,
            network: 'SOL',
          };
        });
      // dispatch({ type: 'SET_COLLECTIONS', payload: _transformed });
      setItems(_transformed);
    }
  }, [data]);

  return {
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};

export const useGetCollectionsBySlug = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const [items, setItems] = useState<any>({
    active: false,
    contracts: [],
    createdAt: '',
    createdBy: '',
    id: '',
    name: '',
    metadata: {
      name: '',
      slug: '',
    },
    nftCollectionStats: {},
    services: [],
    categories: [],
    genre: [],
    tags: [],
    tokens: [],
    updatedAt: '',
    updatedBy: '',
  });
  const [slug, setSlug] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v1/api/collection/list?slug=${slug}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        const _transformed = _data;
        setItems(_transformed);
      }
    }
  }, [data]);

  useEffect(() => {
    if (router.query.id) {
      setSlug(String(router.query.id).split('_').join('_'));
    }
  }, [router.query.id]);

  return {
    refresh: mutate,
    data: items,
    setSlug,
    loading: isValidating,
    error,
  };
};

export const useGetCollectionsBySlugV2 = () => {
  const router = useRouter();
  const [items, setItems] = useState<any>({
    active: false,
    contracts: [],
    createdAt: '',
    createdBy: '',
    id: '',
    name: '',
    metadata: {
      name: '',
      slug: '',
    },
    nftCollectionStats: {},
    services: [],
    categories: [],
    genre: [],
    tags: [],
    tokens: [],
    updatedAt: '',
    updatedBy: '',
  });
  const [slug, setSlug] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v2/api/collection/list?slug=${slug}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        const _transformed = _data;
        setItems(_transformed);
      }
    }
  }, [data]);

  useEffect(() => {
    if (router.query.id) {
      setSlug(String(router.query.id).split('_').join('_'));
    }
  }, [router.query.id]);

  return {
    refresh: mutate,
    data: items,
    setSlug,
    loading: isValidating,
    error,
  };
};

export const useGetNftByCollectionId = () => {
  const [items, setItems] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v1/api/nft/list?slug=${collectionId}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data.map((item: any) => {
        const manifest = item?.splNftInfo?.data?.manifest;
        const price =
          item?.price ||
          (item?.external_marketplace_listing &&
            item?.external_marketplace_listing.length &&
            item?.external_marketplace_listing[0].solPrice);
        const external_marketplace_listing_logo = item
          ?.external_marketplace_listing.length
          ? item?.external_marketplace_listing[0]?.marketplace?.logoSrcUrl
          : '';
        return {
          image: manifest?.image,
          brand: manifest?.collection?.name,
          name: manifest?.name,
          description: manifest?.description,
          price,
          tokenAddress: item?.tokenAddress,
          is_listed: item?.external_marketplace_listing?.length,
          external_marketplace_listing: item?.external_marketplace_listing,
          external_marketplace_listing_logo,
        };
      });
      setItems(_transformed);
    }
  }, [data]);

  return {
    setCollectionId,
    collectionId,
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};

export const useGetNftByCollectionIdV2 = () => {
  const [items, setItems] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState('');
  const [limit, setLimit] = useState('200');
  const [filter, setFilter] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v2/api/nft/list?slug=${collectionId}&filter=${filter}&limit=${limit}`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data.map((item: any) => {
        const manifest = item?.splNftInfo?.data?.manifest;
        const price =
          item?.price ||
          (item?.external_marketplace_listing &&
            item?.external_marketplace_listing.length &&
            item?.external_marketplace_listing[0].solPrice);
        const external_marketplace_listing_logo = item
          ?.external_marketplace_listing.length
          ? item?.external_marketplace_listing[0]?.marketplace?.logoSrcUrl
          : '';
        return {
          image: manifest?.image,
          brand: manifest?.collection?.name,
          name: manifest?.name,
          description: manifest?.description,
          price,
          tokenAddress: item?.tokenAddress,
          is_listed: item?.external_marketplace_listing?.length,
          external_marketplace_listing: item?.external_marketplace_listing,
          external_marketplace_listing_logo,
        };
      });
      setItems(_transformed);
    }
  }, [data]);

  return {
    setCollectionId,
    setLimit,
    setFilter,
    collectionId,
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};

export const useGetCarouselV2 = () => {
  const [items, setItems] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/v2/api/carousel/list`,
    fetcher.bind({
      method: 'get',
    }),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      const _transformed = _data.map((item: any) => {
        const manifest = item?.splNftInfo?.data?.manifest;
        const price =
          item?.price ||
          (item?.external_marketplace_listing &&
            item?.external_marketplace_listing.length &&
            item?.external_marketplace_listing[0].solPrice);
        return {
          image: manifest?.image,
          brand: manifest?.collection?.name,
          name: manifest?.name,
          description: manifest?.description,
          price,
          tokenAddress: item?.tokenAddress,
        };
      });
      setItems(_transformed);
    }
  }, [data]);

  return {
    setCollectionId,
    collectionId,
    refresh: mutate,
    data: items,
    loading: isValidating,
    error,
  };
};
