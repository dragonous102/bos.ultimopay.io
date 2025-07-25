import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup) // extend yup
import { userService, alertService } from '/services';

import Swal from 'sweetalert2';
import Main from './layout/Main';
export default function VerifySignup() {
  const router = useRouter();
  const [user, setUserData] = useState(null)
  const [sendState , setSendState] = useState(false)
  useEffect(() => {
    const y = localStorage.getItem('verification-forgot')
    
    if (!y) {
      router.push('/register')
    }
    else{
      const userser = JSON.parse(y)
      const now = new Date().getTime()
      if ( now > userser.expiration) {
        localStorage.removeItem('verification-forgot')
        router.push('/register')
      }
      console.log(userser);
      const user = userser.res.data.resetPasswordResponse;
      setUserData(user);
    }
  }, [router])
  const validationSchema = Yup.object().shape({
  
    verification_code: Yup.string()
          .required('Code is required'),
    password: Yup.string()
      .required('No password provided.') 
      .min(
        6,
        'password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special'
      )
      .max(
        60,
        'password cannot be longer than 60 characters'
      )
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character'),
    retypePassword: Yup
            .string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.')
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
  

  async function onSubmit(user ) {
    return userService.verifyResetCode(user)
        .then((res) => {
            console.log(res.data)
            if(res.data.result == 'success')
            {
              Swal.fire({
                title: "Success", 
                text: "Congratulation! Your password has been reset successfully. Now you can login in your account.", 
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
              setError('verification_code', { message: 'Invalid Code' });
            }
        })
        .catch(alertService.error);
}

const handleResendClick = () => {
  setSendState(true)
  userService.forgot(user).then((d) => {
    
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
  return (
    <Main>
    <section className="height-con height-con-2">
  <div className="container">
    <div className="crow">
      <div className="col-sm-10 m-auto col-frm">
      
        <div className="main-frm">
          <h1 className="p-4">RESET PASSWORD</h1>
          <div className="p-4">
          
            <form className="row p-5 sign-up-fm" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-12 mb-4 p-0">
                <h4>
                
                  <b>
                    Please enter the verification code we have sent to <span className="text-primary"> {user ? (user.email_address) : ''}</span> (we
                    have sent from <span className="text-primary">no-reply@mailverificate.com</span> ) and the new password you want to set:
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
                <label htmlFor="inputEmail4" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="inputEmail4"
                  placeholder="Enter New Password"
                  
                  autoFocus
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>
              <div className="col-md-12 mb-4 p-0">
                <label htmlFor="inputPassword4" className="form-label">
                New Password Repeat
                </label>
                <input
                  type="password"
                  name="retypePassword"
                  {...register('retypePassword')} className={`form-control ${errors.retypePassword ? 'is-invalid' : ''}`}
                  id="inputPassword4"
                  placeholder="Enter New Password Repeat"
                />
                <div className="invalid-feedback">{errors.retypePassword?.message}</div>
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
