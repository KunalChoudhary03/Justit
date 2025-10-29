import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addItem,rmvItem,decreaseItem,rmvAll} from "../redux/Slices/Slice"
import { toast } from "react-toastify";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart 🛍️</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => dispatch(decreaseItem(item.id))}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {dispatch(addItem(item)); toast.success(`${product.name} added to cart 🛒`);}}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(rmvItem(item.id))}
                  className="ml-3 text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
            <button
              onClick={() => dispatch(rmvAll())}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
