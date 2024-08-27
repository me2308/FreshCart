import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'


export default function Register() {

  
  let {setUserData} = useContext(UserContext);



  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  let navigate =useNavigate();


  async function register(values){
    try{
      setLoading(true)
      let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
      localStorage.setItem('userToken',data.token)
      navigate('/')
      setUserData(data.token)
    }catch(err){
      setApiError(err.response.data.message);
      setLoading(false)
      
      
    }
    
    
  }
  // manual Regex
  // function validateForm(values){
  //   let errors={};
    
  //   if (!values.name) {
  //     errors.name = 'Name is Required'
  //   }else if (values.name.length < 3) {
  //     errors.name = 'Name less than 3'
  //   }else if (values.name.length > 10){
  //     errors.name = 'Name greater than 10'
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'phone is Required'
  //   }else if(!/^(002|\+2)?01[0125][0-9]{8}$/.test(values.phone)){
  //     errors.phone = 'we need egyptian number ex:01xxxxxxxxx'
  //   }

  //   return errors;
  // }

  // custome hoch for formik
  // ((api)لازم البروبيرتي اللي في الإنشيال فاليو تكون نفس الإسم اللي في ال)

  // Regex by Yup
  let validationSchema = Yup.object().shape({
    name:Yup.string().min(3,'min length is 3').max(10,'max length is 10').required('Name is Required'),
    email: Yup.string().email('invalid email').required('Email is Required'),
    password: Yup.string().matches(/^[A-Z]\w{5,10}$/,'invalid password ex(ahmed123)').required('password is Required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'password and rePassword dont match').required('rePassword is Required'),
    phone: Yup.string().matches(/^(002|\+2)?01[0125][0-9]{8}$/,'we need egyptian number ex:01xxxxxxxxx').required('Phone is Required')
  })


  let formik = useFormik({
    initialValues:{
      name:'' ,
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit: register ,
  })

  return<>
  
  <div className="w-1/2 mx-auto py-6">
  <h1 className='my-6 py-4  fa-2xl'>Register Now</h1>
  {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
  </div> }
  
    <form className="" onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
      </div>
      {formik.errors.name && formik.touched.name
      &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.name}
      </div>
      }

      <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your email</label>
      </div>
      {formik.errors.email && formik.touched.email
      &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}
      </div>
      }
      <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password</label>
      </div>
      {formik.errors.password && formik.touched.password
      &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}
      </div>
      }
      <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword</label>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword
      &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.rePassword}
      </div>
      }
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone</label>
      </div>
      {formik.errors.phone && formik.touched.phone
      &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.phone}
      </div>
      }


      {loading ?<button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <i className='fas fa-spin fa-spinner'></i>
      </button> : <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
      }
            
    </form>
  </div>
    </>
  
}
