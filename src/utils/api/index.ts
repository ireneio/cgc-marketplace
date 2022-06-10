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
  getCollectionById: async (token: string, id: string) => {
    const response = await fetcher({
      url: `/api/collection/list?collection_id=${id}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  getNftListByCollectionId: async (token: string, id: string) => {
    const response = await fetcher({
      url: `/api/nft/list?collection_id=${id}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api;
