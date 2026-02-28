import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: qty });
    navigate("/cart");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <>
      <Navbar />

      <div className="bg-[#f6eef0] min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 mb-6 hover:underline"
          >
            ← Back
          </button>

          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT IMAGE */}
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-[#C9536A] text-white text-xs px-3 py-1 tracking-widest uppercase">
                  {product.category || "Cleanser"}
                </span>
                {product.stock > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 uppercase">
                    In Stock
                  </span>
                )}
              </div>

              <h1 className="text-4xl text-black font-serif mb-3">{product.name}</h1>

              <p className="text-black italic mb-4">
                8-hour wear. Zero feathering. Maximum drama.
              </p>

              {/* Skin Type & Concerns */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.skinType?.map((type) => (
                  <span
                    key={type}
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >
                    {type}
                  </span>
                ))}
                {product.concerns?.map((concern) => (
                  <span
                    key={concern}
                    className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full"
                  >
                    {concern}
                  </span>
                ))}
              </div>

              {/* Price */}
              <h2 className="text-5xl text-[#C9536A] font-serif font-light mb-6">
                Rs {product.price}
              </h2>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 text-black mb-8">
                <span className="text-sm tracking-widest">QTY</span>
                <div className="flex items-center border border-black">
                  <button
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                    className="px-4 py-2"
                  >
                    -
                  </button>
                  <span className="px-6">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className={`w-full py-4 text-sm tracking-widest uppercase transition ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-600"
                    : "bg-[#2b0d14] text-white hover:bg-[#3c141d]"
                }`}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : `Add to Bag — Rs ${product.price * qty}`}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="flex gap-8 border-b mb-6">
              {["description", "ingredients", "love"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 transition ${
                    activeTab === tab
                      ? "border-b-2 border-rose-500 text-rose-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab === "description"
                    ? "Description"
                    : tab === "ingredients"
                    ? "Ingredients"
                    : "Why You’ll Love It"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            )}
            {activeTab === "ingredients" && (
              <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
            )}
            {activeTab === "love" && (
              <div className="border-l-4 border-rose-400 pl-6 text-gray-700">
                <ul className="space-y-2">
                  <li>✔ Up to 8-hour wear</li>
                  <li>✔ Transfer-proof & feather-resistant</li>
                  <li>✔ Vitamin E & Moringa Oil</li>
                  <li>✔ Vegan & cruelty-free</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
