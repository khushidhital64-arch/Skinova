import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Favorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const products = await Promise.all(
        wishlist.map((id) =>
          axios
            .get(`http://localhost:3001/api/products/${id}`)
            .then((res) => res.data)
            .catch(() => null)
        )
      );
      setFavoriteProducts(products.filter((p) => p !== null));
    };

    fetchFavorites();
  }, []);

  if (favoriteProducts.length === 0)
    return (
      <>
        <Navbar />
        <p className="p-4">No products in your wishlist.</p>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteProducts.map((product) => (
            <Link
              key={product._id || product.id}
              to={`/product/${product._id || product.id}`}
              className="border p-2 rounded hover:shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <h2 className="font-semibold mt-2">{product.name}</h2>
              <p className="text-pink-600 font-bold">
                Rs:{product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorite;