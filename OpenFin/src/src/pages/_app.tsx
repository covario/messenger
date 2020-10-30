import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import React from 'react';

import '../styles/styles.scss';

import { store } from '../redux/configureStore';

export default ({ Component, pageProps }: AppProps): JSX.Element => {
  let isOpenFin = false;
  if (typeof window !== 'undefined') {
    isOpenFin = 'fin' in window;
  }

  return (
    <Provider store={store}>
      <>
        <Head>
          <title>Covario Chat Application</title>

          <link rel="icon" href="/favicon.ico" />

          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {(isOpenFin && <Component {...pageProps} />) || (
          <div className="page-index" style={{ color: 'white' }}>
            Please use OpenFin
          </div>
        )}
      </>
    </Provider>
  );
};
