import Head from 'next/head'
import Link from 'next/link'
import withoutAuth from '/hooks/withoutAuth';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
const Main = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const affid = getAffId('UltimopayAffRefId');

  useEffect(() => {
    const UltimopayAffRefId = document.getElementById('UltimopayAffRefId');
    if (UltimopayAffRefId) {
      UltimopayAffRefId.value = affid;
    }
  }, [affid]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      
    }, 1000)
    setUltimopayAffRefIdCookie()
    return () => clearTimeout(timer)
    
  }, [])
  function setUltimopayAffRefIdCookie() {
    const rid = new URLSearchParams(window.location.search).get('rid');
    if (rid && rid.trim() !== '') {
      Cookies.set('UltimopayAffRefId', rid.trim(), {
        expires: 7300, // set the cookie to expire in 20 years
        path: '/',
        domain: '.ultimopay.io',
      });
    }
  }
  function getAffId(cname) {
    const refId = Cookies.get(cname);

    if (refId) {
      console.log(`The 'UltimopayAffRefId' cookie is set with value: ${refId}`);
      return refId;
    } else {
      console.log("The 'UltimopayAffRefId' cookie is not set");
      return '';
    }
  }
    return (
      <>
    <Head>
      <title>Bos</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> 
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link rel="icon" href="/assets/img//bos_favicon.png" />
      <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      
    </Head>
      {/* navbar */}
      {isLoading ? <div className="loader"></div> : <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img src="/assets/img/logo.png" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/*<li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Service
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" href="#">
                      One
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link " href="#" tabIndex={-1}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " href="#" tabIndex={-1}>
                  Support
                </Link>
              </li>*/}
            </ul> 
            <form className="d-flex">
              <Link className="btn cstm-btn" href="/">
                SIGN IN / SIGN UP
              </Link>
            </form>
          </div>
        </div>
      </nav>
      {/* navbar */}
      {/* section */}
      {children}
      {/* section */}
      <div className="login-footer">
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
                  {/* <Link href="#">
                    <img src="/assets/img/tel.png" width="20px;" />
                  </Link>
                  &nbsp;
                  <Link href="#">
                    <img src="/assets/img/insta.png" width="20px;" />
                  </Link>
                  &nbsp;
                  <Link href="#">
                    <img src="/assets/img/fb.png" width="20px;" />
                  </Link>
                  &nbsp;
                  <Link href="#">
                    <img src="/assets/img/tw.png" width="20px;" />
                  </Link>
                  &nbsp; */}
                  <Link href="#">
                    <img src="/assets/img/mail.png" width="20px;" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* footer */}
      </div></>}
    </>
    

    )
}

export default withoutAuth(Main)
