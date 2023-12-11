import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function AllComplete({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();

  return (

    <>

<div className="col-md-7 mx-auto mt-5">

<div className="card mx-auto" >
      <div className="card-body">
        <h3 className="card-title text-center mb-4">You Have Already Issued a Card</h3>
        <p className="card-text text-center">Your card has been activated and is ready to use.</p>
        <div className="d-flex justify-content-center">
          <Link href={`/user/my-card`} className="btn btn-primary w-100 me-2">My Card</Link>
          <Link href={`/user/card/load`} className="btn btn-secondary w-100">Load</Link>
        </div>
      </div>
    </div>
</div>


    </>
  )
}

export { AllComplete };
