import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from './providers';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Head>
        <title>Home Page - Synapsis Blog</title>
        <meta name="description" content="This is the homepage of the blog app." />
      </Head>
      <Component {...pageProps} />
    </Providers>
  )
}
