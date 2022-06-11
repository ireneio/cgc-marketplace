import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cb = () => {
      setWindowWidth(window.innerWidth);
      // setWindowWidth(window.document.documentElement.getElementsByTagName('body')[0].clientWidth)
    };
    window.addEventListener('resize', cb);
    window.addEventListener('load', cb);
    return () => {
      window.removeEventListener('resize', cb);
      window.removeEventListener('load', cb);
    };
  });

  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
    }
  }, [router.pathname]);

  return windowWidth;
};
