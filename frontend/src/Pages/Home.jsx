import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlayCircle, BookOpen } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";
import HeroSectionReview from "../Components/Heroreviewsection";
import ProductCard from "../Components/ProductCard";
import HomeProductComponent from "../Components/homeproductcomponent";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);

  const videoIds = [
  "UyBMKPlEw0U",
  "UyBMKPlEw0U",
  "UyBMKPlEw0U"
];
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/blogs/");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchBlogs();
  }, []);
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

      <HeroSectionReview />
      <HeroSection />

      {/* Explore Our Collection */}
      <section className="container mx-auto p-4 mb-20">
        <div className="flex justify-between items-end mb-12 flex-col md:flex-row gap-6">
          <div>
            <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-2 flex items-center gap-3 font-[Britannic]">
              <span className="w-6 h-[1px] bg-[#C9536A]"></span>
              EXPLORE
            </div>
            <h2 className="font-[Britannic] text-[20px] md:text-[24px] leading-tight text-[#1A0A0E] uppercase">
              Explore Our Collection
            </h2>
          </div>
          <button
            onClick={() => navigate("/displayall")}
            className="border border-[#1A0A0E] px-4 py-2 text-black text-xs tracking-widest uppercase
            hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
            transition duration-300 text-[Britannic]"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <HomeProductComponent
                key={product._id}
                _id={product._id}
                name={product.name}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

      {/* Shop Our Best Sellers */}
      <section className="container mx-auto p-4 mb-20">
        <div className="flex justify-between items-end mb-12 flex-col md:flex-row gap-6">
          <div>
            <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-2 flex items-center gap-3 font-[Britannic]">
              <span className="w-6 h-[1px] bg-[#C9536A]"></span>
              BESTSELLERS
            </div>
            <h2 className="font-[Britannic] text-[20px] md:text-[24px] leading-tight text-[#1A0A0E] uppercase">
              Shop Our Best Sellers
            </h2>
          </div>
          <button
            onClick={() => navigate("/displayall")}
            className="border border-[#1A0A0E] px-4 py-2 text-black text-xs tracking-widest uppercase
            hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
            transition duration-300 text-[Britannic]"
          >
            View All
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(5, 9).map((product) => (
              <HomeProductComponent
                key={product._id}
                _id={product._id}
                name={product.name}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        )}
      </section>

    {/* Latest Blogs */}
<section className="container mx-auto px-4 mb-24">
  <div className="flex justify-between items-end mb-14 flex-col md:flex-row gap-6">
    <div>
      <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-2">
        LATEST
      </div>
      <h2 className="text-3xl font-serif text-[#1A0A0E]">
        Latest Blogs
      </h2>
    </div>

    <button
      onClick={() => navigate("/blogs")}
      className="border border-[#1A0A0E] px-6 py-3 text-xs uppercase text-black tracking-widest hover:bg-[#C9536A] hover:text-white transition duration-300"
    >
      View All
    </button>
  </div>

  {blogLoading ? (
    <p className="text-[#8B5E6A]">Loading blogs...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {blogs.slice(0, 3).map((blog) => (
        <div
          key={blog._id}
          onClick={() => navigate(`/blogs/${blog._id}`)}
          className="cursor-pointer group h-full"
        >
          <div className="bg-[#FDF6F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
            
            {/* IMAGE */}
            <div className="bg-[#F8E6EA] h-72 overflow-hidden">
              {blog.imageBase64 && (
                <img
                  src={blog.imageBase64}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-1">
              
              {/* DATE (instead of category) */}
              <p className="text-xs uppercase tracking-widest text-[#8B5E6A] mb-2">
                {new Date(blog.date).toLocaleDateString()}
              </p>

              {/* TITLE */}
              <h3 className="text-xl font-serif text-[#1A0A0E] mb-3 line-clamp-2">
                {blog.title}
              </h3>

              {/* READ MORE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blogs/${blog._id}`);
                }}
                className="mt-auto text-sm uppercase text-left tracking-widest text-[#8B5E6A] hover:text-[#1A0A0E] transition"
              >
                READ MORE →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>

<section className="container mx-auto px-4 mb-24">
  <div className="flex justify-between items-end mb-14 flex-col md:flex-row gap-6">
    <div>
      <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-2">
        TIPS
      </div>
      <h2 className="text-3xl font-serif text-[#1A0A0E]">
        Beauty Guids
      </h2>
    </div>

    <button
      onClick={() => navigate("/guides")}
      className="border border-[#1A0A0E] px-6 py-3 text-xs uppercase text-black tracking-widest hover:bg-[#C9536A] hover:text-white transition duration-300"
    >
      View All
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    {videoIds.map((id, index) => (
      <div
        key={index}
        className="w-full max-w-[580x] aspect-[12/16] rounded-3xl overflow-hidden shadow-lg bg\ border border-pink-200 hover:scale-105 transition duration-500"
      >
        <iframe
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
          title={`Makeup Guide ${index}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ))}
  </div>

  {/* Optional metadata like Watch / Learn */}
  <div className="mt-10 flex justify-center gap-8 items-center text-[#8B5E6A]">
    <div className="flex flex-col items-center gap-1">
      <PlayCircle className="w-6 h-6 text-[#C9536A]" />
      <span className="text-[10px] uppercase font-bold">Watch</span>
    </div>

    <div className="w-px h-8 bg-pink-200" />

    <div className="flex flex-col items-center gap-1">
      <BookOpen className="w-6 h-6 text-[#C9536A]" />
      <span className="text-[10px] uppercase font-bold">Learn</span>
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default Home;
