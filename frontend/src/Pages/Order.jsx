import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/api/orders"); // backend se
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>No orders yet 🛒</h2>
        <p>Looks like you haven't placed any orders.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Status:</b> {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
