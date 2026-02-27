import React, { useEffect, useState } from "react";
import { IndianRupee, ShoppingCart, Users, Package, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/orders/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [token]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchProducts();
  }, []);

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

  /* ================= LAST 7 DAYS ORDERS ================= */
  const last7DaysOrders = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toISOString().slice(0, 10);
    const count = orders.filter((o) => o?.createdAt?.slice(0, 10) === day).length;
    return { day, count };
  }).reverse();

  const last7DaysOrdersChart = {
    labels: last7DaysOrders.map((o) => o.day),
    datasets: [
      {
        label: "Orders",
        data: last7DaysOrders.map((o) => o.count),
        backgroundColor: "#C9536A",
      },
    ],
  };

  /* ================= MONTHLY EARNINGS ================= */
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyEarningsMap = {};
  orders.forEach((o) => {
    if (o?.createdAt) {
      const month = new Date(o.createdAt).getMonth();
      monthlyEarningsMap[month] = (monthlyEarningsMap[month] || 0) + (o.totalAmount || 0);
    }
  });
  const monthlyEarningsChart = {
    labels: monthNames,
    datasets: [
      {
        label: "Revenue (Rs)",
        data: monthNames.map((_, idx) => monthlyEarningsMap[idx] || 0),
        backgroundColor: "#F472B6",
      },
    ],
  };

 

  return (
    <div className="p-6 space-y-6 font-sans text-gray-800">
      {/* ================= HEADER ================= */}
      <h1 className="text-[clamp(38px,6vw,24px)] font-bold">
        Admin <span className="text-[#C9536A]">Dashboard</span>
      </h1>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow hover:shadow-lg transition">
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="font-bold text-2xl">Rs {stats.totalRevenue.toFixed(2)}</p>
          </div>
          <IndianRupee size={30} className="text-[#C9536A]" />
        </div>

        <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow hover:shadow-lg transition">
          <div>
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="font-bold text-2xl">{stats.totalOrders}</p>
          </div>
          <ShoppingCart size={30} className="text-[#C9536A]" />
        </div>

        <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow hover:shadow-lg transition">
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            <p className="font-bold text-2xl">{stats.totalUsers}</p>
          </div>
          <Users size={30} className="text-[#C9536A]" />
        </div>

        <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow hover:shadow-lg transition">
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <p className="font-bold text-2xl">{stats.totalProducts}</p>
          </div>
          <Package size={30} className="text-[#C9536A]" />
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div className=" rounded-xl shadow p-6 flex flex-col md:flex-row gap-6 overflow-x-auto">
        <div className="flex-1 min-w-[300px]">
          <h3 className="font-semibold mb-2">Monthly Earnings</h3>
          <Bar data={monthlyEarningsChart} />
        </div>
        <div className="flex-1 min-w-[300px]">
          <h3 className="font-semibold mb-2">Last 7 Days Orders</h3>
          <Bar data={last7DaysOrdersChart} />
        </div>
       
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-1 text-[#C9536A] hover:underline"
          >
            View All <Eye size={16} />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-pink-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {order.items?.map((item, idx) => (
                      <span key={idx} className="mr-2">{item.name} x {item.quantity}</span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-gray-700">Rs {order.totalAmount || 0}</td>
                  <td className="px-6 py-4">
                    <span className={statusBadge(order.orderStatus)}>
                      {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= TOP USERS ================= */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Top Users</h2>
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-1 text-[#C9536A] hover:underline"
          >
            View All <Eye size={16} />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.slice(0, 5).map((user) => (
                <tr key={user._id} className="hover:bg-pink-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= TOP PRODUCTS ================= */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Top Products</h2>
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-1 text-[#C9536A] hover:underline"
          >
            View All <Eye size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
              <img src={p.imageUrl} alt={p.name} className="w-28 h-28 object-cover rounded-lg mb-2" />
              <p className="font-medium text-gray-900 text-center">{p.name}</p>
              <p className="text-gray-700">Rs {p.price}</p>
              <p className="text-gray-500 text-sm">{p.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
