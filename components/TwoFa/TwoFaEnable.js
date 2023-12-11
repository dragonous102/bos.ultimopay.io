import Link from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';


function TwoFaEnable({user}) {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
      
      two_fa_code: Yup.string()
            .required('2Fa is required'),
      password: Yup.string()
            .required('Password is required'),
    
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      type:0,
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
                    text: "Your 2-FA has been Disabled successfully", 
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
                  console.log(res.data.error.errorMessage)

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
    return (
        <>
            <div className="container-fluid px-4">
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="row pe-4 ps-5 pt-4 pb-5">
              <div className="col-sm-12">
                <h1 className="mt-3">
                  <b>2-Factor <br></br> Authentication is <span className="alert alert-success p-0 px-2 pt-2 fs-3">ON</span>  </b>
                </h1>
              </div>
              
              <div className="col-md-7 mt-3">
                <div className="fact p-4 text-center">
                  <img src="/assets/img/check.png" width="20%" />
                  <h6 className="mt-4 alert alert-success">Enabled</h6>
                  <p className="text-start mb-0">
                  If you want to turn off 2-Factor Authentication for your account, please enter 2-FA Code that started by BOS
                   ({user.email_address}) in your Google Authenticator App, and your login password, then click "Turn OFF 2-Factor
                    Authentication" button below.{" "}
                  </p>
                </div>
              </div>
              <div className="col-md-5 mt-3">
                <div className="fact p-4 h-100">
                  <p className="mb-4">
                    Enter the code from your Google
                    <br /> Authenticator App and your login
                    <br /> password{" "}
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
                    <div className="col-md-12">
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
              
            </div>
            <div className="col-sm-12 mb-3">
              
                <div className="col-10">
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                      Turn OFF 2-Factor Authentication
                      {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      </button>
                    </div>
                  </div>
                </div>
              
            </div>
            </form>
          </div>
        </>
    )
  }
  
  export {TwoFaEnable} ;
