import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem, removeItem, increaseQty, decreaseItem } from "../redux/Thunk/CartThunk";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, loading } = useSelector((state) => state.cart);

  // Load cart on mount
  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-gray-500">Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart 🛍️</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => {
            const product = item.productId; // populated product
            if (!product) return null; // safety check

            return (
              <div key={product._id} className="flex items-center justify-between border-b py-4">
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p>{product.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(decreaseItem({ productId: product._id }))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => {
                      dispatch(increaseQty({ productId: product._id }));
                      toast.success(`${product.name} quantity increased`);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      dispatch(removeItem({ productId: product._id }));
                      toast.error(`${product.name} removed`);
                    }}
                    className="ml-3 text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
