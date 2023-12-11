import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import { toast } from 'react-toastify';
import WalletCommon  from '/components/WalletCommon';
import BtcWithdraw  from '/components/BtcWithdraw';
import UsdtWithdraw  from '/components/UsdtWithdraw';
import UsdcWithdraw  from '/components/UsdcWithdraw';
import BusdWithdraw  from '/components/BusdWithdraw';
import 'react-toastify/dist/ReactToastify.css';

import UserLayout from '../layout/UserLayout'
const withdrawPage = ({ id }) => {
  
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [wallet, setWalletData] = useState(null)
  const [deposit, setDepositData] = useState(null)
  const [sendState , setSendState] = useState(false)
  const [twofa, setTwofaData] = useState(null)

  const walletData = userService.getWalletOrder()
  
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      setUserData(user);
      walletBalance(user);
      check2FA(user)
      console.log(wallet)
      
    }
    fetchData();

  }, [router])
  const check2FA = (user) => {
    userService.runApi('check2FA/' , user).then((d) => {
         console.log(d)
         setTwofaData(d.data['2FAStatus'].status);
         
    })
  }
 const walletBalance = (user) => {
      userService.runApi('walletBalance/' , user).then((d) => {
            const resd = d.data.wallet
            const order = userService.getCurrencyOrder();
            
            // Sort the array using the order
            resd.sort((a, b) => order.indexOf(a.currency) - order.indexOf(b.currency));
           if(walletData[id])
           {
            walletData[id].data = resd[walletData[id].key]
            setWalletData(walletData[id]);
           }
           else
           {
            router.push('/user/dashboard')
           }
      })
     const sendData = {
        "email_address":user.email_address,
        "auth_token":user.auth_token,
        "currency":id,
        "network":"BNB_SMART_CHAIN_BEP20"
        }
      userService.runApi('deposit/' , sendData).then((d) => {
          setDepositData(d.data.depositResponse)
           console.log(d.data.depositResponse)
           
      })
    }
  
    console.log(wallet)
  return (
    <UserLayout>
      {user && wallet && deposit ? (
      <main>
      <WalletCommon wallet={wallet} id={id} user={user} />
      {id == 'BTC' ? (

      <BtcWithdraw wallet={wallet} id={id} user={user} twofa={twofa} />
      ) :''}
      {id == 'USDT' ? (<UsdtWithdraw wallet={wallet} id={id} user={user} twofa={twofa} />):''}
      {id == 'USDC' ? (<UsdcWithdraw wallet={wallet} id={id} user={user} twofa={twofa} />):''}
      {id == 'BUSD' ? (<BusdWithdraw wallet={wallet} id={id} user={user} twofa={twofa} />):''}
    </main>
    
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default withdrawPage;
export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}
