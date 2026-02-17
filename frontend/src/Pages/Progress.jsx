import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const Progress = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch photos
  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPhotos(res.data.photos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please fill required fields");

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post(
        "http://localhost:3001/api/progress/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setFile(null);
      setShowForm(false);
      fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Progress Photos</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          <Plus size={18} />
          Add New Progress
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-pink-600 text-white rounded-lg"
            >
              Upload
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Progress List */}
      <div className="space-y-4">
        {photos.length === 0 && (
          <p className="text-gray-500">No progress photos uploaded yet.</p>
        )}

        {photos.map((photo) => (
          <div
            key={photo._id}
            className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow"
          >
            {/* Image */}
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full md:w-40 h-40 object-cover rounded-lg"
            />

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{photo.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {photo.description}
                </p>
              </div>

              <div className="mt-3">
                <a
                  href={photo.image}
                  download={photo.title}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
