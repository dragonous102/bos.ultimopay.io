import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userService, alertService } from "/services";
import Main from "./layout/Main";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from 'js-cookie';

export default function login() {
  const router = useRouter();
  const [showNewField, setShowNewField] = useState(false);
  const [isLoad, setisLoad] = useState(false);
  const validationSchema = Yup.object().shape({
    email_address: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("No password provided.")
    .notOneOf(['http', 'script'], 'Invalid input')
    .matches(/^(?![<>]).*$/, 'Invalid input'),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      two_fa_code: "",
      all_error: "",
      auth_token: "",
    },
  };
  const { register, handleSubmit, formState, setError } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(user) {
    setisLoad(true)

     return userService
      .runApi("signin/", user)
      .then((res) => {
        if (res.data.result == "success") {
          console.log(res.data.signinResponse);
          userService.runApi("check2FA/", res.data.signinResponse).then((d) => {
            user.group_id = '4ADFC35E-7743-45FC-93EF-7DDC1E2BC291';
            user.auth_token = res.data.signinResponse.auth_token;
            user.expires_second =10*60;
            user.kloginTime =Date().toLocaleString(); // Capture the time of the klogin event
             console.log(user)
            if (d.data["2FAStatus"].status == "enabled") {
              setShowNewField(true)
              

              return userService.runApi("check2FAcode/", user).then((i) => {
                if (i.data.result == "success") {
                  console.log(i.data)
                  if (i.data['2FA_code_is_valid']) {
                    setisLoad(true)
                    return userService.runApi("changeUserSystemGroup/", user).then((i) => {
                      
                         localStorage.setItem("user", JSON.stringify({ res }));
                          localStorage.setItem("loginTime", user.kloginTime);
                          
                          localStorage.setItem("expires_second", user.expires_second);
                          cookie.set('user', JSON.stringify({ res }), { path: '/' });


                          router.push({
                          pathname: "user/dashboard",
                        });
                    });
                  }
                  else{
                    setError('two_fa_code', { message: 'Invalid 2FA Code' });
                    toast.error('Invalid 2FA Code' , {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    setisLoad(false)
                  } 
                } 
                else if (i.data.result == "failed") {
                  setisLoad(false)
                  // toast.error(i.data.error.errorMessage , {
                  //   position: toast.POSITION.TOP_RIGHT
                  // });
                }
              });

              
            } else {
              setisLoad(true)
              return userService.runApi("changeUserSystemGroup/", user).then((i) => {
                   localStorage.setItem("user", JSON.stringify({ res }));
                          localStorage.setItem("loginTime", user.kloginTime);
                          localStorage.setItem("expires_second", user.expires_second);
                          
                   
                    cookie.set('user', JSON.stringify({ res }), { path: '/' });

                    router.push({
                    pathname: "user/dashboard",
                  });
              });
            }
          })
          .catch((d) => {
            setisLoad(true)
            return userService.runApi("changeUserSystemGroup/", user).then((i) => {
             localStorage.setItem("user", JSON.stringify({ res }));
                          localStorage.setItem("loginTime", user.kloginTime);
                          localStorage.setItem("expires_second", user.expires_second);
                          
              cookie.set('user', JSON.stringify({ res }), { path: '/' });

              router.push({
              pathname: "user/dashboard",
            });
        });
          });
        } else if (res.data.result == "failed") {
          setisLoad(false)
          if (res.data.error.errorCode == 4) {
            Swal.fire({
              title: "Error",
              text: "Invalid Credentials",
              icon: "error",
            });
          } else if (res.data.error.errorCode != 5) {
            Swal.fire({
              title: "Error",
              text: res.data.error.errorMessage,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Notice",
              text: "You did not complete the previous signup process. Please complete the final step.",
              icon: "warning",
            }).then(function (result) {
              const expiration = new Date().getTime() + 5 * 60 * 1000;
              return userService.runApi(`resendSignupCode/` , user).then((d) => {
                router.push({
                  pathname: "/verify-signup",
                });
                localStorage.setItem(
                  "verification-token",
                  JSON.stringify({ res, expiration })
                );
              });
            });
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
                <h1 className="p-4">SIGN-IN</h1>
                <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="invalid-feedback">
                    {errors.all_error?.message}
                  </div>
                  <div className="mb-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email_address"
                      {...register("email_address")}
                      className={`form-control ${
                        errors.email_address ? "is-invalid" : ""
                      }`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Address"
                    />
                    <div className="invalid-feedback">
                      {errors.email_address?.message}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      {...register("password")}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="exampleInputPassword1"
                      placeholder="Enter Password"
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  {showNewField && (
                    <div className="mb-5">
                      <label
                        htmlFor="exampleInputNewField"
                        className="form-label"
                      >
                        2FA Code
                      </label>
                      <input
                        type="text"
                        name="two_fa_code"
                        {...register("two_fa_code")}
                        className={`form-control ${
                          errors.two_fa_code ? "is-invalid" : ""
                        }`}
                        id="exampleInputNewField"
                        placeholder="Enter 2FA Code"
                      />
                      <div className="invalid-feedback">
                        {errors.two_fa_code?.message}
                      </div>
                    </div>
                  )}
                  <div className="mb-4 text-center">
                    <button
                      disabled={formState.isSubmitting || isLoad}
                      className="btn cstm-submit p-0"
                    >
                      {formState.isSubmitting || isLoad ? (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      ) : ''}
                      <font>ENTER</font>{" "}
                      <img src="assets/img/right.png" width="30px;" />
                    </button>
                  </div>
                  <div className="mb-2 text-center">
                    <font className="user">New User ?</font> &nbsp;
                    <Link href="/register" className="">
                      SIGN UP
                    </Link>
                  </div>
                  <div className="mb-4 text-center">
                    <Link className="forgot" href="/forgot-password">
                      Forgot Your Password ?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}
