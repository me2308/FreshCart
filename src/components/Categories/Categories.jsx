import React, { useEffect } from "react";
import { useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import Loading from "../loading/loading";

export default function Categories() {
  const [categoryData, setcategoryData] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setcategoryData(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h1 className="text-center text-green-500 text-[50px] font-semibold py-5">All Categories</h1>
      <div className="container">
        {categoryData.length?<div className="flex  flex-wrap">
          {categoryData?.map((category) => (
            <div key={category._id} className="w-1/4 px-3    ">
              
                <div className="my-3 py-4  border border-gray-300 rounded-md hover:shadow-lg hover:shadow-green-300">
                  <img className="h-[400px]" src={category.image} alt="" />
                  <h3 className="text-center font-bold text-[20px] p-2">{category.name}</h3>
                </div>
              
            </div>
          ))}
        </div>:<div className="flex justify-center"><Loading/></div>}
        
      </div>
    </>
  );
}

