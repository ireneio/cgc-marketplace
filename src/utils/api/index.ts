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
  register: async (email: string, password: string) => {
    const response = await fetcher({
      url: '/api/user',
      method: 'post',
      data: {
        email,
        password,
      },
    });
    return response;
  },
  getCollectionList: async (token: string) => {
    const response = await fetcher({
      url: '/api/collection/list?latest',
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
    const response = await fetcher({
      url: `/api/token/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
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
};

export default api;
