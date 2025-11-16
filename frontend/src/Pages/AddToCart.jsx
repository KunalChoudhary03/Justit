import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItem } from "../redux/Thunk/CartThunk";
import { toast } from "react-toastify";

const AddToCart = ({ productId, quantity = 1 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity || 0);

  const handleAddToCart = () => {
    if (!productId) {
      toast.error("Product ID missing!");
      return;
    }

    dispatch(addItem({ productId, quantity }))
      .unwrap()
      .then(() => {
        dispatch(getItem()); // refresh cart
        toast.success("Product added to cart!");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to add product to cart");
      });
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Cart Icon */}
      <div
        onClick={() => navigate('/cart')}
        className="relative cursor-pointer flex flex-col items-center group"
      >
        <ShoppingCart className="w-7 h-7 text-white group-hover:text-yellow-300 transition-colors" />

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
