import Link from 'next/link'
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {userService} from '/services';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import { truncateFloat } from './Utils/calc.js';
function UsdtWithdraw({wallet , id , user , twofa}) {
    const router = useRouter();
    const path = router.asPath.split('/');
    
    const fee = 20
     //const bal = 161.7;
     const bal = parseFloat(wallet.data.balance.replace(',', ''));
     const balanceIncFee = bal > 0 ? Math.max(0, truncateFloat((bal - fee) / 1.001, 6)) : 0;
    const [inputValue, setInputValue] = useState(0);
    const [result, setResult] = useState(false);
    const [ifnotvalid, setIfnotvalid] = useState(true);
    const [title, setTitle] = useState('');
    
    const [address, setaddress] = useState('');
    const minimum = 70 ;
    const handleInputChange = (event) => {
      setIfnotvalid(false)
      setError('amount' , null)
      const newValue = event.target.value;
      const decimalDigits = newValue.split(".");
      const isFloat = newValue.toString().includes(".");
      if (!isNaN(newValue)) {
        if(isFloat && decimalDigits[1].length > 6)
        {
          console.log(newValue);
        
          setInputValue(parseFloat(newValue).toFixed(6));
        }else{
          setInputValue(newValue);
        }
        
      }
      console.log('balanceIncFee' ,balanceIncFee);
      if(parseFloat(newValue) >= parseFloat(minimum))
      {
        if(balanceIncFee < parseFloat(newValue))
        {
          console.log(balanceIncFee);

          setError('amount' , {message : `You dont have enough amount to withdraw`})
          setIfnotvalid(true)
        }
        
        // calculate result
      }
      else
      {
        setError('amount' , {message : `Amount should be greater than ${minimum}`})
        setIfnotvalid(true)
      }
      const calculatedValue = truncateFloat(parseFloat(newValue) * 0.001 + fee, 6);
      calculatedValue > 0 ? setResult(calculatedValue +` ${id}`) : setResult(``);

    };
    const handleKeyDown = (event) => {
      if (event.key === '-' || event.key === '+') {
        event.preventDefault(); // prevent '-' or '+' from being entered
      }
      userService.PreventIncrement(event)
    }
    const validationSchema = Yup.object().shape({
      
      address: Yup.string()
            .required('Address field is required'),
      amount: Yup.string()
            .required('Amount is required'),
      
      password: Yup.string()
            .required('Password is required'),
      
      network: Yup.string()
            .required('Network is required'),
      
      two_fa_code: Yup.string()
            .required('2FA Code is required'),
      
    });
    const formOptions = { resolver: yupResolver(validationSchema) ,defaultValues: {
      email_address:user.email_address,
      auth_token:user.auth_token,
      currency:id,
      amount:inputValue,
      address:'',
    }};

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState , setError } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
      if(inputValue >= minimum)
      {
        if(balanceIncFee < inputValue)
        {
          console.log(balanceIncFee);

          setError('amount' , {message : `Amount exceeds available for withdrawal.`})
          //return false;
          
        }
        
        // calculate result
      }
      else
      {
        setError('amount' , {message : `Amount should be greater than ${minimum}`})
        //return false;
      }

      return Swal.fire({
        title: `Do you really want to Withdraw ${inputValue} USDT?`,
        // html: `You Pay ${result} USD<br><em>The amount may vary slightly depending on the fluctuation.</em>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) 
        { 
          userService.showLoader(true)

        return userService.runApi(`withdraw/` , user)
            .then((res) => {
              userService.showLoader(false)
                console.log(res.data);
                if(res.data.result === 'success')
                {
                  
                  const response = res.data.withdrawResponse
                  toast.success('Withdrawal request has been sent successfully' , {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  setaddress(response.address)
                  openModal()
                  // Send email using the server-side API route
                  fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      currency: id,
                      address: response.address,
                      amount: inputValue,
                      email: user.email_address,
                    }),
                  })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
                else
                {
                  toast.error(res.data.error.errorMessage , {
                    position: toast.POSITION.TOP_RIGHT
                  });
                }
                
            })
            .catch((res) => {
              userService.showLoader(false)
              if(res.response.data.error.errorCode == 16)
              {
                toast.error('Invalid Password' , {
                  position: toast.POSITION.TOP_RIGHT
                });
              }
              else{
                toast.error(res.response.data.error.errorMessage , {
                  position: toast.POSITION.TOP_RIGHT
                });
              }
             
            });
          }
        })
    }
    const openModal = () => {
      const modal = document.getElementById('exampleModal');
        
      modal.classList.add('show')
      modal.style.display = 'block'
      document.body.classList.add('modal-open')
  
      const backdrop = document.createElement('div')
      backdrop.classList.add('modal-backdrop', 'fade', 'show')
      document.body.appendChild(backdrop)
    }
      const closeModal = () => {
      const modal = document.getElementById('exampleModal');
      modal.classList.remove('show')
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')

      const backdrop = document.querySelector('.modal-backdrop')
      backdrop.parentNode.removeChild(backdrop)
      router.reload();
      }
      useEffect(() => {
        async function fetchData() {
         
          setTitle(` Teather`);
          //setTimeout(openModal, 2000)
        }
    
        fetchData();
    
      }, [])

      const handleUserChange = (event) => {
        const val = event.target.value;
       if(val)
       {
          setError('network' , false)
          errors.network = false;
          const array = val.split("_");
          const lastElement = array[array.length - 1];
          setTitle(` USDT(${lastElement})`);
       }
       else{
        
        setTitle(` Teather`);
       }
      
  
      }
    return (
        <>
            <div className="container-fluid px-4">
  <div className="row pe-4 ps-5 pt-5 pb-5">
    <div className="col-xl-12 col-md-6">
      {/* Sidebar Toggle*/}
     
      {twofa != 'enabled' ? ( <>
      <img src="/assets/img/redio.png" width="20px;" className="me-3" />
      <label className="mt-1 me-3">
        You have to turn on 2-Factor Authentication in order to make any
        withdrawals. <Link href="/user/2fa"> Turn on 2-Factor Authentication now. </Link>
      </label> </>) : ('')}
    </div>
    <div className="col-sm-10 mt-4 tbl-s">
      <p>
        <b>IMPORTANT NOTICE</b>
      </p>
      <table>
        <tbody>
          <tr>
            <td>Minimum withdrawal amount</td>
            <td>{minimum} {id} </td>
          </tr>
          <tr>
            <td>Withdrawal fee </td>
            <td><div className="tbl-wdth" >{result ? (result) : (`${fee} ${id} + 0.1% of withdraw amount`)}</div> </td>
            
          </tr>
          <tr>
            <td>Available amount for withdrawal </td>
            <td>{balanceIncFee.toFixed(6)} {id} </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="col-sm-12 mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="mt-5">
            <b>Network </b>
          </h4>
          
            <div className="mb-3">
              <select
                name="network"
                {...register('network')} className={`form-control ${errors.network ? 'is-invalid' : ''}`}  
                onChange={handleUserChange}
                id="we"
                defaultValue=""
              
              >
              <option value="">--Select Network--</option>
              <option value={`ETHEREUM_ERC20`}>Ethereum (ERC20)</option>
              <option value={`TRON_TRC20`}>Tron (TRC20)</option>
              <option value={`BNB_SMART_CHAIN_BEP20`}>BNB Smart Chain (BEP20)</option>
              </select>
              <div className="invalid-feedback">{errors.network?.message}</div>
              <div className='mt-3'>Please note that you do not mistake the network if you withdraw via another network your assets may be lost.
</div>
              </div>
      <h4>
        <b>AMOUNT</b>
      </h4>
      <div className="d-flex position-relative">
        <div className='w-100'>
          <input onKeyDown={handleKeyDown}  
          name="amount" step="0.0000001" 
          {...register('amount')} className={`amount-price rounded-0 ${ifnotvalid ? 'is-invalid' : ''}`}  
          type="text"
          
          value={inputValue} 
          onChange={handleInputChange}
          />
          <div className="invalid-feedback">{errors.amount?.message}</div>
        </div>
        
        <span className="input-group-text rounded-0" id="basic-addon2">
          {id}
        </span>
      </div>
      
      
      <h4 className="mt-5">
        <b>USDT address </b>
      </h4>
      
        <div className="mb-3">
          <input
            type="text"
            name="address"
            {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder={`Enter ${title} address`}
          />
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>
        <h4 className="mt-5">
        <b>2FA Code </b>
        </h4>
      
        <div className="mb-3">
          <input
            type="text"
            name="two_fa_code"
            {...register('two_fa_code')} className={`form-control ${errors.two_fa_code  ? 'is-invalid' : ''}`}
            id="two_fa_code"
            aria-describedby="emailHelp"
            placeholder="Enter 2FA Code"
          />
          <div className="invalid-feedback">{errors.two_fa_code ?.message}</div>
        </div>
        <h4 className="mt-5">
        <b>Password </b>
        </h4>
      
        <div className="mb-3">
          <input
            type="password"
            name="password"
            {...register('password')} className={`form-control ${errors.password  ? 'is-invalid' : ''}`}
            id="password"
            aria-describedby="emailHelp"
            placeholder="Enter Password"
          />
          <div className="invalid-feedback">{errors.password ?.message}</div>
        </div>
        {twofa == 'enabled' ? (<button type="submit" className="btn withdrwcstm-btn col-sm-3" disabled={formState.isSubmitting || ifnotvalid }>
           WITHDRAW {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        </button>) : (<button type="submit" className="btn withdrwcstm-btn col-sm-3" disabled>
          WITHDRAW {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
        </button>) }
        <span className='mx-2'>Withdrawal requests are processed daily at 9:00 UTC.</span>
        
      </form>
    </div>
  </div>
</div>
<div
  className="modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header bg-mdl-ttl">
        <h5 className="modal-title text-center w-100" id="exampleModalLabel">
        Confirmation
        </h5>
      </div>
      <div className="modal-body">
        <p>The following withdrawal requests have been completed</p>
        <p>Amount: {inputValue} {id}</p>
        <p>Address: {address}</p>
        
        <p>A confirmation email has been sent to<br/>
          <span className='text-primary'>{user.email_address}</span><br/>
          Please confirm it and reply the email.</p>
          <p> After confirmation  your withdrawal
          will be processed at 9:00 UTC so please wait patiently.
        </p>
        
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>
        </>
    )
  }
  
  export default UsdtWithdraw;
