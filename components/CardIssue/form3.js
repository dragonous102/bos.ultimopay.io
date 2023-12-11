import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignaturePad from 'signature_pad';
import { Modal } from "react-bootstrap";
import { userService, alertService } from '/services';

function Form3({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
  const [imageData, setImageData] = useState(form2.pdf_data.application_form_1_screenshot_page_1_url);
  const [imageData6, setImageData6] = useState(form2.pdf_data.application_form_1_screenshot_page_2_url);
  const [imageData2, setImageData2] = useState(form2.pdf_data.application_form_2_screenshot_page_1_url);
  const [imageData3, setImageData3] = useState(form2.pdf_data.application_form_2_screenshot_page_2_url);
  const [imageData4, setImageData4] = useState(form2.pdf_data.application_form_2_screenshot_page_3_url);
  const [imageData5, setImageData5] = useState(form2.pdf_data.application_form_2_screenshot_page_4_url);
 
  const [sign1, setSign1] = useState(false);
  const [sign2, setSign2] = useState(false);
  const [activePad, setactivePad] = useState(1);
  const [signpad, setSignPad] = useState(null);
 
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal Title");
  const [imageSrc, setImageSrc] = useState("");

  const handleImageClick = (src , title) => {
    setShowModal(true);
    setImageSrc(src);
    // set the modal title dynamically based on the image source
    setModalTitle(`${title}`);
  };

console.log('form2' , form2)
  useEffect( () => {
    // Generate the image of the PDF HTML using html-to-image
    
    
  }, []);

const validationSchema = Yup.object().shape({
 
 
});

  const formOptions = {
    resolver: yupResolver(validationSchema), defaultValues: {
      email_address: user.email_address,
      auth_token: user.auth_token,
     
    },
    mode:'onBlur'

  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, setError, setValue  } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit() {
      if(sign1 && sign2)
      {
        return fetch('/bos_pdf_api/scripts/upload_doc.php', {
          method: 'POST',
         
          body: form2.formData2
        })
        .then(response => response.json())
        .then(data => {
          
          console.log(data);
          const currentDate = new Date();
          user.status = {
            "kyc_status" : "1",
            "card_activation_status" : "0",
            "card_status" : "0",
            "payment_status" : "0",
            "kyc_file_url" : data.application_form_final_url,
            "kyc_upload_date" : userService.getDatePhpFormat(currentDate),
            
          }
          userService.runApi("updateUserStatus/", user)
          .then((res) => {
            router.reload()
          })
          
          
        })
        .catch(error => {
          console.error(error);
        });
      }
      else{
        
        return toast.error('E-signature is required' , {
          position: toast.POSITION.TOP_RIGHT
        });
      }
        
  }
  const openSignaturePad = (activePad) => {
    setactivePad(activePad);
    const modal = document.getElementById('signatureModal');
    const mdBody = document.getElementById('mdBody');
    const canvas = document.querySelector('#signature-pad');
    modal.classList.add('show')
    modal.style.display = 'block'
    document.body.classList.add('modal-open')
    
    const backdrop = document.createElement('div')
    backdrop.classList.add('modal-backdrop', 'fade', 'show')
    document.body.appendChild(backdrop)
      const modalWidth = mdBody.offsetWidth;
      canvas.width = modalWidth -20;

    const signaturePad = new SignaturePad(canvas);
    setSignPad(signaturePad)
    const clearButton = document.querySelector('#clear-button');

    clearButton.addEventListener('click', () => {
        signaturePad.clear();
    });
    
}
const closeModal = async () => {
  const modal = document.getElementById('signatureModal');
  const myBtn = modal.querySelector('#myBtn');
  myBtn.textContent = 'Saving Signature...';
  myBtn.disabled = true;

  const canvas = document.querySelector('#signature-pad');
  const signatureImage = canvas.toDataURL(); // Get signature image data
  if (signpad.isEmpty()) {
    myBtn.textContent = 'Done';
    myBtn.disabled = false;
    return toast.error('Please sign the document' , {
      position: toast.POSITION.TOP_RIGHT
    });

  }

  console.log('activePad' , activePad)
  const formData = new FormData();
  formData.append('mydata', signatureImage);
  formData.append('profile', "unique");
  formData.append('whichform', activePad);
  formData.append('email_address', form2.profile.email_address);
  formData.append('direction', 'landscape');

  await fetch('/bos_pdf_api/scripts/test_uploader.php', {
    method: 'POST',
   
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    
     console.log(data);
     if(activePad == 1)
     {
      setImageData(data.form1_page1_screenshot)
      setImageData6(data.form1_page2_screenshot)
      setSign1(true)
     }
     else{
      setImageData2(data.form2_page1_screenshot)
      setImageData5(data.form2_page4_screenshot)
      setSign2(true)
     }
     
     myBtn.textContent = 'Done';
     myBtn.disabled = false;
      modal.classList.remove('show')
      modal.style.display = 'none'
      document.body.classList.remove('modal-open')

      const backdrop = document.querySelector('.modal-backdrop')
      backdrop.parentNode.removeChild(backdrop)
  })
  .catch(error => {
    console.error(error);
    myBtn.textContent = 'Done';
    myBtn.disabled = false;
  });
  

}
  return (

    <>

<div className="col-12">

  <form
    
    method="post"
    onSubmit={handleSubmit(onSubmit)}
  >
    <div style={{ width: "100%", margin: "15px 0px", padding: "0px 5px" }}>
      <div
        className="container-xxl container-p-y main_container"
        style={{
          margin: "0px 0px !important",
          padding: "10px 10px !important"
        }}
      >
        <div className="row">
          <div className="col-12">
            <div
              id="issueCardInform"
              style={{
                transition: "all 0.5s ease-in-out",
                marginTop: 0,
                textAlign: "left",
                color: "#fff",
                fontSize: "1.0em",
                fontWeight: 300,
                width: "100%",
                lineHeight: "1.5 !important"
              }}
            >
              Please read carefully and sign 2 application forms below.
              <br />
            </div>
          </div>
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ textAlign: "center" }}
          >
            <div
              id="upload-doc-notice"
              style={{
                transition: "all 0.5s ease-in-out",
                borderRadius: 10,
                textAlign: "left",
                border: "2px solid white",
                backgroundColor: "red",
                padding: "8px 8px",
                color: "white",
                fontSize: "0.9em",
                width: "100%",
                display: "none",
                marginTop: 20,
                fontWeight: 900
              }}
            ></div>
          </div>
        </div>
        {/*begin form 1 sign */}
        <div className="row">
          <div className="col-12">
            <div
              style={{
                transition: "all 0.5s ease-in-out",
                marginTop: 10,
                textAlign: "left",
                color: "#fff",
                fontSize: "1.0em",
                fontWeight: 300,
                width: "100%",
                lineHeight: "1.5 !important",
                borderBottom: "1px solid white"
              }}
            >
              Application Form 1 (Application for Openning Account)
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="container-fluid main_container"
              style={{
                margin: "0px 0px !important",
                padding: "0px 0px !important"
              }}
            >
              <div className="row">
                <div className="col-md-8">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 500,
                      overflowY: "auto",
                      overflowX: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "block",
                        height: "auto",
                        backgroundColor: "#fff"
                      }}
                    >
                     <a
                      href="#0"
                      onClick={() => handleImageClick(imageData , 'Application form 1')}
                      style={{
                        width: "auto !important",
                        lineHeight: "1.5 !important"
                      }}
                    >
                      {/* Display the image of the PDF HTML using next/image */}
                      {imageData && (
                        <img
                          className="img-fluid img_data"
                          id="application-2-screenshot"
                          src={imageData}
                          alt="PDF"
                          width={600}
                          height={800}
                          layout="intrinsic"
                        />
                      )}
                    </a>
                    <hr />
                      <a
                        href="#0"
                        onClick={() => handleImageClick(imageData6 , 'Application form 2')}
                      >
                        <div style={{ width: "100%" }}>
                          
                          {imageData6 && (
                          <img
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData6}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a>
                    
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4"
                  style={{
                    color: "#fff !important",
                    paddingTop: "0px !important",
                    marginTop: "0px !important"
                  }}
                >
                  <div style={{ height: "100%", marginTop: 0, paddingTop: 0 }}>
                    <div
                      style={{
                        width: "100%",
                        padding: "5px 5px",
                        textAlign: "left"
                      }}
                    >
                      There are 2 positions in this application form that you
                      have to sign.
                      <br />
                      You have to sign your full name (same as it appears in
                      your passport/ID) inside red frames as shown on the
                      application form.
                      <p align="center">
                        
                      </p>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        padding: "5px 5px",
                        textAlign: "center"
                      }}
                    >
                      <button
                        className="md-trigger-1 btn btn-outline-success btncustom"
                        style={{ width: "100% !important" }}
                        data-modal="modal-12"
                        onClick={() => openSignaturePad(1)}
                        type='button'
                      >
                        Sign this application form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*end form 1 sign */}
        {/*begin form 2 sign */}
        <div className="row" style={{ height: "30px !important" }} />
        <div className="row">
          <div className="col-12">
            <div
              style={{
                transition: "all 0.5s ease-in-out",
                marginTop: 10,
                textAlign: "left",
                color: "#fff",
                fontSize: "1.0em",
                fontWeight: 300,
                width: "100%",
                lineHeight: "1.5 !important",
                borderBottom: "1px solid white"
              }}
            >
              Application Form 2 (Application of International Card Member)
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 main_container">
            <div
              className="container main_container"
              style={{
                margin: "0px 0px !important",
                padding: "0px 0px !important"
              }}
            >
              <div className="row">
                <div className="col-md-8">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 500,
                      overflowY: "auto",
                      overflowX: "hidden"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "block",
                        height: "auto",
                        backgroundColor: "#fff"
                      }}
                    >
                      <a name="applicaton-form-2-page-1-neo"></a>
                      <a
                        href="#0"
                        
                        onClick={() => handleImageClick(imageData2 , 'Application form 2')}
                       
                      >
                        <div style={{ width: "100%" }}>
                        {imageData2 && (
                          <img
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData2}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a>
                      <hr />
                      <a
                        href="#0"
                        onClick={() => handleImageClick(imageData3 , 'Application form 2')}
                      >
                        <div style={{ width: "100%" }}>
                          
                          {imageData3 && (
                          <img
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData3}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a>
                      <hr />
                      <a
                        href="#0"
                        onClick={() => handleImageClick(imageData4 , 'Application form 2')}
                      >
                        <div style={{ width: "100%" }}>
                        {imageData4 && (
                          <img
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData4}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a>
                    
                      <hr />
                      <a
                        href="#0"
                        onClick={() => handleImageClick(imageData5 , 'Application form 2')}
                      >
                        <div style={{ width: "100%" }}>
                        {imageData5 && (
                          <img
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData5}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a>
                    
                      
                    
                      <hr />
                     
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-4"
                  style={{
                    color: "#fff !important",
                    margin: "0px 0px !important",
                    padding: "0px 0px !important"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      marginTop: 0,
                      padding: "5px 10px"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        padding: "5px 5px",
                        textAlign: "left"
                      }}
                    >
                      There are 2 positions in this application form that you
                      have to sign (
                     
                        page 1
                     
                      and{" "}
                      
                        page 4
                      
                      )<br />
                      You have to sign your full name (same as it appears in
                      your passport/ID) inside red frames as shown on the
                      application form.{" "}
                      <p align="center">
                        
                      </p>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        padding: "5px 5px",
                        textAlign: "center"
                      }}
                    >
                       <button
                        className="md-trigger-1 btn btn-outline-success btncustom"
                        style={{ width: "100% !important" }}
                        data-modal="modal-12"
                        onClick={() => openSignaturePad(2)}
                        type='button'
                      >
                        Sign this application form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12"
            style={{
              margin: "0px 0px !important",
              padding: "20px 10px !important",
              color: "#fff"
            }}
          >
            Once you have signed both application forms, click "Proceed to next
            step" button.{" "}
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5"
            style={{
              textAlign: "left !important",
              margin: "0px 0px !important",
              padding: "10px 10px !important"
            }}
          >
            <Link
              href="javascript:;"
             
              onClick={() => onNextClick(form1, 1)}
              className="linkex4"
            >
              <i className="fas fa-chevron-left" />
              &nbsp;Edit profile{" "}
            </Link>
          </div>
        </div>
         <div className="col-12">
                        <div className="row">
                            <div className="col-md-6 m-auto nav nav-tabs" id="myTab" role="tablist">

                                <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                                    Proceed to Next Step
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                </button>
                            </div>
                        </div>
                    </div>
      </div>
    </div>
  </form>
</div>
<div
  className="modal fade"
  id="signatureModal"
  tabIndex={-1}
  aria-labelledby="signatureModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header bg-mdl-ttl">
        <h5 className="modal-title text-center w-100" id="signatureModalLabel">
          Signature Pad
        </h5>
      </div>
      <div className="modal-body" id="mdBody">
      <canvas id="signature-pad" width="600" height=""></canvas>

      </div>
      <div className="modal-footer">

        <button
          type="button"
          id='clear-button'
          className="btn btn-danger"
          
        >
          Clear
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="myBtn"
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          DONE
        </button>
      </div>
    </div>
  </div>
</div>
<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                      <Modal.Header closeButton style={{ backgroundImage: "linear-gradient(#0069B3,#2CBACE,#2F95D3)" }}>
                        <Modal.Title>{modalTitle}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {imageSrc && (
                          <img
                            className="img-fluid"
                            src={imageSrc}
                            alt="Image"
                           
                            layout="intrinsic"
                          />
                        )}
                      </Modal.Body>
                    </Modal>
    </>
  )
}

export { Form3 };
