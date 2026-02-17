import React, { useState } from "react";
import axios from "axios";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !authorName || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("authorName", authorName);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:3001/api/blogs/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Blog added successfully!");
      setTitle("");
      setAuthorName("");
      setDescription("");
      setImage(null);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error adding blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl space-y-4 border border-gray-200 shadow-md"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2"
          placeholder="Blog Title"
        />
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full border rounded-lg p-2"
          placeholder="Author Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-2"
          placeholder="Blog Content"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Blog;
