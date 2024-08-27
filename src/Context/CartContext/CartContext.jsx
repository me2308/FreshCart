import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider({children}) {
    let headers = {
        token : localStorage.getItem('userToken')
    }
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false)
    const [hamo, sethamo] = useState(false)
    const [wishData, setWishData] = useState('')
    

    
    async function checkOut(shippingAddress) {
        try {
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,{
                shippingAddress 
            },{
                headers });
            setCart(data)
            
            window.location.href = data.session.url
        } catch (err) {
            console.log( err);
            setLoading(false)
        }
    }
    async function wishList(productId) {
        try {
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId 
            },{
                headers });
            setWishData(data)
            sethamo(true)
            toast.success(data.message);
            setLoading(false)
        } catch (err) {
            console.log( err);
            sethamo(false)
            toast.error('Product have error');
            setLoading(false)
        }
    }
    async function addProductToCart(productId) {
        try {
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId 
            },{
                headers });
            setCart(data)
            console.log(data);
            
            
            console.log(data);
            toast.success(data.message);
            setLoading(false)
        } catch (err) {
            console.log( err);
            toast.error('Product have error');
            setLoading(false)
        }
    }
    async function deleteProduct(productId) {
        try {
            setLoading(true)
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers });
            setCart(data)
            setLoading(false)
        } catch (err) {
            console.log( err);
            setLoading(false)
        }
    }
    async function updateProduct(productId , count) {
        if (count>0) {
            try {
                setLoading(true)
                let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                    count 
                },{
                    headers });
                setCart(data)
                setLoading(false)
            } catch (err) {
                console.log( err);
                setLoading(false)
            }
        }else{
            deleteProduct(productId)
        }
        
    }
    async function getCart() {
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            })
            setCart(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        getCart()
    },[])


    return <CartContext.Provider value={{hamo,wishData,  wishList,loading,deleteProduct , checkOut, updateProduct, addProductToCart ,getCart ,cart,setCart}}>
        {children}
    </CartContext.Provider>
}