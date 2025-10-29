import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";

const AddToCart = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/cart')} 
      className="cursor-pointer flex flex-col items-center group"
    >
      <ShoppingCart className="w-7 h-7 text-white group-hover:text-yellow-300 transition-colors" />
      <p className="text-sm font-medium mt-1 group-hover:text-yellow-100">Cart</p>
    </div>
  );
};

export default AddToCart;
