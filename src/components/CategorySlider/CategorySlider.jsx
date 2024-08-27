import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
    let {id} = useParams;

  async function getCategries() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
    
    
  }

  useEffect(()=>{
    getCategries()
  },[])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1500,
  };


  return<>
  <Slider {...settings}>
      {categories?.map((category , index)=> <div key={index} className='my-5'>
        <img  src={category.image} className='w-full h-[200px] my-4' alt=''/>
        <h3>{category.name}</h3>
      </div>)}
    </Slider>
    </>
  
}
