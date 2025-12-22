import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const AddToCart = () => {
  const navigate = useNavigate();

  // Redux se totalQuantity lo
  const totalQuantity = useSelector(
    (state) => state.cart?.totalQuantity || 0
  );

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={() => navigate("/cart")}  
        className="relative cursor-pointer flex flex-col items-center group"
      >
        {/* Cart icon */}
        <ShoppingCart className="w-7 h-7 text-white group-hover:text-yellow-300 transition-colors" />

        {/* Count badge */}
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {totalQuantity}
          </span>
        )}

        <p className="text-sm font-medium mt-1 group-hover:text-yellow-100">
          Cart
        </p>
      </div>
    </div>
  );
};

export default AddToCart;
