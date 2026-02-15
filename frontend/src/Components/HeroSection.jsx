export default function HeroSection() {
  const filters = [
    "Skin Type: Combination",
    "Acne",
    "Dark Spots",
    "Aging"
  ];

  return (
    <section className="bg-pink-50 py-16 text-center px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Discover Your Perfect Skincare
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {filters.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm rounded-lg border transition
              ${index === 0
                ? "bg-pink-100 border-pink-400 text-pink-600"
                : "bg-white text-gray-600 hover:bg-pink-100"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Subtitle */}
      <p className="mt-6 text-gray-500 text-sm max-w-xl mx-auto">
        Personalized recommendations based on your skin type and concerns
      </p>
    </section>
  );
}
