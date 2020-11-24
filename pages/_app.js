import Head from 'next/head';
import '../public/custom_styles.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/studyo-front/favicon.png"
        />
        <title>Studyo</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
