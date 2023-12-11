import { useRouter } from 'next/router';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(Yup) // extend yup
import { userService, alertService } from '/services';
import countryList from '/lib/countryList';
import Swal from 'sweetalert2';
import Main from './layout/Main'
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
export default function register() {
  
    const router = useRouter();
    const options = countryList();
    const [refId, setRefId] = useState('');
    const [notset, setNotset] = useState('');

    useEffect(() => {
      const refIdd = Cookies.get(`UltimopayAffRefId`);
  
      if (refIdd) {
        console.log(`The 'UltimopayAffRefId' cookie is set with value: ${refIdd}`);
        setRefId(refIdd);
      } else {
        console.log("The 'UltimopayAffRefId' cookie is not set");
        setNotset("The 'UltimopayAffRefId' cookie is not set")
        
      }
    }, [])
    
    const validationSchema = Yup.object().shape({
      first_name: userService.CommonValidation()
            .required('First Name is required').matches(
              /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                  'First name can only contain Latin letters.'
              )
              ,
      last_name: userService.CommonValidation()
            .required('Last Name is required').matches(
              /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                  'Last name can only contain Latin letters.'
              )
              ,
      email_address: userService.CommonValidation()
            .email('Please enter a valid email address')
            .required('Email is required')
            ,
      country: Yup.string()
            .required('Country is required')
            ,
      terms: Yup.bool()
            .oneOf([true] , 'Terms and conditions is required'),
      privacy: Yup.bool()
            .oneOf([true] , 'Privacy policy is required'),
      wallet_terms: Yup.bool()
            .oneOf([true] , 'Wallet Terms, Exchange Terms is required'),
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
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      affiliation:"BOS",
      
    }};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then((res) => {
                
                console.log(res.data)
                const expiration = new Date().getTime() + 5 * 60 * 1000
                if(res.data.result == 'success')
                {
                  Swal.fire({
                    title: "Success", 
                    text: "Verification Code has been sent to your email address. Please check", 
                    icon: "success"
                  }).then(function (result) 
                  {
                    router.push({
                      pathname: '/verify-signup',
                      
                    });
                    localStorage.setItem('verification-token', JSON.stringify({ res, expiration }));
                     
                 })
                  
                }
                else if(res.data.result == "failed")
                {
                  if(res.data.error.errorCode == 15)
                  {
                    Swal.fire({
                      title: "Notice", 
                      text: "You did not complete the previous signup process. Please complete the final step.", 
                      icon: "warning"
                    }).then(function (result) 
                    {
                      userService.runApi(`resendSignupCode/`, user).then((d) => {
                        router.push({
                          pathname: '/verify-signup',
                          query: res
                        });
                        localStorage.setItem('verification-token', JSON.stringify({ res, expiration }));
                      })
                       
                   })
                    
                    
                  }
                  if(res.data.error.errorCode == 14)
                  {
                    setError('email_address', { message: res.data.error.errorMessage });
                  }
                    
                }
            })
            .catch(alertService.error);
    }
  return (
    <Main>
      {notset || refId ? 
    <section className="height-con height-con-2">
  <div className="container">
    <div className="crow">
      <div className="col-sm-11 m-auto col-frm">
        <div className="main-frm">
          <h1 className="p-4">SIGN UP</h1>
          <div className="p-4">
            <form className="row p-5 sign-up-fm" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-6 mb-4 p-0">
                <label htmlFor="inputEmail4" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} 
                  id="inputEmail4"
                  placeholder="Enter First Name"
                  
                  autoFocus
                />
                <div className="invalid-feedback">{errors.first_name?.message}</div>
              </div>
              <div className="col-md-6 mb-4 p-0">
                <label htmlFor="inputPassword4" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                  id="inputPassword4"
                  placeholder="Enter Last Name"
                  
                  autoFocus
                />
                <input
                  type="hidden"
                  name="ref_id"
                  {...register('ref_id')} value={`${refId}`} className={`form-control ${errors.ref_id ? 'is-invalid' : ''}`}
                  
                />
                <div className="invalid-feedback">{errors.last_name?.message}</div>
              </div>
              <div className="col-md-12 mb-4 p-0">
                <label htmlFor="inputPassword4" className="form-label">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email_address"
                  {...register('email_address')} className={`form-control ${errors.email_address ? 'is-invalid' : ''}`}
                  id="inputPassword4"
                  placeholder="Enter Email Address"
                  
                  
                  autoFocus
                />
                <div className="invalid-feedback">{errors.email_address?.message}</div>
              </div>
              <div className="col-md-6 mb-4 p-0">
                <label htmlFor="inputEmail4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="inputEmail4"
                  placeholder="Enter Password"
                  
                  autoFocus
                />
                <div className="invalid-feedback">{errors.password?.message}</div>
              </div>
              <div className="col-md-6 mb-4 p-0">
                <label htmlFor="inputPassword4" className="form-label">
                  Repead Password
                </label>
                <input
                  type="password"
                  name="retypePassword"
                  {...register('retypePassword')} className={`form-control ${errors.retypePassword ? 'is-invalid' : ''}`}
                  id="inputPassword4"
                  placeholder="Enter Repead Password"
                />
                <div className="invalid-feedback">{errors.retypePassword?.message}</div>
              </div>
              <div className="col-md-12 mb-5 p-0">
                <label htmlFor="inputState" className="form-label">
                  Country
                </label>
                <select 
                id="inputState" 
                name="country"
                {...register('country')} className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                defaultValue=""
                
                autoFocus
                >
                  <option value="">Select Country</option>
                {options.map(option=>(
                 <option key={option.label} value={option.label}>{option.label}</option>
               ))}
                </select>
                <div className="invalid-feedback">{errors.country?.message}</div>
              </div>
              <div className="col-md-6 m-auto mb-4">
                <div className="form-check mb-3 real-redio">
                  <input
                    name="terms"
                    {...register('terms')} className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id="flexcheckboxDefault1"
                    defaultChecked=""
                    value="1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexcheckboxDefault1"
                  >
                    I agree with <a href="https://ultimopay.io/terms-and-conditions/" target="_blank" ><b>Term &amp; Conditions</b></a>
                  </label>
                  <div className="invalid-feedback">{errors.terms?.message}</div>
                </div>
                <div className="form-check mb-3 real-redio">
                  <input
                    
                    type="checkbox"
                    name="privacy"
                    {...register('privacy')} className={`form-check-input ${errors.privacy ? 'is-invalid' : ''}`}
                    id="flexcheckboxDefault2"
                    value="1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexcheckboxDefault2"
                  >
                    I agree with <a href="https://ultimopay.io/privacy-policy" target="_blank" ><b>Privacy Policy</b></a>
                  </label>
                  <div className="invalid-feedback">{errors.privacy?.message}</div>
                </div>
                <div className="form-check real-redio">
                  <input
                   name="wallet_terms"
                    {...register('wallet_terms')} className={`form-check-input ${errors.wallet_terms ? 'is-invalid' : ''}`}
                    type="checkbox"
                   
                    id="flexcheckboxDefault3"
                    value="1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexcheckboxDefault3"
                  >
                    I agree with <a href="https://ultimopay.io/ultimo-wallet-services-general-terms-and-conditions/" target="_blank" ><b>Wallet Terms,</b></a><a href="https://ultimopay.io/ultimo-exchange-terms-and-conditions" target="_blank" ><b> Exchange Terms</b></a>
                  </label>
                  <div className="invalid-feedback">{errors.wallet_terms?.message}</div>
                </div>
              </div>
              <div className="mb-4 text-center">
                <button disabled={formState.isSubmitting}   className="btn cstm-submit p-0">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <font>SIGN UP</font>{" "}
                  <img src="assets/img/right.png" width="30px;" />
                </button>
              </div>
              <div className="mb-2 text-center">
                <font className="user">Already a member ?</font> &nbsp;
                <Link href="/" className="">
                  LOG IN
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
      <img src="/assets/img/bg.png" width="100%" />
    </div>
  </div>
</section> : `Loading`}

</Main>

  )
}
