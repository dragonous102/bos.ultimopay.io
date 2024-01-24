import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '/components/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../public/assets/css/cardLoad.module.css';
import RestrictedPage from '/components/RestrictedPage';

function MyApp({ Component, pageProps }) {
  useRouter();
  const [clientIP, setClientIP] = useState('');
  const [ServerIP, setServerIP] = useState('');

  useEffect(() => {
    const fetchServerIP = async () => {
      try {
        const iptestresponse = await fetch('/api/serverIP');
        const result = await iptestresponse.json();
        setServerIP(result.data);
        window.wIPGlobal = result.data;
      } catch (error) {
        console.error('Error fetching iptestresponse:', error);
      }
    };

    fetchServerIP();
  }, []);


  useEffect(() => {
    const fetchClientIP = async () => {
      console.log('GET_IP_URL:', process.env.NEXT_PUBLIC_GET_IP_URL);
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_GET_IP_URL, {
          headers: new Headers({
            'X-Server-IP': ServerIP
          }),
        });
        const data = await response.json();
        setClientIP(data.ip);
      } catch (error) {
        console.error('Error fetching client IP:', error);
      }
    };

    fetchClientIP();
  }, [ServerIP]);

  console.log(clientIP)
  const WrappedComponent = RestrictedPage(Component, clientIP);

  return (
      <>
        <NextNProgress />
        {clientIP ? <WrappedComponent {...pageProps} /> : <Loading />}
        <ToastContainer />
      </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  loading: () => <Loading />,
  ssr: false,
});
