import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import { toast } from 'react-toastify';
import CardWallet  from '/components/CardWallet';
import CardLoad  from '/components/CardLoad';
import 'react-toastify/dist/ReactToastify.css';

import UserLayout from '../layout/UserLayout'
const loadPage = () => {
  
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [wallet, setWalletData] = useState(null)
  const [allwallet, setAllWalletData] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [kycStatus, setKycStatus] = useState(0)
  const [pendingTotal, setPendingTotal] = useState(0)
  
  const walletBalance = (user) => {
    userService.runApi('walletBalance/' , user).then((d) => {
          const resd = d.data.wallet
          const order = userService.getCurrencyOrder();
          
          // Sort the array using the order
          resd.sort((a, b) => order.indexOf(a.currency) - order.indexOf(b.currency));
          
          resd[2].balance = parseFloat(resd[2].balance.replace(',', ''));
          setAllWalletData(resd);
         
    }).catch((d) => {
      localStorage.removeItem('user')
     router.push('/');
      return null;
    })

  }
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      setUserData(user);
      cardBalance(user);
      walletBalance(user);
      getUserInfo(user)
      console.log(wallet)
      getUserStatus(user)
      getLoad(user)
    }
    fetchData();

  }, [router])
  const getUserStatus = (userrr ) => {
    delete userrr.expires_in;
    delete userrr.wallet;
    setKycStatus(0)
    userService.getUserStatus(userrr , 'status').then((d) => {
         console.log(d)
          setKycStatus(d)
          //setKycStatus(4)
         
    }).catch((d) => {
    
      
    })
  }
 const cardBalance = (user) => {
  delete user.wallet;
  delete user.expires_in;
      userService.runApi('cardBalance/' , user).then((d) => {
            const resd = d.data.cardBalanceResponse
            resd.balance = parseFloat(resd.balance.replace(',', ''));
            setWalletData(resd);
           
      }).catch((d) => {
        console.log(d);
        setWalletData({"balance" : 0.0});
        // localStorage.removeItem('user')
        // router.push('/');
        return null;
      })
 
    }
    function getLoad(userr) { 
    
    
      userService.runApi("cardLoadHistory/", userr)
      .then((res) => {
        console.log('cardloadhistory' , res.data.cardLoadHistoryResponse)
        // Calculate the sum of the amounts with a "PENDING" status
        const transactions = res.data.cardLoadHistoryResponse;
        const pendingAmounts = transactions.filter(transaction => transaction.status === "PENDING");
        const pT = pendingAmounts.reduce((total, transaction) => total + parseFloat(transaction.amount), 0).toFixed(2);
       setPendingTotal(pT)
      })
  }
    const getUserInfo = (userrr) => {
      delete userrr.expires_in;
      delete userrr.wallet;
      userService.runApi(`userInfo/` , userrr).then((d) => {
           console.log('user_info' , d.data.userInfoResponse)
           const resd = d.data.userInfoResponse;
           setUserInfo(resd);
           //setTimeout(openModal, 2000)
      }).catch((d) => {
        console.log(d)
        
      })
    }
  
    console.log(wallet)
  return (
    <UserLayout>
      {user && wallet && allwallet && userInfo ? (
      <main>
        {kycStatus == 4 ? (<>
      <CardWallet wallet={wallet}  user={user} />
      
      <CardLoad wallet={wallet}  user={user} pendingTotal={pendingTotal} allwallet={allwallet} userInfo={userInfo}/>
      </>
      ): (
        <div className="col-md-7 mx-auto mt-5">

          <div className="card mx-auto" >
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">Load Money to debit card </h3>
                  <p className="card-text text-center">You do not have any debit card ready for use.</p>
                  <div className="d-flex justify-content-center">
                  
                    <Link href={`/user/card-issue`} className="cstm-btn ">Issue a Debit card </Link>
                  </div>
                </div>
              </div>
          </div>
      )}
    </main>
    
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default loadPage;
