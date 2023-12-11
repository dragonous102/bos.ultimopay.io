import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from '/pages/user/layout/UserLayout'
import DataTable from '/components/DataTable';

const page = () => {
  const router = useRouter();
  
  const [user, setUserData] = useState(null)
  const [userdata, setUserrData] = useState(null)
  const [status, setstatus] = useState(1);
  const [isLoading, setisLoading] = useState(true)
  const [kycData, setKycData] = useState([]);
  const [reportData, setReportData] = useState([])
  const [approvedTotal, setApprovedTotal] = useState(0)
  const [pendingTotal, setPendingTotal] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const col = [
    {
      Header: 'Date/Time',
      accessor: 'Date',
    },
    {
      Header: 'USER',
      accessor: 'OrderID',
    },
    {
      Header: 'COMMISSION',
      accessor: 'Commission',
    },
    {
      Header: 'AMOUNT',
      accessor: 'TotalCost',
    },
    {
      Header: 'PRODUCT',
      accessor: 'ProductID',
    },
    {
      Header: 'APPROVAL STATUS',
      accessor: 'Status',
    },
    {
      Header: 'PAYOUT STATUS',
      accessor: 'PaidStatus',
    },
  ];
 
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      
      setUserData(user);
      await getUserInfo(user , true)
      getUserStatus(user)
      getAffiliateReport(user)
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
  
  const getAffiliateReport = (userrr ) => {
    delete userrr.expires_in;
    delete userrr.wallet;
    userrr.affiliate_name = userrr.email_address
    userService.runApi(`getAffiliateReport/` , userrr).then((d) => {
       console.log(`getAffiliateReport` , d)
       const orders = d.data.apiResponse
       setReportData(orders)
       const tc = orders.reduce((acc, order) => {
        return acc + order.TotalCost;
      }, 0);

        let at = 0;
        let pt = 0;

        orders.forEach((item) => {
        if (item.Status === 'APPROVED') {
            at += item.TotalCost;
        } else if (item.Status === 'PENDING') {
            pt += item.TotalCost;
        }
        });

        console.log('Approved Total:', at);
        console.log('Pending Total:', pt);
        console.log(' Total:' , tc); 
        setApprovedTotal(at)
        setPendingTotal(pt)
        setTotalCost(tc)
       setisLoading(false) 
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
            <div className="card-header">MY COMMISSIONS</div>
            <div className="card-body">
                
                <table className="table table-borderless">
                  <tr>
                    <th className='border-0'>Pending payout commission:</th>
                    <td className='border-0'>{approvedTotal.toFixed(2)} USD</td>
                   
                  </tr>
                    
                  <tr>
                    
                    <th className='border-0'>Pending approval commission:</th>
                    <td className='border-0'>{pendingTotal.toFixed(2)} USD</td>
                   
                    
                  </tr>
                    
                  <tr>
                    
                    <th className='border-0'>Total paid commission:</th>
                    <td className='border-0'>{totalCost.toFixed(2)} USD</td>
                  </tr>
                    
                </table>
                
                
                <div className="table-responsive mt-3">
                {isLoading ?  <p>Loading...</p> : 
                    <DataTable data={reportData} col={col} />
                }
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