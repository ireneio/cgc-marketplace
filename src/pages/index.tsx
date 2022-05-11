import type { NextPage } from 'next';
import Layout from '@/components/Shared/Layout';
import seo from '../data/seo';
import Hero from '@/components/Shared/Hero';
import { testData } from '@/data/test';
import CollectionRow from '@/components/Shared/CollectionRow';

const Home: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <Hero
        heroTitle={testData.landingHeroTitle}
        heroSubtitle={testData.landingHeroSubtitle}
        heroButtons={testData.landingHeroButtons}
        heroBackground={testData.landingHeroBackground}
        heroLogo={testData.landingHeroLogo}
      />
      <CollectionRow
        heading={'Recently Added'}
        collections={testData.recentlyAddedCollections}
      />
    </Layout>
  );
};

export default Home;
