import { useState } from "react";
import {
  BarChart3,
  Package,
  FileText,
  Users,
  ShoppingCart,
  IndianRupee
} from "lucide-react";

import Analytics from "./Analytics";
import Products from "./Products";
import Blog from "./Blog";
import Community from "./Community";
import Orders from "./Orders";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("analytics");

  const navBtn = (page) =>
    `flex items-center justify-between p-3 rounded-xl shadow transition
     ${activePage === page ? "bg-pink-100 text-black" : "bg-white hover:bg-pink-50"}`;

  return (
    <div className="min-h-screen text-black bg-pink-50 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your store and content
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        
           
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-xl font-bold">Rs. 100000</p>
            </div>
             <div className="p-3 rounded-full border-2 border-pink-500 text-pink-500">
              <IndianRupee size={20} />
            </div>
         
       
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
       
            
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <p className="text-xl font-bold">120</p>
            </div>

            <div className="p-3 rounded-full border-2 border-pink-500 text-pink-500">
              <ShoppingCart size={20} />
            </div>
          </div>
         

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
   
           
            <div>
              <p className="text-gray-500 text-sm">Users Registered</p>
              <p className="text-xl font-bold">80</p>
            </div>

             <div className="p-3 rounded-full border-2 border-pink-500 text-pink-500">
              <Users size={20} />
            </div>
          </div>
          

        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div className="flex items-center gap-4">
           
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-xl font-bold">45</p>
            </div>
          </div>
        <div className="p-3 rounded-full border-2 border-pink-500 text-pink-500">
              <Package size={20} />
            </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <button onClick={() => setActivePage("analytics")} className={navBtn("analytics")}>
          <span className="flex items-center gap-2">
            <BarChart3 size={18} /> Analytics
          </span>
          <BarChart3 size={16} className="opacity-40" />
        </button>

        <button onClick={() => setActivePage("products")} className={navBtn("products")}>
          <span className="flex items-center gap-2">
            <Package size={18} /> Products
          </span>
          <Package size={16} className="opacity-40" />
        </button>

        <button onClick={() => setActivePage("blog")} className={navBtn("blog")}>
          <span className="flex items-center gap-2">
            <FileText size={18} /> Blog
          </span>
          <FileText size={16} className="opacity-40" />
        </button>

        <button onClick={() => setActivePage("community")} className={navBtn("community")}>
          <span className="flex items-center gap-2">
            <Users size={18} /> Community
          </span>
          <Users size={16} className="opacity-40" />
        </button>

        <button onClick={() => setActivePage("orders")} className={navBtn("orders")}>
          <span className="flex items-center gap-2">
            <ShoppingCart size={18} /> Orders
          </span>
          <ShoppingCart size={16} className="opacity-40" />
        </button>
      </div>

      {/* Render below */}
      <div className=" p-1 rounded-sm shadow">
        {activePage === "analytics" && <Analytics />}
        {activePage === "products" && <Products />}
        {activePage === "blog" && <Blog />}
        {activePage === "community" && <Community />}
        {activePage === "orders" && <Orders />}
      </div>
    </div>
  );
}
