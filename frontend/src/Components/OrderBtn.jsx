import React from 'react'
import Orders from '../Pages/Order';
import { useNavigate } from 'react-router-dom';
const OrderBtn = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
     <button onClick={() => navigate('/orders')}>View Orders</button> 
    </div>
  )
}

export default OrderBtn