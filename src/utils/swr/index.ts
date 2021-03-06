import axios, { Method } from 'axios';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL === undefined
    ? 'https://dev-api.catheongaming.com'
    : process.env.NEXT_PUBLIC_API_URL;

console.log('[env] API_URL', API_URL);

export const apiInstance = axios.create({
  baseURL: API_URL,
});

interface _FetcherConfig {
  method: Method;
  url: string;
  query?: Record<string, string | number | boolean>;
  data?: any;
  headers?: any;
}

export type FetcherConfig = _FetcherConfig | string;

export const fetcher = (config: FetcherConfig) => {
  if (typeof config !== 'string') {
    const { method, url, query, ...rest } = config;
    return apiInstance
      .request({
        method,
        url,
        params: query,
        ...rest,
      })
      .then((res) => {
        return {
          success: true,
          message: 'success',
          data: res.data,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          message: err.response.data?.message,
          data: {},
        };
      });
  } else {
    return apiInstance
      .request({
        method: 'get',
        url: config,
      })
      .then((res) => {
        return {
          success: true,
          message: 'success',
          data: res.data,
        };
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          message: err.response.data?.message,
          data: {},
        };
      });
  }
};

export const checkResponseError = (data: any) => {
  const _data = data;
  if (_data.isAxiosError) {
    return [];
  }
  return _data;
};

export const isResponseError = (data: any) => {
  return !!data.isAxiosError;
};
