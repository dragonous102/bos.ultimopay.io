import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function CardDetails({ user , userdata , kycData }) {
  const router = useRouter();
 
console.log('kycData details' , kycData)

const getStatusLabel = (status) => {
  switch(status) {
    case 0:
      return <span className='badge bg-info ms-3'>Not Activation</span>;
    case 1:
      return <span className='badge bg-warning ms-3'>Pending</span>;
    case 2:
      return <span className='badge bg-success ms-3'>Activated</span>;
    case 9:
      return <span className='badge bg-danger ms-3'>Denied</span>;
    default:
      return '';
  }
};

  return (

    <>
{kycData ?
<div className="col-md-7 mx-auto mt-5">
<div className="card mx-auto" >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">MY CARDS</h3>
          <strong>Activation Status:</strong>{getStatusLabel(parseInt(kycData.card_activation_status))}
          <hr/>
          <div className="card-text ">A/c name : {userdata.name}</div>
          <div className="card-text ">A/c no. : {userdata.bank_account_number}</div>
          <div className="card-text ">Card no. : {'*' + userdata.card_number.slice(-4).padStart(userdata.card_number.length, '*')}</div>
        
          <div className="card-text ">Card display name : {userdata.card_emboss_name}</div>
        </div>
      </div>
</div>
: `Loading` }
    </>
  )
}

export { CardDetails };


