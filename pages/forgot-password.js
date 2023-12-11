import Link from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Main from './layout/Main'
import Swal from 'sweetalert2';
export default function Forgot() {
  const router = useRouter();
  
  const validationSchema = Yup.object().shape({
    email_address: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .notOneOf(['http', 'script'], 'Invalid input')
    .matches(/^(?![<>]).*$/, 'Invalid input')
    .required('This field is required'),
    
});
const formOptions = { resolver: yupResolver(validationSchema) };
const { register, handleSubmit, formState , setError } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
      return userService.forgot(user)
          .then((res) => {
              
            // console.log("res.data", res)
            const expiration = new Date().getTime() + 5 * 60 * 1000
            if(res.data.result == 'success')
            {
              Swal.fire({
                title: "Success", 
                text: "Verification Code has been sent to your email address to reset your password Please check", 
                icon: "success"
              }).then(function (result) 
              {
                router.push({
                  pathname: '/verify-forgot',
                  
                });
                localStorage.setItem('verification-forgot', JSON.stringify({ res, expiration }));
                 
             })
              
            }
              else if(res.data.result == "failed")
              {
                if(res.data.error.errorCode != 3)
                {
                  Swal.fire({
                    title: "Error", 
                    text: res.data.error.errorMessage, 
                    icon: "error"
                  })
                }
                else
                {
                  const loginData = {'email_address': user.email_address , 'password': '@123Password'};
                  userService.login(loginData)
                  .then((res) => 
                  {
                    if(res.data.result == "failed")
                    {
                        if(res.data.error.errorCode != 5)
                        {
                          Swal.fire({
                            title: "Error", 
                            text: 'User not exist', 
                            icon: "error"
                          })
                        }
                        else
                        {
                          Swal.fire({
                            title: "Notice", 
                            text: "You did not complete the previous signup process. Please complete the final step.", 
                            icon: "warning"
                          }).then(function (result) 
                          {
                            
                            userService.resendCode(loginData).then((d) => {
                              router.push({
                                pathname: '/verify-signup',
                                
                              });
                              localStorage.setItem('verification-token', JSON.stringify({ res, expiration }));
                            })
                            
                        })
                        }  
                    }

                })
            
            
                }
              }
                  
                
              })
          
          .catch(alertService.error);
  }

  return (
    <Main>
    <section className="height-con">
  <div className="container">
    <div className="crow login-main">
      <div className="col-sm-6 m-auto col-frm">
        <div className="main-frm">
          <h1 className="p-4">FORGOT PASSWORD </h1>
          <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email_address"
                  {...register('email_address')} className={`form-control ${errors.email_address ? 'is-invalid' : ''}`}
                  
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email Address"
                />
                <div className="invalid-feedback">{errors.email_address?.message}</div>
              </div>
              <div className="mb-4 text-center">
                <button disabled={formState.isSubmitting}   className="btn cstm-submit p-0">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <font>SEND</font>{" "}
                  <img src="assets/img/right.png" width="30px;" />
                </button>
              </div>
              <div className="mb-2 text-center">
              
                <Link href="/" className="">
                Back to sign in
                </Link>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</Main>

  )
}
