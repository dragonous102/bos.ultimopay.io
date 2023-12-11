import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import _ from 'lodash'; // import lodash debounce function
import Swal from "sweetalert2";

function BtcSell({wallet , id , user , twofa ,walletData}) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState(0);
    const [result, setResult] = useState('0.00');
    const Balance = parseFloat(wallet.data.balance);
    const minimum = 20;  
    const float = (id == "BTC") ? 5 : 2;
    console.log(wallet.data.balance);
    const [ifnotvalid, setIfnotvalid] = useState(true);

    const handleInputChange = (event) => {
      
      let newValue = event.target.value;
      const decimalDigits = newValue.split(".");
      const isFloat = newValue.toString().includes(".");
      
      console.log(isFloat)
      if (!isNaN(newValue)) {
        if(isFloat && decimalDigits[1].length >= float)
        {
          console.log(newValue);
          newValue = parseFloat(newValue).toFixed(float)
          
        }

        setInputValue(newValue);
        
        
      }
      
      console.log('newVale' , newValue)
      
      debounceApiCall(user, id, newValue, Balance);
     
     
      

    };
    const debounceApiCall = _.debounce((user, id, newValue, Balance) => {
      setIfnotvalid(true)
      userService.runApi('cryptoPrice/' , user)
            .then((res) => {
                const input = document.getElementById('amount');
                newValue = input.value
                const ress = res.data.cryptocurrencies;
                console.log(ress);
                const filteredData = ress.filter((item) => item.pair.includes(id));
                
                const buy_price = filteredData[0].buy_price;
				let calculatedValue = 0
				if(id == "BTC")
				{
					calculatedValue = parseFloat(newValue) * parseFloat(buy_price) * 0.973 
				} else {
					calculatedValue = parseFloat(newValue) * parseFloat(buy_price) * 0.975 
				}             
                
                calculatedValue > 0 ? setResult(``+calculatedValue.toFixed(2)) : setResult('0.00');
                if(parseFloat(Balance) < parseFloat(newValue)) 
                {
                  setError('amount' , {message : `You don't have enough ${id} to sell this`})
                  setIfnotvalid(true)
                }
                else{
                  if(parseFloat(minimum) > parseFloat(newValue)) 
                  {
                    console.log('calculatedValue' , newValue)
                    if(id == "USDT")
                    { 
                      setError('amount' , {message : `Please enter amount more than ${minimum} ${id}`})
                      setIfnotvalid(true)
                      return;
                    }
                  
                }
                setError('amount' , null)
                  setIfnotvalid(false)
              }

            })
            .catch(alertService.error);
          }, 500); // debounce time in milliseconds
    const handleKeyDown = (event) => {
      if (event.key === '-' || event.key === '+') {
        event.preventDefault(); // prevent '-' or '+' from being entered
      }
      userService.PreventIncrement(event)
    }
    const validationSchema = Yup.object().shape({
      
      
      amount: Yup.string()
            .required('amount is required'),
      
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      type:'sell',
      pair:id+`USD`,
      amount:inputValue,
     
    }};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(formdata) {
      Swal.fire({
        title: `Do you really want to sell ${inputValue} ${id}?`,
        html: `You get  ${result} USD<br><em>The amount may vary slightly depending on the fluctuation.</em>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, sell it",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          userService.showLoader(true)
          return userService.runApi('cryptoExchange/' , formdata)
            .then((res) => {
              userService.showLoader(false)
              console.log(res.data);
              if (res.data.result == "success") {
               
                Swal.fire({
                  title: "Success",
                  text: "Amount Exchanged Successfully",
                  icon: "success",
                }).then(function (result) {
                  router.reload();
                });
                

              }
              else if (res.data.result == "failed") {
                
                  Swal.fire({
                    title: "Error",
                    text: res.data.error.errorMessage,
                    icon: "error",
                  }).then(function (result) {

                  });
                }
              
              

          })
          .catch((res) => {
            userService.showLoader(false)
            Swal.fire({
              title: "Error",
              text: res.response.data.error.errorMessage,
              icon: "error",
            }).then(function (result) {
              
            });
          });
      } 
      else 
      {
        // User clicked the "No, cancel" button
        // Do nothing or show a message
      }
    })
     
      
    }
    
    return (
        <>
            <div className="container-fluid px-4">
  <div className="row pe-4 ps-5 pt-5 pb-5">
    <div className="col-sm-11 mt-1">
      <p className="mb-2">
        <b>IMPORTANT NOTICE</b>
      </p>
      <label className="">
        Final amount of USD you have to pay is subject to be changed according
        to {id}/USD price at the time your buying order is submitted and
        executed.{" "}
      </label>
    </div>
    <div className="col-sm-12 mt-4">
      <h4 className="mt-3">
        <b>AMOUNT YOU WANT TO SELL </b>
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          
          <input onKeyDown={handleKeyDown}  
          name="amount" step="0.000001" 
          {...register('amount')} className={`form-control ${ifnotvalid ? 'is-invalid' : ''}`}  
          id="amount" 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange}
          placeholder={`Enter `+wallet.title+` Amount`}
          />
          <div className="invalid-feedback">{errors.amount?.message}</div>
          <div className="">Available amount : {Balance.toFixed(float)} {id}</div>
        </div>
        <h4 className="mt-5">
          <b>YOU RECEIVE </b>
        </h4>
        <p className="amount-price amount-price-usd">
          {result} <font style={{ fontSize: 14 }}>USD</font>{" "}
        </p>
        <button type="submit" className="btn withdrwcstm-btn mt-4 col-sm-3"  disabled={formState.isSubmitting || ifnotvalid ? true : false} >
          SELL {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        </button>
      </form>
    </div>
  </div>
</div>

        </>
    )
  }
  
  export default BtcSell;
