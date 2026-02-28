import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeProductComponent({
  _id,
  name,
  imageUrl,
  category,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${_id}`)}
      className="cursor-pointer group h-full"
    >
      <div className="bg-[#FDF6F0] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
        
        {/* IMAGE */}
        <div className="bg-[#F8E6EA] h-72 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          
          <p className="text-xs uppercase tracking-widest text-[#8B5E6A] mb-2">
            {category}
          </p>

          {/* CLAMP TITLE TO 2 LINES */}
          <h3 className="text-xl font-serif text-[#1A0A0E] mb-3 line-clamp-2">
            {name}
          </h3>

          

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${_id}`);
            }}
            className="text-sm text-left uppercase tracking-widest text-[#8B5E6A] hover:text-[#1A0A0E] transition"
          >
            SHOP NOW →
          </button>
        </div>
      </div>
    </div>
  );
}