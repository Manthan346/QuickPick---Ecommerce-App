import { useState } from 'react'


import './App.css'
import { Route, Routes, useParams } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Login from './Pages/Login'
import Order from './Pages/Order'
import PlaceOrder from './Pages/PlaceOrder'
import Product from './Pages/Product'
import SignUp from './Pages/SignUp'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
 import { ToastContainer, toast, Bounce } from "react-toastify"






function App() {

  

  

  return (
    <>
     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[4vw]'>
     
      <Navbar />
      <ToastContainer />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<Order />} />
        <Route path='/placeOrder' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
      
    
      
      

     </div>
    </>
  )
}

export default App
