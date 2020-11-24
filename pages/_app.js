import Head from 'next/head';
import '../public/custom_styles.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
