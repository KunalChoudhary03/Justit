import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500 text-sm font-semibold">Total Products</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500 text-sm font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">132</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500 text-sm font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">58</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button onClick={()=> navigate('/admin/addproducts')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Add New Product
          </button>
          <button onClick={()=> navigate('/admin/products')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            View All Orders
          </button>
          <button onClick={()=> navigate('/admin/users')} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
