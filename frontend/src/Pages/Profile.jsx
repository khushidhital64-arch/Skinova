import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
        setFormData(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skinConcern") {
      setFormData({
        ...formData,
        skinConcern: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3001/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      setEditing(false);
      alert("Profile updated successfully 💖");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-rose-400">Loading...</p>;
  }

  return (
    <div className="">

      {/* Top Card */}
<div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 mb-10">
  <div className="flex flex-col md:flex-row md:items-center gap-6">
    
    {/* Avatar */}
    <div className="w-20 h-20 rounded-full bg-rose-50  flex items-center justify-center text-[#c0566d] text-xl font-semibold">
      {user.name.charAt(0)}
    </div>

    <div className="flex-1">
      
      {/* Name + Email */}
      <h2 className="text-3xl font-serif text-[#3a1f23]">
        {user.name}
    
      </h2>
      <p className="text-[#c0566d] mb-4">{user.email}</p>

      {/* BADGES SECTION */}
      <div className="flex flex-wrap gap-3">
        
        {/* Skin Type Badge */}
        <span className="px-4 py-1 text-xs tracking-wide rounded-full 
                         bg-[#c0566d]
                         text-white shadow-sm">
          {user.skinType}
        </span>

        {/* Skin Concern Badges */}
        {user.skinConcern?.map((concern, index) => (
          <span
            key={index}
            className="px-4 py-1 text-xs rounded-full 
                       border border-rose-200 
                       bg-rose-50 
                       text-[#c0566d]"
          >
            {concern}
          </span>
        ))}

      </div>
    </div>

  </div>
</div>

      {/* Edit Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 text-black">

        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-serif text-[#3a1f23]">
            Edit Profile
          </h3>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="border border-[#1A0A0E] px-6 py-2 text-black text-xs tracking-widest uppercase
                         hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
                         transition duration-300"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="border border-[#1A0A0E] px-6 py-2 text-black text-xs tracking-widest uppercase
                           hover:bg-[#C9536A] hover:border-[#C9536A] hover:text-white
                           transition duration-300"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  setFormData(user);
                }}
                className="text-xs uppercase tracking-widest text-gray-500 hover:text-black"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-xs tracking-widest text-rose-400 mb-2">
              FULL NAME
            </label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-3 rounded-lg bg-rose-50 border border-rose-100"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest text-rose-400 mb-2">
              AGE
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-3 rounded-lg bg-rose-50 border border-rose-100"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest text-rose-400 mb-2">
              SKIN TYPE
            </label>
            <input
              name="skinType"
              value={formData.skinType || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-3 rounded-lg bg-rose-50 border border-rose-100"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest text-rose-400 mb-2">
              ADDRESS
            </label>
            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              disabled={!editing}
              className="w-full p-3 rounded-lg bg-rose-50 border border-rose-100"
            />
          </div>

        </div>

        {/* Skin Concern */}
        <div className="mt-6">
          <label className="block text-xs tracking-widest text-rose-400 mb-2">
            SKIN CONCERNS (comma separated)
          </label>
          <input
            name="skinConcern"
            value={formData.skinConcern?.join(", ") || ""}
            onChange={handleChange}
            disabled={!editing}
            className="w-full p-3 rounded-lg bg-rose-50 border border-rose-100"
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
