import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from "sweetalert2";
function PaymentForm({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
  const [cost, setCost] = useState(600);

  const [balance, setbalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [wallet, setWalletData] = useState(null)
  const [input, setInput] = useState('USD')
  const [ifnotvalid, setIfnotvalid] = useState(false);
  useEffect(() => {
    async function fetchData() {
    
      walletBalance(user);
      
      
    }
    fetchData();

  }, [router])
  const fee = 600;
  const validationSchema = Yup.object().shape({
    currency: Yup.string().nullable()
    .required('Pay solution is required'),
 
  });
  const walletBalance = (user) => {
    userService.walletBalance(user).then((d) => {
         console.log(d.data.wallet)
         const resd = d.data.wallet;
         const order = userService.getCurrencyOrder()
         console.log(resd)
          // Sort the array using the order
          resd.sort((a, b) => order.indexOf(a.currency) - order.indexOf(b.currency));
          resd[2].balance = parseFloat(resd[2].balance.replace(',', ''));
          resd[1].balance = parseFloat(resd[1].balance.replace(',', ''));
          resd[0].balance = parseFloat(resd[0].balance.replace(',', ''));
          resd[3].balance = parseFloat(resd[3].balance.replace(',', ''));
          resd[4].balance = parseFloat(resd[4].balance.replace(',', ''));
          const bal = {
            "USDT" : {
              bal : resd[0].balance.toFixed(6),
              float : 6
            },
            "BTC" : {
              bal : resd[1].balance.toFixed(6),
              float : 6
            },
            "USD" : {
              bal : resd[2].balance.toFixed(2),
              float : 2
            },
            "USDC" : {
              bal : resd[3].balance.toFixed(2),
              float : 2
            },
            "BUSD" : {
              bal : resd[4].balance.toFixed(2),
              float : 2
            },
          }
         setWalletData(bal);
         getBalance(input , bal)
    }).catch((d) => {
      // localStorage.removeItem('user')
      // router.push('/');
      // return null;
    })
  }
  const handleInputChange = (event) => {
    const id = event.target.value

    setInput(event.target.value)
     getBalance(id , wallet)
    setLoading(false)
  };
  const getBalance = (id , wallet) => {
   
    userService.runApi('cryptoPrice/' , user)
    .then((res) => {
        const ress = res.data.cryptocurrencies;
        console.log(ress);
        const filteredData = ress.filter((item) => item.pair.includes(id));
        
        const buy_price = filteredData[0].buy_price;
        const calculatedValue = parseFloat(fee) / parseFloat(buy_price)
        
        calculatedValue > 0 ? setCost(``+calculatedValue.toFixed(wallet[id].float)) : setCost('0.00');
        setbalance(wallet[id].bal);
        if(parseFloat(wallet[id].bal) < parseFloat(calculatedValue)) 
        {
          setError('currency' , {message : `You don't have enough ${id} to buy this`})
          setIfnotvalid(true)
        }
        else{
          setError('currency' , null)
          setIfnotvalid(false)
          
          
        }
        setLoading(true)
    })
    .catch();
 

  };


    const formOptions = {
      resolver: yupResolver(validationSchema), defaultValues: {
        email_address: user.email_address,
        auth_token: user.auth_token, 
        amount : cost
      },
      mode:'onBlur'
  
    };
  
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, setError, setValue  } = useForm(formOptions);
    const { errors } = formState;
  
    function onSubmit(user) {
      return Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to pay?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Pay!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          user.amount = cost;
          return userService.runApi("payCardFee/", user)
          .then((res) => {
            
            
            if (res.data.result == "success") {
              router.reload()
              
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
      })
      
    }
  return (
    <>
    {user && wallet ? (
    <>
 <div className="col-md-12">
     
               <h4>
                 Your KYC has been approved. Please pay the card issuance fee of $600.
               
               </h4>
             
     </div>
     <hr/>
<div className="col-sm-12">

        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="col-md-12">
            <div className='row'>
                <div className='col-3'>
                  <label htmlFor="inputState" className="form-label">
                  Pay Solution
                  </label>
              
                </div>
                <div className='col-9'>
                  <select id="currency" name="currency"
                    {...register('currency')}
                    onChange={handleInputChange}
                   value={input}
                    className={`form-select ${ifnotvalid ? 'is-invalid' : ''}`}>
                    <option value="USD">USD</option>
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="BUSD">BUSD</option>
                    <option value="BTC">BTC</option>
                  
                </select>
                <div className="invalid-feedback">{errors.currency?.message}</div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className='row'>
                <div className='col-3'>
                  <label htmlFor="inputState" className="form-label">
                  Pay Amount
                  </label>
              
                </div>
                <div className='col-9'>
                  <h6>{cost} {input}</h6>
                  <input type='hidden' {...register('amount')} value={cost}/>
                  <p>Your balance : {balance} {input} </p>
              </div>
            </div>
              
              
          </div>
          <div className="col-12">
            <div className="row">
              
              <div className="col-md-6 m-auto nav nav-tabs" id="myTab" role="tablist">
             
              
                <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                  Pay Now
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>): (
      <p>Loading...</p>
    )}
    </>
  )
}

export { PaymentForm };
