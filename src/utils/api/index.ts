import { fetcher } from '../swr';

const api = {
  healthCheck: async () => {
    const response = await fetcher({ url: '/', method: 'get' });
    console.log('API Health: ', response);
    return response;
  },
  login: async (email: string, password: string) => {
    return await fetcher({
      url: '/api/user/login',
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
    const response = await fetcher({
      url: '/api/user/register',
      method: 'post',
      data: {
        email,
        password,
        walletAddress,
      },
    });

    return response;
  },
  getCollectionList: async (token: string) => {
    const response = await fetcher({
      url: '/api/collection/list',
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getCollectionById: async (token: string, slug: string) => {
    const response = await fetcher({
      url: `/api/collection/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getTokenListByCollectionId: async (token: string, slug: string) => {
    return await fetcher({
      url: `/api/token/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getNftListByCollectionId: async (token: string, slug: string) => {
    const response = await fetcher({
      url: `/api/nft/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getNftListByHash: async (token: string, hash: string) => {
    const response = await fetcher({
      url: `/api/nft?hash=${hash}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getTokenList: async (token: string) => {
    const response = await fetcher({
      url: `/api/token/list`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api;
