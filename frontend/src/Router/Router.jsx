import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Service from '../Pages/Service'
import Product from '../Pages/Product'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Profile from '../Components/Profile'
import Cart from '../Pages/Cart'

const Router = () => {
  return (
     <Routes>
        <Route path="/" element={<Product />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/service" element={<Service />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/cart" element={<Cart />}/>
        
        
     </Routes>
  )
}

export default Router
