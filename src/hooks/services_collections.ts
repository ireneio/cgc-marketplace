import { useAppDispatch } from '@/store';
import { fetcher } from '@/utils/swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export const useGetCollections = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const { data, error, mutate, isValidating } = useSWR(
    '/api/collection/list',
    fetcher.bind({
      url: '/api/collection/list',
      method: 'get',
    }),
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
      dispatch({ type: 'SET_COLLECTIONS', payload: _transformed });
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
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<any[]>([]);
  const [slug, setSlug] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/api/collection/list?slug=${slug}`,
    fetcher.bind({
      url: '/api/collection/list',
      method: 'get',
    }),
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        const _transformed = _data;
        setItems(_transformed);
        dispatch({
          type: 'SET_CURRENT_COLLECTION',
          payload: {
            ..._transformed,
            metadata: {
              ..._transformed.metadata,
              slug: _transformed?.metadata?.slug,
              id: _transformed.id,
            },
          },
        });
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
    `/api/nft/list?slug=${collectionId}`,
    fetcher.bind({
      url: '/api/collection/list',
      method: 'get',
    }),
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

export const useGetNftByHash = () => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Record<string, any>>({
    image: '',
    brand: '',
    name: '',
    description: '',
    price: '',
    usdPrice: '',
    tokenAddress: '',
    walletAddress: '',
    is_listed: false,
    attributes: [],
    royaltiesPercentage: '',
  });
  const [tokenAddress, setTokenAddress] = useState('');
  const { data, error, mutate, isValidating } = useSWR(
    `/api/nft?tokenAddress=${tokenAddress}`,
    fetcher.bind({
      url: '/api/collection/list',
      method: 'get',
    }),
  );

  useEffect(() => {
    if (data?.success) {
      const _data = data?.data;
      if (Object.keys(_data).length) {
        dispatch({
          type: 'SET_CURRENT_COLLECTION_TOKEN_DATA',
          payload: _data,
        });
        const _transformed = [_data].map((item: any) => {
          const manifest = item?.splNftInfo?.data?.manifest;
          return {
            image: manifest?.image,
            brand: manifest?.collection?.family,
            name: manifest?.name,
            description: manifest?.description,
            price: item?.nftListings?.length
              ? item?.nftListings[0].solPrice
              : '',
            usdPrice: item?.nftListings?.length
              ? item?.nftListings[0].usdPrice
              : '',
            tokenAddress: item?.tokenAddress,
            walletAddress: item?.splNftInfo?.walletAddress,
            is_listed: item?.nftListings?.length,
            attributes:
              manifest?.attributes.map((item: any) => ({
                traitType: item.trait_type,
                value: item.value,
              })) || [],
            royaltiesPercentage:
              manifest?.properties?.seller_fee_basis_points / 100,
          };
        })[0];
        setItems(_transformed);
      }
    }
  }, [data]);

  return {
    setTokenAddress,
    data: items,
    loading: isValidating,
    refresh: mutate,
    error,
  };
};
