import React from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function PaymentButton({ amount }) {
  const handlePayment = async () => {
    try {
      // ✅ correct response handling
      const { data: order } = await axios.post(
        `${BACKEND_URL}/payment/create/orderId`,
        { amount }
      );

      const options = {
        key: "rzp_test_RlCTk3vTJVmcqV",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "My Company",
        description: "Cart Payment",

        handler: async function (response) {
          await axios.post(`${BACKEND_URL}/payment/verify`, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          alert("Payment successful!");
        },

        theme: { color: "#16b020ff" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        background: "#3399cc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Pay Now
    </button>
  );
}

export default PaymentButton;
