import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function NotIssued({ user , userdata }) {
  const router = useRouter();

  return (

    <>

<div className="col-md-7 mx-auto mt-5">

<div className="card mx-auto" >
      <div className="card-body">
        <h3 className="card-title text-center mb-4">MY CARDS</h3>
        <p className="card-text text-center">You do not have any card.</p>
        <div className="d-flex justify-content-center">
         
          <Link href={`/user/card-issue`} className="cstm-btn btn w-100">Issue a new card now </Link>
        </div>
      </div>
    </div>
</div>


    </>
  )
}

export { NotIssued };
