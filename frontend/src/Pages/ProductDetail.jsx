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
    addToCart(product);
    navigate("/cart"); // go to cart after adding
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 text-black">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full md:w-1/2 h-96 object-contain rounded-lg"
          />

          <div className="md:w-1/2">
            {product.stock === 0 ? (
              <span className="bg-red-500 text-white px-2 py-1 rounded">Out of Stock</span>
            ) : (
              <span className="bg-green-100 text-black px-2 py-1 rounded">In Stock ({product.stock}) </span>
            )}

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-2">{product.category}</p>
            <p className="text-pink-600 font-bold text-xl mb-2">Rs:{product.price.toFixed(2)}</p>

            <h2 className="font-semibold mt-4">Description:</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>

            <h2 className="font-semibold mt-2">Ingredients:</h2>
            <p className="text-gray-700 mb-2">{product.ingredients}</p>

            {product.concerns?.length > 0 && (
              <p className="text-gray-700 font-bold mb-2">Concerns: {product.concerns.join(", ")}</p>
            )}

            {product.skinType?.length > 0 && (
              <p className="text-gray-700 mb-2">Skin Type: {product.skinType.join(", ")}</p>
            )}

            <button
              className={`w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold transition ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-fill"></i>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}