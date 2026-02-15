export default function ProductCard({ title, category, image }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* Product Image */}
      <div className="h-48 rounded-lg mb-4 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
        />
        {/* Heart Icon */}
        <span className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <i className="bi bi-heart text-pink-500 text-lg"></i>
        </span>
      </div>

      {/* Category */}
      <span className="inline-block text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded mb-2">
        {category}
      </span>

      {/* Title */}
      <h3 className="font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        A lightweight, hydrating moisturizer perfect for all skin types.
      </p>

      {/* Rating */}
      <div className="text-sm text-pink-500 mt-2 flex items-center">
        <i className="bi bi-star-fill mr-1"></i> 4.8 
        <span className="text-gray-400 ml-2">(234 reviews)</span>
      </div>

      {/* Price */}
      <div className="text-lg font-bold text-pink-600 mt-2">
        $45.00
      </div>

      {/* Button */}
      <button className="mt-4 w-full bg-pink-100 text-black py-2 rounded-lg text-sm flex items-center justify-center gap-2">
        <i className="bi bi-cart-fill"></i>
        Add to Cart
      </button>
    </div>
  );
}
