import React from 'react'
import { Outlet, useNavigate } from "react-router-dom"; 
import AdminDashboard from './AdminDashboard';

const AdminLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 space-y-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <button onClick={() => navigate("/admin/product")} className="block w-full text-left hover:text-green-400">
          Products
        </button>
        <button onClick={() => navigate("/admin/addproduct")} className="block w-full text-left hover:text-green-400">
          Add Product
        </button>
        
        <button onClick={() => navigate("/admin/users")} className="block w-full text-left hover:text-green-400">
          Users
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <AdminDashboard />
      </div>
    </div>
  )
}

export default AdminLayout
