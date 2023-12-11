import Link from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import { useState, useEffect } from "react";

function TwoFaDisable({user}) {
    const router = useRouter();
    const [twofaKey, setTwofaKeyData] = useState(null)
    useEffect(() => {
      async function fetchData() {
        
        get2FASecretKey(user);
        
        console.log(twofaKey)
        
      }
      fetchData();
  
    }, [router])
    const validationSchema = Yup.object().shape({
      
      two_fa_code: Yup.string()
            .required('2FA is required'),
      password: Yup.string()
            .required('Password is required'),
     
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      type:1,
    }};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.set2FA(user)
            .then((res) => {
                
                console.log(res.data)
                
                if(res.data.result == 'success')
                {
                  Swal.fire({
                    title: "Success", 
                    text: "Your 2-FA has been enabled successfully", 
                    icon: "success"
                  }).then(function (result) 
                  {
                    router.push({
                      pathname: '/user/2fa',
                      
                    });
                   
                     
                 })
                  
                }
                else
                {
                  Swal.fire({
                    title: "Error", 
                    text: res.data.error.errorMessage, 
                    icon: "error"
                  }).then(function (result) 
                  {

                  })
                }
            })
            .catch((ress) => {
              const res =  ress.response;
              if(res.data.result == "failed")
                {
                  if(res.data.error.errorCode == 11)
                  {
                    
                    setError('two_fa_code', { message: res.data.error.errorMessage });
                    
                  }
                  if(res.data.error.errorCode == 12)
                  {
                    setError('password', { message: 'Invalid password' });
                    
                  }
                    
                }
                else
                {
                  Swal.fire({
                    title: "Error", 
                    text: res.data.error.errorMessage, 
                    icon: "error"
                  }).then(function (result) 
                  {

                  })
                }
            });
    }

    const get2FASecretKey = (user) => {
      userService.get2FASecretKey(user).then((d) => {
           console.log(d)
           setTwofaKeyData(d.data.two_fa_secret_key);
           
      })
    }
    return (  
    <>
      {twofaKey ? (
      
            <div className="container-fluid px-4">
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="row pe-4 ps-5 pt-4 pb-5 d-flex align-items-stretch">
              <div className="col-sm-6">
                <h1 className="mt-3">
                  <b>2-Factor <br></br> Authentication is <small className="alert alert-danger p-0 px-2 pt-2 fs-3">OFF</small></b>
                </h1>
              </div>
              <div className="col-sm-6 p-3">
                <h6>
                  You can secure your account better by
                  enabling 2-Factor authentication via Google
                  Authenticator app.
                  <br /> For Android: <b><a target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">click here to install</a></b>
                  <br /> For 'OS: <b><a target="_blank" href="https://apps.apple.com/us/app/google-authenticator/id388497605">click here to install</a></b>{" "}
                </h6>
              </div>
              <div className="col-md-6 mt-3">
                <div className="fact p-4 text-center">
                  
                  <QRCode value={`otpauth://totp/${user.email_address}?secret=${twofaKey}&issuer=BOS`} />
                  <h5 className="mt-4">{twofaKey} </h5>
                  <p className="text-start mb-0">
                    Use your Google Authenticator App
                     to scan the QR code or enter the
                     authenticator key shown{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-6 mt-3 mb-3">
                <div className="fact p-4">
                  <p className="mb-4">
                    Enter the code from your Google
                     Authenticator App and your login
                    password{" "}
                  </p>
                 
                    <div className="col-md-12">
                      <label htmlFor="inputPassword1" className="form-label">
                      Enter the code from your Google Authenticator App
                      </label>
                      <input
                        type="text"
                        name='two_fa_code'
                        {...register('two_fa_code')} className={`form-control ${errors.two_fa_code ? 'is-invalid' : ''}`}
                        id="inputPassword1"
                        placeholder="Enter the code from your Google Authenticator App"
                      />
                      <div className="invalid-feedback">{errors.two_fa_code?.message}</div>
                    </div>
                    <div className="col-md-12 mb-2">
                      <label htmlFor="inputPassword4" className="form-label">
                      Your login password
                      </label>
                      <input
                        type="password"
                        name='password'
                        {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="inputPassword4"
                        placeholder="Enter Your login password"
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                  
                </div>
              </div>
              <div className="col-md-12 mt-5">
                <div className="fact p-4">
                  <p className="mb-4">
                    By default, 2-Factor Authentication will be turned ON for
                    Withdrawals and Login.{" "}
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <div className="text-center me-3">
                          <img src="/assets/img/check.png" width="60px" />
                        </div>
                        <div className="">
                          Withdrawals <br />
                         
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <div className="text-center me-3">
                          <img src="/assets/img/check.png" width="60px" />
                        </div>
                        <div className="">Login to your account </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 mb-3">
              
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                        Enable 2-FA
{formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      </button>
                    </div>
                  </div>
                </div>
              
            </div>
            </form>
          </div>
        
        ): (
          <p>Loading...</p>
        )}
        </> 
    )
  }
  
  export {TwoFaDisable} ;
