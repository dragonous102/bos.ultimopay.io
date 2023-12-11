import Link from 'next/link'
import { useState, useEffect } from "react";
import Main from './layout/Main'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';

import Swal from 'sweetalert2';
export default function VerifySignup() {
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [sendState , setSendState] = useState(false)
  useEffect(() => {
    const y = localStorage.getItem('verification-token')
    
    if (!y) {
      router.push('/register')
    }
    else{
      const userser = JSON.parse(y)
      const now = new Date().getTime()
      if ( now > userser.expiration) {
        localStorage.removeItem('verification-token')
        router.push('/register')
      }
      const user = JSON.parse(userser.res.config.data)
      setUserData(user);
    }
    
    
  }, [router])
  const validationSchema = Yup.object().shape({
  
    verification_code: Yup.string()
          .required('Code is required')
          .notOneOf(['http', 'script'], 'Invalid input')
          .matches(/^(?![<>]).*$/, 'Invalid input'),
  });
  const formOptions = { resolver: yupResolver(validationSchema), defaultValues: {
    verification_code: '',
    email_address: user ? (user.email_address) : ('fdfdf'),
  } };
  
  // get functions to build form with useForm() hook
  const { register, setValue ,handleSubmit, formState ,setError} = useForm(formOptions);
  const { errors } = formState;
  const handleButtonClick = () => {
    setValue('email_address', user ? (user.email_address) : ('fdfdf'));
  };
  
  const handleResendClick = () => {
    setSendState(true)
    userService.runApi('resendSignupCode/' ,user).then((d) => {
      
      Swal.fire({
        title: "Success", 
        text: "We have successfully resent your verification code to your email address", 
        icon: "success"
      }).then(function (result) 
      {
        setSendState(false)
         
     })
    })
  };
  async function onSubmit(user ) {
    return userService.runApi('confirmSignUp/' ,user)
        .then((res) => {
           
            console.log(res.data)
            if(res.data.result == 'success')
            {
              Swal.fire({
                title: "Success", 
                text: "Congratulation! Your account has been created successfully. Now you can login in your account.", 
                icon: "success"
              }).then(function (result) 
              {
                router.push({
                  pathname: '/',
                  query: { success: true },
                });
                 
             })
              
              
            }
            else if(res.data.result == "failed")
            {
              
              setError('verification_code', { message: res.data.error.errorMessage });
              
                
            }
        })
        .catch(alertService.error);
}

  return (
    <Main>
    <section className="height-con height-con-2">
  <div className="container">
    <div className="crow">
      <div className="col-sm-10 m-auto col-frm">
      
        <div className="main-frm">
          <h1 className="p-4">COMPLETE SIGN-UP</h1>
          <div className="p-4">
          
            <form className="row p-5 sign-up-fm" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12 mb-4 p-0">
                <h4>
                
                  <b>
                    Please enter the verification code we have sent to <span className="text-primary"> {user ? (user.email_address) : ''}</span> (we
                    have sent from <span className="text-primary">no-reply@mailverificate.com</span> ) to complete your
                    sign up:
                  </b>
                </h4>
              </div>
              <div className="col-md-12 mb-4 p-0">
                <label htmlFor="inputPassword4" className="form-label">
                  Verification Code
                </label>
                
                <input
                  type="text"
                  name="verification_code"
                  {...register('verification_code')} className={`form-control ${errors.verification_code ? 'is-invalid' : ''}`} 
                  id="inputEmail4"
                  placeholder="Enter Verification Code"
                  
                  autoFocus
                />
                <input 
                  type="hidden"
                  name="email_address"
                  {...register('email_address')} 
                  value={user ? (user.email_address) : ('fdfdf')}
                />
                
                <div className="invalid-feedback">{errors.verification_code?.message}</div>
                <div className='mt-3'>
                Can't get the verification code ? <button className='btn text-primary' type='button' disabled={sendState} onClick={handleResendClick}>
                {sendState && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Resend Verification Code
                </button>
                </div>
              </div>
              <div className="col-md-12 mb-4 p-0">
                <h3>ATTENTION:</h3>
                <h4>
                  For Gmail, please also check the Promotion Tabs, as well as
                  the spam folder if you cannot find the email in your INBOX.
                </h4>
              </div>
              <div className="mb-4 text-center">
                
                <button disabled={formState.isSubmitting}   className="btn cstm-submit p-0" onClick={handleButtonClick}>
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <font>CONFIRM</font>{" "}
                  <img src="assets/img/right.png" width="30px;" />
                </button>
              </div>

              <div className="mb-2 text-left">
              
                <Link href="/" className="">
                Back to sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="sign-bg">
    <div className="bg-img">
      <img src="assets/img/bg.png" width="100%" />
    </div>
  </div>
</section>
</Main>

  )
}
