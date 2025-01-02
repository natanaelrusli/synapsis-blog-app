import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="A blog that will enchance your knowledge about synapsis." />
        <meta name="keywords" content="Synapsis Blog" />
        <meta name="author" content="Nata Nael" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
