import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm , useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';
import { Form3 } from '/components/CardIssue';
import countryList from '/lib/countryList';
import axios from "axios";

function Form2({ user, form1 , form2 ,onNextClick }) {
  const router = useRouter();
  const [years, setYears] = useState([]);
  const [expyears, setExpYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [dates, setDates] = useState([]);
  const [isPassport, setisPassport] = useState(true);
  const options = countryList();
  form2.id_type = (form2.id_type == "ID card") ? "2" : "1";
  console.log(form2.id_type)
  
  useEffect(() => {
    /* set years======== */
    setisPassport((form2.id_type == "2") ? false : true)
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1909 }, (_, i) => 1910 + i);
    setYears(yearsList);
    /* set years for expiration */

    const years = [];
    for (let i = currentYear - 2; i <= currentYear + 27; i++) {
      years.push(i);
    }
    setExpYears(years);
    /* Set monts====== */
    const monthsList = [];
    for (let month = 1; month <= 12; month++) {
      const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        monthsList.push(formattedMonth);
    }
    setMonths(monthsList);

    /* set date===== */
    const datesList = [];
    for (let date = 1; date <= 31; date++) {
      const formattedDate = date < 10 ? `0${date}` : `${date}`;
        datesList.push(formattedDate);
    }
    setDates(datesList);
}, []);
const validationSchema = Yup.object().shape({
  id_type: Yup.string().nullable()
    .required('ID Card type is required'),
  id_number: userService.CommonValidation()
    .required(isPassport ? 'Passport Number is required' : 'ID Number is required'),
   

  id_issue_year: Yup.string()
    .required('ID Issue Year is required'),
  id_issue_month: Yup.string()
    .required('ID Issue Month is required'),
  id_issue_day: Yup.string()
    .required('ID Issue Day is required'),
  id_issue_country: Yup.string()
    .required('ID Issue Country is required'),
  id_expire_year: Yup.string()
    .required('ID Expire Year is required'),
  id_expire_month: Yup.string()
    .required('ID Expire Month is required'),
  id_expire_day: Yup.string()
    .required('ID Expire Day is required'),

  id_selfie: Yup.mixed()
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
    ,

  id_front: Yup.mixed()
    .required('ID front is required')
    .test('fileType', function (value) {
      const { isPassport } = this.parent;
      const message = isPassport ? 'Passport is required' : 'ID front is required';
  
      return value.length === 0 ? this.createError({ message }) : true;
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
    }),
  

    id_back: Yup.mixed().when('isPassport', {
    is: false,
    then: Yup.mixed()
    .required('ID back is required')
    .test("fileType", "ID Back is required", (value) => {
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
    }),
    otherwise: Yup.mixed()

  }),

  photo_is_clear: Yup.bool()
    .oneOf([true], 'Clear photo check is required'),
  selfie_check: Yup.bool()
    .oneOf([true], 'Selfie check is required'),
  id_terms: Yup.bool()
    .oneOf([true], 'ID legible check is required'),
  isPassport: Yup.boolean()
});

  const formOptions = {
    resolver: yupResolver(validationSchema), defaultValues: {
      email_address: user.email_address,
      auth_token: user.auth_token,
      type: 0,
      id_type: "1" ,// set a default value here
      isPassport: isPassport, // set a default value here
      ...form2,
      ...form1
    },
    mode:'onBlur'

  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, control  ,formState, setError, setValue  } = useForm(formOptions);
  const { errors } = formState;
  const issueDay = useWatch({
    control,
    name: "id_issue_day",
    defaultValue: form2.id_issue_day,
  });
const issueYear = useWatch({
    control,
    name: "id_issue_year",
    defaultValue: form2.id_issue_year,
  });
const issueMonth = useWatch({
    control,
    name: "id_issue_month",
    defaultValue: form2.id_issue_month,
  });
  const expireDay = useWatch({
    control,
    name: "id_expire_day",
    defaultValue: form2.id_expire_day,
  });
const expireYear = useWatch({
    control,
    name: "id_expire_year",
    defaultValue: form2.id_expire_year,
  });
const expireMonth = useWatch({
    control,
    name: "id_expire_month",
    defaultValue: form2.id_expire_month,
  });
  console.log(expireYear)
  async function saveImages(imageData, email) {
    try {
      const formData = new FormData();
      formData.append("id_selfie", imageData.id_selfie[0]);
      formData.append("id_front", imageData.id_front[0]);
      formData.append("email", imageData.profile.email_address);
      if(imageData.id_back)
      {
        formData.append("id_back", imageData.id_back[0]);
      }
    
    const res = await fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    });

    console.log(await res.json());
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  async function  onSubmit(user) {
    
    const profile = {
        "id_type":user.id_type,
        "id_number":user.id_number,
        "id_issued_date":`${user.id_issue_year}/${user.id_issue_month}/${user.id_issue_day}`,
        "id_expiration_date":`${user.id_expire_year}/${user.id_expire_month}/${user.id_expire_day}`,
        "id_issuer":user.id_issue_country,
    }

    user.profile = { ...user.profile, ...profile };
    
    console.log(user)
    return userService.runApi("updateProfile/", user)
    .then((res) => {
        
      if (res.data.result == "success") {
        
        const id_selfie = user.id_selfie[0];
        const id_front = user.id_front[0];
        const id_back = (user.id_back) ? user.id_back[0] : [];

        const formData = new FormData();
        const formData2 = new FormData();
        formData.append("profile_title" , user.profile.title);
        formData.append("profile_name_romaji" , user.profile.name);
        formData.append("profile_marriage_status" , user.profile.marriage_status);
        formData.append("profile_country" , user.profile.country);
        formData.append("profile_nationality" , user.profile.nationality);
        formData.append("profile_birthday" , user.profile.birthday);
        formData.append("profile_id_number" , user.profile.id_number);
        formData.append("profile_id_issue_date" , user.profile.id_issued_date);
        formData.append("profile_id_issuer" , user.profile.id_issuer);
        formData.append("profile_id_card_expiration_date" , user.profile.id_expiration_date);
        formData.append("profile_address" , user.profile.address);
        formData.append("profile_city" , user.profile.city);
        formData.append("profile_province" , user.profile.prefecture);
        formData.append("profile_zipcode" , user.profile.postal_code);
        formData.append("profile_cellphone_country_code" , user.profile.cellphone_country_code);
        formData.append("profile_cellphone_number" , user.profile.cellphone_number);
        formData.append("profile_consent_date" , '');
        formData.append("profile_consent_name" , '');
        formData.append("email_address" , user.email_address);
        formData2.append("email_address" , user.email_address);
        formData.append("partition" , "card");
        formData.append("id_card_type" , user.profile.id_type);
        formData.append("occupation_final" , user.profile.occupation);
        formData.append("card_provider_selection" , (user.profile.card_provider == 1) ? "visa" : "unionpay");
        formData.append("name_on_card" , user.profile.name_on_card);
        
        formData2.append('kyc_doc_upload', 'yes');
        formData2.append('document_type', user.profile.id_type);
        if(isPassport == true)
        {
          formData2.append('passport_open', id_front);
          formData2.append('passport_selfie', id_selfie);
        }
        else
        {
          formData2.append('id_card_front', id_front);
          formData2.append('id_card_back', id_back);
          formData2.append('id_card_selfie', id_selfie);
        }
        
        user.formData2 = formData2;
        return fetch('/bos_pdf_api/scripts/profile.php', {
          method: 'POST',
         
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          user.pdf_data = data;
           onNextClick(user, 3)
           console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
        
      }
    })
    .catch((res) => {
          console.log(res)
        Swal.fire({
          title: "Error",
          text: 'Something wrong',
          icon: "error",
        }).then(function (result) {
         
        });
      });
    
    //return '';
}
  const handleIDTypeChange = (event) => {
    const val = event.target.value;
    setValue("id_type", event.target.value);
    errors.id_type = false;
    setError('id_type' , {message : ''});
    setValue('isPassport' , false);
    setisPassport(false);
    if (val == '1') {
      setValue('isPassport' , true);
      setisPassport(true);
    }
   
}
const [images, setImages] = useState([]);

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
  return (

    <>

      <div className="col-sm-12">

        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
          <div className="col-12">
            
          <input type="hidden" name='isPassport' {...register('isPassport')}  />
            <div className="row">
              <label htmlFor="inputState" className="form-label">
                ID Card Type
              </label>
              <div className="selector row">
                <div className="selecotr-item col-md-6 ">
                  
                  <input
                    id="radio1"
                    name="id_type"
                    {...register('id_type')}
                    className={` selector-item_radio ${errors.id_type ? 'is-invalid' : ''}`}
                    type="radio"
                    onChange={handleIDTypeChange}
                    value="1"
                    
                  />
                  <label htmlFor="radio1" className="selector-item_label">
                    Passport
                  </label>
                </div>
                <div className="selecotr-item col-md-6 ">
                  <input
                    id="radio2"
                    name="id_type"
                    {...register('id_type')}
                    className={` selector-item_radio ${errors.id_type ? 'is-invalid' : ''}`}
                    type="radio"
                    onChange={handleIDTypeChange}
                    value="2"
                  />
                  <label htmlFor="radio2" className="selector-item_label">
                    ID (Driving License, etc.)
                  </label>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputZip" className="form-label">
              Name
            </label>
            <h2>{ form1.profile.name } </h2>
            <span>If name on your ID card does not match , please go back to the previous page and try again <Link
              href="javascript:;"
             
              onClick={() => onNextClick(form1, 1)}
              className="linkex4"
            >
              <i className="fas fa-chevron-left" />
              &nbsp;Back to previous {" "}
            </Link></span>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputZip" className="form-label">
              ID Number
            </label>
            <input
              type="text"
              name="id_number"
              {...register('id_number')}
              className={`form-control ${errors.id_number ? 'is-invalid' : ''}`}
              id="id_number"
              placeholder={`Enter ${isPassport ? 'Passport' : 'ID'} Number`}
              
            />
             <div className="invalid-feedback">{errors.id_number?.message}</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="id_issue_year" className="form-label">
              ID Issued Date Year{" "}
            </label>
            <select defaultValue="" id="id_issue_year" name="id_issue_year"
                {...register('id_issue_year')}
                value={issueYear}
                className={`form-select ${errors.id_issue_year ? 'is-invalid' : ''}`}>

                <option value="">----</option>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_issue_year?.message}</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="id_issue_month" className="form-label">
              Month
            </label>
            <select defaultValue="" id="id_issue_month" name="id_issue_month"
                {...register('id_issue_month')}
                value={issueMonth}
                className={`form-select ${errors.id_issue_month ? 'is-invalid' : ''}`}>
                 
                <option value="">----</option>
                {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_issue_month?.message}</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="id_issue_day" className="form-label">
              Day
            </label>
            <select defaultValue="" id="id_issue_day" name="id_issue_day"
                {...register('id_issue_day')}
                value={issueDay}
                className={`form-select ${errors.id_issue_day ? 'is-invalid' : ''}`}>

                <option value="">----</option>
                {dates.map((day) => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_issue_day?.message}</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              ID Expiration Date Year
            </label>
            <select defaultValue="" id="id_expire_year" name="id_expire_year"
                {...register('id_expire_year')}
                value={expireYear} 
                className={`form-select ${errors.id_expire_year ? 'is-invalid' : ''}`}>

                <option value="">----</option>
                {expyears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_expire_year?.message}</div>
          </div>
          <div className="col-md-4">
          <label htmlFor="id_expire_month" className="form-label">
              Month
            </label>
            <select defaultValue="" id="id_expire_month" name="id_expire_month"
                {...register('id_expire_month')}
                value={expireMonth}
                className={`form-select ${errors.id_expire_month ? 'is-invalid' : ''}`}>

                <option value="">----</option>
                {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_expire_month?.message}</div>
          </div>
          <div className="col-md-4">
          <label htmlFor="id_expire_day" className="form-label">
              Day
            </label>
            <select defaultValue="" id="id_expire_day" name="id_expire_day"
                {...register('id_expire_day')}
                value={expireDay}
                className={`form-select ${errors.id_expire_day ? 'is-invalid' : ''}`}>

                <option value="">----</option>
                {dates.map((day) => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <div className="invalid-feedback">{errors.id_expire_day?.message}</div>
          </div>
          <div className="col-md-6">
              <label htmlFor="id_issue_country" className="form-label">
                  ID Issue Country
              </label>
              <select
                  id="id_issue_country"
                  name="id_issue_country"
                  {...register('id_issue_country')} className={`form-select ${errors.id_issue_country ? 'is-invalid' : ''}`}
                  defaultValue={form1.profile.country}

                  
              >
                  <option value="">--None--</option>
                  {options.map(option => (
                      <option key={option.label} value={option.label}>{option.label}</option>
                  ))}
              </select>
              <div className="invalid-feedback">{errors.id_issue_country?.message}</div>
          </div>
          <div className="col-md-12 choose-file">
            <label htmlFor="inputZip" className="form-label">
              Please Select a photo of your passport of the page showing your face with
              full information (passport must be valid for at least 6 month)
            </label>
          </div>
          <div className="col-md-6 choose-file">
            <div>
              {isPassport ? 
              <img
                src="/assets/img/passport.png"
                width="40%"
              />
              :  <img
              src="/assets/img/front.png"
              width="40%"
            />}
            </div>
          </div>
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
                name="id_front"
                {...register('id_front')}
                className={`form-control ${errors.id_front ? 'is-invalid' : ''}`}
                onChange={(e) => handleImageUpload(e, 0)} 
                id="id_front"
              />
            <div className="invalid-feedback">{errors.id_front?.message}</div>
            </div>
          </div>
          {isPassport == false ? (<>
          <div className="col-md-12 choose-file">
            <label htmlFor="inputZip" className="form-label">
              Please Select a photo showing the back side of your ID card
              
            </label>
          </div>
          <div className="col-md-6 choose-file">
            <div>
              <img
                src="/assets/img/back.png"
                width="40%"
              />
            </div>
          </div>
          <div className="col-md-6 choose-file">
          {images && images[1] ? 
            <div className='preview-image'><img src={images[1]} width={200}/></div>
            : ''}
            <div className="file-inner">
              <i className="bi bi-cloud-arrow-up-fill" />
              <br />
              Click or drag and drop image <br /> file here
              <input
                type="File"
                name="id_back"
                {...register('id_back')}
                className={`form-control ${errors.id_back ? 'is-invalid' : ''}`}
                id="id_back"
                onChange={(e) => handleImageUpload(e, 1)} 
              />
            
            <div className="invalid-feedback">{errors.id_back?.message}</div>
            </div>
          </div>
          </>) : <></>}
          <div className="col-md-12 choose-file">
            <label htmlFor="inputZip" className="form-label">
              Please Select a Selfie Photo you and your passport information page
            </label>
          </div>
          <div className="col-md-6 choose-file">
            <div>
              <img
                src="/assets/img/selfie.jpg"
                width="40%"
              />
            </div>
          </div>
          <div className="col-md-6 choose-file">
            {images && images[2] ? 
            <div className='preview-image'><img src={images[2]} width={200}/></div>
            : ''}
            <div className="file-inner">
              <i className="bi bi-cloud-arrow-up-fill" />
              <br />
              Click or drag and drop image <br /> file here
              <input
                type="File"
                name="id_selfie"
                {...register('id_selfie')}
                className={`form-control ${errors.id_selfie ? 'is-invalid' : ''}`}
                id="id_selfie"
                onChange={(e) => handleImageUpload(e, 2)} 
              />
            
            <div className="invalid-feedback">{errors.id_selfie?.message}</div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check  pt-3 ps-5">
              <input
                  name="photo_is_clear"
                  {...register('photo_is_clear')}
                  className={`form-check-input ${errors.photo_is_clear ? 'is-invalid' : ''}`}
                  value="1"
                  type="checkbox" id="photo_is_clear" />
              <div className="invalid-feedback">{errors.photo_is_clear?.message}</div>
              <label className="form-check-label" htmlFor="photo_is_clear">
                <font >The photo is clear and not blurred</font>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check  ps-5">
              <input
                  name="selfie_check"
                  {...register('selfie_check')}
                  className={`form-check-input ${errors.selfie_check ? 'is-invalid' : ''}`}
                  value="1"
                  type="checkbox" id="selfie_check" />
              <div className="invalid-feedback">{errors.selfie_check?.message}</div>
              <label className="form-check-label" htmlFor="selfie_check">
                <font >
                  {" "}
                  The Selfie does not have a hat or glasses and matches the photo on the
                  ID{" "}
                </font>
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check  ps-5">
              <input
                  name="id_terms"
                  {...register('id_terms')}
                  className={`form-check-input ${errors.id_terms ? 'is-invalid' : ''}`}
                  value="1"
                  type="checkbox" id="id_terms" />
              <div className="invalid-feedback">{errors.id_terms?.message}</div>
              <label className="form-check-label" htmlFor="id_terms">
                <font >
                  The text on the ID card in the selfie is accurately legible
                </font>
              </label>
            </div>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-md-6 m-auto nav nav-tabs" id="myTab" role="tablist">
              <Link
              href="javascript:;"
             
              onClick={() => onNextClick(form1, 1)}
              className="linkex4"
            >
              <i className="fas fa-chevron-left" />
              &nbsp;Back to previous {" "}
            </Link>
                </div>
              <div className="col-md-6 m-auto nav nav-tabs" id="myTab" role="tablist">
             
              
                <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                  Proceed to Next Step
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    

    </>
  )
}

export { Form2 };
