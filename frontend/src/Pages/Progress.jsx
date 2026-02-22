import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const Progress = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ================= FETCH PHOTOS =================
  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/progress", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPhotos(res.data.photos || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ================= UPLOAD =================
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      return alert("Please fill required fields");
    }

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
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-serif text-gray-800">
          Daily <span className="text-[#c0566d] italic">Progress</span> Photo
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Track your skin & makeup journey day by day.
        </p>
      </div>

      {/* ================= ADD BUTTON ================= */}
<button
  onClick={() => setShowForm(!showForm)}
  className="mt-6 flex items-center justify-center gap-2 
             border border-[#1A0A0E] 
             px-6 py-3 
             text-black text-xs tracking-widest uppercase font-medium
             hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
             transition duration-300"
>
  <Plus size={16} />
  Add New Progress
</button>

      {/* ================= UPLOAD FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-2xl shadow border text-black border-pink-100 space-y-4"
        >
          <input
            type="text"
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-pink-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-pink-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-pink-200 rounded-lg p-3"
            required
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-5 py-2 bg-[#c0566d] text-white rounded-lg hover:bg-pink-700 transition"
            >
              Upload
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ================= TIMELINE ================= */}
      <div className="bg-white rounded-2xl shadow border border-pink-100 overflow-hidden">

        {/* Timeline Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-pink-100 bg-pink-50">
          <h2 className="text-2xl font-serif text-gray-800">
            Photo <span className="italic text-[#c0566d]">Timeline</span>
          </h2>
          <span className="text-[#c0566d] text-sm font-medium">
            {photos.length} days logged
          </span>
        </div>

        {photos.length === 0 && (
          <p className="p-6 text-gray-500">
            No progress photos uploaded yet.
          </p>
        )}

        {/* Latest First */}
        {[...photos].reverse().map((photo, index) => (
          <div
            key={photo._id}
            className="flex items-center justify-between px-6 py-6 border-b last:border-none border-pink-100 hover:bg-pink-50 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-5">
              
              {/* Circle Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-pink-100 shadow">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {photo.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {new Date(photo.createdAt).toDateString()}
                </p>

                {photo.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-3">
              <span className="text-[#c0566d] font-medium">
                Day {index + 1}
              </span>

              <a
                href={photo.image}
                download={photo.title}
                className="px-4 py-2 text-sm bg-[#c0566d] text-white rounded-lg hover:bg-pink-700 transition"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
