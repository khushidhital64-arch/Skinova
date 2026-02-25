import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, User, FileText, Image, X } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // =====================
  // FETCH BLOGS
  // =====================

  const fetchBlogs = async () => {
    const res = await axios.get("http://localhost:3001/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =====================
  // SUBMIT
  // =====================

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
        formData,
      );
    } else {
      await axios.post("http://localhost:3001/api/blogs/add", formData);
    }

    resetForm();
    fetchBlogs();
  };

  // =====================
  // DELETE
  // =====================

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete blog?")) return;

    await axios.delete(`http://localhost:3001/api/blogs/delete/${id}`);

    fetchBlogs();
  };

  // =====================
  // EDIT
  // =====================

  const editBlog = (blog) => {
    setTitle(blog.title);
    setAuthorName(blog.authorName);
    setDescription(blog.description);

    setEditId(blog._id);
    setShowForm(true);
  };

  // =====================
  // RESET
  // =====================

  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setDescription("");
    setImageFile(null);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      {/* HEADER */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-pink-600">Blog Studio</h1>

        <p className="text-gray-500">Manage your blog posts</p>
      </div>

      {/* ADD BUTTON */}

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <Plus size={28} />
      </button>

      {/* FORM MODAL */}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold text-pink-600">
                {editId ? "Edit Blog" : "Add Blog"}
              </h2>

              <X className="cursor-pointer" onClick={resetForm} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* TITLE */}

              <div>
                <label className="text-sm flex gap-2">
                  <FileText size={16} />
                  Title
                </label>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              {/* AUTHOR */}

              <div>
                <label className="flex gap-2 text-sm">
                  <User size={16} />
                  Author
                </label>

                <input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="text-sm">Description</label>

                <textarea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              {/* IMAGE */}

              <div>
                <label className="flex gap-2 text-sm">
                  <Image size={16} />
                  Image
                </label>

                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              {/* BUTTONS */}

              <div className="flex gap-3">
                <button className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600">
                  {editId ? "Update Blog" : "Publish Blog"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG GRID */}

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            {/* IMAGE */}

            {blog.imageBase64 && (
              <img
                src={blog.imageBase64}
                className="h-52 w-full object-cover"
              />
            )}

            {/* CONTENT */}

            <div className="p-5">
              <h2 className="text-xl font-bold">{blog.title}</h2>

              <p className="text-pink-500 text-sm flex gap-2 mt-1">
                <User size={14} />

                {blog.authorName}
              </p>

              <p className="text-gray-500 mt-3 text-sm">
                {blog.description.slice(0, 120)}
                ...
              </p>

              {/* BUTTONS */}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => editBlog(blog)}
                  className="flex gap-2 text-blue-500"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="flex gap-2 text-red-500"
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
