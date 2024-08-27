import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Products from './components/products/products'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import UserContextProvider from './Context/UserContext/UserContext'
import CartContextProvider from './Context/CartContext/CartContext'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import CheckOut from './components/CheckOut/CheckOut'
import WishList from './components/WishList/WishList'

function App() {


  let routers = createBrowserRouter([{
    path:'',element:<Layout/>,children:[
      {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute> },
      {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
      {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute> },
      {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute> },
      {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute> },
      {path:'login',element:<Login/> },
      {path:'register',element:<Register/> },
      {path:'*',element:<Notfound/> },
    ]}])
  
  return <>
  
  <CartContextProvider>
          <UserContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster/>
          </UserContextProvider>
          
        </CartContextProvider>
        
  </>
  
  }
export default App
