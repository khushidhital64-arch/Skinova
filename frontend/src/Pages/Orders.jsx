import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(res.data.orders);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) {
    return <p className="text-gray-600">No orders found</p>;
  }

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Order History</h2>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><b>Status:</b> {order.orderStatus}</p>
          <p><b>Payment:</b> {order.paymentMethod}</p>

          <div className="mt-3">
            <b>Products:</b>
            {order.items.map((item, index) => (
              <div key={index} className="ml-4 mt-2 flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <p>{item.name}</p>
                  <p>
                    Qty: {item.quantity} × Rs {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 font-bold">
            Total: Rs {order.totalAmount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
