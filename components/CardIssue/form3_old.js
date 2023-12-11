import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';
import Image from "next/image";
import {Pdf1 , Pdf2 , Pdf3, Pdf4 , Pdf5 , Pdf6, Pdf7, Pdf8} from "/components/pdf";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SignaturePad from 'signature_pad';

function Form3({ user, form2 , userdata , form1 , onNextClick}) {
  const router = useRouter();
  const [imageData, setImageData] = useState(null);
  const [imageData2, setImageData2] = useState(null);
  const [imageData3, setImageData3] = useState(null);
  const [imageData4, setImageData4] = useState(null);
  const [imageData5, setImageData5] = useState(null);
  const [imageData6, setImageData6] = useState(null);
  const [imageData7, setImageData7] = useState(null);
  const [imageData8, setImageData8] = useState(null);
  const [IsGenerated, setIsGenerated] = useState(false);
  const [activePad, setactivePad] = useState(1);
 
  const [dynamicData, setdynamicData] = useState(null);
  const [dynamicData2, setdynamicData2] = useState(null);

console.log('form2' , form2)
  useEffect( () => {
    // Generate the image of the PDF HTML using html-to-image
     generateImage(1);
     generateImage(2);
     generateImage(3);
     generateImage(4);
     generateImage(5);
     generateImage(6);
     if(form2.id_type == '2')
     {
      generateImage(7);
     }
     generateImage(8);
    
    
  }, []);

  const createPDF = () => {
    // const doc = new jsPDF();
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      putOnlyUsedFonts: true,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10
    });
    // Add each image as a new page 
    const imgWidth = doc.internal.pageSize.width - 40; // subtract 40 pixels for padding
    const imgHeight = doc.internal.pageSize.height * imgWidth / doc.internal.pageSize.width;
    if (imageData) {
     

      doc.addImage(imageData, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData2) {
      doc.addImage(imageData2, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData3) {
      doc.addImage(imageData3, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData4) {
      doc.addImage(imageData4, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData5) {
      doc.addImage(imageData5, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData6) {
      doc.addImage(imageData6, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData7) {
      doc.addImage(imageData7, 'PNG', 20, 20, imgWidth, imgHeight);
      doc.addPage();
    }
    if (imageData8) {
      doc.addImage(imageData8, 'PNG', 20, 20, imgWidth, imgHeight);
    }
    doc.deletePage(doc.getNumberOfPages());

    // Save the PDF
    const pdfBytes = doc.save();
    savePdf(pdfBytes)
      .then((data) => {
        console.log(data); // Handle response from server-side
      })
      .catch((error) => {
        console.log(error); // Handle error
      });
    
  }
  const savePdf = async (pdfBytes) => {
    const response = await fetch('/api/savePdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pdfBytes })
    });
    const data = await response.json();
    return data;
  };
  const generateImage = async (num , is_first=false) =>{
    
    const pdf1Node = document.getElementById("pdf"+num);
    // Append the div to the body before capturing
    pdf1Node.classList.remove("hidden")
    document.body.insertBefore(pdf1Node, document.body.firstChild);
   
    const canvas = await html2canvas(pdf1Node);
    pdf1Node.classList.add("hidden")

    const dataUrl = canvas.toDataURL('image/png');
    if(num == 1)
    {
      setImageData(dataUrl);
       
    }
    else if(num == 2){
      setImageData2(dataUrl);
       
    }
    else if(num == 3){
      setImageData3(dataUrl);
       
    }
    else if(num == 4){
      setImageData4(dataUrl);
       
    }
   
    else if(num == 5){
      setImageData5(dataUrl);
       
    }
    else if(num == 6){
      setImageData6(dataUrl);
       
    }
    else if(num == 7){
      setImageData7(dataUrl);
       
    }
   
    else if(num == 8){
      setImageData8(dataUrl);
      
       
    }
   
    if(!is_first)
    {
      
    }
    else{
      generateImage(num);
      
    }
      
    
  }

const validationSchema = Yup.object().shape({
  id_card_select: Yup.string().nullable()
    .required('ID Card type is required'),
 
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

  function onSubmit(user) {
    console.log(user)
    return '';
  }
  const openSignaturePad = (activePad) => {
    setactivePad(activePad);
    const modal = document.getElementById('signatureModal');
    const canvas = document.querySelector('#signature-pad');
    const signaturePad = new SignaturePad(canvas);
    const clearButton = document.querySelector('#clear-button');

    clearButton.addEventListener('click', () => {
        signaturePad.clear();
    });
    modal.classList.add('show')
    modal.style.display = 'block'
    document.body.classList.add('modal-open')
    
    const backdrop = document.createElement('div')
    backdrop.classList.add('modal-backdrop', 'fade', 'show')
    document.body.appendChild(backdrop)
}
const closeModal = () => {
  const canvas = document.querySelector('#signature-pad');
  const signatureImage = canvas.toDataURL(); // Get signature image data
  const daata = {
    "sign" : signatureImage
  }
  console.log('activePad' , activePad)
  if(activePad == 1)
  {
    setdynamicData(daata);
    generateImage(1 , true);
    generateImage(6 , true);
  }
  else
  {
    setdynamicData2(daata);
    generateImage(2 , true);
    generateImage(3 , true);
    generateImage(4 , true);
    generateImage(5 , true);
    if(form2.id_type == '2')
     {
      generateImage(7 , true);
     }
   
    generateImage(8 , true);
    
  }
  
  
const modal = document.getElementById('signatureModal');
modal.classList.remove('show')
modal.style.display = 'none'
document.body.classList.remove('modal-open')

const backdrop = document.querySelector('.modal-backdrop')
backdrop.parentNode.removeChild(backdrop)
}
  return (

    <>
{IsGenerated  ? <div className="loader"></div> : <>
<div className="col-12">
  {/*begin main signature main content*/}
  {/* Render the Pdf1 component and pass in the dynamic data */}
  <div className='hidden' >
  
  <Pdf1  dynamicData={dynamicData} userdata={userdata} />
 
  </div>
  <div className='hidden' >
  
  <Pdf2  dynamicData={dynamicData2} userdata={userdata} />
 
  </div>
  <div className='hidden' >
  
  <Pdf3  dynamicData={dynamicData2} userdata={userdata} />
 
  </div>
  <div className='hidden' >
  
  <Pdf4  dynamicData={dynamicData2} userdata={userdata} />
 
  </div>
  
  <div className='hidden' >
  
  <Pdf5  dynamicData={dynamicData2} userdata={userdata} />
 
  </div>
  
  <div className='hidden' >
  
  <Pdf6  dynamicData={dynamicData} userdata={form2} />
 
  </div>
  {(form2.id_type == '2')
     ?
  <div className='hidden' >
  
  <Pdf7  dynamicData={dynamicData2} userdata={form2} />
 
  </div>  : '' }
  
  <div className='hidden' >
  
  <Pdf8  dynamicData={dynamicData2} userdata={form2} />
 
  </div>
  <button onClick={createPDF}>Generate PDF</button>
  <form
    
    method="post"
  >
    <div style={{ width: "100%", margin: "15px 0px", padding: "0px 5px" }}>
      <div
        className="container-xxl container-p-y"
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
              className="container-fluid"
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
                      height: "auto",
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
                        data-bs-toggle="modal"
                        data-bs-target="#af1_enlarge_dialog"
                        style={{
                          width: "auto !important",
                          lineHeight: "1.5 !important"
                        }}
                      >
                        {/* Display the image of the PDF HTML using next/image */}
                        {imageData && (
                          <Image
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
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
          <div className="col-12">
            <div
              className="container"
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
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_1"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData2 && (
                          <Image
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
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_2"
                      >
                        <div style={{ width: "100%" }}>
                          
                          {imageData3 && (
                          <Image
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
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_3"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData4 && (
                          <Image
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
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_3"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData5 && (
                          <Image
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
                      <a
                        href="#0"
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_3"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData6 && (
                          <Image
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
                    
                      <hr />
                      {(form2.id_type == '2')?
                      <a
                        href="#0"
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_3"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData7 && (
                          <Image
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData7}
                            alt="PDF"
                            width={600}
                            height={800}
                            layout="intrinsic"
                          />
                        )}
                        </div>
                      </a> : ''}
                      <hr />
                      <a
                        href="#0"
                        data-bs-toggle="modal"
                        data-bs-target="#af2_enlarge_dialog_3"
                      >
                        <div style={{ width: "100%" }}>
                        {imageData8 && (
                          <Image
                            className="img-fluid"
                            id="application-2-screenshot"
                            src={imageData8}
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
        <div
          className="col-md-7"
          style={{
            margin: "0px 0px !important",
            padding: "10px 10px !important"
          }}
        >
          <button
            type="button"
            className="btn btn-outline-success btncustom"
            id="btn-upload-pdf-v2"
            style={{ width: "100%" }}
          >
            Proceed to next step&nbsp;
            <i className="fas fa-chevron-right" />
          </button>
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
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header bg-mdl-ttl">
        <h5 className="modal-title text-center w-100" id="signatureModalLabel">
          Signature Pad
        </h5>
      </div>
      <div className="modal-body">
      <canvas id="signature-pad"></canvas>

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
          data-bs-dismiss="modal"
          onClick={closeModal}
        >
          DONE
        </button>
      </div>
    </div>
  </div>
</div>
    </>}
    </>
  )
}

export { Form3 };
