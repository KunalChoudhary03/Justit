import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItem } from "../redux/Thunk/CartThunk";
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
      setTimeout(() => navigate("/login"), 1000);
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!checkLogin()) return;

    // Use _id if exists, otherwise use id
    const productId = product._id || product.id;

    dispatch(addItem({ productId, quantity: 1 }))
      .unwrap()
      .then(() => {
        dispatch(getItem());
        toast.success(`${product.name} added to cart! 🛒`, {
          position: "top-right",
          autoClose: 1000,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add product to cart", { autoClose: 1500 });
      });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
