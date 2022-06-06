import axios, { Method } from 'axios';

export const API_URL =
  process.env.API_URL || ' https://dev-api.catheongaming.com';

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
      .then((res) => res.data)
      .catch((err) => err);
  } else {
    return apiInstance
      .request({
        method: 'get',
        url: config,
      })
      .then((res) => res.data)
      .catch((err) => err);
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
  const _data = data;
  if (_data.isAxiosError) {
    return true;
  }
  return false;
};
