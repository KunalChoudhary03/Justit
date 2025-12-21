import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItem, removeItem, increaseQty, decreaseItem, clearCart } from "../redux/Thunk/CartThunk";
import { toast } from "react-toastify";
import PaymentButton from '../Components/PaymentBtn';
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, loading } = useSelector((state) => state.cart);

  // Load cart on mount
  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  if (loading) return <p className="p-6 text-gray-500">Loading cart...</p>;

  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Your Cart 🛍️</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                  dispatch(clearCart())
                    .unwrap()
                    .then(() => toast.info('Cart cleared'))
                    .catch(() => toast.error('Failed to clear cart'));    
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
          {cartItems.map((item) => {
            const product = item.productId;
            if (!product) return null; 

            return (
              <div key={product._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b py-4">

                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-sm sm:text-base">{product.name}</h2>
                    <p className="text-gray-600 text-sm">{product.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-end sm:justify-start">
                  <button
                    onClick={() => dispatch(decreaseItem({ productId: product._id }))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="min-w-6 text-center font-medium">{item.quantity}</span>

                  <button
                    onClick={() => {
                      dispatch(increaseQty({ productId: product._id }));
                      toast.success(`${product.name} quantity increased`);
                    }}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      dispatch(removeItem({ productId: product._id }));
                      toast.error(`${product.name} removed`);
                    }}
                    className="sm:ml-3 text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total Price */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-base md:text-lg font-semibold">Total: ₹{Number(totalPrice).toFixed(2)}</p>
          </div>
          <PaymentButton product={cartItems} />
        </div>
      )}
    </div>
  );
};

export default Cart;
