import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, rmvItem } from "../redux/Slices/Slice";
import { toast } from "react-toastify";

const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();

  
 const cartItem = useSelector((state) => {
  if (!product || !state.cart?.items) return null;
  return state.cart.items.find((p) => p._id === product._id);
});


  const [count, setCount] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    if (cartItem && cartItem.quantity !== count) {
      setCount(cartItem.quantity);
    } else if (!cartItem && count !== 0) {
      setCount(0);
    }
  }, [cartItem, count]);

  // add item for first time
  const handleAdd = () => {
    dispatch(addItem(product));
    toast.success("Item added to cart! 🛒", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  // increase item count
  const handleIncrease = () => {
    dispatch(addItem(product));
  };

  // decrease item count
  const handleDecrease = () => {
    if (count > 1) {
      dispatch(rmvItem(product._id));
    } else {
      dispatch(rmvItem(product._id));
      toast.info("Item removed from cart.", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      {count === 0 ? (
        <button
          onClick={handleAdd}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-green-500 font-semibold py-2 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-center gap-3 bg-gray-100 px-3 py-2 rounded-lg w-full">
          <button
            onClick={handleDecrease}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            −
          </button>
          <span className="font-semibold text-gray-800">{count}</span>
          <button
            onClick={handleIncrease}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
