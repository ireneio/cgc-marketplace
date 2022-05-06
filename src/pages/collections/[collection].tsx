import { NextPage } from 'next';
import Layout from '@/components/Shared/Layout';
import seo from '@/data/seo';
import CollectionHero from '@/components/Hero/CollectionHero';

const Collection: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <CollectionHero />
    </Layout>
  );
};

export default Collection;
