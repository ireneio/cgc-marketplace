import { OAuthContext } from '@/contexts/OAuthProvider';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

const withAuth = (Component: () => JSX.Element) => {
  const AuthHelper = () => {
    const oAuthCtx = useContext(OAuthContext);
    const router = useRouter();

    useEffect(() => {
      const authorised = oAuthCtx.authorized();
      if (authorised) {
        return;
      } else {
        router.push('/');
        // const fallbackPath = Component().props.fallbackPath;
        // if (fallbackPath) {
        //   router.push(fallbackPath);
        // } else {
        //   router.push('/');
        // }
      }
    }, [oAuthCtx.access_token, router.pathname]);

    return <Component />;
  };

  return AuthHelper;
};

export default withAuth;
