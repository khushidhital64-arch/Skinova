import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-4 text-center text-gray-600">Loading blog...</p>;
  if (!blog) return <p className="p-4 text-center text-gray-600">Blog not found</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Back Button */}
      <button
  onClick={() => navigate("/blogs")}
  className="mb-4 px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors"
>
  ← Back to Blogs
</button>


        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-pink-600">{blog.title}</h1>

        {/* Author & Date */}
        <p className="text-gray-500 mb-6">
          By <span className="font-medium">{blog.authorName}</span> •{" "}
          {new Date(blog.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {/* Image */}
        {blog.imageBase64 && (
          <div className="w-full h-96 overflow-hidden rounded-lg mb-6 flex items-center justify-center bg-gray-100">
            <img
              src={blog.imageBase64}
              alt={blog.title}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Description */}
        <div className=" text-justify text-gray-800">
          <p>{blog.description}</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BlogDetails;
