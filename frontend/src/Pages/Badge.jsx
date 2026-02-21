import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  PenLine,
  Camera,
  Gem,
  Package,
  CalendarCheck,
  Star,
  Lock,
} from "lucide-react";

const Badge = () => {
  const [orders, setOrders] = useState([]);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");

        const [orderRes, postRes, photoRes, userRes] = await Promise.all([
          axios.get("http://localhost:3001/api/orders/my-orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3001/api/post"),
          axios.get("http://localhost:3001/api/progress", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3001/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOrders(orderRes.data.orders || []);
        setPosts(postRes.data || []);
        setPhotos(photoRes.data.photos || []);
        setPoints(userRes.data.user.points || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  // ================= BADGE LOGIC =================
  const badgeList = [
    {
      icon: ShoppingBag,
      title: "First Order",
      earned: orders.length >= 1,
      progress: `${orders.length}/1`,
    },
    {
      icon: PenLine,
      title: "First Post",
      earned: posts.length >= 1,
      progress: `${posts.length}/1`,
    },
    {
      icon: Camera,
      title: "First Progress Photo",
      earned: photos.length >= 1,
      progress: `${photos.length}/1`,
    },
    {
      icon: Gem,
      title: "Skinova 100+ Points",
      earned: points >= 100,
      progress: `${points}/100`,
    },
    {
      icon: Package,
      title: "5 Orders",
      earned: orders.length >= 5,
      progress: `${orders.length}/5`,
    },
    {
      icon: CalendarCheck,
      title: "10 Progress Logs",
      earned: photos.length >= 10,
      progress: `${photos.length}/10`,
    },
    {
      icon: Star,
      title: "3 Reviews",
      earned: posts.length >= 3,
      progress: `${posts.length}/3`,
    },
  ];

  const earnedCount = badgeList.filter((b) => b.earned).length;
  const totalBadges = badgeList.length;
  const percentage = Math.round((earnedCount / totalBadges) * 100);

  return (
    <div className="bg-[#f4eaea] ">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-serif text-gray-800">
          Your <span className="text-[#c0566d] italic">Badges</span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Earn badges by shopping, posting, tracking progress & earning points.
        </p>
      </div>

      {/* Progress Section */}
      <div className="bg-white/70 border border-gray-200 p-6 rounded-lg flex items-center justify-between mb-14">
        <div className="w-full mr-6">
          <p className="text-xl font-medium text-gray-700 mb-3">
            {earnedCount}/{totalBadges}{" "}
            <span className="text-[#c0566d] font-semibold">badges</span>
          </p>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#c0566d] to-[#d4a24c] transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <p className="text-lg text-gray-600 whitespace-nowrap">
          {percentage}% complete
        </p>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {badgeList.map((badge, index) => {
          const Icon = badge.icon;

          return (
            <div
              key={index}
              className={`rounded-md p-8 text-center transform transition-all duration-300 
                ${badge.earned
                  ? "bg-white border border-[#c0566d] shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1"
                  : "bg-white border border-gray-200 opacity-60 hover:opacity-80 hover:scale-105 hover:-translate-y-1"
                }`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <Icon
                  size={48}
                  className={`transition-colors duration-300 ${
                    badge.earned ? "text-[#c0566d] group-hover:text-[#d4a24c]" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif text-gray-800 mb-4 transition-colors duration-300 hover:text-[#c0566d]">
                {badge.title}
              </h3>

              {/* Status */}
              {badge.earned ? (
                <div className="bg-[#c0566d] text-white text-sm py-2 px-4 inline-block tracking-widest rounded transition-all duration-300 hover:bg-[#d4a24c]">
                  ✓ EARNED
                </div>
              ) : (
                <div className="bg-gray-200 text-gray-600 text-sm py-2 px-4 inline-flex items-center gap-2 rounded transition-all duration-300 hover:bg-gray-300 hover:text-gray-700">
                  <Lock size={16} />
                  {badge.progress}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badge;