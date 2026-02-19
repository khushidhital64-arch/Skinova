import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-4 text-center text-gray-600">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="p-4 text-center text-gray-600">No blogs found</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6 text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Our Latest Blogs</h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-xs flex flex-col"
            >
              {/* Full Image */}
              {blog.imageBase64 && (
                <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={blog.imageBase64}
                    alt={blog.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>By {blog.authorName}</span>
                  <span>{new Date(blog.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}</span>
                </div>
               
                <button className="mt-3 px-3 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors text-sm">
                  Read Blog
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
