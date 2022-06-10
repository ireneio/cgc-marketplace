import api from '@/utils/api';
import { isResponseError } from '@/utils/swr';
import React, { useEffect, useState } from 'react';

interface ICtx {
  access_token: string;
  expired_at: number;
  refresh_token: string;
  token_type: string;
}

interface ICtxFn extends ICtx {
  getToken: () => string;
  authorised: () => boolean;
  successLogin: (
    access_token: string,
    expired_at: number,
    token_type: string,
  ) => void;
  logout: () => void;
}

const CtxDefaultValue: ICtx = {
  access_token: '',
  expired_at: 0,
  refresh_token: '',
  token_type: 'Bearer',
};

export const OAuthContext = React.createContext<ICtxFn>({
  ...CtxDefaultValue,
  getToken: () => '',
  authorised: () => false,
  successLogin: () => null,
  logout: () => null,
});

export const OAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<ICtx>(CtxDefaultValue);

  const initGrant = async () => {
    const auth = localStorage.getItem('auth') ?? '';
    if (auth !== '') {
      const value = JSON.parse(auth);
      setAuth({
        access_token: value['access_token'],
        expired_at: value['expired_at'],
        refresh_token: value['refresh_token'],
        token_type: 'Bearer',
      });
    } else {
      setAuth({
        access_token: '',
        expired_at: 0,
        refresh_token: '',
        token_type: 'Bearer',
      });
    }
  };

  useEffect(() => {
    initGrant().then();
  }, []);

  const getToken = () => {
    return auth.access_token;
  };

  const authorised = () => {
    return auth.access_token !== '';
  };

  const successLogin = (
    access_token: string,
    expired_at: number,
    token_type: string,
  ) => {
    setAuth({
      access_token: access_token,
      expired_at: expired_at,
      token_type: token_type,
      refresh_token: '',
    });
    const result = JSON.stringify({
      access_token: access_token,
      expired_at: expired_at,
      token_type: token_type,
      refresh_token: '',
    });
    localStorage.setItem('auth', result.toString());
  };

  const logout = () => {
    setAuth({
      access_token: '',
      expired_at: 0,
      refresh_token: '',
      token_type: 'Bearer',
    });
    localStorage.setItem('auth', '');
  };

  return (
    <OAuthContext.Provider
      value={{ ...auth, getToken, authorised, successLogin, logout }}
    >
      {children}
    </OAuthContext.Provider>
  );
};
