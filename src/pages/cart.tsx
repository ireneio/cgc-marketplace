import type { NextPage } from 'next';
import Layout from '@/components/Shared/Layout';
import seo from '../data/seo';

const Cart: NextPage = () => {
  return (
    <Layout title={seo.title}>
      <div>test</div>
    </Layout>
  );
};

export default Cart;
