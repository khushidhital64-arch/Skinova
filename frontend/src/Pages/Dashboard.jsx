import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Dashboard = () => {
     const { user } = useContext(UserContext);
       const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
const [total, settotalorder] = useState();
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

      // Set total orders
      settotalorder(res.data.orders.length);

      // Sort orders by date descending and take top 3
      const topOrders = res.data.orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setOrders(topOrders);
      setLoadingOrders(false);
    } catch (error) {
      console.error(error);
      setLoadingOrders(false);
    }
  };

  fetchOrders();
}, []);
  return (
    <div>

      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-[#1A0A0E]">
          Welcome back,{" "}
          <span className="text-[#E0536A] italic">{user.name} ✨</span>
        </h1>
        <p className="text-[#6B5E62] mt-2">
          You have 3 unread notifications and a 3-day photo streak going!
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        {/* Total Orders */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm relative">
          <p className="text-xs tracking-widest text-[#6B5E62] uppercase">
            Total Orders 📦
          </p>
          <h2 className="text-3xl font-serif text-[#1A0A0E] mt-2">{total}</h2>
          <p className="text-green-600 text-sm mt-2">↑ Order more glow more</p>

        </div>

        {/* Lumi Points */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm relative">
          <p className="text-xs tracking-widest text-[#6B5E62] uppercase">
            Skinova Points ⭐
          </p>
          <h2 className="text-3xl font-serif text-[#1A0A0E] mt-2">1,240</h2>
          <p className="text-green-600 text-sm mt-2">↑ 200 earned</p>
         
        </div>

        {/* Wishlist */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm relative">
          <p className="text-xs tracking-widest text-[#6B5E62] uppercase">
            Wishlist ❤️
          </p>
          <h2 className="text-3xl font-serif text-[#1A0A0E] mt-2">2</h2>
          <p className="text-green-600 text-sm mt-2">2 back in stock!</p>
          
        </div>

        {/* Photo Streak */}
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 shadow-sm relative">
          <p className="text-xs tracking-widest text-[#6B5E62] uppercase">
            Photo Streak 📸
          </p>
          <h2 className="text-3xl font-serif text-[#1A0A0E] mt-2">🔥 3</h2>
          <p className="text-green-600 text-sm mt-2">Keep it going!</p>
      
        </div>

      </div>

      {/* Badges Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 mb-10 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif text-[#1A0A0E]">
            Your Badges
          </h2>
          <button className="mt-6 border border-[#1A0A0E] px-6 py-3 text-black text-xs tracking-widest uppercase
                             hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
                             transition duration-300">
            VIEW ALL
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-gradient-to-r from-[#E8B820] to-[#F6D365] text-white px-6 py-3 rounded-full">
            🛍 First Purchase
          </div>
          <div className="bg-gradient-to-r from-[#E8B820] to-[#F6D365] text-white px-6 py-3 rounded-full">
            ✍ First Post
          </div>
          <div className="bg-gradient-to-r from-[#E8B820] to-[#F6D365] text-white px-6 py-3 rounded-full">
            ✨ Glow Up
          </div>
          <div className="bg-gradient-to-r from-[#E8B820] to-[#F6D365] text-white px-6 py-3 rounded-full">
            💎 Beauty Insider
          </div>
        </div>
      </div>

    {/* Recent Orders */}
      <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
        <div className="p-6 border-b border-[#E5E5E5]">
          <h2 className="text-xl font-serif text-[#1A0A0E]">
            Recent Orders
          </h2>
        </div>

        {loadingOrders ? (
          <p className="p-6 text-gray-600">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-gray-600">No orders found</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#F3ECE9] text-[#6B5E62] text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-[#1A0A0E]">
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-[#E5E5E5]">
                  <td className="p-4 font-light">#{order._id}</td>
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {order.items.map((item) => item.name).join(", ")}
                  </td>
                  <td className="p-4 font-semibold">Rs {order.totalAmount}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.orderStatus === "delivered"
                          ? "bg-green-100 text-green-700"
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
        )}
      </div>

    </div>
  );
};

export default Dashboard;