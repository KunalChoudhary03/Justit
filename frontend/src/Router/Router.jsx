import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Service from '../Pages/Service'
import Product from '../Pages/Product'
import Register from '../Pages/Register'
import Login from '../Pages/Login'

const Router = () => {
  return (
     <Routes>
        <Route path="/" element={<Product />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/service" element={<Service />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        
     </Routes>
  )
}

export default Router
