import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import { toast } from 'react-toastify';
import WalletCommon  from '/components/WalletCommon';
import BtcSell  from '/components/BtcSell';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import UserLayout from '../layout/UserLayout'
const sellPage = ({ id }) => {
  
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [wallet, setWalletData] = useState(null)
  const [allwallet, setAllWalletData] = useState(null)

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
            resd[2].balance = parseFloat(resd[2].balance.replace(',', ''));
            setAllWalletData(resd);
           }
           else
           {
            router.push('/user/dashboard')
           }
      }).catch((d) => {
        localStorage.removeItem('user')
       router.push('/');
        return null;
      })
 
    }
  
    console.log(wallet)
    // Redirect to the previous page if the id is 'BUSD'
    useEffect(() => {
        if (id === 'BUSD') {
            router.back();
        }
    }, [id]);

  return (
    <UserLayout>
      {user && wallet  ? (
      <main>
      <WalletCommon wallet={wallet} id={id} user={user} />
      
      <BtcSell wallet={wallet} id={id} user={user} twofa={twofa} walletData={allwallet}/>
      
    </main>
    
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default sellPage;
export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}
