import { fetcher } from '../swr';

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
        client_id: '773124bb-57cf-4eae-a7be-980c76ccd338',
        client_secret: '1qaz2wsx',
        grant_type: 'authorization_code',
      },
    });
    return response;
  },
};

export default api;
