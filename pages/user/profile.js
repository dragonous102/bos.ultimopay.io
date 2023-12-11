import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from './layout/UserLayout'
import { Profile ,  IDInfo} from '/components/Profile';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  const router = useRouter();
  
  const [user, setUserData] = useState(null)
  const [userdata, setUserrData] = useState(null)
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState([]);
  const [form2, setForm2] = useState([]);
  const [kycData, setKycData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      getUserStatus(user)
      setUserData(user);
      await getUserInfo(user , true)
     
    
    }

    fetchData();

  }, [router])

  
  const getUserStatus = (userrr ) => {
    delete userrr.expires_in;
    delete userrr.wallet;
    
    userService.getUserStatus(userrr , 'both').then((d) => {
  
      const kyc_status = d.data.kyc_status;
      setKycData(d.data)
      
          
          
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
       const dateParts = resd.date_of_birth.split("/");
      const occ = [
      "CEO",
      "Director",
      "Employee",
      "Housewife",
      "Student",

      ]
      const occupation = occ.includes(resd.occupation) ? resd.occupation : "Other";

      const form1Data = {
        "cellphone_number":resd.cellphone_number,
        "cellphone_country_code":resd.cellphone_country_code, 
        "country":resd.country, 
        "postal_code":resd.postal_code, 
        "prefecture":resd.province,
        "city":resd.district, 
        "address":resd.address, 
        "nationality":resd.nationality, 
        "occupation_other_detail":resd.occupation, 
        "occupation":occupation, 
        "title":(resd.title == "Ms.") ? 2 : 1,
        "marriage_status":(resd.marriage_status == "Single") ? 1 : 2, 
        "given_name":resd.given_name, 
        "sur_name":resd.sur_name, 
        "middle_name":resd.middle_name, 
        
        "birthday_year":dateParts[0],
        "birthday_month":dateParts[1],
        "birthday_day":dateParts[2],
        }
        const id_card_issued_date = resd.id_card_issued_date.split("/");
        const id_card_expired_date = resd.id_card_expired_date.split("/");
      const form2Data = {
        "id_type":resd.id_card_type,
        "id_number":resd.id_card_number, 
        "id_issue_year":(id_card_issued_date) ? id_card_issued_date[0] : '', 
        "id_issue_month":(id_card_issued_date) ? id_card_issued_date[1] : '', 
        "id_issue_day":(id_card_issued_date) ? id_card_issued_date[2] : '',
        "id_expire_year":(id_card_expired_date) ? id_card_expired_date[0] : '', 
        "id_expire_month":(id_card_expired_date) ? id_card_expired_date[1] : '', 
        "id_expire_day":(id_card_expired_date) ? id_card_expired_date[2] : '',
        "country":resd.country, 
        "profile" :{
          "email_address" : resd.email_address
        },
        "pdf_data" : {
          "application_form_1_screenshot_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_1_screenshot_651610b99f104ba2c891cc217fc59490.png`,
          "application_form_2_screenshot_page_1_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_2_screenshot_651610b99f104ba2c891cc217fc59490_0.png`,
          "application_form_2_screenshot_page_2_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_2_screenshot_651610b99f104ba2c891cc217fc59490_1.png`,
          "application_form_2_screenshot_page_3_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_2_screenshot_651610b99f104ba2c891cc217fc59490_2.png`,
          "application_form_2_screenshot_page_4_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_2_screenshot_651610b99f104ba2c891cc217fc59490_3.png`,
        }
        }
        
        setForm1(form1Data)
        setForm2(form2Data)
        console.log('form1' ,form1Data)
        console.log('form2' ,form2Data)
      
  }).catch((d) => {
  
    
  })
}
const  changeStep = async ( goto) => {
  window.scrollTo(0, 0);

  setStep(goto);
};
  return (
    <UserLayout>
    {user && userdata && kycData ? (
    <main>
      <div className="container-fluid px-4">
        <div className="row pe-4 ps-5 pt-4 pb-5">
        {step == 1 || step == 2 || step == 3  ?
          <div className="col-md-12">
           
                <div className="row">
                  <div className="col-sm-4">
                    <h1 className="mt-3">
                      <b>
                        Profile
                        <br /> {" "}
                      </b>
                    </h1>
                  </div>
               
                </div> 
          </div>: ''}
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class={`nav-link ${ step == 1 ? 'active' : '' } `} onClick={() => changeStep(1)} id="profile-tab"  type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class={`nav-link ${ step == 2 ? 'active' : '' } `} id="id-info-tab" onClick={() => changeStep(2)}  type="button" role="tab" aria-controls="id-info" aria-selected="false">ID Info</button>
            </li>
          </ul>
          <div>
          {step === 1 && userdata &&  <Profile user={user} form1={form1} userdata={userdata} kyc_status={kycData.kyc_status}  />}
          {step === 2 && userdata && <IDInfo user={user} form1={form2} form2={form2} kyc_status={kycData.kyc_status}  />}
          
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