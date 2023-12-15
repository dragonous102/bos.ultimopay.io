import { useRouter } from 'next/router';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '/services';
import Swal from "sweetalert2";
// import lodash debounce function
import 'react-toastify/dist/ReactToastify.css';
import styles from '../public/assets/css/cardLoad.module.css';


function CardLoad({wallet ,  user , pendingTotal , allwallet , userInfo }) {

  const defaultLoadFee = 1;
  const standardLoadType = 1;
  const router = useRouter();
  const usdBalance = allwallet[2].balance;
  const [inputValue, setInputValue] = useState(0);
  const [loadType, setLoadType] = useState(standardLoadType);
  const [loadFee, setLoadFee] = useState(defaultLoadFee);
  const [availableAmount, setAvailableAmount] = useState(usdBalance / 1.01);
  const minimum = 100;

  function roundUpToTwoDecimalPlaces(value) {
    // Check if the value has more than two decimal places
    if ((value * 100) % 1 !== 0) {
      // Round up to two decimal places
      value = Math.ceil(value * 100) / 100;
    }
    // Return the rounded value
    return value;
  }

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

      // Update availableAmount based on selected load type
      if (loadType === standardLoadType) {
        setLoadFee(defaultLoadFee);
        setAvailableAmount( usdBalance / 1.01 );
      } else {
        setLoadFee(0);
        setAvailableAmount( usdBalance );
      }

      if(parseFloat(newValue) >= minimum)
      {
        if(availableAmount < parseFloat(newValue))
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
        setError('amount' , {message : `Please enter more than minimum load amount`});
      }
    }
  }

  // Event handler for the Radio Change
  const handleRadioChange = (e) => {
    const selectedValue = e.target.value * 1;
    setLoadType(selectedValue);

    let availableAmountSync;
    // Update loadFee based on selected load type
    if (selectedValue === standardLoadType) {
      setLoadFee(defaultLoadFee);
      setAvailableAmount( usdBalance / 1.01 );
      availableAmountSync = usdBalance / 1.01;
    } else {
      setLoadFee(0);
      setAvailableAmount( usdBalance );
      availableAmountSync = usdBalance;
    }



    if(availableAmountSync >= minimum)
    {
      console.log(selectedValue, availableAmountSync, inputValue);
      if(availableAmountSync < inputValue)
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
      setError('amount' , {message : `Please enter more than minimum load amount`});
    }
  };

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
      instant: loadType,
      fee: loadFee,
    },
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState , setError } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit( formData ) {

    if (inputValue > 0) {
      formData.fee = loadType === standardLoadType ? defaultLoadFee : 0;
      formData.instant = loadType;
    }

    let title = `<span style="font-size: smaller; font-weight: normal">Do you want to make a <span>Delayed Load</span> 
                 <span style="font-weight: bold">${inputValue} USD</span> to your debit card?</span>`;
    let feeAmount = 0;
    if( loadType === standardLoadType ) {
      feeAmount = roundUpToTwoDecimalPlaces( inputValue / 100 );
      title = `<span style="font-size: smaller; font-weight: normal">Do you want to make a <span>Standard Load</span> 
               <span style="font-weight: bold">${inputValue} USD</span> to your debit card?
               <span>Standard Load fee: <span style="font-weight: bold">${feeAmount} USD </span></span></span>`;
    }

    if( inputValue > 0 ){

      // Check validation for balance
      if( inputValue > (Math.floor(availableAmount * 100) / 100) ){
        Swal.fire({
          title: 'Insufficient balance',
          html: `Your balance ${(Math.floor(availableAmount * 100) / 100)} USD is insufficient <br/>to load ${inputValue} USD.`,
          icon: "warning",
        }).then(function () {});
        return;
      }

      return Swal.fire({
        title: title,
        //html: `You Pay ${inputValue} USD<br><em>The amount may vary slightly depending on the fluctuation.</em>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed){

          userService.showLoader(true);

          return userService.runApi('loadCard/' , formData)
              .then((res) => {
                if (res.data.result === "success") {
                  userService.showLoader(false);
                  Swal.fire({
                    title: "Success",
                    text: "The loading process was successful. Please wait a moment until the processing is complete (Up to 24 hours maximum)",
                    icon: "success",
                  }).then(function () {
                    userService.showLoader(false);
                    router.reload();
                  });
                }
                else if (res.data.result === "failed") {
                  userService.showLoader(false);
                  Swal.fire({
                    title: "Error",
                    text: res.data.error.errorMessage,
                    icon: "error",
                  }).then(function (result) {

                  });
                }
              })
              .catch((res) => {
                userService.showLoader(false);
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
      setError('amount' , {message : `Amount must be greater than 0`});
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
                  <div className="">Available amount : {(Math.floor(availableAmount * 100) / 100).toFixed(2)} USD</div>
                  </div>

                <h4 className="mt-3">
                  <b>Select Load Type</b>
                </h4>

                <div className={`mb-5 ${styles.inputContainer}`}>
                  <div className={styles.radioContainer}>
                    <label className={styles.formLabel}>
                      <input
                          type="radio"
                          name="instant"
                          value="1"
                          checked={loadType === 1}
                          onChange={handleRadioChange}
                      />
                      <span className={styles.formSpan}>Standard</span>
                    </label>
                    <span className={styles.textBelow}>* Loads within 24 hours</span>
                    <span className={styles.textBelow}>* 1% load fee</span>
                  </div>
                  <div className={styles.radioContainer}>
                    <label className={styles.formLabel}>
                      <input
                          type="radio"
                          name="instant"
                          value="0"
                          checked={loadType === 0}
                          onChange={handleRadioChange}
                      />
                      <span className={styles.formSpan}>Delayed</span>
                    </label>
                    <span className={styles.textBelow}>* Loads within 72 hours</span>
                    <span className={styles.textBelow}>* 0% load fee</span>
                  </div>
                </div>

                <input
                    type="hidden"
                    name="fee"
                    step="0.000001"
                    {...register('fee')}
                    value={loadFee}
                />

                <button type="submit" className="btn withdrwcstm-btn mt-4 col-sm-3"
                        disabled={!!(formState.isSubmitting || errors.amount)}
                >
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
