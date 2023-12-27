import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletCommon  from '/components/WalletCommon';
import UserLayout from '../layout/UserLayout'
import QRCode from 'qrcode.react';

const Deposit = ({ id }) => {
  
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [wallet, setWalletData] = useState(null)
  const [deposit, setDepositData] = useState(null)
  const [sendState , setSendState] = useState(false)
  const [networkValue , setNetwork] = useState('ETHEREUM_ERC20')
  const param = id;
  const walletData = userService.getWalletOrder()
  
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      setUserData(user);
      walletBalance(user);
      
      
      
    }
    fetchData();

  }, [router])
 const walletBalance = (user , val=networkValue) => {
  setDepositData(false);
      userService.runApi('walletBalance/' ,user).then((d) => {
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
      }).catch((d) => {
        localStorage.removeItem('user')
       router.push('/');
        return null;
      })
     const sendData = {
        "email_address":user.email_address,
        "auth_token":user.auth_token,
        "currency":id,
        "network":val
        }
      userService.runApi('deposit/' ,sendData).then((d) => {
          setDepositData(d.data.depositResponse)
          
           
      }).catch((d) => {
        toast.success('A system error has occurred. Please try reloading the page', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
    }
    const handleUserChange = (event) => {
      const val = event.target.value;
     
      
      setNetwork(val);
      walletBalance(user , val); // Call the walletBalance function with the selected user
    }
    function copyToClipboard(content) {
      setSendState(true)
      navigator.clipboard.writeText(content)
        .then(() => {
          
          toast.success('Content copied to clipboard', {
            position: toast.POSITION.TOP_RIGHT
          });
          setSendState(false)
        })
        .catch((error) => {
          
          toast.success('Error copying content to clipboard', {
            position: toast.POSITION.TOP_RIGHT
          });
          setSendState(false)
        });
    }

    // Redirect to the previous page if the id is 'BUSD'
    useEffect(() => {
        if (id === 'BUSD') {
            router.back();
        }
    }, [id]);
  return (
    <UserLayout>
      {user && wallet && deposit ? (
      <main>
      <WalletCommon wallet={wallet} id={param}/>
      {id === 'USDT' ? (
      <div className="container-fluid px-4">
        <div className="row pe-4 ps-5 pt-5 pb-5">
          <div className="col-sm-12">
          <h4 className="mt-5">
            <b>Network </b>
          </h4>
          
            <div className="mb-3">
              <select
                name="address"
                className={`form-control`}
                id="exampleInputEmail1"
                onChange={handleUserChange}
                value={networkValue}
              >
              <option value={`ETHEREUM_ERC20`}>Ethereum (ERC20)</option>
              <option value={`TRON_TRC20`}>Tron (TRC20)</option>
              <option value={`BNB_SMART_CHAIN_BEP20`}>BNB Smart Chain (BEP20)</option>
              </select>
              <div className='mt-3'>Please ensure that you select the correct network when making a deposit, as selecting the wrong network
may result in loss.
</div>
            </div>
          </div>
        </div>
      </div>) : ''}
      {/*{id === 'BUSD' ? (
      <div className="container-fluid px-4">
        <div className="row pe-4 ps-5 pt-5 pb-5">
          <div className="col-sm-12">
          <h4 className="mt-5">
            <b>Network </b>
          </h4>
          
            <div className="mb-3">
              
              <div className='mt-3'>
                BNB Smart Chain (BEP20)<br/>
                BOS supports only BUSD (BEP20). Please note that depositing tokens from different networks may result in loss.

              </div>
            </div>
          </div>
        </div>
      </div>) : ''}*/}
      {id === 'USDC' ? (
      <div className="container-fluid px-4">
        <div className="row pe-4 ps-5 pt-5 pb-5">
          <div className="col-sm-12">
          <h4 className="mt-5">
            <b>Network </b>
          </h4>
          
            <div className="mb-3">
              
              <div className='mt-3'>
              Ethereum (ERC20)<br/>
              BOS supports only USDC(ERC20).
              Please note that depositing tokens from different networks may result in loss.


              </div>
            </div>
          </div>
        </div>
      </div>) : ''}

      <div className="container-fluid px-4">
        <div className="row pe-4 ps-5 pt-5 pb-5">
          <div className="col-sm-6">
            <div className="row qr">
              <div className="col-sm-5 pb-3">
                {/* <img src="/assets/img/barcode.png" width="85%" /> */}
                <QRCode value={deposit.address} />
              </div>
              <div className="col-sm-6">
                <h5>DEPOSIT QR</h5>
                <p>{deposit.address}</p>
                <button type="button" className="cstm-btn" onClick={() => copyToClipboard(deposit.address)} disabled={sendState}>
                  COPY LINK {sendState && <span className="spinner-border spinner-border-sm mr-1"></span>}
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-5 larg-icon text-end" dangerouslySetInnerHTML={{ __html: walletData[id].icon.replace('%height%', 170).replace('%width%', 170) }}></div>

        </div>
      </div>
    </main>
    
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default Deposit;
export async function getServerSideProps({ params }) {
  return {
      props: { id: params.id }
  }
}
