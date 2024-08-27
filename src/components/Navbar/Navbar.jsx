import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext/CounterContext'
import { UserContext } from '../../Context/UserContext/UserContext'
import { CartContext } from '../../Context/CartContext/CartContext'


export default function Navbar() {
  
  let {userData , setUserData} = useContext(UserContext);
  let {cart}=useContext(CartContext)
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login')

  }




  function navToggle() {
    let navList1 = document.querySelector('.navList1');
    navList1.classList.toggle('hidden')
    let navList2 = document.querySelector('.navList2');
    navList2.classList.toggle('hidden')
    
  }


  return<>
  <nav className=' bg-gray-200 py-3   fixed top-0 z-30 inset-x-0 text-slate-500'>
    <div className="container  flex md:flex-row md:justify-between flex-col ">
      <div className='capitalize  flex md:flex-row flex-col  md:items-center  space-x-3'>
        <div className=' flex justify-between items-center w-full'>
          <img src={logo} className='w-[120px] ps-2'  alt="" />
          <button onClick={navToggle} className='navButton  md:hidden py-1 px-2  border-[3px] border-slate-500 rounded-lg'>
            <i className='fas fa-bars fa-xl '></i>
          </button>
        </div>
        {userData && <ul className='navList1 md:flex  md:flex-row flex-col space-x-2'>
          <li><NavLink to="">home </NavLink> </li>
          <li><NavLink to="products">products</NavLink></li>
          <li><NavLink to="cart">cart</NavLink></li>
          <li><NavLink to="wishlist">wishlist</NavLink></li>
          <li><NavLink to="categories">categories</NavLink></li>
          <li><NavLink to="brands">brands</NavLink></li>
        </ul> }
        
      </div>
      <div className='navList2 capitalize md:flex  space-x-3'>
        
        <ul className='flex md:flex-row flex-col  space-x-3'>
          
          
          {userData ? <>
          
            <li className='relative'>
              <NavLink to="cart"><i className="fa-solid fa-cart-shopping text-green-500 fa-2xl"></i></NavLink>
              <span className='text-black fa-1x absolute left-1/2 top-[-5px]'>{cart? cart.numOfCartItems:0}</span>
              </li>
          <li onClick={()=>logout()} className='cursor-pointer'><span >logout</span></li>
          </>
          :
          <>
          <li><NavLink to="login">login</NavLink></li>
          <li><NavLink to="register">register</NavLink></li>
          </> }
          <li className='space-x-2 text-black'>
            <i className='fab fa-instagram'></i>
            <i className='fab fa-facebook'></i>
            <i className='fab fa-tiktok'></i>
            <i className='fab fa-twitter'></i>
            <i className='fab fa-linkedin'></i>
            <i className='fab fa-youtube'></i>
          </li>
          
          
        </ul>
      </div>
    </div>
  </nav>
    </>
  
}
