import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function PostSuccess({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
  function resetDoc() { 
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will reset your activation process.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        user.status = {};
       
        user.status.card_activation_status = "0";
       
        userService.runApi("updateUserStatus/", user)
            .then((res) => {
              router.reload()
            })
      }
    })
      
            
    }
  return (

    <>

<div className="col-md-7  mx-auto mt-5">

<div className="card mx-auto" >
      <div className="card-body">
        <h3 className="card-title text-center mb-4">Your Debit Card Activation Request is Under Review</h3>
        <p className="card-text">We will inform you the result via email, or here in your dashboard. Please keep following our updates.</p>
        <div className='d-flex justify-content-between mb-4'>
          <a target='_blank' href={userdata.card_activation_file_url}>Check Your Activation Image</a>
          <a href="#" onClick={() => resetDoc()}>Reset Your activation Process</a>
        </div>
        <p className="card-text"><strong>About PIN Code:</strong><br/>The PIN code is enclosed in the same envelope as the card. Please open the bag binding of the enclosed documents and check.</p>
        <p className="card-text"><strong>Notes:</strong><br/>Do not disclose your PIN code to anyone. Do not write down the PIN code on your card. It may be used if the card is lost. If you do not know your PIN code, it can be reissued.</p>
        <hr/>
        <p className="card-text"><strong>Activate Your Debit Card</strong><br/>Please note that reissuance will incur a fee and may take time.</p>
      </div>
    </div>
</div>


    </>
  )
}

export { PostSuccess };
