import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from "sweetalert2";
import _ from 'lodash'; // import lodash debounce function
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BtcBuy({wallet , id , user , twofa ,walletData}) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState(0);
    const [result, setResult] = useState('0.00');
    const [ifnotvalid, setIfnotvalid] = useState(true);
      const usdBalance = walletData[2].balance
      const float = (id == "BTC") ? 5 : 2;
      const minimum = 20;  
     console.log(wallet.title);
     
     const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
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
      setIfnotvalid(true)
      
      
      debounceApiCall(user, id, newValue, usdBalance);


    };
    
    const debounceApiCall = _.debounce((user, id, newValue, usdBalance) => {
      
      userService.runApi('cryptoPrice/' , user)
            .then((res) => {
                const input = document.getElementById('amount');
                newValue = input.value
                const ress = res.data.cryptocurrencies;
                console.log(newValue);
                const filteredData = ress.filter((item) => item.pair.includes(id));
                
                const sell_price = filteredData[0].sell_price;
				let calculatedValue = 0
				if(id == "BTC")
				{
					calculatedValue = parseFloat(newValue) * parseFloat(sell_price) * 1.027 
				} else  {
					calculatedValue = parseFloat(newValue) * parseFloat(sell_price) * 1.025 
				}
                
                
                
                calculatedValue > 0 ? setResult(``+calculatedValue.toFixed(2)) : setResult('0.00');
                if(parseFloat(usdBalance) < parseFloat(calculatedValue)) 
                {
                  setError('amount' , {message : `You don't have enough USD to buy this`})

                  setIfnotvalid(true)
                }
                else{
                  if(parseFloat(minimum) > parseFloat(calculatedValue)) 
                  {
                    if(id == "USDT")
                    { 
                      setError('amount' , {message : `Please enter amount more than ${minimum} ${id}`})
                      setIfnotvalid(true)
                      return;
                    }
                  }
                  

                  setError('amount' , null)
                  errors.amount = false;
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
      
      debounceApiCall(user, id, event.target.value, usdBalance);
    }
    const validationSchema = Yup.object().shape({
      
      
      amount: Yup.string()
            .required('amount is required'),
      
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      type:'buy',
      pair:id+`USD`,
      amount:inputValue,
 
    },
    
  };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(formdata) {
      return Swal.fire({
        title: `Do you really want to Buy ${inputValue} ${id}?`,
        html: `You Pay ${result} USD<br><em>The amount may vary slightly depending on the fluctuation.</em>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Buy it",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) 
        { 
          userService.showLoader(true)
          return userService.runApi('cryptoExchange/' , formdata)
            .then((res) => {
                console.log(res.data);
                if (res.data.result == "success") {
                 
                  Swal.fire({
                    title: "Success",
                    text: "Amount Exchanged Successfully",
                    icon: "success",
                  }).then(function (result) {
                    userService.showLoader(false)
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
      });
      
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mt-3">
        <b>AMOUNT YOU WANT TO BUY </b>
      </h4>
      
        <div className="mb-5">
          
          <input onKeyDown={handleKeyDown}  
          
          name="amount" step="0.000001" 
          {...register('amount')} className={`form-control ${errors.amount ? 'is-invalid' : ''}`}  
          type="text" 
          id="amount" 
          value={inputValue} 
          onChange={handleInputChange}
          placeholder={`Enter `+wallet.title+` Amount`}
          />
          <div className="invalid-feedback">{errors.amount?.message}</div>
          
        </div>
        <h4 className="mt-5">
          <b>YOU HAVE TO PAY </b>
        </h4>
        <p className="amount-price amount-price-usd">
          {result} <font style={{ fontSize: 14 }}>USD</font>{" "}
        </p>
        <div className="">Available amount : {numberWithCommas((Math.floor(usdBalance * 100) / 100).toFixed(2))} USD</div>
        <button type="submit" className="btn withdrwcstm-btn mt-4 col-sm-3" disabled={formState.isSubmitting || ifnotvalid} >
          BUY {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        </button>
      </form>
    </div>
  </div>
</div>

        </>
    )
  }
  
  export default BtcBuy;
