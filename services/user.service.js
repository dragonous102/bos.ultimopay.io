import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import axios from '/lib/axios'
import axios_our from '/lib/axios_our'
import axios_def from 'axios'
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';
import * as Yup from 'yup';

let isLoading = false;
let container = null;
const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apitoken}`;

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue() { return userSubject.value },

  verifyResetCode,
  refreshToken,
  walletBalance,
  register,
  forgot,
  set2FA,
  get2FASecretKey,
  runApi,
  runPhpApi,
  getDatePhpFormat,
  getUserStatus,
  getCurrencyOrder,
  getWalletOrder,
  showLoader,
  PreventIncrement,
  CommonValidation
};



function runApi(api, user) {
  return axios.post(api, user)

}
function CommonValidation(api, user) {


  return Yup.string().test('not-one-of', 'Invalid input', value => {
    const invalidWords = ['http', 'script', 'https', 'javascript'];
    const regex = new RegExp(`\\b(?:${invalidWords.join('|')})\\b`, 'i');
    return !regex.test(value);
  })
    .matches(/^(?![<>]).*$/, 'Invalid input');

}
function getCurrencyOrder() {

  return ["USDT", "BTC", "USD", "USDC", "BUSD"];

}
function getWalletOrder() {

  return {
    BTC: {
      key: 1,
      float: 8,
      title: 'Bitcoin',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="%width%" height="%height%" fill="currentColor" className="bi bi-currency-bitcoin" viewBox="0 0 16 16" > <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" /> </svg>',
      data: {},
    },

    USDT: {
      key: 0,
      float: 6,
      title: 'Tether',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="%width%" height="%height%" viewBox="0 0 24 24"><path d="M 12 1 C 5.935 1 1 5.935 1 12 C 1 18.065 5.935 23 12 23 C 18.065 23 23 18.065 23 12 C 23 5.935 18.065 1 12 1 z M 12 3 C 16.963 3 21 7.038 21 12 C 21 16.963 16.963 21 12 21 C 7.038 21 3 16.963 3 12 C 3 7.038 7.038 3 12 3 z M 7 7 L 7 9 L 11 9 L 11 10.048828 C 8.7935403 10.157378 6 10.631324 6 12 C 6 13.368676 8.7935403 13.842622 11 13.951172 L 11 18 L 13 18 L 13 13.951172 C 15.20646 13.842622 18 13.368676 18 12 C 18 10.631324 15.20646 10.157378 13 10.048828 L 13 9 L 17 9 L 17 7 L 7 7 z M 11 11.027344 L 11 12 L 13 12 L 13 11.027344 C 15.42179 11.151768 16.880168 11.700988 17.003906 11.978516 C 16.863906 12.334516 15.021 13 12 13 C 8.978 13 7.1360937 12.335484 6.9960938 12.021484 C 7.1198324 11.706835 8.5777007 11.152269 11 11.027344 z"></path></svg>',
      data: {},
    },
    USDC: {
      key: 3,
      float: 6,
      title: 'USDC',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="%width%" height="%height%" fill="currentColor" class="bi bi-currency-bitcoin mx-2" viewBox="0 0 256.000000 256.000000"><g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M920 2271 c-211 -79 -389 -217 -509 -395 -389 -576 -136 -1355 517 -1590 l72 -26 0 98 0 97 -60 23 c-142 56 -296 184 -388 325 -262 402 -149 944 251 1205 42 28 104 61 137 74 l60 23 0 97 c0 54 -1 98 -2 98 -2 -1 -37 -14 -78 -29z"></path><path d="M1552 2204 l3 -95 58 -24 c244 -99 433 -314 509 -580 33 -116 33 -334 0 -450 -76 -266 -265 -481 -509 -580 l-58 -24 -3 -95 c-1 -53 0 -96 2 -96 3 0 42 13 87 30 645 235 895 1013 509 1585 -122 180 -300 319 -509 395 -45 17 -84 30 -87 30 -2 0 -3 -43 -2 -96z"></path><path d="M1188 1904 l-3 -87 -40 -12 c-93 -28 -179 -95 -219 -173 -46 -90 -41 -195 15 -272 54 -74 144 -117 321 -150 105 -20 168 -47 192 -82 45 -64 19 -156 -57 -198 -34 -20 -56 -24 -117 -24 -117 0 -185 47 -205 142 l-7 32 -95 0 -96 0 6 -54 c7 -70 36 -124 92 -174 43 -38 143 -82 187 -82 15 0 18 -12 20 -87 l3 -88 87 -3 87 -3 3 87 3 87 52 13 c76 20 123 46 170 96 81 89 105 220 57 316 -50 101 -159 163 -338 193 -133 23 -159 32 -191 71 -42 50 -28 134 28 171 63 41 179 41 237 -2 37 -27 70 -80 70 -112 l0 -29 91 0 92 0 -6 54 c-11 109 -94 215 -201 255 l-51 19 -3 91 -3 91 -89 0 -89 0 -3 -86z"></path></g></svg>',
      data: {},
    },
    BUSD: {
      key: 4,
      float: 6,
      title: 'BUSD',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="%width%" height="%height%" fill="currentColor" class="bi bi-currency-bitcoin mx-2" viewBox="0 0 512.000000 512.000000"><g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M2465 4640 c-11 -5 -276 -265 -590 -579 l-570 -571 0 -45 0 -45 215 -215 216 -215 44 0 45 0 577 578 578 577 0 49 0 49 -197 199 c-109 110 -210 206 -225 214 -30 16 -63 17 -93 4z"></path><path d="M3295 3805 c-17 -8 -470 -455 -1007 -993 -1059 -1060 -1012 -1007 -975 -1078 19 -35 392 -407 426 -424 14 -7 38 -9 60 -5 32 5 157 127 1022 993 728 728 988 994 991 1015 11 60 -2 79 -181 260 -97 99 -192 192 -213 208 -45 36 -84 44 -123 24z"></path><path d="M905 3079 c-32 -18 -405 -391 -422 -423 -31 -58 -18 -76 210 -304 213 -212 213 -212 257 -212 l44 0 213 213 213 213 0 48 0 49 -197 199 c-109 110 -210 206 -225 214 -32 17 -65 18 -93 3z"></path><path d="M3133 1987 l-993 -992 0 -49 0 -49 198 -199 c108 -110 209 -206 224 -214 15 -8 42 -14 60 -14 30 0 111 78 1025 992 1059 1059 1022 1018 993 1087 -6 16 -103 119 -214 230 l-203 201 -49 0 -49 0 -992 -993z"></path></g></svg>',
      data: {},
    }
  };

}
function getDatePhpFormat(currentDate) {

  const formattedDate = currentDate.getFullYear() + "/" +
    (currentDate.getMonth() + 1).toString().padStart(2, '0') + "/" +
    currentDate.getDate().toString().padStart(2, '0') + " " +
    currentDate.getHours().toString().padStart(2, '0') + ":" +
    currentDate.getMinutes().toString().padStart(2, '0') + ":" +
    currentDate.getSeconds().toString().padStart(2, '0');

  return formattedDate;

}
function getUserStatus(userrr, type = 'both') {
  return new Promise((resolve, reject) => {
    runApi(`updateUserStatus/`, userrr).then((response) => {
      console.log('user_info', response.data.updateStatusResponse);
      const resd = response.data.updateStatusResponse;

      let status = 0;
      if (resd.kyc_status == 1) {
        status = 1;
      }
      if (resd.kyc_status == 2) {
        status = 2;
      }
      if (resd.kyc_status == 9) {
        status = 9;
      }
      if (resd.kyc_status == 2 && resd.payment_status == 2) {
        status = 3;
      }
      if (resd.kyc_status == 2 && resd.payment_status == 2 && resd.card_status == 2 && resd.card_activation_status == 2) {
        status = 4;
      }

      if (resd.kyc_status == 2 && resd.payment_status == 2 && resd.card_activation_status == 1) {
        status = 5;
      }
      if (resd.card_activation_status == 9) {
        status = 19;
      }
      //status = 2
      if (type === 'status') {
        resolve(status);
      } else {
        let data = {
          'status': status,
          'data': resd,
        }
        resolve(data);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

function runPhpApi(api, user) {

  return axios_our.post(api, user)

}


function showLoader(show) {
  isLoading = show;
  if (isLoading) {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(
      <LoadingOverlay
        active={true}
        spinner
        text='Loading...'
        styles={{ wrapper: { zIndex: 9999, position: "fixed" } }}
      />,
      container
    );
  } else if (container) {

    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
}

export { showLoader };

function refreshToken(user) {

  return axios.post(`refreshSigninToken/`, user)
}
function walletBalance(user) {

  return axios.post(`walletBalance/`, user)
}

function set2FA(user) {
  // https://api.ultimopay.io/v1/set2FA/
  return axios.post(`set2FA/`, user)
}
function get2FASecretKey(user) {
  // https://api.ultimopay.io/v1/get2FASecretKey/
  return axios.post(`get2FASecretKey/`, user)
}

function register(user) {
  console.log('register', baseUrl);

  return axios.post(`signup/`, user)

}
function forgot(user) {
  //https://api.ultimopay.io/v1/resetPassword/

  // const IPGlobal = window.wIPGlobal;

  // return axios.post(`resetPassword/`, user, { headers: { 'X-Server-Ip': IPGlobal } });
  // return axios.post(`resetPassword/`, user);
  
  let reqdata = {
    ...user,
    url: 'resetPassword/'
  }
  // console.log("reqdata", reqdata);
  return fetch(`api/sendReq`, {method: 'POST', body: JSON.stringify(reqdata)});

}

function verifyResetCode(user) {
  console.log('register', baseUrl);
  //https://api.ultimopay.io/v1/completeResetPassword/
  return axios.post(`completeResetPassword/`, user)

}

function PreventIncrement(event) {
  const charCode = event.key.charCodeAt(0);

  const value = event.target.value;
  if (
    (charCode < 48 || charCode > 57) &&
    (event.key !== "." || value.split(".").length > 1)
  ) {
    if (event.key !== "Backspace") {
      event.preventDefault();
    }
  }

}





