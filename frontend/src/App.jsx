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
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartPage";
import BlogList from "./Pages/BlogPage";
import BlogDetails from "./Pages/BlogDetails";
import UserDashboard from "./Pages/UserDashboard";
import Recommended from "./Pages/Recommended";
import Userpost from "./Pages/Userpost";
import PaymentSuccess from "./Payment/PaymentSuccess";
import Favorite from "./Pages/Favorite";
import MakeupStore from "./Pages/Test";
import Chat from "./Pages/Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userpost" element={<Userpost />} />

        <Route path="/test" element={<MakeupStore />} />

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/recommend" element={<Recommended />} />
         <Route path="/chat" element={<Chat />} />

        <Route path="/Favorite" element={<Favorite />} />

        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

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
