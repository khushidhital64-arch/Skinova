import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";

const Home = () => {
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

  return (
    <>
      <Navbar />
<HeroSection></HeroSection>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-black mb-6">All Products</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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

export default Home;
