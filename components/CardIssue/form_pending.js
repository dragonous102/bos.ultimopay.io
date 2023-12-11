import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function FormPending({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
 function resetDoc() { 
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will reset your document.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reset it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      user.status = {};
      user.status.kyc_status = "0";
      user.status.card_activation_status = "0";
      user.status.card_status = "0";
      user.status.payment_status = "0";
      userService.runApi("updateUserStatus/", user)
          .then((res) => {
            router.reload()
          })
    }
  })
    
          
  }
  return (

    <>

<div className="col-md-7 mx-auto mt-5">
  <div className="card mx-auto" >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">KYC Pending</h3>
          <p className="card-text text-center">We are checking your submitted documents.You will receive results within 24 hours.</p>
          <div className='d-flex justify-content-between'>
            <a target='_blank' href={userdata.kyc_file_url}>Check Your documentation</a>
            <a href="#" onClick={() => resetDoc()}>Reset Your documentation</a>
          </div>
        </div>
      </div>
</div>
 

    </>
  )
}

export { FormPending };
