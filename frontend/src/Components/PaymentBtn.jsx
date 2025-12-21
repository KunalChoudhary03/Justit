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
            alert("Payment successful!");
          } catch (e) {
            console.error("Verification failed:", e);
            alert("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: function () {
            console.warn("Payment modal closed by user");
          },
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        console.error("Razorpay failed:", resp?.error);
        alert(`Payment failed: ${resp?.error?.description || "Unknown error"}`);
      });
      rzp.open();
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