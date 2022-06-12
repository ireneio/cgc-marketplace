import { useAppDispatch, useAppSelector } from '@/store';
import React, { useCallback, useEffect, useState } from 'react';

interface ICtx {
  access_token: string;
  expired_at: number;
  refresh_token: string;
  token_type: string;
  id: number | string;
  isDoneGrant: boolean;
  isLoggedIn: boolean;
}

interface ICtxFn extends ICtx {
  getToken: () => string;
  authorized: () => boolean;
  successLogin: (
    access_token: string,
    expired_at: number,
    token_type: string,
    id: number | string,
  ) => void;
  logout: () => void;
}

const CtxDefaultValue: ICtx = {
  access_token: '',
  expired_at: 0,
  refresh_token: '',
  token_type: 'Bearer',
  id: 0,
  isDoneGrant: false,
  isLoggedIn: false,
};

export const OAuthContext = React.createContext<ICtxFn>({
  ...CtxDefaultValue,
  getToken: () => '',
  authorized: () => false,
  successLogin: () => null,
  logout: () => null,
});

const EMPTY_PAYLOAD = {
  access_token: '',
  expired_at: 0,
  refresh_token: '',
  token_type: 'Bearer',
  id: 0,
};

export const OAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userInfo);
  const [isDoneGrant, setIsDoneGrant] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initGrant = async () => {
    const auth = localStorage.getItem('auth') ?? '';
    if (auth !== '') {
      const value = JSON.parse(auth);
      const payload = {
        access_token: value['access_token'],
        expired_at: value['expired_at'],
        refresh_token: value['refresh_token'],
        token_type: 'Bearer',
        id: value?.id,
      };
      dispatch({ type: 'SET_USER_INFO', payload });
      setIsLoggedIn(true);
    } else {
      dispatch({ type: 'SET_USER_INFO', payload: EMPTY_PAYLOAD });
    }
  };

  useEffect(() => {
    initGrant().then(() => {
      setIsDoneGrant(true);
    });
  }, []);

  const getToken = () => {
    return user.access_token;
  };

  const authorized = useCallback(() => {
    return user.access_token !== '';
  }, [user.access_token]);

  const successLogin = (
    access_token: string,
    expired_at: number,
    token_type: string,
    id: number | string,
  ) => {
    const payload = {
      access_token: access_token,
      expired_at: expired_at,
      token_type: token_type,
      refresh_token: '',
      id,
    };
    const result = JSON.stringify(payload);
    window.localStorage.setItem('auth', result.toString());
    dispatch({ type: 'SET_USER_INFO', payload });
    setIsDoneGrant(true);
    setIsLoggedIn(true);
  };

  const logout = () => {
    window.localStorage.setItem('auth', '');
    dispatch({ type: 'SET_USER_INFO', payload: EMPTY_PAYLOAD });
    setIsLoggedIn(false);
  };

  return (
    <OAuthContext.Provider
      value={{
        ...user,
        getToken,
        authorized,
        successLogin,
        logout,
        isDoneGrant,
        isLoggedIn,
      }}
    >
      {children}
    </OAuthContext.Provider>
  );
};
