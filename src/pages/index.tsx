import type { NextPage } from 'next';
import Layout from '@/components/Shared/Layout';
import seo from '../data/seo';
import LandingHero from '@/components/Hero/LandingHero';
import Collection from '@/components/Collection/Collection';
import { testData } from '@/data/test';

const Home: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <LandingHero />
      <Collection
        title="Recently Added"
        collections={testData.recentlyAddedCollections}
      />
      <Collection
        title="Continue Exploring"
        collections={testData.personalisedCollections}
      />
    </Layout>
  );
};

export default Home;
