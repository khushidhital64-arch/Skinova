import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import { UserContext } from "../context/UserContext";

const Recommended = () => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/products/");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4">
          <p>Loading user...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ FILTER PRODUCTS BASED ON USER
  const recommendedProducts = products.filter((product) => {
    const matchesSkinType =
      product.skinType?.includes("All") ||
      product.skinType?.includes(user.skinType);

    const matchesConcern =
      product.concerns?.some((concern) =>
        user.skinConcern.includes(concern)
      );

    return matchesSkinType && matchesConcern;
  });

  return (
    <>
      <Navbar />
  

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-black mb-6">
          Recommended For You
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : recommendedProducts.length === 0 ? (
          <p className="text-gray-500">
            No products match your skin profile yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                category={product.category}
                imageUrl={product.imageUrl}
                price={product.price}
                description={product.description}
                concerns={product.concerns}
                skinType={product.skinType}
                stock={product.stock}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Recommended;
