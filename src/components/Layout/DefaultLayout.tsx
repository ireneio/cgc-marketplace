import Head from 'next/head';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import seo from '../../data/seo';
import { useAppDispatch, useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useWindowWidth } from '@/hooks/window';
import HeaderMobile from './HeaderMobile';
import { motion } from 'framer-motion';
import { SIDE_BAR_ITEMS } from '@/utils/cgcConsts';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const DynamicSnackbar = dynamic(
  () => import('../../components/Shared/Snackbar'),
  { ssr: false },
);

const sidebarAnimationVariants = {
  open: { x: 0 },
  close: { x: '-100%' },
};

const DefaultLayout = ({ children, title }: Props) => {
  const dispatch = useAppDispatch();
  const sideBarPath = useAppSelector((state) => state.layout.navigation.path);
  const snackbarShow = useAppSelector((state) => state.layout.snackbar.show);
  const snackbarText = useAppSelector((state) => state.layout.snackbar.text);
  const snackbarTitle = useAppSelector((state) => state.layout.snackbar.title);
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarPathUpdate = (val: string) => {
    if (val === 'Launchpad') {
      window.open('', '_blank');
    } else {
      router.push(val);
    }
  };

  // useEffect(() => {
  //   let isPathValid = false;
  //   let resultPath = '';
  //   const savedPath = window.localStorage.getItem(SIDEBAR_PATH_STORAGE_KEY);
  //   if (savedPath) {
  //     const _path = JSON.parse(savedPath);
  //     resultPath = _path;
  //     const _arr = _path.split('/');
  //     const _f = SIDE_BAR_ITEMS.find((item) => item.value === _arr[0]);
  //     if (_f && _arr.length > 1 && _f.children && _f.children.length) {
  //       const _fChild = _f.children?.find((item) => item.value === _arr[1]);
  //       if (_fChild) {
  //         isPathValid = true;
  //       }
  //     } else {
  //       isPathValid = true;
  //     }
  //   }
  //   if (isPathValid) {
  //     // TODO
  //     // dispatch({ type: 'SET_NAVIGATION_PATH', payload: resultPath });
  //     // handleSideBarPathUpdate(resultPath);
  //   }
  // }, []);

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
            rel="stylesheet"
            type="text/css"
            href={
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
            }
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
            }
          />
        </Head>
        <DynamicSnackbar
          text={snackbarText}
          show={snackbarShow}
          title={snackbarTitle}
        />
        <div style={{ display: windowWidth < 768 ? 'none' : 'block' }}>
          <Header />
        </div>
        <div style={{ display: windowWidth < 768 ? 'block' : 'none' }}>
          <HeaderMobile
            onNavOpen={() => setSideBarOpen((prev) => !prev)}
            navOpen={sideBarOpen}
          />
        </div>
        <div className="flex mt-[75px] relative">
          <div
            className="fixed top-[75px] w-[225px] flex-shrink-0 z-[100]"
            style={{ display: windowWidth < 768 ? 'none' : 'block' }}
          >
            <Sidebar
              items={SIDE_BAR_ITEMS}
              // currentValue={sideBarPath}
              onItemClick={(value) => handleSideBarPathUpdate(value)}
            />
          </div>
          <motion.div
            variants={sidebarAnimationVariants}
            animate={sideBarOpen ? 'open' : 'close'}
            className="fixed top-0 z-[100000]"
            style={{ display: windowWidth < 768 ? 'block' : 'none' }}
          >
            <Sidebar
              items={SIDE_BAR_ITEMS}
              // currentValue={router.pathname}
              onItemClick={(value) => handleSideBarPathUpdate(value)}
              rootClassName={'static bg-[#13002B] w-[70vw] h-inherit'}
            />
          </motion.div>
          {sideBarOpen && (
            <div
              aria-label="sidebar_mask"
              className="z-[99999] w-[100vw] h-[100vh] absolute top-0 bg-[#000000] opacity-70"
              onClick={() => setSideBarOpen(false)}
            ></div>
          )}
          <div
            className="mx-auto"
            style={{
              width: windowWidth < 768 ? '100vw' : 'calc(100vw - 225px)',
              minHeight: 'calc(100vh - 75px - 100px)',
              marginLeft: windowWidth < 768 ? 0 : 225,
              paddingRight: windowWidth < 768 ? 24 : 24,
              paddingLeft: windowWidth < 768 ? 24 : 0,
            }}
          >
            {children}
          </div>
        </div>
        <div className="w-full relative overflow-x-hidden bg-[#141414] z-[101]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
