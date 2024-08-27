import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'

export default function RecentProducts({product}) {
  let {addProductToCart} = useContext(CartContext);

  return<>
  <div className="w-1/4 p-5 product cursor-pointer overflow-hidden group hover:border border-solid border-green-500 hover:shadow-md hover:shadow-green-500 rounded-lg ">
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
    </>
  
}
