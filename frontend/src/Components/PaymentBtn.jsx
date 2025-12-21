import React from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_RlCTk3vTJVmcqV";

function PaymentButton({ amount }) {
  const handlePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Payment SDK not loaded. Refresh the page.");
        return;
      }

      // FIX: correct routes
      const { data: order } = await axios.post(
        `${BACKEND_URL}/payments/create-order`,
        { amount } // pass cart total
      );

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Justit",
        description: "Cart Payment",
        handler: async function (response) {
          await axios.post(`${BACKEND_URL}/payments/verify`, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          alert("Payment successful!");
        },
        theme: { color: "#16b020ff" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <button onClick={handlePayment} style={{ padding: "10px 20px", background: "#3399cc", color: "#fff", border: "none", borderRadius: "5px" }}>
      Pay Now
    </button>
  );
}

export default PaymentButton;