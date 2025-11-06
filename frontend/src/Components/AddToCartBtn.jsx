import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/Slices/Slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const checkLogin = () => {
    if (!token) {
      toast.info("Please login to add items to your cart 🛒", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      return false
    }
    return true;
  };

  const handleAdd = () => {
    if (!checkLogin()) return;
    dispatch(addItem(product));
    toast.success("Item added to cart! 🛒", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-gray-100 hover:bg-gray-200 text-green-600 font-semibold py-2 rounded-lg transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
