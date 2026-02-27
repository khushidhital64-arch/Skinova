import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Trash2, User, Package, Sparkles } from "lucide-react";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const token = localStorage.getItem("token");

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= SEARCH + SORT ================= */
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.user?.name?.toLowerCase().includes(lower) ||
          post.product?.name?.toLowerCase().includes(lower)
      );
    }

    if (sort === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    return filtered;
  }, [posts, search, sort]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="font-serif text-[clamp(38px,6vw,20px)] leading-tight mb-6 text-[#1A0A0E]">
          Community <span className=" text-[#C9536A]">Management</span> 
        </h1>
     

      {/* SEARCH + SORT */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search user or product..."
          className="border p-2 rounded-lg w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* POSTS */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#E8B8C0] flex items-center justify-center text-white text-sm font-bold">
                  {post.user?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-[#6B4B42] flex items-center gap-1">
                    <User size={16} />
                    {post.user?.name}
                  </h3>

                  {/* Product Name */}
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Package size={14} />
                    {post.product?.name}
                  </p>

                  {/* Skin Type Badge */}
                  <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full text-xs bg-pink-100 text-pink-600">
                    <Sparkles size={12} />
                    {post.user?.skinType}
                  </span>
                </div>
              </div>

              {/* DELETE ICON */}
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-400 hover:text-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* REVIEW TEXT */}
            <p className="mt-4 text-gray-700">{post.review}</p>

            {/* STAR RATING */}
            <div className="flex items-center gap-2 mt-3">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-base ${
                    index < post.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm text-[#6B4B42]">
                {post.rating}/5
              </span>
            </div>

            {/* IMAGE */}
            {post.image && (
              <img
                src={post.image}
                alt="review"
                className="w-64 h-44 object-cover rounded-xl mt-4 cursor-pointer hover:scale-105 transition"
                onClick={() => window.open(post.image, "_blank")}
              />
            )}

            {/* DATE */}
            <p className="text-xs text-gray-400 mt-3">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
