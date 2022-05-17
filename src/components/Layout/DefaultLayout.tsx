import Head from 'next/head';
import { useState } from 'react';
import Footer from '../Shared/Footer';
import Header from './Header';
import Sidebar from './Sidebar';

import seo from '../../data/seo';

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const DefaultLayout = ({ children, title }: Props) => {
  const [currentSideBarValue, setCurrentSideBarValue] = useState('Explore');

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
        </Head>
        <Header />
        <div className="flex mt-[75px]">
          <div style={{ flexBasis: '20%' }}>
            <Sidebar
              items={[
                {
                  text: 'Explore',
                  value: 'Explore',
                  icon: '/img/icon_home.png',
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
              ]}
              currentValue={currentSideBarValue}
              onItemClick={(value) => setCurrentSideBarValue(value)}
            />
          </div>
          <div style={{ flexBasis: '80%' }}>
            <div className="px-[24px] pb-[24px] max-w-[80vw]">{children}</div>
          </div>
        </div>
      </div>
      <div className="w-full relative z-[4]">
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
