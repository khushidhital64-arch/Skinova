import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-red-500">Failed to load profile</p>;
  }

  return (
    <div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Personal Information
          </h3>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-600">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-medium text-gray-600">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-medium text-gray-600">Age:</span>{" "}
              {user.age}
            </p>
          </div>
        </div>

        {/* Skin Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Skin Profile
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-600">Skin Type:</span>{" "}
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600 ml-2">
                {user.skinType}
              </span>
            </p>

            <div>
              <span className="font-medium text-gray-600 block mb-2">
                Skin Concerns:
              </span>

              <div className="flex flex-wrap gap-2">
                {user.skinConcern.map((concern, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-white border text-gray-600"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
