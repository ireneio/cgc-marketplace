import type { NextPage } from 'next';
import Layout from '@/components/Shared/Layout';
import seo from '../data/seo';

const Explore: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <div>test</div>
    </Layout>
  );
};

export default Explore;
