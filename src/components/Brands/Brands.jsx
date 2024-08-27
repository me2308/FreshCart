import React, { useEffect } from "react";
import { useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { data } from "autoprefixer";
import Loading from "../loading/loading";

export default function Brands() {
  const [brandData, setbrandData] = useState([]);

  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands?limit=20`
    );
    setbrandData(data.data);
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <h1 className="text-center text-green-500 text-[50px] font-semibold py-5">All Brands</h1>
      <div className="container">
        {brandData.length?<div className="flex  flex-wrap">
          {brandData?.map((brand) => (
            <div key={brand._id} className="w-1/4 px-3    ">
              
                <div className="my-3 py-4 border border-gray-300 rounded-md hover:shadow-lg hover:shadow-green-300">
                  <img src={brand.image} alt="" />
                  <h3 className="text-center font-bold text-[20px] p-2">{brand.name}</h3>
                </div>
              
            </div>
          ))}
        </div>:<div className="flex justify-center"><Loading/></div>}
        
      </div>
    </>
  );
}
