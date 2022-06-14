import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(768);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const cb = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', cb);
      window.addEventListener('load', cb);
      return () => {
        window.removeEventListener('resize', cb);
        window.removeEventListener('load', cb);
      };
    }
  });

  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
    }
  }, [router.pathname]);

  return windowWidth;
};

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cb = () => {
      setWindowHeight(window.innerHeight);
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
      setWindowHeight(window.innerHeight);
    }
  }, [router.pathname]);

  return windowHeight;
};
