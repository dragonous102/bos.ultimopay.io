import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { userService, alertService } from '/services';
import withAuth from '/hooks/withAuth';
import UserLayout from './layout/UserLayout'
import { Form1 , Form2 , Form3 , FormPending , PaymentForm , PaidSuccess , PostSuccess , AllComplete} from '/components/CardIssue';

const page = () => {
  const router = useRouter();
  
  const [user, setUserData] = useState(null)
  const [userdata, setUserrData] = useState(null)
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState([]);
  const [form2, setForm2] = useState([]);
  const [kycData, setKycData] = useState([]);
  
  const [kycStatus, setKycStatus] = useState(0)
  useEffect(() => {
    async function fetchData() {
      const y = localStorage.getItem('user')
      const userser = JSON.parse(y)
      const user = userser.res.data.signinResponse
      setStep(1)
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
    setKycStatus(0)
    userService.getUserStatus(userrr , 'both').then((d) => {
          console.log(d);
          setKycStatus(d.status)
         
          setKycData(d.data)
          console.log('setKycData' ,d.data)
          if(d.status == 1)
          {
            setStep(4)
          }
          if(d.status == 2)
          {
            setStep(5)
          }
          if(d.status == 3 || d.status == 19)
          {
            setStep(6)
          }
          
          if(d.status == 5)
          {
            setStep(7)
          }
          if(d.status == 4)
          {
            setStep(8)
          }
          console.log(d.status)
          // setStep(3) 
    }).catch((d) => {
    
      
    })
    
  }
  
  const openModal = () => {
        const modal = document.getElementById('exampleModal');
          
        modal.classList.add('show')
        modal.style.display = 'block'
        document.body.classList.add('modal-open')

        const backdrop = document.createElement('div')
        backdrop.classList.add('modal-backdrop', 'fade', 'show')
        document.body.appendChild(backdrop)
}
const closeModal = () => {
  const modal = document.getElementById('exampleModal');
  modal.classList.remove('show')
  modal.style.display = 'none'
  document.body.classList.remove('modal-open')

  const backdrop = document.querySelector('.modal-backdrop')
  backdrop.parentNode.removeChild(backdrop)
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
        "profile" :{
          "email_address" : resd.email_address
        },
        "pdf_data" : {
          // "application_form_1_screenshot_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_1_screenshot_651610b99f104ba2c891cc217fc59490.png`,
          "application_form_1_screenshot_page_1_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_1_screenshot_651610b99f104ba2c891cc217fc59490_0.png`,
          "application_form_1_screenshot_page_2_url" : `https://bos.ultimopay.io/bos_pdf_api/jdb/data/download/application_form_1_screenshot_651610b99f104ba2c891cc217fc59490_1.png`,
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
        if(is_open_popup)
        {
          // setTimeout(openModal, 2000)

        }
  }).catch((d) => {
  
    
  })
}
const  handleNextClick = async (data, stepp , goto) => {
  window.scrollTo(0, 0);
  
  if (stepp === 1) {
    setForm1(data);
    
  }
  
  if (stepp === 2) {
    setForm2(data);
    
  }
  if (stepp === 3) {
    getUserStatus(user)
    
  }
  if (goto == 1) {
    
    await getUserInfo(user)
    
    
    
  }
  setStep(goto);
};
  return (
    <UserLayout>
    {user && userdata && kycData ? (
    <main>
      <div className="container-fluid px-1 px-sm-4">
        <div className="row pe-3 pe-sm-4 ps-3 ps-sm-5 pt-4 pb-5">
        {step == 1 || step == 2 || step == 3  ?
          <div className="col-md-12">
           
                <div className="row">
                  <div className="col-sm-4">
                    <h1 className="mt-3">
                      <b>
                        Apply For
                        <br /> A Debit Card{" "}
                      </b>
                    </h1>
                  </div>
                  <div className="col-sm-6 p-3">
                    <h6>
                      You are going to apply for issuance a debit card.
                      <br /> We will use your profile data in below to issue
                      <br /> the debit card for you. Please double check your
                      <br /> data, and if you found no problem, click
                      <br /> "Procceed to next step" button.{" "}
                    </h6>
                  </div>
                </div> 
          </div>: ''}

          <div>
          {step === 1 && userdata &&  <Form1 user={user} form1={form1} userdata={userdata} onNextClick={(formData1 ,goto) => handleNextClick(formData1, 1 , goto)}/>}
          {step === 2 && userdata && <Form2 user={user} form1={form1} form2={form2} onNextClick={(formData2 , goto) => handleNextClick(formData2, 2, goto)} />}
          {step === 3 && userdata && <Form3 user={user} form2={form2} userdata={userdata} form1={form1} onNextClick={(formData3 , goto) => handleNextClick(formData3, 3 , goto)} />}
          {step === 4 && userdata && <FormPending user={user} form2={form2} userdata={kycData} form1={form1} onNextClick={(formData2 , goto) => handleNextClick(formData2, 4, goto)}  />}
          {step === 5 && userdata && <PaymentForm user={user} form2={form2} userdata={userdata} form1={form1} onNextClick={(formData2 , goto) => handleNextClick(formData2, 5, goto)}  />}
          {step === 6 && userdata && <PaidSuccess user={user} form2={form2} userdata={userdata} form1={form1} onNextClick={(formData2 , goto) => handleNextClick(formData2, 6, goto)}  />}
          {step === 7 && userdata && <PostSuccess user={user} form2={form2} userdata={kycData} form1={form1} onNextClick={(formData2 , goto) => handleNextClick(formData2, 7, goto)}  />}
          {step === 8 && userdata && <AllComplete user={user} form2={form2} userdata={userdata} form1={form1} onNextClick={(formData2 , goto) => handleNextClick(formData2, 8, goto)}  />}
        </div>
        
     
      </div>
      </div>
      
      <div
  className="modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header bg-mdl-ttl">
        <h5 className="modal-title text-center w-100" id="exampleModalLabel">
          ATTENTION
        </h5>
      </div>
      <div className="modal-body">
        Please have your passport or ID card ready for identification purposes.
        <br />
        Fill out the form with the same information as appears on your
        identification documents, paying particular attention to the following
        <ul className="mt-3">
          <li>Name (including middie name, if applicable)</li>
          <li>Date of birth</li>
          <li>Date of ID issuance</li>
          <li>ID expiration date</li>
        </ul>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          Close
        </button>
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