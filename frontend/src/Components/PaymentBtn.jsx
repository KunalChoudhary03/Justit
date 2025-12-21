import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/Thunk/CartThunk";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RlCTk3vTJVmcqV";

function PaymentButton({ amount }) {
  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        toast.error("Payment SDK not loaded. Refresh the page.");
        return;
      }

     
      const { data: order } = await axios.post(
        `${BACKEND_URL}/payments/create-order`,
        { amount }
      );

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.id,
        name: "Justit",
        description: "Cart Payment",
        handler: async function (response) {
          try {
            await axios.post(`${BACKEND_URL}/payments/verify`, {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            
          
            toast.success(" Order has been successfully placed!");
            dispatch(clearCart());
          } catch (e) {
            console.error("Verification failed:", e);
            toast.error("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            console.warn("Payment modal closed by user");
          },
        },
        theme: { color: "#16b020ff" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        console.error("Razorpay failed:", resp?.error);
        toast.error(`Payment failed: ${resp?.error?.description || "Unknown error"}`);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
    >
      Proceed to Pay ₹{Number(amount).toFixed(2)}
    </button>
  );
}

export default PaymentButton;