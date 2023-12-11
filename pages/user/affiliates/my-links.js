import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from '/pages/user/layout/UserLayout'


const page = () => {
  const router = useRouter();
  
  const [user, setUserData] = useState(null)
  const [userdata, setUserrData] = useState(null)
  const [status, setstatus] = useState(1);

  const [kycData, setKycData] = useState([]);
  const [dashboardCopied, setDashboardCopied] = useState(false);
  const [homeCopied, setHomeCopied] = useState(false);
  const [dashboardLink , setDashboardLink] = useState(false);
  const [homeLink , setHomeLink] = useState(false);
  
  const handleCopyDashboard = () => {
    navigator.clipboard.writeText(dashboardLink);
    setDashboardCopied(true);
    setTimeout(() => {
      setDashboardCopied(false);
    }, 3000);
  };

  const handleCopyHome = () => {
    navigator.clipboard.writeText(homeLink);
    setHomeCopied(true);
    setTimeout(() => {
      setHomeCopied(false);
    }, 3000);
  };
 
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      
      setUserData(user);
      await getUserInfo(user , true)
      getUserStatus(user)
      //await generatePDF()
    
    }

    fetchData();

  }, [router])
  const getUserStatus = (userrr ) => {
    delete userrr.expires_in;
    delete userrr.wallet;
    
    userService.getUserStatus(userrr , 'both').then((d) => {

         
          setKycData(d.data)
          setstatus(d.status)
          
          console.log(d.status)
          
    }).catch((d) => {
    
      
    })
    
  }
  
  
const getUserInfo = (userrr , is_open_popup=false) => {
  delete userrr.expires_in;
  delete userrr.wallet;
  setUserrData(false)
  userService.runApi(`userInfo/` , userrr).then((d) => {
       console.log('user_info' , d.data.userInfoResponse)
       const resd = d.data.userInfoResponse;
       const { protocol, host } = window.location;
       const baseUrl = `${protocol}//${host}`;
       setUserrData(resd);
       console.log(resd)
       setHomeLink(`${baseUrl}/?rid=${resd.pap_affiliate_refid}`)
       setDashboardLink(`${baseUrl}/register?rid=${resd.pap_affiliate_refid}`)
  }).catch((d) => {
  
    
  })
}

  return (
    <UserLayout>
    {user && userdata && kycData ? (
    <main>
      <div className="container-fluid px-4">
        
          <div className='mt-4'>
          <div className="card">
      <div className="card-header">
        <h5 className="card-title">My Affiliate Links </h5>
      </div>
      <div className="card-body">
        <p>
          This is your affiliate link. you can copy and paste them to your website, blog or SNS (Facebook,
          Twitter, Instagram, LinkedIn, etc.) to promote BOS service and
          get rewards.
        </p>
        <div className="form-group">
          <label htmlFor="dashboard-link">Signup Link:</label>
          <div className="input-group">
            <input
              type="text"
              id="dashboard-link"
              className="form-control"
              value={dashboardLink}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleCopyDashboard}
              >
                {dashboardCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <small>
            (this affiliate link will show Bos Sign
            up page)
          </small>
        </div>
        <div className="form-group mt-4">
          
          <div className="input-group">
            <input
              type="text"
              id="home-link"
              className="form-control"
              value={homeLink}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleCopyHome}
              >
                {homeCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          
        </div>
      </div>
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

export default withAuth(page)