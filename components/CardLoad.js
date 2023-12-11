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

function CardLoad({wallet ,  user , pendingTotal , allwallet , userInfo }) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState(0);
    console.log(allwallet)
    const usdBalance = allwallet[2].balance
    const minimum = 100
    
    const handleInputChange = (event) => {
      let newValue = event.target.value;
      const decimalDigits = newValue.split(".");
      const isFloat = newValue.toString().includes(".");
      
      console.log(isFloat)
      if (!isNaN(newValue)) 
      {
        if(isFloat && decimalDigits[1].length >= 8)
        {
          console.log(newValue);
          newValue = parseFloat(newValue).toFixed(8)
          
        }

        setInputValue(newValue);
        if(parseFloat(newValue) >= parseFloat(minimum))
        {
          if(parseFloat(usdBalance) < parseFloat(newValue)) 
          {
            setError('amount' , {message : `You don't have enough USD to Load`})
            
          }
          else{
            setError('amount' , null)
            errors.amount = false;
            
          }
        }
        else 
        {
          
            setError('amount' , {message : `Please enter more than minimum load amount`})
            
          
        }
      } 
          
        
    }
   
  
    const handleKeyDown = (event) => {
      if (event.key === '-' || event.key === '+') {
        event.preventDefault(); // prevent '-' or '+' from being entered
      }
    }
    const validationSchema = Yup.object().shape({
      amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .min(0, 'Amount must be greater than zero'),
      
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      bank_account_number: userInfo.bank_account_number,
      card_number: userInfo.card_number,
      amount:inputValue,
 
    },
    
  };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(formdata) {
      if(inputValue > 0)
      {
        return Swal.fire({
          title: `Load ${inputValue} USD?`,
          // html: `You Pay ${result} USD<br><em>The amount may vary slightly depending on the fluctuation.</em>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) 
          { 
            userService.showLoader(true)
            
            return userService.runApi('loadCard/' , formdata)
              .then((res) => {
                  console.log(res.data);
                  if (res.data.result == "success") {
                    userService.showLoader(false)
                    Swal.fire({
                      title: "Success",
                      text: "The loading process was successful. Please wait a moment until the processing is complete (Up to 24 hours maximum)",
                      icon: "success",
                    }).then(function (result) {
                      userService.showLoader(false)
                      router.reload();
                    });
                    

                  }
                  else if (res.data.result == "failed") {
                    userService.showLoader(false)
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
          })
        }
        else
        {
          setError('amount' , {message : `Amount must be greater than 0`})
        }
    }
    
    return (
        <>
            <div className="container-fluid px-4">
  <div className="row pe-4 ps-5 pt-5 pb-5">
    <div className="col-sm-11 mt-1">
     
      <label className="">
      You are going to load money from your USD WALLET to your Debit Card.{" "}
      </label>
      <br/>
      <br/>
      <label className="">
      Also , currently your pending load amount is <span style={{ color: "blue" }}>{pendingTotal}</span> USD
      </label>
    </div>
    <div className="col-sm-12 mt-4">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mt-3">
        <b>Amount USD</b>
      </h4>
      
        <div className="mb-5">
          
          <input onKeyDown={handleKeyDown}  
          name="amount" step="0.000001" 
          {...register('amount')} className={`form-control ${errors.amount ? 'is-invalid' : ''}`}  
          type="number" 
          value={inputValue} 
          onChange={handleInputChange}
          placeholder={`Enter USD Amount`}
          />
          <div className="invalid-feedback">{errors.amount?.message}</div>
          <div>Minimum Load Amount : {minimum} USD</div>
          <div className="">Available amount : {(Math.floor(usdBalance * 100) / 100).toFixed(2)} USD</div>
        </div>
    
        
        <button type="submit" className="btn withdrwcstm-btn mt-4 col-sm-3" disabled={formState.isSubmitting || errors.amount ? true : false} >
          LOAD {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        </button>
        
      </form>
    </div>
  </div>
</div>

        </>
    )
  }
  
  export default CardLoad;
