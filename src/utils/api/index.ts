import { API_URL, fetcher } from '../swr';

const CLIENT_ID = API_URL.includes('dev')
  ? '773124bb-57cf-4eae-a7be-980c76ccd338'
  : process.env.CLIENT_ID || '';
const CLIENT_SECRET = API_URL.includes('dev')
  ? '1qaz2wsx'
  : process.env.CLIENT_SECRET || '';

const api = {
  healthCheck: async () => {
    const response = await fetcher({ url: '/', method: 'get' });
    console.log(response);
    return response;
  },
  getAuthToken: async () => {
    const response = await fetcher({
      url: '/api/oauth2/token',
      method: 'post',
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
      },
    });
    return response;
  },
  login: async (email: string, password: string) => {
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
    return response;
  },
  getCollectionById: async (token: string, slug: string) => {
    const response = await fetcher({
      url: `/api/collection/list?slug=${slug}`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
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
    return response;
  },
};

export default api;
