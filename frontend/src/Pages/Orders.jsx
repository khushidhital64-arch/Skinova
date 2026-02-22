import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
        setLoadingOrders(false);
      } catch (error) {
        console.error(error);
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EAEAEA] overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-[#F1F1F1]">
        <h2 className="text-xl font-semibold text-[#1A0A0E]">
          Order History
        </h2>
      </div>

      {loadingOrders ? (
        <p className="p-6 text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="p-6 text-gray-600">No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            
            {/* Table Head */}
            <thead className="bg-[#F3ECE9] text-[#6B5E62] text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Date</th>
                <th className="p-4">Products</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[#1A0A0E] text-sm">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-[#E5E5E5] hover:bg-[#FAF7F6] transition"
                >
                  
                  {/* Order ID */}
                  <td className="p-4 font-light">
                    #{order._id.slice(-6)}
                  </td>

                  {/* Date */}
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Products with Images */}
                  <td className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-14 h-14 object-contain rounded-lg border"
                          />
                          <div>
                            <p className="font-medium">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty {item.quantity} × Rs {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="p-4 font-semibold">
                    Rs {order.totalAmount}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
