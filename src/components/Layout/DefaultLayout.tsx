import Head from 'next/head';
import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import seo from '../../data/seo';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import HeaderMobile from './HeaderMobile';
import { motion } from 'framer-motion';

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
  const snackbarShow = useAppSelector((state) => state.layout.snackbar.show);
  const snackbarText = useAppSelector((state) => state.layout.snackbar.text);
  const snackbarTitle = useAppSelector((state) => state.layout.snackbar.title);
  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBarPathUpdate = (val: string) => {
    if (val === 'Launchpad') {
      window.open('', '_blank');
    } else {
      router.push(val);
    }
  };

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
        {/* <div style={{ display: windowWidth < 768 ? 'none' : 'block' }}> */}
        <div className="hidden lg:block">
          <Header />
        </div>
        {/* <div style={{ display: windowWidth < 768 ? 'block' : 'none' }}> */}
        <div className="lg:hidden">
          <HeaderMobile
            onNavOpen={() => setSideBarOpen((prev) => !prev)}
            navOpen={sideBarOpen}
          />
        </div>
        <div className="flex mt-[75px] relative">
          <div
            className="fixed top-[75px] w-[225px] flex-shrink-0 z-[100] hidden lg:block"
            // style={{ display: windowWidth < 768 ? 'none' : 'block' }}
          >
            <Sidebar onItemClick={(value) => handleSideBarPathUpdate(value)} />
          </div>
          <motion.div
            variants={sidebarAnimationVariants}
            initial={'close'}
            animate={sideBarOpen ? 'open' : 'close'}
            className="fixed top-0 z-[100000] lg:hidden"
            // style={{ display: windowWidth < 768 ? 'block' : 'none' }}
          >
            <Sidebar
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
            className="mx-auto w-[100vw] lg:w-[calc(100vw-225px)] min-h-[calc(100vh-75px-100px)] lg:ml-[225px] pr-[24px] pl-[24px] lg:pl-0"
            // style={{
            //   width: windowWidth < 768 ? '100vw' : 'calc(100vw - 225px)',
            //   minHeight: 'calc(100vh - 75px - 100px)',
            //   marginLeft: windowWidth < 768 ? 0 : 225,
            //   paddingRight: windowWidth < 768 ? 24 : 24,
            //   paddingLeft: windowWidth < 768 ? 24 : 0,
            // }}
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
