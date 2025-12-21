import React from 'react'
import { useNavigate } from 'react-router-dom';

const OrderBtn = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <button 
        onClick={() => navigate('/orders')}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        View Orders
      </button> 
    </div>
  )
}

export default OrderBtn