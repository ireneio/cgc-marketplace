import api from '@/utils/api';
import { isResponseError } from '@/utils/swr';
import React, { useEffect, useState } from 'react';

interface ICtx {
  access_token: string;
  expiry_access_date: number;
  refreshToken: string;
  token_type: string;
}

interface ICtxFn extends ICtx {
  getToken: () => string;
}

const CtxDefaultValue: ICtx = {
  access_token: '',
  expiry_access_date: 0,
  refreshToken: '',
  token_type: 'Bearer',
};

export const OAuthContext = React.createContext<ICtxFn>({
  ...CtxDefaultValue,
  getToken: () => '',
});

export const OAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<ICtx>(CtxDefaultValue);

  const initGrant = async () => {
    const data = await api.getAuthToken();
    if (!isResponseError(data)) {
      setAuth(data);
    } else {
      setAuth({
        access_token: '',
        expiry_access_date: 0,
        refreshToken: '',
        token_type: 'Bearer',
      });
    }
  };

  useEffect(() => {
    initGrant();
  }, []);

  const getToken = () => {
    return auth.access_token;
  };

  return (
    <OAuthContext.Provider value={{ ...auth, getToken }}>
      {children}
    </OAuthContext.Provider>
  );
};
