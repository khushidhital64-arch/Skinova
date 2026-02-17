import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Profile from "./Profile";
import Orders from "./Orders";
import Progress from "./Progress";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();

  // Read tab from query params
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get("tab") || "profile";

  const [activeTab, setActiveTab] = useState(initialTab);

  // Optional: update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get("tab") || "profile";
    setActiveTab(tab);
  }, [location.search]);

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Navbar />
      </div>

      <div className="flex pt-16 h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4 h-full">
          <button
            onClick={() => setActiveTab("profile")}
            className={`block mb-3 w-full text-left px-3 py-2 rounded ${
              activeTab === "profile" ? "bg-pink-500 text-white" : "text-gray-700"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`block mb-3 w-full text-left px-3 py-2 rounded ${
              activeTab === "orders" ? "bg-pink-500 text-white" : "text-gray-700"
            }`}
          >
            Order History
          </button>

          <button
            onClick={() => setActiveTab("progress")}
            className={`block w-full text-left px-3 py-2 rounded ${
              activeTab === "progress" ? "bg-pink-500 text-white" : "text-gray-700"
            }`}
          >
            Progress Photos
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "profile" && <Profile />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "progress" && <Progress />}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
