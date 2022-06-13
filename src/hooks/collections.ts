import { OAuthContext } from '@/contexts/OAuthProvider';
import { useAppDispatch } from '@/store';
import api from '@/utils/api';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export const useGetCollections = () => {
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getCollections = async () => {
    setLoading(true);
    const response = await api.getCollectionList(oAuthCtx.access_token);
    const map = response.map((item: any) => {
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
    dispatch({ type: 'SET_COLLECTIONS', payload: map });
    setItems(map);
    setLoading(false);
  };

  useEffect(() => {
    getCollections().then();
  }, []);

  return {
    refresh: getCollections,
    data: items,
    loading,
  };
};

export const useGetCollectionsBySlug = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [items, setItems] = useState<any[]>([]);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (router.query.id) {
      setSlug(String(router.query.id));
    }
  }, [router.query.id]);

  const getCollectionData = async () => {
    const response = await api.getCollectionBySlug(
      oAuthCtx.access_token,
      slug.split('_').join('_'),
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

  useEffect(() => {
    if (slug) {
      getCollectionData().then();
    }
  }, [slug]);

  return {
    refresh: getCollectionData,
    data: items,
    setSlug,
  };
};

export const useGetNftByCollectionId = () => {
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const getData = (token: string) => async (collection_id: string) => {
    setLoading(true);
    const response = await api.getNftListByCollectionId(token, collection_id);
    if (response?.data) {
      dispatch({
        type: 'SET_CURRENT_COLLECTION_TOKEN_DATA',
        payload: response?.data,
      });
    }
    const map =
      response && response.length
        ? response.map((item: any) => {
            const manifest = item?.splNftInfo?.data?.manifest;
            return {
              image: manifest?.image,
              brand: manifest?.collection?.name,
              name: manifest?.name,
              price: 0,
              tokenAddress: item?.tokenAddress,
              collection_id: item?.collections[0]?.id,
              is_listed: item?.external_marketplace_listing?.length,
              external_marketplace_listing: item?.external_marketplace_listing,
              external_marketplace_listing_logo: item
                ?.external_marketplace_listing.length
                ? item?.external_marketplace_listing[0]?.logoSrcUrl
                : '',
            };
          })
        : [];

    setItems(map);
    setLoading(false);
  };

  useEffect(() => {
    getData(oAuthCtx.access_token);
  }, []);

  return {
    getData: getData(oAuthCtx.access_token),
    data: items,
    loading,
    refresh: getData(oAuthCtx.access_token),
  };
};
