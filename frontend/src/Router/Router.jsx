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
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import AdminProducts from '../Pages/Admin/AdminProducts'
import ProtectedRoute from './ProtectedRoutes'
import AdminUsers from '../Pages/Admin/AdminUsers'
import AddProduct from '../Pages/Admin/AddProduct'
import EditProduct from '../Pages/Admin/EditProduct'
import AdminLayout from '../Pages/Admin/AdminLayout'
import Details from '../Pages/Details'

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
        <Route path="/details/:id" element={<Details />} />

        
        <Route path="/admin" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute> }/>
        <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute> }/>
        <Route path="/admin/product" element={<ProtectedRoute> <AdminProducts /> </ProtectedRoute> }/>
        <Route path="/admin/users" element={<ProtectedRoute> <AdminUsers /> </ProtectedRoute> }/>
        <Route path="/admin/addproduct" element={<ProtectedRoute> <AddProduct /> </ProtectedRoute> }/>
       <Route path="/admin/editproduct/:id" element={  <ProtectedRoute><EditProduct /> 
       </ProtectedRoute> }/>

         
     </Routes>
  )
}

export default Router
