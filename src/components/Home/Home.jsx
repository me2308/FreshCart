import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import style from './Home.module.css'
import { CounterContext } from '../../Context/CounterContext/CounterContext'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../loading/loading'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Products from '../products/products'


export default function Home() {

  const [products, setProducts] = useState([])


  async function getProducts() {
    try{
      
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
    }catch(err){
      console.log(err);
      
    }
    
    
  }

  useEffect(()=>{ 
    getProducts()
  },[])


  return<>
  <MainSlider/>
  <CategorySlider/>


  <h1 className='text-5xl py-8'>Recent Products</h1>
  {products.length?<div className="flex flex-wrap">
    {products.map((product , index)=><RecentProducts key={index} product={product}/>
    )}
  </div>:<div className='flex justify-center py-20'>
    <Loading/>
  </div>}
  
    </>
  
}
