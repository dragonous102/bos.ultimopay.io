import React from 'react';

const allowedIPs = [
  '60.139.58.168',
  '2400:2650:aa0:2600:4f7:95f6:99f6:4abf',
  '119.228.17.206',
  '115.162.214.222',
  '121.85.112.59',
  '112.198.254.19',
  '182.18.197.19',
  '110.54.190.8',
  '108.244.95.67',
  '174.193.52.37',
  '108.244.95.67',
  '27.5.45.213',
];

const RestrictedPage = (PageComponent, clientIP) => {
  const WithIPCheck = ({ ...pageProps }) => {
    const allowed = allowedIPs.includes(clientIP);
    console.log(clientIP);
    // if (!allowed) {
    //   return <div>Access Denied</div>;
    // }

    return <PageComponent {...pageProps} />;
  };

  WithIPCheck.getInitialProps = async (ctx) => {
    const { req } = ctx;
    const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

    return {
      ...pageProps,
    };
  };

  return WithIPCheck;
};

export default RestrictedPage;
