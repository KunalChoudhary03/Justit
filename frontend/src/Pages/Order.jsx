import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchOrders() {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [token, navigate]);

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center border border-gray-200">
          
          <div className="text-5xl mb-4">🚧</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Orders Section Under Development
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Thank you for your interest! We're currently setting up our order management system.
          </p>

          <p className="text-gray-500 text-sm mb-6">
            Your purchases and order history will appear here once everything is ready.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Orders ({orders.length})</h1>
      
      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID: <span className="font-mono">{order.orderId}</span></p>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
              order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {order.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">Items:</h3>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded border border-gray-200">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No items in this order</p>
            )}
          </div>

          <div className="border-t pt-4 flex justify-between items-center bg-gray-50 p-3 rounded">
            <p className="font-semibold text-gray-700">Total Amount:</p>
            <p className="text-xl font-bold text-green-600">₹{order.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;