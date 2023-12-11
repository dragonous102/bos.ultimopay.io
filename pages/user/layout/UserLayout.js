import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import withAuth from '/hooks/withAuth';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';

const UserLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUserData] = useState(null)

  const [kycStatus, setKycStatus] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMoble] = useState(0)
  const [mystyle, setStyle] = useState({})
  const [kycData, setKycData] = useState([]);
  console.log(router.pathname)


 
  const isDashboardPage = router.pathname === '/user/dashboard'
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    const y = localStorage.getItem('user')
    const userser = JSON.parse(y)
    const user = userser.res.data.signinResponse
      setUserData(user);
    console.log(user)
    getUserStatus(user);
  }, [router])
  const getUserStatus = (userrr ) => {
    delete userrr.expires_in;
    delete userrr.wallet;
    setKycStatus(0)
    userService.getUserStatus(userrr , 'both').then((d) => {
         console.log(d)
         setKycStatus(d.status)
         
         setKycData(d.data)
       
         
    }).catch((d) => {
    
      
    })
  }
  



    const Signout = () => {
      userService.runApi('signout/' ,user).then((d) => {
          localStorage.removeItem('user')
          cookie.remove('user', { path: '/' });

          router.push('/')
        
      })
    }

    function changeclass(){

      if(isMobile==0){
        setStyle({
          transform: "translateX(0px)"
        })
        setIsMoble(1);
      } else {
        setStyle({})
        setIsMoble(0);
      }

      console.log(isMobile);

    }

    return (
      <>
      <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Bos</title>
      
      <link href="/assets/css/inner.css" type="text/css" rel="stylesheet" />
      <link rel="stylesheet" type="text/css" href="/assets/css/cstm.css" />
      <link
        href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"></link>
       <link rel="icon" href="/assets/img//bos_favicon.png" />
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" ></script>
      
        <script src="/assets/js/scripts.js"></script>
      </Head>
      {isLoading  ? <div className="loader"></div> : <>

      <input type="hidden" id='UltimopayAffRefId'/>
      <nav className="sb-topnav navbar navbar-expand navbar-dark p-0">
        <div className="col-sm-3 p-0 logo-sec text-start text-md-center">
          {/* Navbar Brand*/}
          <Link className="navbar-brand " href="/">
            <img src="/assets/img/logo.png" width="150px" />{" "}
          </Link>
          {/* Navbar*/}
        </div>
        <div className="col-xl-8 col-md-6 ps-0 ps-sm-2 py-3 py-sm-0">
          {/* Sidebar Toggle*/}
          <div className="d-flex align-items-center">
          {/*<img src="/assets/img/redio.png" width="20px;" className="me-3" />*/}
          {kycStatus == 0  ? <>

            <label className="mt-1 me-3 label_font ">
              Immediately issue a card and recieve a debit card.
            </label>
              <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
                Issue card
              </Link>
          </> : ''}

          {kycStatus == 1  ? <>
            <label className="mt-1 me-3 label_font">
              Your KYC is now checked. You will recieve your results within 24 hours.
            </label>
            <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
                Check Your KYC
              </Link>
          </> : ''}
          
          {kycStatus == 9  ? <>
            <label className="mt-1 me-3 label_font text-danger">
              Your KYC was not approved. Please check your email for the reason for the rejection. Please check the content and try again
            </label>
            <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
                Try Again
              </Link>
          </> : ''}
          
          {kycStatus == 2  ? <>
            <label className="mt-1 me-3 label_font">
              Your KYC has been approved. Please pay the card issuance fee of $600
            </label>
              <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
              Pay Fee
              </Link>
          </> : ''}
          {kycStatus == 3  ? <>
            <label className="mt-1 me-3 label_font">
            Your card fee has been paid. create your card. Your Debit Card is now on production. Expect the card delivered to your postal address in 10-15 days.
            </label>
              <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
              Activate it
              </Link>
          </> : ''}
          {kycStatus == 5  ? <>
            <label className="mt-1 me-3 label_font">
            Your card activation documents are currently under review. Please wait 2-3 days for the review process to be completed.
            </label>
            <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
              Review it
            </Link>
          </> : ''}
          {kycStatus == 19  ? <>
            <label className="mt-1 me-3 label_font text-danger">
            Unfortunately, your card activation documents have not been approved. Please review the requirements and resubmit the necessary documents for further review.
            </label>
            <Link href={`/user/card-issue`} className="cstm-btn custom_nw_cls">
              Review it
              </Link>
          </> : ''}
          {kycStatus == 4  ? <>
            <label className="mt-1 me-3 label_font">
            Let's load and use your debit card.
            </label>
            <Link href={`/user/card/load`} className="cstm-btn custom_nw_cls">
              Load
              </Link>
          </> : ''}
          {/* {kycStatus == 3  ? <>
            <label className="mt-1 me-3 label_font">
            Your Debit Card was produced. Expect the card delivered to your postal address in 10-15 days. Please activate it when you received it

            </label>
            <label className="">
              <a href="#" className="cstm-btn custom_nw_cls">
                Activate
              </a>
            </label>
          </> : ''} */}
          </div>
          {kycStatus == 4  ? '' : <>
          <div className='row mt-1 m-0'>
            <div className={`col active`}>
              <div className='step_number'>
                1
              </div>
              <div className='step_info'>
              <Link href={`/user/card-issue`} >
                Update Your Profile
                </Link>
              </div>
            </div>
            
            <div className={`col ${kycStatus == 1 || kycStatus == 2 || kycStatus == 3 || kycStatus == 4 || kycStatus == 5 || kycStatus == 19 ? 'active' : ''} ${ kycStatus == 9 ? 'error' : ''}`}>
              <div className='step_number'>
                2
              </div>
              <div className='step_info'>
              <Link href={`/user/card-issue`} >
                
                Check Your KYC
                </Link>
              </div>
            </div>
            
            <div className={`col ${kycStatus == 2 || kycStatus == 3 || kycStatus == 4 || kycStatus == 5 || kycStatus == 19 ? 'active' : ''}`}>
              <div className='step_number'>
                3
              </div>
              <div className='step_info'>
              <Link href={`/user/card-issue`} >

                Pay Card Fee
                </Link>
              </div>
            </div>
            
            <div className={`col ${kycStatus == 3 || kycStatus == 4 || kycStatus == 5 || kycStatus == 19 ? 'active' : ''} `}>
              <div className='step_number'>
                4
              </div>
              <div className='step_info'>
              <Link href={`/user/card-issue`} >

                Post Debit Card
                </Link>
              </div>
            </div>
            
            <div className={`col ${ kycStatus == 4 || kycStatus == 5  ? 'active' : ''} ${ kycStatus == 19 ? 'error' : ''}`}>
              <div className='step_number'>
                5
              </div>
              <div className='step_info'>
              <Link href={`/user/card-issue`} >

                Card Activation
                </Link>
              </div>
            </div>
            
          </div>
          </> }
          
        </div>
        <div
          className="col-sm-1 text-end pe-5 right-menus"
          style={{ display: "flex", justifyContent: "right" }}
        >
          <div className="dropdown">
            <a href="#" role="button" id="user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="/assets/img/user.png" width="50px" alt="User Image" />
            </a>
            <ul className="dropdown-menu" aria-labelledby="user-dropdown">
              <li><Link className="dropdown-item" href={`/user/profile`}>My Profile</Link></li>
              <li><Link className="dropdown-item" href={`/user/my-card`}>My Card</Link></li>
              <li><Link className="dropdown-item" href={`/user/affiliates/my-links`}>My Links</Link></li>
              <li><Link className="dropdown-item" href={`/user/affiliates/my-commissions`}>My Commissions</Link></li>
              <li><a className="dropdown-item" href="#" onClick={Signout}>Logout</a></li>
            </ul>
          </div>

          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!" 
            onClick={changeclass}
          >
            <img
              src="/assets/img/bar.png"
              width="20px"
              style={{ filter: "invert(1)" }}
            />{" "}
          </button>
        </div>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav" style={mystyle}>
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <Link className="nav-link" href="/user/dashboard">
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-house-door" />{" "}
                  </div>
                  <font className="pt-1">Dashboard</font>
                </Link>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages1"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-wallet2" />
                  </div>
                  <font className="pt-1">Wallet</font>
                  <div className="sb-sidenav-collapse-arrow mt-1">
                    <i className="bi bi-chevron-down fs-5" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages1"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth"
                    >
                     <svg 
                     xmlns="http://www.w3.org/2000/svg" 
                     width="20" 
                     height="20" 
                     fill="currentColor" 
                     className="bi bi-currency-bitcoin mx-2" 
                     viewBox="0 0 16 16">
                    <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z"></path>
                    </svg>
                      Bitcoin
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="bi bi-chevron-down fs-5" />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" href={`/user/deposit/BTC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Deposit 
                      </Link>
                      <Link className="nav-link" href={`/user/withdraw/BTC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Withdraw 
                      </Link>
                      <Link className="nav-link" href={`/user/buy/BTC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Buy 
                      </Link>
                      <Link className="nav-link" href={`/user/sell/BTC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Sell 
                      </Link>
                      </nav>
                    </div>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages2"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth2"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"
                       x="0px" y="0px" 
                       width="25" 
                       height="25" 
                       fill="currentColor" 
                       className=" mx-2" 
                       viewBox="0 0 24 24">
                      <path d="M 12 1 C 5.935 1 1 5.935 1 12 C 1 18.065 5.935 23 12 23 C 18.065 23 23 18.065 23 12 C 23 5.935 18.065 1 12 1 z M 12 3 C 16.963 3 21 7.038 21 12 C 21 16.963 16.963 21 12 21 C 7.038 21 3 16.963 3 12 C 3 7.038 7.038 3 12 3 z M 7 7 L 7 9 L 11 9 L 11 10.048828 C 8.7935403 10.157378 6 10.631324 6 12 C 6 13.368676 8.7935403 13.842622 11 13.951172 L 11 18 L 13 18 L 13 13.951172 C 15.20646 13.842622 18 13.368676 18 12 C 18 10.631324 15.20646 10.157378 13 10.048828 L 13 9 L 17 9 L 17 7 L 7 7 z M 11 11.027344 L 11 12 L 13 12 L 13 11.027344 C 15.42179 11.151768 16.880168 11.700988 17.003906 11.978516 C 16.863906 12.334516 15.021 13 12 13 C 8.978 13 7.1360937 12.335484 6.9960938 12.021484 C 7.1198324 11.706835 8.5777007 11.152269 11 11.027344 z"></path>
                      </svg>
                      TETHER
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="bi bi-chevron-down fs-5" />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth2"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages2"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" href={`/user/deposit/USDT`}>
                      <i className="bi bi-circle fs-6 me-2" /> Deposit 
                      </Link>
                      <Link className="nav-link" href={`/user/withdraw/USDT`}>
                      <i className="bi bi-circle fs-6 me-2" /> Withdraw 
                      </Link>
                      <Link className="nav-link" href={`/user/buy/USDT`}>
                      <i className="bi bi-circle fs-6 me-2" /> Buy 
                      </Link>
                      <Link className="nav-link" href={`/user/sell/USDT`}>
                      <i className="bi bi-circle fs-6 me-2" /> Sell 
                      </Link>
                      </nav>
                    </div>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesUsdc"
                      aria-expanded="false"
                      aria-controls="pagesUsdc"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  
                        width={25}
                        height={25} 
                        fill="currentColor"
                        className="bi bi-currency-bitcoin  mx-2"
                        viewBox="0 0 256.000000 256.000000">

                          <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#fffff" stroke="none">
                          <path d="M920 2271 c-211 -79 -389 -217 -509 -395 -389 -576 -136 -1355 517 -1590 l72 -26 0 98 0 97 -60 23 c-142 56 -296 184 -388 325 -262 402 -149 944 251 1205 42 28 104 61 137 74 l60 23 0 97 c0 54 -1 98 -2 98 -2 -1 -37 -14 -78 -29z"/>
                          <path d="M1552 2204 l3 -95 58 -24 c244 -99 433 -314 509 -580 33 -116 33 -334 0 -450 -76 -266 -265 -481 -509 -580 l-58 -24 -3 -95 c-1 -53 0 -96 2 -96 3 0 42 13 87 30 645 235 895 1013 509 1585 -122 180 -300 319 -509 395 -45 17 -84 30 -87 30 -2 0 -3 -43 -2 -96z"/>
                          <path d="M1188 1904 l-3 -87 -40 -12 c-93 -28 -179 -95 -219 -173 -46 -90 -41 -195 15 -272 54 -74 144 -117 321 -150 105 -20 168 -47 192 -82 45 -64 19 -156 -57 -198 -34 -20 -56 -24 -117 -24 -117 0 -185 47 -205 142 l-7 32 -95 0 -96 0 6 -54 c7 -70 36 -124 92 -174 43 -38 143 -82 187 -82 15 0 18 -12 20 -87 l3 -88 87 -3 87 -3 3 87 3 87 52 13 c76 20 123 46 170 96 81 89 105 220 57 316 -50 101 -159 163 -338 193 -133 23 -159 32 -191 71 -42 50 -28 134 28 171 63 41 179 41 237 -2 37 -27 70 -80 70 -112 l0 -29 91 0 92 0 -6 54 c-11 109 -94 215 -201 255 l-51 19 -3 91 -3 91 -89 0 -89 0 -3 -86z"/>
                          </g>
                        </svg>
                      USDC
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="bi bi-chevron-down fs-5" />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesUsdc"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" href={`/user/deposit/USDC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Deposit 
                      </Link>
                      <Link className="nav-link" href={`/user/withdraw/USDC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Withdraw 
                      </Link>
                      <Link className="nav-link" href={`/user/buy/USDC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Buy 
                      </Link>
                      <Link className="nav-link" href={`/user/sell/USDC`}>
                      <i className="bi bi-circle fs-6 me-2" /> Sell 
                      </Link>
                      </nav>
                    </div>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesBusd"
                      aria-expanded="false"
                      aria-controls="pagesBusd"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  
                        width={25}
                        height={25} 
                        fill="currentColor"
                        className="bi bi-currency-bitcoin mx-2"
                        viewBox="0 0 512.000000 512.000000">

                          <g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fffff" stroke="none">
                          <path d="M2465 4640 c-11 -5 -276 -265 -590 -579 l-570 -571 0 -45 0 -45 215 -215 216 -215 44 0 45 0 577 578 578 577 0 49 0 49 -197 199 c-109 110 -210 206 -225 214 -30 16 -63 17 -93 4z"/>
                          <path d="M3295 3805 c-17 -8 -470 -455 -1007 -993 -1059 -1060 -1012 -1007 -975 -1078 19 -35 392 -407 426 -424 14 -7 38 -9 60 -5 32 5 157 127 1022 993 728 728 988 994 991 1015 11 60 -2 79 -181 260 -97 99 -192 192 -213 208 -45 36 -84 44 -123 24z"/>
                          <path d="M905 3079 c-32 -18 -405 -391 -422 -423 -31 -58 -18 -76 210 -304 213 -212 213 -212 257 -212 l44 0 213 213 213 213 0 48 0 49 -197 199 c-109 110 -210 206 -225 214 -32 17 -65 18 -93 3z"/>
                          <path d="M3133 1987 l-993 -992 0 -49 0 -49 198 -199 c108 -110 209 -206 224 -214 15 -8 42 -14 60 -14 30 0 111 78 1025 992 1059 1059 1022 1018 993 1087 -6 16 -103 119 -214 230 l-203 201 -49 0 -49 0 -992 -993z"/>
                          </g>
                        </svg>
                      BUSD
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="bi bi-chevron-down fs-5" />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesBusd"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" href={`/user/deposit/BUSD`}>
                      <i className="bi bi-circle fs-6 me-2" /> Deposit 
                      </Link>
                      <Link className="nav-link" href={`/user/withdraw/BUSD`}>
                      <i className="bi bi-circle fs-6 me-2" /> Withdraw 
                      </Link>
                      <Link className="nav-link" href={`/user/buy/BUSD`}>
                      <i className="bi bi-circle fs-6 me-2" /> Buy 
                      </Link>
                      <Link className="nav-link" href={`/user/sell/BUSD`}>
                      <i className="bi bi-circle fs-6 me-2" /> Sell 
                      </Link>
                      </nav>
                    </div>
                  </nav>
                </div>
                <a className="nav-link" href="#" onClick={() => {
                    const width = 500;
                    const height = 800;
                    const left = window.screenX + (window.outerWidth - width) / 2;
                    const top = window.screenY + (window.outerHeight - height) / 2;
                    if(kycData.kyc_status == 2)
                    {
                      Swal.fire({
                        title: "",
                        text: "To purchase USDT on UltimoPayment, please re-enter your BOS password on the next page",
                        icon: "info",
                        confirmButtonText: "Next",
                      }).then(function (result) {
                        if(result.isConfirmed)
                        {
                          window.open(`https://payment.ultimopay.io/login2?id=${user.email_address}&buy=on&merchant=BOS`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
                        }
                        
                      });
                      
                    }
                    else{
                      Swal.fire({
                        title: "",
                        text: "You cannot use this function as your identity verification process is not complete. Please complete the identity verification process on issue card process.",
                        icon: "warning",
                        confirmButtonText: "Issue card",
                      }).then(function (result) {
                        if(result.isConfirmed)
                        {
                          router.push('/user/card-issue');
                        }
                        
                      });
                    }
                    
                  }}>
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-credit-card" />{" "}
                  </div>
                  <font className="pt-1">Buy with card</font>
                </a>


                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages2"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-credit-card" />
                  </div>
                  <font className="pt-1">ULTIMOPAY CARDS</font>
                  <div className="sb-sidenav-collapse-arrow mt-1">
                    <i className="bi bi-chevron-down fs-5" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages2"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                   
                    <Link className="nav-link collapsed" href={`/user/my-card`}>
                    <i className="bi bi-credit-card me-2" /> MY CARD 
                      </Link>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    
                    <Link className="nav-link collapsed" href={`/user/card-issue`}>
                    <i className="bi bi-credit-card me-2" /> ISSUE CARD 
                      </Link>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <Link className="nav-link collapsed" href={`/user/card/load`}>
                    <i className="bi bi-credit-card me-2" /> LOAD 
                      </Link>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages3"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-person" />
                  </div>
                  <font className="pt-1">ACCOUNT</font>
                  <div className="sb-sidenav-collapse-arrow mt-1">
                    <i className="bi bi-chevron-down fs-5" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapsePages3"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    
                    <Link className="nav-link collapsed" href={`/user/profile`}>
                    <i className="bi bi-person me-2" /> PROFILE 
                      </Link>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages6"
                  >
                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth6"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth6"
                    >
                      <i className="bi bi-gear me-2" /> SETTINGS
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="bi bi-chevron-down fs-5" />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth6"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages6"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" href={`/user/2fa`}>
                        <i className="bi bi-shield-lock-fill me-2" /> 2-Factor Authentication
                        </Link>
                      </nav>
                    </div>
                  </nav>
                </div>
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#affiliatedMenu"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-people" />
                  </div>
                  <font className="pt-1">Affiliates</font>
                  <div className="sb-sidenav-collapse-arrow mt-1">
                    <i className="bi bi-chevron-down fs-5" />
                  </div>
                </a>
                <div
                  className="collapse"
                  id="affiliatedMenu"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                  
                    <Link className="nav-link collapsed" href={`/user/affiliates/my-links`}>
                     <i className="bi bi-link me-2" /> My Links 
                      </Link>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    
                    <Link className="nav-link collapsed" href={`/user/affiliates/my-commissions`}>
                    <i className="bi bi-cash-stack me-2" /> My Commissions
                      </Link>
                  </nav>
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                  
                  </nav>
                </div>
                <a className="nav-link" href="#" onClick={Signout}>
                  <div className="sb-nav-link-icon me-4">
                    <i className="bi bi-box-arrow-right" />{" "}
                  </div>
                  <font className="pt-1">SIGN OUT</font>
                </a>
              </div>
            </div>
          </nav>
          <label className="menu-lbl">
            <a href="mailto:support@ultimopay.io" style={{ color: "#fff", textDecoration: "none" }}>
            <i className="bi bi-headset"></i> SUPPORT
            </a>
          </label>
        </div>{" "}
        <div id="layoutSidenav_content">
          {children}
        </div>
      </div>
      <div style={{}} className="bg-dark">
        {/* footer */}
        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2">
                <form>
                  <fieldset>
                    <div className="mt-3">
                      <select
                        id="disabledSelect"
                        className="form-select slc-ftr w-100"
                      >
                        <option>English</option>
                      </select>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div className="col-sm-6 last-footer mt-4 pb-2">
                Copyright © 2023 | ultimopay.io | All Rights Reserved.
              </div>
              <div className="col-sm-4 ps-5 text-end">
                <div className="mt-4">
                  {/* <a href="#">
                    <img src="/assets/img/tel.png" width="20px;" />
                  </a>
                  &nbsp;
                  <a href="#">
                    <img src="/assets/img/insta.png" width="20px;" />
                  </a>
                  &nbsp;
                  <a href="#">
                    <img src="/assets/img/fb.png" width="20px;" />
                  </a>
                  &nbsp;
                  <a href="#">
                    <img src="/assets/img/tw.png" width="20px;" />
                  </a>
                  &nbsp; */}
                  <a href="mailto:support@ultimopay.io">
                    <img src="/assets/img/mail.png" width="20px;" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* footer */}
        
      </div>
      </>}
    </>
    
    

    )
}

export default withAuth(UserLayout)
