import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useForm , useWatch} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '/services';
import Swal from 'sweetalert2';
import countryList from '/lib/countryList';
import countryCode from '/lib/countryCode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile({ user , userdata , form1 , kyc_status  }) {
    const router = useRouter();
    const options = countryList();
    const options2 = countryCode();
    const [isOther, setisOther] = useState(form1.occupation == "Other" ? true : false);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState('');

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
        const currentYear = new Date().getFullYear();
        const yearsList = Array.from({ length: currentYear - 1909 }, (_, i) => 1910 + i);
        setYears(yearsList);

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

     
        given_name: userService.CommonValidation()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Given Name can only contain Latin letters.'
            )
            .required('Given Name is required'),
       
        sur_name: userService.CommonValidation()
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Sur Name can only contain Latin letters.'
            )
            .required('Sur Name is required'),

        marriage_status: userService.CommonValidation()
            .required('Marriage Status is required'),
        title: userService.CommonValidation()
            .required('Title is required'),
        occupation: userService.CommonValidation()
            .required('Occupation is required'),
        occupation_other_detail: userService.CommonValidation().when('occupation', {
            is: (val) => val == 'Other',
            then: Yup.string().required('Occupation other details is required'),
            otherwise: ''
        }),
        nationality: userService.CommonValidation()
            .required('Nationality is required'),
        birthday_year: Yup.string()
            .required('Date of Birth Year is required'),
        birthday_month: Yup.string()
            .required('Date of Birth Month is required'),
        birthday_day: Yup.string()
            .required('Date of Birth Day is required'),
        address: userService.CommonValidation()
            .required('Address is required'),
        city: userService.CommonValidation()
            .required('City is required'),
        prefecture: userService.CommonValidation()
            .required('Prefecture is required'),
        postal_code: userService.CommonValidation()
            .required('Postal Code is required'),
        country: Yup.string()
            .required('Country is required'),
        cellphone_country_code: userService.CommonValidation()
            .required('Country Code is required'),
        cellphone_number: userService.CommonValidation()
            .required('Cellphone Number is required'),
       
    });
    
    const formOptions = {
        resolver: yupResolver(validationSchema), defaultValues: {
            email_address: user.email_address,
            auth_token: user.auth_token,
            profile : userdata,
            ...form1
        },
        mode: 'onTouched'
        
    };
    
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formValues ,control ,formState, setError , trigger  } = useForm(formOptions);
    const { errors } = formState;
    
    const birthdayDay = useWatch({
        control,
        name: "birthday_day",
        defaultValue: form1.birthday_day,
      });
    const birthdayYear = useWatch({
        control,
        name: "birthday_year",
        defaultValue: form1.birthday_year,
      });
    const birthdayMonth = useWatch({
        control,
        name: "birthday_month",
        defaultValue: form1.birthday_month,
      });
    
    function onSubmit(user) {
        if(user.occupation == 'other')
        {
            user.occupation = user.occupation_other_detail
        }
        const profile = {
            "email_address":user.email_address,
            "title":user.title,
            "name":`${user.given_name}  ${user.sur_name}`,
            "given_name":`${user.given_name}`,
            "sur_name":`${user.sur_name}`,
            "marriage_status":user.marriage_status,
            "occupation": (isOther) ? user.occupation_other_detail : user.occupation,
            "nationality":user.nationality,
            "birthday":`${user.birthday_year}/${user.birthday_month}/${user.birthday_day}`,
            "address":user.address, 
            "city":user.city, 
            "prefecture":user.prefecture,
            "postal_code":user.postal_code,
            "country":user.country, 
            "name_on_card":user.name_on_card, 
            "card_provider":user.card_provider, 
            "cellphone_country_code":user.cellphone_country_code,
            "cellphone_number":user.cellphone_number,   
        }
       delete user.given_name;
       delete user.sur_name;
       delete user.middle_name;
       delete user.cellphone_number;
       delete user.cellphone_country_code;
       delete user.country;
       delete user.postal_code;
       delete user.prefecture;
       delete user.city;
       delete user.address;
       delete user.nationality;
       delete user.occupation;
       delete user.title;
       delete user.name;
       delete user.name_on_card;
       delete user.card_provider;
       delete user.name_on_card;
       delete user.birthday_year;
       delete user.birthday_month;
       delete user.birthday_day;
       delete user.marriage_status;
       delete user.card_terms;
       delete user.id_terms;
        user.profile = {
            
            ...profile
        }
        
        return userService.runApi("updateProfile/", user)
        .then((res) => {
           
           
          if (res.data.result == "success") {
            
            toast.success('Profile has been updated successfully', {
                position: toast.POSITION.TOP_RIGHT
              });
              return router.push('/user/profile')
          }
        })
        .catch((res) => {
              
            Swal.fire({
              title: "Error",
              text: "something wrong",
              icon: "error",
            }).then(function (result) {
             
            });
          });
        
        //return '';
    }
    const handleOccuptionChange = (event) => {
        
        const val = event.target.value;
        setisOther(false);
        if (val == 'Other') {
            setisOther(true);
        }
        
        if (val) {
            setError('occupation' , '');
            errors.occupation = false;
        }
      
        

    }
    return (
       
        <>
   
            <div className="col-sm-12">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  
              
                    <div className="col-md-4">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <select defaultValue="" id="title"
                            name="title"
                            {...register('title')}
                            className={`form-select ${errors.title ? 'is-invalid' : ''}`}
                        >
                            <option value="">--None--</option>
                            <option value="1">Mr.</option>
                            <option value="2">Ms.</option>
                        </select>
                        <div className="invalid-feedback">{errors.title?.message}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="given_name" className="form-label">
                            Given Name (include middle name)
                        </label>
                        <input
                            type="text"
                            name="given_name"
                            {...register('given_name')}
                            className={`form-control ${errors.given_name ? 'is-invalid' : ''}`}
                            id="given_name"
                            placeholder="Enter Given Name"
                        />
                        <div className="invalid-feedback">{errors.given_name?.message}</div>
                        
                    </div>
                    
                    <div className="col-md-4">
                        <label htmlFor="sur_name" className="form-label">
                           Sur Name (Alphabet)
                        </label>
                        <input
                            type="text"
                            name="sur_name"
                            {...register('sur_name')}
                            className={`form-control ${errors.sur_name ? 'is-invalid' : ''}`}
                            id="sur_name"
                            placeholder="Enter Sur Name"
                        />
                        <div className="invalid-feedback">{errors.sur_name?.message}</div>
                        
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="marriage_status" className="form-label">
                            Marriage Status
                        </label>
                        <select defaultValue="" id="marriage_status" name="marriage_status"
                            {...register('marriage_status')}
                            className={`form-select ${errors.marriage_status ? 'is-invalid' : ''}`}>
                            <option value="">--None--</option>
                            <option value={1}>Single</option>
                            <option value={2}>Married</option>
                        </select>
                        <div className="invalid-feedback">{errors.marriage_status?.message}</div>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="occupation" className="form-label">
                            Occupation{" "}
                        </label>
                        <select defaultValue="" id="occupation" name="occupation"
                            {...register('occupation')}
                            onChange={handleOccuptionChange}
                            className={`form-select ${errors.occupation ? 'is-invalid' : ''}`}>

                            <option value="">--None--</option>
                            <option value="CEO">CEO</option>
                            <option value="Director">Director</option>
                            <option value="Employee">Employee</option>
                            <option value="Housewife">Housewife</option>
                            <option value="Student" >Student</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="invalid-feedback">{errors.occupation?.message}</div>
                    </div>
                    {isOther ? (<div className="col-md-12">
                        <label htmlFor="occ" className="form-label">
                            Describe your occupation
                        </label>
                        <input
                            type="text"
                            name="occupation_other_detail"
                            {...register('occupation_other_detail')}
                            className={`form-control ${errors.occupation_other_detail ? 'is-invalid' : ''}`}
                            id="occ"
                            placeholder="Enter occupation details"
                        />
                        <div className="invalid-feedback">{errors.occupation_other_detail?.message}</div>
                        <div id="emailHelp" className="form-text">
                            Specify the name you want to be printed on the card (English). Maximum
                            length is 22 alphabet character
                        </div>
                    </div>) : ``}
                    <div className="col-md-12">
                        <label htmlFor="nationality" className="form-label">
                            Nationality{" "}
                        </label>
                        <select 
                            id="nationality"
                            name="nationality"
                            defaultValue=""
                            {...register('nationality')} className={`form-select ${errors.nationality ? 'is-invalid' : ''}`}
                        >
                            <option value="">--None--</option>
                            {options.map(option => (
                                <option key={option.label} value={option.label}>{option.label}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.nationality?.message}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="birthday_year" className="form-label">
                            Date of Birth Year{" "}
                        </label>
                        <select  id="birthday_year" name="birthday_year"
                            {...register('birthday_year')}
                            value={birthdayYear}
                            className={`form-select ${errors.birthday_year ? 'is-invalid' : ''}`}>
                            <option value="">----</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.birthday_year?.message}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="birthday_month" className="form-label">
                            Month
                        </label>
                        <select  id="birthday_month" name="birthday_month"
                            {...register('birthday_month')}
                            value={birthdayMonth}
                            className={`form-select ${errors.birthday_month ? 'is-invalid' : ''}`}>
                            <option value="">----</option>
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.birthday_month?.message}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="birthday_day" className="form-label">
                            Day
                        </label>
                        <select  id="birthday_day" name="birthday_day"
                            {...register('birthday_day')}
                            
                            className={`form-select ${errors.birthday_day ? 'is-invalid' : ''}`}
                            value={birthdayDay}
                            >
                            <option value="">----</option>
                            {dates.map((date) => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.birthday_day?.message}</div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address" className="form-label">
                            Address (English)
                        </label>
                        <input
                            type="text"
                            name="address"
                            {...register('address')}
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            id="address"
                            placeholder="Enter Enter Address"
                        />
                        <div className="invalid-feedback">{errors.address?.message}</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">
                            City/Municipality
                        </label>
                        <input
                            type="text"
                            name="city"
                            {...register('city')}
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            id="city"
                            placeholder="Enter City/Municipality"
                        />
                        <div className="invalid-feedback">{errors.city?.message}</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="prefecture" className="form-label">
                            Prefecture{" "}
                        </label>
                        <input
                            type="text"
                            name="prefecture"
                            {...register('prefecture')}
                            className={`form-control ${errors.prefecture ? 'is-invalid' : ''}`}
                            id="prefecture"
                            placeholder="Enter Province or Prefecture (English)"
                        />
                        <div className="invalid-feedback">{errors.prefecture?.message}</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postal_code" className="form-label">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postal_code"
                            {...register('postal_code')}
                            className={`form-control ${errors.postal_code ? 'is-invalid' : ''}`}
                            id="postal_code"
                            placeholder="Enter Postal Code"
                        />
                        <div className="invalid-feedback">{errors.postal_code?.message}</div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            {...register('country')} className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                            defaultValue=""
                        >
                            <option value="">--None--</option>
                            {options.map(option => (
                                <option key={option.label} value={option.label}>{option.label}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.country?.message}</div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="cellphone_country_code" className="form-label">
                            Country Code
                        </label>
                       
                        <select
                            id="cellphone_country_code"
                            name="cellphone_country_code"
                            {...register('cellphone_country_code')} className={`form-select ${errors.cellphone_country_code ? 'is-invalid' : ''}`}
                            defaultValue=""

                            
                        >
                            <option value="">--None--</option>
                            {options2.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">{errors.cellphone_country_code?.message}</div>
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="cellphone_number" className="form-label">
                            Cellphone Number{" "}
                        </label>
                        <input
                            type="number"
                            name="cellphone_number"
                            {...register('cellphone_number')}
                            className={`form-control ${errors.cellphone_number ? 'is-invalid' : ''}`}
                            id="cellphone_number"
                            placeholder="Enter Cellpnune Number "
                        />
                        <div className="invalid-feedback">{errors.cellphone_number?.message}</div>
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

export { Profile };
