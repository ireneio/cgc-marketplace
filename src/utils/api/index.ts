import { API_URL, fetcher } from '../swr';

const CLIENT_ID = API_URL.includes('dev')
  ? '773124bb-57cf-4eae-a7be-980c76ccd338'
  : '';
const CLIENT_SECRET = API_URL.includes('dev') ? '1qaz2wsx' : '';

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
  getCollection: async (token: string) => {
    const response = await fetcher({
      url: '/api/collection/list',
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};

export default api;
