import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm , useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

function PaidSuccess({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [activateForm, setActivateForm] = useState(false);
  const handleImageUpload = (event, index) => {
    const { name, files } = event.target;
    const file = files[0];
   
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];

    if (!file) {
      validationSchema
      .validateAt(name, { file })
      .then(() => {
        console.log('File is valid');
      })
      .catch((error) => {
        console.log(error.message);
      });
      const newImages = [...images];
      newImages[index] = '';
      setImages(newImages);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      validationSchema
      .validateAt(name, { file })
      .then(() => {
        console.log('File is valid');
      })
      .catch((error) => {
        console.log(error.message);
      });

      const newImages = [...images];
      newImages[index] = '';
      setImages(newImages);
      return;
    }

    if (file.size > maxSize) {
      validationSchema
      .validateAt(name, { file })
      .then(() => {
        console.log('File is valid');
      })
      .catch((error) => {
        console.log(error.message);
      });

      const newImages = [...images];
      newImages[index] = '';
      setImages(newImages);
      return;
    }
    const url = URL.createObjectURL(file);
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
  };
  function activateCard() { 
   setActivateForm(true)
  }
    const validationSchema = Yup.object().shape({
      debit_selfie: Yup.mixed()
        .required('Selfie is required')
        .test("fileType", "Selfie is required", (value) => {
          console.log(value.length);
          if (value.length == 0)
          {
            return false // attachment is optional
          } 
          else{
            return true
          }
          
        })
        .test("fileSize", "The file is too large", (value) => {
          if (!value.length) return false // attachment is optional
          return value[0].size <= 10000000
        })
        .test("fileType", "Only JPEG, PNG, HEIC files are accepted", (value) => {
          if (!value.length) return false // attachment is optional
          return value[0].type === "image/jpeg" ||
          value[0].type === "image/png" ||
          value[0].type === "image/heic"
        })
    });
    const formOptions = {
      resolver: yupResolver(validationSchema), defaultValues: {
        email_address: user.email_address,
        auth_token: user.auth_token,
        
      },
      mode:'onBlur'
  
    };
  
    // get functions to build form with useForm() hook
    const { register, handleSubmit, control  ,formState, setError, setValue  } = useForm(formOptions);
    const { errors } = formState;      
    async function  onSubmit(frm) {
      const formData = new FormData();
      formData.append("email_address" , frm.email_address);
      formData.append("debit_selfie" , frm.debit_selfie[0]);
      return fetch('/bos_pdf_api/scripts/upload_selfie.php', {
        method: 'POST',
       
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (!user.status) {
          user.status = {};
        }
         user.status['card_activation_file_url'] = data.debit_selfie;
         user.status['card_activation_status'] = 1;
         user.status['card_activation_upload_date'] = data.upload_date;
         userService.runApi("updateUserStatus/", user)
          .then((res) => {
            router.reload()
          })
    
         console.log(data);
         console.log(user);
      })
      .catch(error => {
        console.error(error);
      });
    }        
   
  return (

    <>


{activateForm ? 
<div className="row justify-content-center">
      <div className="col-md-8">
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <div className="card">
         
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Activate Your Debit Card</h3>
            <p className="card-text">Have you already received the debit card sent to your residence address? If so, you have to activate it before you can use it.</p>
            <p className="card-text">* Use one hand to keep both debit eard and passport / ID like below examole</p>
            <p className="card-text" style={{color: "#FF0000"}}>* Please make sure the side with the card number is visible in the selfie image.</p>
            <div className='preview-image'><img src="/assets/img/selfieavatar.png" style={{
              height: 180,
              width: 'auto',
            }} /></div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label for="debit-card-photo" className="form-label">Select a selfie photo of you and the debit card you noticed have received</label>
                  <div className="col-md-6 choose-file">
            {images && images[0] ? 
            <div className='preview-image'><img src={images[0]} width={200}/></div>
            : ''}
            <div className="file-inner">
              <i className="bi bi-cloud-arrow-up-fill" />
              <br />
              Click or drag and drop image <br /> file here
              <input
                type="File"
                name="debit_selfie"
                {...register('debit_selfie')}
                className={`form-control ${errors.debit_selfie ? 'is-invalid' : ''}`}
                onChange={(e) => handleImageUpload(e, 0)} 
                id="debit_selfie"
              />
            <div className="invalid-feedback">{errors.debit_selfie?.message}</div>
            </div>
          </div>
            </div>
          </div>
        </div>
        <p className="card-text">Make sure to upload the same ID you used before during. It can take 1-2 working days for this verification step after we receive your selfie photos. We will inform you the result via email, as well as here in your dashboard.</p>
       
        <button type="submit" className="btn withdrwcstm-btn mt-2 float-end" disabled={formState.isSubmitting}>
        Upload and go next ›
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                </button>
      </div>
     
    </div> 
    </form>
  </div>
</div> : 



<div className="col-md-7 mx-auto mt-5">
  <div className="card mx-auto" >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Activate Your Debit Card</h3>
          <p className="card-text text-center">Your card fee has been paid. create your card. Your Debit Card is now on production. Expect the card delivered to your postal address in 10-15 days.</p>
          <h5>Your Postal Address</h5>
          <p className='card-text fw-700'>{userdata.address} , {userdata.city}, {userdata.province}, {userdata.postal_code} , {userdata.country}</p>
          <p className='card-text'>Once you have recieved your card, please activate it.</p> 
          <button type="button" className='btn cstm-btn ' onClick={() => activateCard()}> Activate </button>
        </div>
      </div>
</div>
}
    </>
  )
}

export { PaidSuccess };
