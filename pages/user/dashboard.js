import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from './layout/UserLayout';
import DataTable from '/components/DataTable';




const Dashboard = () => {

  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [wallet, setWalletData] = useState(null)
  const [reportData, setReportData] = useState([])
  const [activeReport, setactive] = useState(1)
  const [col, setCol] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [cardBalance, setCardBalance] = useState(0)
  const [pendingTotal, setPendingTotal] = useState(0)
  const reportcol = [
    {
      Header: 'Date/Time(UTC)',
      accessor: 'created_date',
    },
    {
      Header: 'Type',
      accessor: 'type',
    },
    {
      Header: 'Coin',
      accessor: 'currency',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];
  const loadcol = [
    {
      Header: 'Date/Time(UTC)',
      accessor: 'datetime',
    },
   
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];
  const activitycol = [
    {
      Header: 'Date/Time(UTC)',
      accessor: 'datetime',
    },
   
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Out(USD)',
      accessor: 'money_out',
    },
    {
      Header: 'In(USD)',
      accessor: 'money_in',
    },
    {
      Header: 'Balance(USD)',
      accessor: 'post_balance',
    },
  ];
  const [showModal, setShowModal] = useState(true);
  const getCardBalance = (userr) => {
    delete userr.wallet;
    delete userr.expires_in;
        userService.runApi('cardBalance/' , userr).then((d) => {
              const resd = d.data.cardBalanceResponse;
              // console.log('jinhjik'.d.data);
              console.log('jinhjik'.resd);
              // resd.balance = parseFloat(resd.balance.replace(',', ''));
              // resd.balance=0+23770.01;
              var gN=resd.balance;
              setCardBalance(resd.balance);
              
             
        }).catch((d) => {
          console.log(d);
          setCardBalance(0.0);
          // localStorage.removeItem('user')
          // router.push('/');
          return null;
        })
   
      }
  function getReport(type , userr) { 
    setisLoading(true)
    let newcol = reportcol;
    if(type == 4)
    {
      return getLoad(type , userr)
    } 
    if(type != 2)
    {
      newcol = newcol.filter(col => col.accessor !== 'address');
    } 
    
    if(type == 3)
    {
      newcol = newcol.map(col => col.accessor === 'type' ? { Header: 'Type', accessor: 'side' } : col);
      newcol = newcol.map(col => {
        if (col.accessor === 'amount') {
          return {
            ...col,
            Cell: ({ value, row }) => {
              const { amount, currency, tx_amount , side} = row.original;
              if (side === 'Buy') {
                return (
                  <>
                    Buy {amount} {currency}
                    <br />
                    Paid amount {tx_amount.toFixed(2)} USD
                  </>
                );
              } else if (side === 'Sell') {
                return (
                  <>
                    Sell {amount} {currency}
                    <br />
                    Received amount {tx_amount.toFixed(2)} USD
                  </>
                );
              } else {
                return value;
              }
            },
          };
        }
        return col;
      });
    } 
    
    if(type == 5)
    {
      return getCardTransaction(type , userr)
    } 
    
    userr.type = type;
    userr.currency = 'USDT,BTC,USDC,BUSD';
    // user.status = '1';
    userService.runApi("getReport/", userr)
    .then((res) => {
      console.log(res)
      setCol(newcol);
      setReportData(res.data.reportResponse);
      setactive(type)
      setisLoading(false)
     
    })
}
            
  function getLoad(type , userr , is_first=0) { 
    
    
    userService.runApi("cardLoadHistory/", userr)
    .then((res) => {
      console.log(res)
      if(is_first ==0)
      {
        setReportData(res.data.cardLoadHistoryResponse);
        setactive(type)
        setCol(loadcol)
        setisLoading(false)
      }
      
      const transactions = res.data.cardLoadHistoryResponse;
      const pendingAmounts = transactions.filter(transaction => transaction.status === "PENDING");
      const pT = pendingAmounts.reduce((total, transaction) => total + parseFloat(transaction.amount), 0).toFixed(2);
      setPendingTotal(pT)
    })
}
            
  function getCardTransaction(type , userr) { 
    
  
    userService.runApi("cardTransaction/", userr)
    .then((res) => {
      console.log(res)
      setReportData(res.data.cardTransactionResponse.transaction_history);
      setactive(type)
      setCol(activitycol)
      setisLoading(false)
    })
}

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
     
      const loggegedtime1 = localStorage.getItem('loginTime')
      const loggegedtime = new Date(loggegedtime1); 
      
      const currentTime1 = Date().toLocaleString();
      const currentTime = new Date(currentTime1);

      const timeDifferenceInMillis = currentTime - loggegedtime;
     
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      console.log("msdlkmlkm");

      const expiresInMillis = localStorage.getItem('expires_second');
      const timeDifference =timeDifferenceInMillis/ 1000;

    
      console.log(expiresInMillis);
      console.log(timeDifference);
      
      if (timeDifference > expiresInMillis) {
       
       
      const Signout = () => {
        userService.runApi('signout/' ,user).then((d) => {
            localStorage.removeItem('user')
         
            console.log("Token has expired. You need to log in again.");
            // router.refresh();
            router.push('/');
          
        })
      }
      Signout();
        console.log("Token has expired. You need to log in again.");
       
     
      }else{
        console.log("Token is valid.");
      }

      
      setUserData(user);
      walletBalance(user);
      getCardBalance(user)
      getLoad(1 , user , 1)
      getReport(activeReport , user);
      setCol(reportcol)
      console.log(wallet)
 
    }
    fetchData();

  }, [router])
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
 
 const walletBalance = (user) => {
      userService.walletBalance(user).then((d) => {
           console.log(d.data.wallet)
           const resd = d.data.wallet;
           const order = userService.getCurrencyOrder();
           console.log(resd)
            // Sort the array using the order
            resd.sort((a, b) => order.indexOf(a.currency) - order.indexOf(b.currency));
            resd[2].balance = parseFloat(resd[2].balance.replace(',', ''));
            resd[1].balance = parseFloat(resd[1].balance.replace(',', ''));
            resd[0].balance = parseFloat(resd[0].balance.replace(',', ''));
            resd[3].balance = parseFloat(resd[3].balance.replace(',', ''));
            resd[4].balance = parseFloat(resd[4].balance.replace(',', ''));

           setWalletData(resd);
           
      }).catch((d) => {
        localStorage.removeItem('user')
        router.push('/');
        return null;
      })
    }
    function toFixed(num, decimalPlaces) {
      const multiplier = Math.pow(10, decimalPlaces);
      return Math.round(num * multiplier) / multiplier;
    }
  return (
    <UserLayout>
      {user && wallet ? (
      <main>
  <div className="container-fluid px-4 pt-5">
    <div className="row pe-4 ps-4 justify-content-start">
    <div className="col-xl-3 col-md-6 col-frm p-2">
        <div className="main-frm">
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
          <p className="ttl-p text-start mb-0">US DOLLAR</p>

              <p className="p-0 m-0 amount-p">
                <b>{wallet ? numberWithCommas((Math.floor(wallet[2].balance * 100) / 100).toFixed(2)) : (<i>loading..</i>)}</b>
                <br />
                <font>USD</font>

                
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
            <div className="icon_d">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-currency-dollar"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
            </div>
            </div>
            {pendingTotal > 0 ? 
            <div className="col-md-12">
                <br />
                <p>Pending Load</p>
                <b style={{ color: "blue" }}>{pendingTotal}</b>
                <br />
                <font>USD</font>
            </div>
            : '' }
          </div>
          <div className="row p-3 pt-0 amount-box">
            {/* <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href="#">
                Buy Crypto
              </Link>
            </div>
           
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href="#">
                Load to Card 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href="#">
                Transfer 
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 col-frm p-2">
        <div className="main-frm">
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
            <p className="ttl-p text-start mb-0">CARD</p>
              <p className="p-0 m-0 amount-p">
              
              {/* <b>{cardBalance.toFixed(2)}</b> */}
              <b>{cardBalance}</b>
              
                <br />
                <font>USD</font>
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
            <div className="icon_d">
              <i className='bi bi-credit-card'></i>
            </div>
            </div>
          </div>
          <div className="row p-3 pt-0 amount-box">
            
            
           
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href="/user/card/load">
                Load 
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      </div>

      <div className="row pe-4 ps-4 mt-3">
      <div className="col-xl-3 col-md-6 col-frm p-2 ">
        <div className="main-frm">
          
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
            <p className="ttl-p text-start mb-0">BITCOIN</p>
              <p className="p-0 m-0 amount-p">
                <b>{wallet ?  Number(wallet[1].balance).toFixed(8) : (<i>loading..</i>)}</b>
                <br />
                <font>BTC</font>
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
            <div className="icon_d">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-currency-bitcoin"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
              </svg>
            </div>
            </div>
          </div>
          <div className="row p-3 pt-0 amount-box">
            <div className="col-sm-12 mb-2">
              <Link  className="cstm-lbl" href={`/user/deposit/${wallet ? wallet[1].currency : ''}`}>
                Deposit 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/withdraw/${wallet ? wallet[1].currency : ''}`}>
                Withdraw 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/buy/${wallet ? wallet[1].currency : ''}`}>
                Buy 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/sell/${wallet ? wallet[1].currency : ''}`}>
                Sell 
              </Link>
            </div>
            {/* <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/load-card/${wallet ? wallet[1].currency : ''}`}>
                Load to Card 
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6 col-frm p-2">
        <div className="main-frm">
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
          <p className="ttl-p text-start mb-0">TETHER</p>

              <p className="p-0 m-0 amount-p">
                <b>{wallet ? Number(wallet[0].balance).toFixed(6) : (<i>loading..</i>)}</b>
                <br />
                <font>USDT</font>
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
             <div className="icon_d">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="25" height="25"
              viewBox="0 0 24 24">
              <path d="M 12 1 C 5.935 1 1 5.935 1 12 C 1 18.065 5.935 23 12 23 C 18.065 23 23 18.065 23 12 C 23 5.935 18.065 1 12 1 z M 12 3 C 16.963 3 21 7.038 21 12 C 21 16.963 16.963 21 12 21 C 7.038 21 3 16.963 3 12 C 3 7.038 7.038 3 12 3 z M 7 7 L 7 9 L 11 9 L 11 10.048828 C 8.7935403 10.157378 6 10.631324 6 12 C 6 13.368676 8.7935403 13.842622 11 13.951172 L 11 18 L 13 18 L 13 13.951172 C 15.20646 13.842622 18 13.368676 18 12 C 18 10.631324 15.20646 10.157378 13 10.048828 L 13 9 L 17 9 L 17 7 L 7 7 z M 11 11.027344 L 11 12 L 13 12 L 13 11.027344 C 15.42179 11.151768 16.880168 11.700988 17.003906 11.978516 C 16.863906 12.334516 15.021 13 12 13 C 8.978 13 7.1360937 12.335484 6.9960938 12.021484 C 7.1198324 11.706835 8.5777007 11.152269 11 11.027344 z"></path>
              </svg>
              </div>

            </div>
          </div>
          <div className="row p-3 pt-0 amount-box">
            <div className="col-sm-12 mb-2">
            <Link className="cstm-lbl" href={`/user/deposit/${wallet ? wallet[0].currency : ''}`}>
                Deposit 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
            <Link className="cstm-lbl" href={`/user/withdraw/${wallet ? wallet[0].currency : ''}`}>
                Withdraw 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/buy/${wallet ? wallet[0].currency : ''}`}>
                Buy 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/sell/${wallet ? wallet[0].currency : ''}`}>
                Sell 
              </Link>
            </div>
            {/* <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/load-card/${wallet ? wallet[0].currency : ''}`}>
                Load to Card 
              </Link>
            </div> */}
          </div>
        </div>
      </div>
     
      <div className="col-xl-3 col-md-6 col-frm p-2">
        <div className="main-frm">
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
          <p className="ttl-p text-start mb-0">USDC</p>
              <p className="p-0 m-0 amount-p">
                <b>{wallet ?  Number(Math.floor(wallet[3].balance * 1000000) / 1000000).toFixed(6) : (<i>loading..</i>)}</b>
                <br />
                <font>USDC </font>
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
            <div className="icon_d">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  
              width={20}
              height={20} 
              fill="currentColor"
              className="bi bi-currency-bitcoin"
              viewBox="0 0 256.000000 256.000000">

                <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M920 2271 c-211 -79 -389 -217 -509 -395 -389 -576 -136 -1355 517 -1590 l72 -26 0 98 0 97 -60 23 c-142 56 -296 184 -388 325 -262 402 -149 944 251 1205 42 28 104 61 137 74 l60 23 0 97 c0 54 -1 98 -2 98 -2 -1 -37 -14 -78 -29z"/>
                <path d="M1552 2204 l3 -95 58 -24 c244 -99 433 -314 509 -580 33 -116 33 -334 0 -450 -76 -266 -265 -481 -509 -580 l-58 -24 -3 -95 c-1 -53 0 -96 2 -96 3 0 42 13 87 30 645 235 895 1013 509 1585 -122 180 -300 319 -509 395 -45 17 -84 30 -87 30 -2 0 -3 -43 -2 -96z"/>
                <path d="M1188 1904 l-3 -87 -40 -12 c-93 -28 -179 -95 -219 -173 -46 -90 -41 -195 15 -272 54 -74 144 -117 321 -150 105 -20 168 -47 192 -82 45 -64 19 -156 -57 -198 -34 -20 -56 -24 -117 -24 -117 0 -185 47 -205 142 l-7 32 -95 0 -96 0 6 -54 c7 -70 36 -124 92 -174 43 -38 143 -82 187 -82 15 0 18 -12 20 -87 l3 -88 87 -3 87 -3 3 87 3 87 52 13 c76 20 123 46 170 96 81 89 105 220 57 316 -50 101 -159 163 -338 193 -133 23 -159 32 -191 71 -42 50 -28 134 28 171 63 41 179 41 237 -2 37 -27 70 -80 70 -112 l0 -29 91 0 92 0 -6 54 c-11 109 -94 215 -201 255 l-51 19 -3 91 -3 91 -89 0 -89 0 -3 -86z"/>
                </g>
              </svg>
            </div>
            </div>
          </div>
          <div className="row p-3 pt-0 amount-box">
            <div className="col-sm-12 mb-2">
              <Link  className="cstm-lbl" href={`/user/deposit/${wallet ? wallet[3].currency : ''}`}>
                Deposit 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/withdraw/${wallet ? wallet[3].currency : ''}`}>
                Withdraw 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/buy/${wallet ? wallet[3].currency : ''}`}>
                Buy 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/sell/${wallet ? wallet[3].currency : ''}`}>
                Sell 
              </Link>
            </div>
            {/* <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/load-card/${wallet ? wallet[1].currency : ''}`}>
                Load to Card 
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      {/*<div className="col-xl-3 col-md-6 col-frm p-2">
        <div className="main-frm">
          <div className="row p-3 align-items-center">
            <div className="col-sm-6 col-6">
          <p className="ttl-p text-start mb-0">BUSD</p>
              <p className="p-0 m-0 amount-p">
                <b>{wallet ?  Number(Math.floor(wallet[4].balance * 1000000) / 1000000).toFixed(6) : (<i>loading..</i>)}</b>
                <br />
                <font>BUSD </font>
              </p>
            </div>
            <div className="col-sm-6 text-end col-6">
            <div className="icon_d">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  
              width={20}
              height={20} 
              fill="currentColor"
              className="bi bi-currency-bitcoin"
              viewBox="0 0 512.000000 512.000000">

                <g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M2465 4640 c-11 -5 -276 -265 -590 -579 l-570 -571 0 -45 0 -45 215 -215 216 -215 44 0 45 0 577 578 578 577 0 49 0 49 -197 199 c-109 110 -210 206 -225 214 -30 16 -63 17 -93 4z"/>
                <path d="M3295 3805 c-17 -8 -470 -455 -1007 -993 -1059 -1060 -1012 -1007 -975 -1078 19 -35 392 -407 426 -424 14 -7 38 -9 60 -5 32 5 157 127 1022 993 728 728 988 994 991 1015 11 60 -2 79 -181 260 -97 99 -192 192 -213 208 -45 36 -84 44 -123 24z"/>
                <path d="M905 3079 c-32 -18 -405 -391 -422 -423 -31 -58 -18 -76 210 -304 213 -212 213 -212 257 -212 l44 0 213 213 213 213 0 48 0 49 -197 199 c-109 110 -210 206 -225 214 -32 17 -65 18 -93 3z"/>
                <path d="M3133 1987 l-993 -992 0 -49 0 -49 198 -199 c108 -110 209 -206 224 -214 15 -8 42 -14 60 -14 30 0 111 78 1025 992 1059 1059 1022 1018 993 1087 -6 16 -103 119 -214 230 l-203 201 -49 0 -49 0 -992 -993z"/>
                </g>
              </svg>
              
            </div>
            </div>
          </div>
          <div className="row p-3 pt-0 amount-box">
            <div className="col-sm-12 mb-2">
              <Link  className="cstm-lbl" href={`/user/deposit/${wallet ? wallet[4].currency : ''}`}>
                Deposit 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/withdraw/${wallet ? wallet[4].currency : ''}`}>
                Withdraw 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/buy/${wallet ? wallet[4].currency : ''}`}>
                Buy 
              </Link>
            </div>
            <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/sell/${wallet ? wallet[4].currency : ''}`}>
                Sell 
              </Link>
            </div>
             <div className="col-sm-12 mb-2">
              <Link className="cstm-lbl" href={`/user/load-card/${wallet ? wallet[1].currency : ''}`}>
                Load to Card 
              </Link>
            </div>
          </div>
        </div>
      </div>*/}
      
    </div>
  </div>
  <div className="container-fluid px-4 all-rw">
    <div className="row pe-4 ps-4 mt-5 pb-4">
      <div className="col-sm-12">
        <label>ALL TIME TRANSACTION HISTORY</label>
      </div>
    </div>
  </div>
  <div className="container-fluid px-4">
    <div className="row pe-4 ps-4 mt-4 pb-4 all-btn">
      <div className="col-sm-12">
        <label className="me-2">
          <button type="button" onClick={() => getReport(1 , user)} className={`cstm-btn ${activeReport == 1 ? 'activ' : ''} `}>
            Deposit
          </button>
        </label>
        <label className="me-2">
          <button type="button" onClick={() => getReport(2 , user)} className={`cstm-btn ${activeReport == 2 ? 'activ' : ''} `}>
            Withdraw
          </button>
        </label>
        <label className="me-2">
          <button type="button" onClick={() => getReport(3 , user)} className={`cstm-btn ${activeReport == 3 ? 'activ' : ''} `}>
            Exchange
          </button>
        </label>
        <label className="me-2">
          <button type="button" onClick={() => getReport(4 , user)} className={`cstm-btn ${activeReport == 4 ? 'activ' : ''} `}>
            Load
          </button>
        </label>
        <label className="me-2">
          <button type="button" onClick={() => getReport(5 , user)} className={`cstm-btn ${activeReport == 5 ? 'activ' : ''} `}>
            Card Activities
          </button>
        </label>
      </div>
      <div className="col-sm-12 mt-5">
        {isLoading ?  <p>Loading...</p> : 
        <DataTable data={reportData} col={col} />
        }
      </div>
    </div>
  </div>
</main>
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default withAuth(Dashboard)