import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE ORDER STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3001/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= STATUS BADGE ================= */
  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold";
      case "delivered":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold";
    }
  };

  return (
    <div className="min-h-screen p-2">
 <h1 className="font-serif text-[clamp(38px,6vw,20px)] leading-tight mb-6 text-[#1A0A0E]">
          Order <span className=" text-[#C9536A]">Management</span> 
        </h1>
     

      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-pink-50 transition-colors duration-200"
              >
                {/* User Info */}
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {order.user?.name} <br />
                  <span className="text-xs text-gray-500">{order.user?.email}</span>
                </td>

                {/* Items */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="flex flex-col gap-2">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                        )}
                        <span>{item.name} x {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </td>

                {/* Total Amount */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  Rs. {order.totalAmount}
                </td>

                {/* Payment Method */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 capitalize">
                  {order.paymentMethod}
                </td>

                {/* Status Dropdown + Badge */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <span className={statusBadge(order.orderStatus)}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border px-2 py-1 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
