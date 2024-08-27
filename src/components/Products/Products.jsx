import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import style from './Products.module.css'
import { CartContext } from '../../Context/CartContext/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading/loading';

export default function Products() {
  let {addProductToCart} = useContext(CartContext);
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
  

  return <>
  <h1 className='font-semibold text-2xl text-green-500 text-center'>Products</h1>
  <div className="container">
    {products.length?<div className="flex flex-wrap">
      {products.map((product , index)=>
      <div key={index} className="w-1/4 p-5 product cursor-pointer overflow-hidden group hover:border border-solid border-green-500 hover:shadow-md hover:shadow-green-500 rounded-lg ">
      <div>
        <Link to={`Productdetails/${product.id}`}>
          <img src={product.imageCover} alt={product.title} />
          <h2 className='text-green-400'>{product.category.name}</h2>
          <h2>{product.title.split(' ').slice(0,2).join(' ')}</h2>
          <div className='flex justify-between items-center my-2'>
            <h3>{product.price} EGP</h3>
            <i className='fas fa-star text-yellow-400 text-xs'>{product.ratingsAverage}</i>
          </div>
        </Link>
        
        
          <i className='fas fa-heart'></i>
          
        <button onClick={()=>addProductToCart(product.id)} className='text-white w-full bg-green-500 btn rounded  py-1'>Add to Cart</button>
      </div>
    </div>
      )}
    </div>
      :<div className='flex justify-center py-10'> <Loading/></div>}
      </div>
  
  
</>

}
