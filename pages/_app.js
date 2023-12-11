import NextNProgress from 'nextjs-progressbar';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '/components/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestrictedPage from '/components/RestrictedPage';
import axios from '/lib/axios';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [clientIP, setClientIP] = useState('');
  const [ServerIP, setServerIP] = useState('');

  
  useEffect(() => {
    const fetchServerIP = async () => {
      
      try {
        const iptestresponse = await fetch('/api/serverIP');
        const result = await iptestresponse.json();
        setServerIP(result.data);
        window.wIPGlobal = result.data;

        // console.error('iptestresponse:', result.data);
      } catch (error) {
        console.error('Error fetching iptestresponse:', error);
      }
      
    };

    fetchServerIP();
  }, []);


  useEffect(() => {
    const fetchClientIP = async () => {

      try {
        const response = await fetch('https://dev-bos.ultimopay.io/bos_pdf_api/get_ip.php', {
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
