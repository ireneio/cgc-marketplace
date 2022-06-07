import { OAuthContext } from '@/contexts/OAuthProvider';
import api from '@/utils/api';
import { useContext, useEffect, useState } from 'react';

export const useGetCollections = () => {
  const oAuthCtx = useContext(OAuthContext);
  const [items, setItems] = useState<any[]>([]);

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

  return {
    collections: items,
  };
};

export const useGetNftByCollectionId = () => {
  const oAuthCtx = useContext(OAuthContext);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const getData = (token: string) => async (collection_id: string) => {
    setLoading(true);
    const response = await api.getNftListByCollectionId(token, collection_id);
    const map = response.map((item: any) => {
      const manifest = item?.splNftInfo?.data?.manifest;
      return {
        image: manifest?.image,
        brand: manifest?.collection?.name,
        name: manifest?.name,
        price: 0,
        tokenAddress: item?.tokenAddress,
        collection_id: item?.collections[0]?.id,
      };
    });
    setItems(map);
    setLoading(false);
  };

  useEffect(() => {
    if (oAuthCtx.access_token) {
      getData(oAuthCtx.access_token);
    }
  }, [oAuthCtx.access_token]);

  return {
    fn: getData(oAuthCtx.access_token),
    data: items,
    loading,
  };
};
