import Head from 'next/head';
import { useEffect, useLayoutEffect } from 'react';
import Footer from '../Shared/Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import seo from '../../data/seo';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const DynamicSnackbar = dynamic(
  () => import('../../components/Shared/Snackbar'),
  { ssr: false },
);

export const BASE_SIDEBAR_PATH = 'Home';
export const SIDEBAR_PATH_STORAGE_KEY = 'navigation_path';

const SIDE_BAR_ITEMS = [
  {
    text: 'Home',
    value: 'Home',
    icon: '/img/icon_home.png',
  },
  {
    text: 'Explore',
    value: 'Explore',
    icon: '/img/icon_compass.png',
    children: [
      { text: 'All', value: 'All' },
      { text: 'Latest', value: 'Latest' },
      { text: 'Popular', value: 'Popular' },
    ],
  },
  { text: 'Sell', value: 'Sell', icon: '/img/icon_sell.png' },
  {
    text: 'Launchpad',
    value: 'Launchpad',
    icon: '/img/icon_rocket.png',
  },
  {
    text: 'Cart',
    value: 'Cart',
    icon: '/img/icon_cart.png',
  },
  {
    text: 'Transactions',
    value: 'Transactions',
    icon: '/img/icon_bar.png',
  },
  {
    text: 'Latest Sales',
    value: 'Latest Sales',
    icon: '/img/icon_dollar.png',
  },
];

const DefaultLayout = ({ children, title }: Props) => {
  const dispatch = useAppDispatch();
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);
  const snackbarShow = useAppSelector((state) => state.layout.snackbar.show);
  const snackbarText = useAppSelector((state) => state.layout.snackbar.text);
  const snackbarTitle = useAppSelector((state) => state.layout.snackbar.title);

  const router = useRouter();

  const handleSideBarPathUpdate = (val: string) => {
    dispatch({ type: 'SET_NAVIGATION_PATH', payload: val });
    if (val === 'Home' || val.includes('Explore')) {
      router.push('/');
    } else if (val === 'Launchpad') {
      router.push('/launchpad');
    }
  };

  useLayoutEffect(() => {
    let isPathValid = false;
    let resultPath = '';
    const savedPath = window.localStorage.getItem(SIDEBAR_PATH_STORAGE_KEY);
    if (savedPath) {
      const _path = JSON.parse(savedPath);
      resultPath = _path;
      const _arr = _path.split('/');
      const _f = SIDE_BAR_ITEMS.find((item) => item.value === _arr[0]);
      if (_f && _arr.length > 1 && _f.children && _f.children.length) {
        const _fChild = _f.children?.find((item) => item.value === _arr[1]);
        if (_fChild) {
          isPathValid = true;
        }
      } else {
        isPathValid = true;
      }
    }
    if (isPathValid) {
      // TODO
      dispatch({ type: 'SET_NAVIGATION_PATH', payload: resultPath });
      // handleSideBarPathUpdate(resultPath);
    }
  }, []);

  // TODO temp:load sign in state from storage
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      dispatch({ type: 'SET_USER_EMAIL', payload: JSON.parse(email) });
    }
  }, []);

  return (
    <>
      <div className="min-h-[100vh] bg-[#0C001C] max-w-[100vw] overflow-x-hidden">
        <Head>
          <title>{title ? title : seo.title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="canonical" href={seo.siteUrl} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content={seo.ogSiteName} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title ? title : seo.ogTitle} />
          <meta property="og:description" content={seo.ogDescription} />
          <meta property="og:url" content={seo.ogUrl} />
          <meta property="og:image" content={seo.ogImageUrl} />
          <meta property="og:image:secure_url" content={seo.ogImageSecureUrl} />
          <meta property="og:image:width" content={seo.ogImageWidth} />
          <meta property="og:image:height" content={seo.ogImageHeight} />
          <meta property="twitter:card" content={seo.twitterCard} />
          <meta property="twitter:site" content={seo.twitterSite} />
          <meta property="twitter:domain" content={seo.twitterDomain} />
          <meta property="twitter:title" content={seo.twitterTitle} />
          <meta
            property="twitter:description"
            content={seo.twitterDescription}
          />
          <meta property="twitter:creator" content={seo.twitterCreator} />
          <meta property="twitter:image" content={seo.twitterImage} />
          <link rel="icon" href={seo.linkIcon32x32} sizes="32x32" />
          <link rel="icon" href={seo.linkIcon192x192} sizes="192x192" />
          <link rel="apple-touch-icon" href={seo.linkIconAppleTouchIcon} />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <DynamicSnackbar
          text={snackbarText}
          show={snackbarShow}
          title={snackbarTitle}
        />
        <Header />
        <div className="flex mt-[75px] relative">
          <div className="w-[200px] top-0 left-0 hidden md:block">
            <Sidebar
              items={SIDE_BAR_ITEMS}
              currentValue={sideBarPath}
              onItemClick={(value) => handleSideBarPathUpdate(value)}
            />
          </div>
          <div className="flex-1">
            <div className="px-[24px] pb-[24px] max-w-[80vw] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative z-[4] overflow-x-hidden">
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
