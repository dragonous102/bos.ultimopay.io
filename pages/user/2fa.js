import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from './layout/UserLayout'
import { TwoFaDisable, TwoFaEnable } from '/components/TwoFa';
const Dashboard = () => {
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [twofa, setTwofaData] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      setUserData(user);
      check2FA(user);
      
      console.log(twofa)
      
    }
    fetchData();

  }, [router])
 const check2FA = (user) => {
      userService.runApi('check2FA/' , user).then((d) => {
           console.log(d)
           setTwofaData(d.data['2FAStatus'].status);
           
      })
    }
  return (
    <UserLayout>
      {user && twofa ? (
      <main>

        {twofa == 'enabled' ? (
          <TwoFaEnable user={user}/>
        ) : (
          <TwoFaDisable user={user}/>
        )}

    </main>
    
 ): (
  <p>Loading...</p>
)}
  </UserLayout>

  )
}

export default withAuth(Dashboard)