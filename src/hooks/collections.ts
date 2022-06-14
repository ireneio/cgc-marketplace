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
    try {
      const response = await api.getCollectionList(oAuthCtx.access_token);
      const map =
        response && response.length
          ? response.map((item: any) => {
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
            })
          : [];
      dispatch({ type: 'SET_COLLECTIONS', payload: map });
      setItems(map);
    } catch {
      return;
    }
  };

  useEffect(() => {
    setLoading(true);
    getCollections()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      setSlug(String(router.query.id));
    }
  }, [router.query.id]);

  const getCollectionData = async () => {
    try {
      const response = await api.getCollectionBySlug(
        oAuthCtx.access_token,
        slug.split('_').join('_'),
      );
      if (response) {
        setItems(response);
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
    } catch {
      return;
    }
  };

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getCollectionData()
        .then(() => {
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  return {
    refresh: getCollectionData,
    data: items,
    setSlug,
    loading,
  };
};

export const useGetNftByCollectionId = () => {
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const getData = (token: string) => async (collection_id: string) => {
    try {
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
                description: manifest?.description,
                price:
                  item?.price ||
                  (item?.external_marketplace_listing &&
                    item?.external_marketplace_listing.length &&
                    item?.external_marketplace_listing[0].solPrice),
                tokenAddress: item?.tokenAddress,
                is_listed: item?.external_marketplace_listing?.length,
                external_marketplace_listing:
                  item?.external_marketplace_listing,
                external_marketplace_listing_logo: item
                  ?.external_marketplace_listing.length
                  ? item?.external_marketplace_listing[0]?.marketplace
                      ?.logoSrcUrl
                  : '',
              };
            })
          : [];

      setItems(map);
      setLoading(false);
    } catch {
      setLoading(false);
      return;
    }
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

export const useGetNftByHash = () => {
  const dispatch = useAppDispatch();
  const oAuthCtx = useContext(OAuthContext);
  const [loading, setLoading] = useState(false);
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

  const getData = (token: string) => async (hash: string) => {
    try {
      setLoading(true);
      const response = await api.getNftListByTokenAddress(token, hash);
      if (response?.data) {
        dispatch({
          type: 'SET_CURRENT_COLLECTION_TOKEN_DATA',
          payload: response?.data,
        });
      }
      const transformed =
        response && Object.keys(response).length
          ? [response].map((item: any) => {
              const manifest = item?.splNftInfo?.data?.manifest;
              return {
                image: manifest?.image,
                brand: manifest?.collection?.name,
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
            })[0]
          : {};

      setItems(transformed);
      setLoading(false);
    } catch {
      setLoading(false);
    }
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
