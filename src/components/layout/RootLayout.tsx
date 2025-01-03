import React from 'react';
import { Layout } from 'antd';
import Head from 'next/head';
import Header from '@/components/Header';

const { Content, Footer } = Layout;

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen mx-auto bg-transparent max-w-7xl px-4 pt-12 pb-4 sm:px-6 lg:px-8">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="An example Next.js app with a root layout." />
      </Head>
      
      <div className='mb-4'>
        <Header />
      </div>
    
      <Content>
        {children}
      </Content>

      <Footer className='bg-transparent mt-4 text-center'>© {new Date().getFullYear()} Synapsis Blog. All rights reserved.</Footer>
    </Layout>
  );
};

export default RootLayout;
