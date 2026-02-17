import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function ProductCard({ _id, name, category, imageUrl, price, description, concerns, skinType, stock }) {
  const navigate = useNavigate(); 
    const { addToCart } = useContext(CartContext);

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-4 relative cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product/${_id}`)} 
    >
      {/* Product Image */}
      <div className="h-48 rounded-lg mb-4 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain rounded-lg"
        />

        {/* Heart Icon */}
        <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <i className="bi bi-heart text-pink-500 text-lg"></i>
        </span>

        {/* Out of Stock Badge */}
        {stock === 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow">
            Out of Stock
          </span>
        )}
      </div>

      {/* Category */}
      <span className="inline-block text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded mb-2">
        {category}
      </span>

      {/* Name */}
      <h3 className="font-semibold text-gray-800">{name}</h3>

      {/* Concerns */}
      {concerns && concerns.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          Concerns: {concerns.join(", ")}
        </p>
      )}

      {/* Skin Types */}
      {skinType && skinType.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          Skin Type: {skinType.join(", ")}
        </p>
      )}

      {/* Price */}
      <div className="text-lg font-bold text-pink-600 mt-2">
        Rs:{price.toFixed(2)}
      </div>

      {/* Button */}
      <button
        className={`mt-4 w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
          stock === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-pink-100 text-black"
        }`}
        disabled={stock === 0}
        onClick={() => addToCart({ _id, name, category, imageUrl, price, stock })}
      >
        <i className="bi bi-cart-fill"></i>
        {stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
