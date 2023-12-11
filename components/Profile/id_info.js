import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm , useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';

import countryList from '/lib/countryList';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function IDInfo({ user, form1 , form2  , kyc_status}) {
  const router = useRouter();
  const [years, setYears] = useState([]);
  const [expyears, setExpYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [dates, setDates] = useState([]);
  const [isPassport, setisPassport] = useState(true);
  const options = countryList();
  form2.id_type = (form2.id_type == "ID card") ? "2" : "1";
  console.log(form2.id_type)
  console.log('form2 form1' , form1)
  console.log('kyc_status' ,kyc_status)
  console.log(kyc_status)
  if (kyc_status == 2 || kyc_status == 1) {
        // disable all inputs and selects in the form
        
        const formInputs = document.querySelectorAll('form input, form select');
        formInputs.forEach((input) => {
          input.disabled = true;
        });
      }
  useEffect(() => {
    /* set years======== */
    setisPassport((form2.id_type == "2") ? false : true)
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1929 }, (_, i) => 1930 + i);
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
        toast.success('ID info has been updated successfully', {
          position: toast.POSITION.TOP_RIGHT
        });
        return router.push('/user/profile')
        
        
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
                  defaultValue={form1.country}>
                  <option value="">--None--</option>
                  {options.map(option => (
                      <option key={option.label} value={option.label}>{option.label}</option>
                  ))}
              </select>
              <div className="invalid-feedback">{errors.id_issue_country?.message}</div>
          </div>
        

          <div className="col-12">
            <div className="row">
           
              <div className="col-md-6 m-auto nav nav-tabs" id="myTab" role="tablist">
             
              
                <button type="submit" className="btn withdrwcstm-btn mt-2 w-100" disabled={formState.isSubmitting}>
                  Update
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

export { IDInfo };
