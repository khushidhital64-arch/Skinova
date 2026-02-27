import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  User,
  FileText,
  Image,
  X,
  Search,
} from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:3001/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= FILTER + SORT =================
  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      filtered.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    return filtered;
  }, [blogs, searchTerm, sortOrder]);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorName", authorName);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    if (editId) {
      await axios.put(
        `http://localhost:3001/api/blogs/update/${editId}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:3001/api/blogs/add",
        formData
      );
    }

    resetForm();
    fetchBlogs();
  };

  // ================= DELETE =================
  const deleteBlog = async (id) => {
    if (!window.confirm("Delete blog?")) return;
    await axios.delete(
      `http://localhost:3001/api/blogs/delete/${id}`
    );
    fetchBlogs();
  };

  // ================= EDIT =================
  const editBlog = (blog) => {
    setTitle(blog.title);
    setAuthorName(blog.authorName);
    setDescription(blog.description);
    setEditId(blog._id);
    setShowForm(true);
  };

  // ================= RESET =================
  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setDescription("");
    setImageFile(null);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-6">

      {/* HEADER */}
      <h1 className="font-serif text-[clamp(38px,6vw,20px)] leading-tight mb-6 text-[#1A0A0E]">
        Blog <span className="text-[#C9536A]">Management</span>
      </h1>

      {/* SEARCH + SORT */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search blog by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-black rounded-xl focus:ring-1 focus:ring-[#C9536A]"
          />
        </div>

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-black px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#C9536A]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* FLOAT ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-[#C9536A] text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <Plus size={26} />
      </button>

      
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 border border-rose-100">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#C9536A]">
                {editId ? "Edit Blog" : "Add Blog"}
              </h2>

              <X
                size={22}
                className="cursor-pointer text-gray-500 hover:text-[#C9536A]"
                onClick={resetForm}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Title */}
              <div>
                <label className="text-sm flex items-center gap-2 text-gray-600">
                  <FileText size={16} /> Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-rose-100 focus:border-[#C9536A] focus:ring-1 focus:ring-[#C9536A] p-3 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="text-sm flex items-center gap-2 text-gray-600">
                  <User size={16} /> Author
                </label>
                <input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full border border-rose-100 focus:border-[#C9536A] focus:ring-1 focus:ring-[#C9536A] p-3 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-rose-100 focus:border-[#C9536A] focus:ring-1 focus:ring-[#C9536A] p-3 rounded-xl mt-2"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm flex items-center gap-2 text-gray-600">
                  <Image size={16} /> Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mt-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-3">
                <button className="flex-1 bg-[#C9536A] text-white py-3 rounded-xl hover:opacity-90 transition">
                  {editId ? "Update Blog" : "Publish Blog"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BLOG GRID ================= */}
      <div className="grid md:grid-cols-3 gap-8">

        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden flex flex-col h-[480px]"
          >

            {blog.imageBase64 && (
              <img
                src={blog.imageBase64}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />
            )}

            <div className="p-6 flex flex-col flex-1">

              <h2 className="text-lg font-bold text-[#1A0A0E] line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-[#C9536A] text-sm flex items-center gap-2 mt-2">
                <User size={14} />
                {blog.authorName}
              </p>

              <p className="text-gray-500 mt-4 text-sm flex-1 overflow-hidden">
                {blog.description.slice(0, 130)}...
              </p>

              <div className="flex justify-between items-center mt-6 border-t pt-4">

                <button
                  onClick={() => editBlog(blog)}
                  className="flex items-center gap-2 text-[#C9536A]"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="flex items-center gap-2 text-red-500"
                >
                  <Trash2 size={18} />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
