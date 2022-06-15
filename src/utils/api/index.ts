import { fetcher } from '../swr';

const api = {
  healthCheck: async () => {
    const response = await fetcher({ url: '/v1', method: 'get' });
    console.log('API Health: ', response);
    return response;
  },
  healthCheckV2: async () => {
    const response = await fetcher({ url: '/v2', method: 'get' });
    console.log('API Health V2: ', response);
    return response;
  },
  login: async (email: string, password: string) => {
    return await fetcher({
      url: '/v1/api/user/login',
      method: 'post',
      data: {
        email,
        password,
      },
    });
  },
  register: async ({
    email,
    password,
    walletAddress,
  }: {
    email: string;
    password: string;
    walletAddress: string;
  }) => {
    return await fetcher({
      url: '/v1/api/user/register',
      method: 'post',
      data: {
        email,
        password,
        walletAddress,
      },
    });
  },
  filterNFTsByCollection: async (
    collection_id: string,
    nftAccounts: Array<any>,
  ) => {
    return await fetcher({
      url: '/v1/api/nft/filterbycollection',
      method: 'post',
      data: {
        collection_id: collection_id,
        nfts: nftAccounts,
      },
    });
  },
  getCollectionList: async () => {
    return await fetcher({
      url: '/v1/api/collection/list',
      method: 'get',
    });
  },
  getCollectionBySlug: async (token: string, slug: string) => {
    const response = await fetcher({
      url: `/api/collection/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getCollectionById: async (id: number) => {
    return await fetcher({
      url: `/v1/api/collection/list?collection_id=${id}`,
      method: 'get',
    });
  },
  getTokenListByCollectionId: async (token: string, slug: string) => {
    return await fetcher({
      url: `/v1/api/token/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getNftListByCollectionId: async (token: string, slug: string) => {
    const response = await fetcher({
      url: `/v1/api/nft/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getNftListByTokenAddress: async (token: string, tokenAddress: string) => {
    const response = await fetcher({
      url: `/v1/api/nft?tokenAddress=${tokenAddress}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getTokenList: async (token: string) => {
    const response = await fetcher({
      url: `/v1/api/token/list`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api;
