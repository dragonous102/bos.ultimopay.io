import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from './layout/UserLayout'
import { CardDetails , NotIssued} from '/components/MyCard';

const page = () => {
  const router = useRouter();
  
  const [user, setUserData] = useState(null)
  const [userdata, setUserrData] = useState(null)
  const [step, setStep] = useState(1);

  const [kycData, setKycData] = useState([]);

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
          
          if(d.status == 4 || d.status == 5 || d.status ==3)
          {
            setStep(2)
          }
          console.log('d_data' ,d)
          
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
       setUserrData(resd);
       
  }).catch((d) => {
  
    
  })
}

  return (
    <UserLayout>
    {user && userdata && kycData ? (
    <main>
      <div className="container-fluid px-4">
        
          <div>
          {step === 1 && userdata &&  <NotIssued user={user}  userdata={userdata} kycData={kycData}/>}
          {step === 2 && userdata && <CardDetails user={user} userdata={userdata} kycData={kycData}  />}
         
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