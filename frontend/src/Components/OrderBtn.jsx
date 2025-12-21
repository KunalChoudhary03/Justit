import React from "react";
import { useNavigate } from "react-router-dom";

const OrderBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-all">
        <h2 className="text-lg font-semibold text-gray-700">View Your Orders</h2>
      <button
        onClick={() => navigate("/orders")}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition"
      >
        View Orders
      </button>
    </div>
  );
};

export default OrderBtn;
