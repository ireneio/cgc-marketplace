import { OAuthContext } from '@/contexts/OAuthProvider';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

export interface SavedPathType {
  type: 'route' | 'sidebar' | '';
  sideBarValue?: string;
  path: string;
}

const withAuth = (Component: (props: any) => JSX.Element) => {
  const AuthHelper = (props: any) => {
    const dispatch = useAppDispatch();
    const oAuthCtx = useContext(OAuthContext);
    const router = useRouter();
    const [savedPath, setSavedPath] = useState<SavedPathType>({
      type: '',
      sideBarValue: '',
      path: '',
    });

    useEffect(() => {
      if (oAuthCtx.isDoneGrant) {
        const authorised = oAuthCtx.authorized();
        if (authorised) {
          return;
        } else {
          const fallbackPath = props.fallbackPath;
          if (fallbackPath) {
            router.push(fallbackPath);
          } else if (savedPath) {
            if (savedPath.type === 'sidebar' && savedPath.sideBarValue) {
              dispatch({
                type: 'SET_NAVIGATION_PATH',
                payload: savedPath.sideBarValue,
              });
            }
            router.push(savedPath.path);
          } else {
            router.push('/');
          }
        }
      }
    }, [oAuthCtx.isDoneGrant, router.pathname]);

    useEffect(() => {
      if (!oAuthCtx.isLoggedIn && oAuthCtx.isDoneGrant) {
        router.push('/');
      }
    }, [oAuthCtx.isLoggedIn, oAuthCtx.isDoneGrant]);

    return <Component {...props} setSavedPath={setSavedPath} />;
  };

  return AuthHelper;
};

export default withAuth;
