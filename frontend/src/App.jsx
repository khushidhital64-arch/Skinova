import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Adminpages/AdminDashboard";
import Products from "./Adminpages/Products";
import Blog from "./Adminpages/Blog";
import Community from "./Adminpages/Community";
import Orders from "./Adminpages/Orders";
import Analytics from "./Adminpages/Analytics";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



         <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/blog" element={<Blog />} />
        <Route path="/admin/community" element={<Community />} />
        <Route path="/admin/orders" element={<Orders />} />
       
      </Routes>
    </Router>
  );
};

export default App;
