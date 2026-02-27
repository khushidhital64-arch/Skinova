import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { UserContext } from "../context/UserContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

const UserPost = () => {
  const { user } = useContext(UserContext);
  const { addToCart, cart } = useContext(CartContext);

  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filterProduct, setFilterProduct] = useState("");

  const token = localStorage.getItem("token");

  // ── FETCH POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/post");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ── FETCH BOUGHT PRODUCTS
  const fetchBoughtProducts = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "http://localhost:3001/api/orders/my-orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const bought = [];
      res.data.orders.forEach((order) =>
        order.items.forEach((item) =>
          bought.push({ id: item.product, name: item.name })
        )
      );
      const unique = Array.from(new Map(bought.map((p) => [p.id, p])).values());
      setProducts(unique);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchBoughtProducts();
  }, []);

  // ── SUBMIT REVIEW
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo || !productId || !review) return alert("All fields required");

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("review", review);
    formData.append("rating", rating);
    formData.append("photo", photo);

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/post/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Review posted successfully 🎉");
      setReview("");
      setRating(5);
      setPhoto(null);
      setProductId("");
      setShowForm(false);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ── FILTER LOGIC
  let displayedPosts = [...posts];
  if (activeTab === "my" && user)
    displayedPosts = displayedPosts.filter((p) => p.user?._id === user._id);
  if (filterProduct)
    displayedPosts = displayedPosts.filter(
      (p) => p.product?._id === filterProduct
    );

  // ── HELPER: check if product is in cart
  const isInCart = (productId) =>
    cart.some((item) => item._id === productId);

  return (
    <>
      <Navbar />

      <section className="bg-pink-50 py-16">
        {/* Theme Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#C9536A]"></span>
            Community
          </div>
          <h2 className="font-serif text-[clamp(34px,4vw,52px)] font-bold leading-tight text-[#1A0A0E]">
            Beauty <em className="italic text-[#C9536A]">Stories</em>
          </h2>
          <p className="text-sm text-[#6B4B42] mt-2">
            Reviews, progress photos, and beauty tips from the Lumi community.
          </p>
          <button
            onClick={() => {
              if (!token) return alert("Please login to add a review");
              setShowForm(true);
            }}
            className="mt-6 border border-[#1A0A0E] px-6 py-3 text-black text-xs tracking-widest uppercase
                             hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
                             transition duration-300"
          >
            Add Review
          </button>
        </div>

        {/* Add Review Form & Posts */}
        <div className="max-w-3xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b pb-2 justify-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-2 py-1 ${
                activeTab === "all"
                  ? "text-[#C9536A] font-semibold border-b-2 border-[#C9536A]"
                  : "text-gray-500"
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => {
                if (!token) return alert("Login to view your reviews");
                setActiveTab("my");
              }}
              className={`px-2 py-1 ${
                activeTab === "my"
                  ? "text-[#C9536A] font-semibold border-b-2 border-[#C9536A]"
                  : "text-gray-500"
              }`}
            >
              My Reviews
            </button>
          </div>

          {/* Filter */}
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="w-full mb-4 text-[#C9536A] p-2 border rounded-md focus:ring-2 focus:ring-[#C9536A]"
          >
            <option value="">Filter by product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Review Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 flex flex-col gap-3"
            >
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-[#C9536A]"
                required
              >
                <option value="">Select purchased product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="p-2 border rounded-md focus:ring-2 focus:ring-[#C9536A] resize-none h-24"
              />

              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="p-2 border rounded-md focus:ring-2 focus:ring-[#C9536A]"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
                className="p-1"
              />

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="bg-[#C9536A] text-white px-4 py-2 rounded-md hover:bg-[#B04157] transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Post Review"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Posts */}
          <div className="flex flex-col gap-6">
            {displayedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-[#F9F3F4] border border-[#EADDE0] p-5 rounded-lg shadow-sm"
              >
                {/* ───────── USER HEADER ───────── */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8B8C0] flex items-center justify-center text-white text-sm font-bold">
                    {post.user?.name?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-medium text-base text-[#1A0A0E]">
                      {post.user?.name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {post.user?.skinType && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#FDECEF] text-[#C9536A]">
                      {post.user.skinType}
                    </span>
                  )}
                  {post.user?.skinConcern?.map((concern, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-[#FDECEF] text-[#C9536A]"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
                {/* ───────── REVIEW TEXT ───────── */}
                <p className="text-[#2B1B20] text-sm leading-relaxed mb-4">
                  {post.review}
                </p>

                {/* ───────── PRODUCT BOX ───────── */}
                {post.product && (
                  <div className="flex justify-between items-center bg-[#F1E5E8] px-4 py-3 rounded-md mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium text-sm text-[#1A0A0E]">
                          {post.product?.name}
                        </h4>
                        <p className="text-[#C9536A] text-sm">
                          ${post.product?.price || 38}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(post.product)}
                      className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition duration-300 rounded-md ${
                        isInCart(post.product._id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#C9536A] hover:bg-[#B04157] text-white"
                      }`}
                      disabled={isInCart(post.product._id)}
                    >
                      {isInCart(post.product._id) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                )}

                {/* ───────── STAR RATING ───────── */}
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-base ${
                        index < post.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-[#6B4B42]">{post.rating}/5</span>
                </div>

                {/* ───────── IMAGE ───────── */}
                {post.image && (
                  <img
                    src={post.image}
                    alt="review"
                    className="w-full max-h-[350px] object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default UserPost;