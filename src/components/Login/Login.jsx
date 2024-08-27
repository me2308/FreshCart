import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'


export default function Login() {
  let {setUserData} = useContext(UserContext);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();





  async function login(values) {
    console.log(values);
    
    try{
      setLoading(true)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem('userToken',data.token)
      navigate('/')
      setUserData(data.token)
    }catch(err){
      
      setApiError(err.response.data.message)
      setLoading(false)
      
    }

  }
  let validationSchema= Yup.object().shape({
    email: Yup.string().email('invalid Email').required('Email is Required'),
    password: Yup.string().matches(/^[A-Z]\w{5,10}$/,'invalid password').required('Password is Required')
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema,
    onSubmit: login
  })

  return<>
  <div className='w-1/2 mx-auto'>
    <form onSubmit={formik.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      </div>
      {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}
      </div>}
      <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password</label>
      </div>
      {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}
      </div>}
      
      {loading?<button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        <i className='fas fa-spin fa-spinner'></i>
      </button>:<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
    }


      
    </form>
  </div>
    </>
  
}
