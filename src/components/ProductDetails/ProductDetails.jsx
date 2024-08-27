import React, { useEffect } from 'react'
import { useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../loading/loading';

export default function ProductDetails() {
  const [productInfo, setproductInfo] = useState([])
  let {id} =useParams();
  
  
  

  async function getProducts(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    // setproductInfo(Array.from(data.data))
    setproductInfo(data.data)
    // setproductCategoryName(productInfo.category.name)
  }
  
  useEffect(()=>{
    getProducts(id)
  },[])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1500,
  };



  return<>

  <h1>ProductDetails</h1>
  {!productInfo.images?<div className='flex justify-center py-20'>
    <Loading/>
  </div>:<div className='flex flex-wrap'>
    <div className="w-1/4">
    <Slider {...settings}>
      {productInfo.images?.map((image , index)=> <img key={index} src={image} className='w-full' alt=''/>)}
    </Slider>
    </div>
    <div className="w-3/4 flex flex-col justify-center ">
      <h2 className='py-4'>{productInfo.title}</h2>
      <p className='text-gray-500 py-3'>{productInfo.description}</p>
      <h2 className='py-1'>{productInfo.category?.name}</h2>
      <div className="flex items-center justify-between">
      <h3 className='py-2'>{productInfo.price} EGP</h3>
      <i className='fas fa-star text-yellow-400 text-xs'>{productInfo.ratingsAverage}</i>
      </div>
      <button className='text-white w-full bg-green-500 btn rounded  py-1'>Add to Cart</button>
    </div>
  </div>}
  


  
  
  
    </>
  
}
