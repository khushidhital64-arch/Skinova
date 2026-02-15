import ProductCard from "./ProductCard";

export default function Recommended() {
  const recommendedProducts = [
    { title: "Hydrating Moisturizer", category: "Moisturizer", image: "/photo1.jpeg" },
    { title: "SPF 50 Sunscreen", category: "Sunscreen", image: "/photo2.jpg" },
    { title: "Retinol Night Cream", category: "Moisturizer", image: "/photo3.jpg" },
    { title: "Clay Face Mask", category: "Mask", image: "/photo4.jpg" }
  ];

  const trendingProducts = [
    { title: "Vitamin C Serum", category: "Serum", image: "/lip1.webp" },
    { title: "Exfoliating Scrub", category: "Scrub", image: "/lip2.jpg" },
    { title: "Night Repair Cream", category: "Moisturizer", image: "/lip3.webp" },
    { title: "Hydrating Mask", category: "Mask", image: "/lip4.jpeg" }
  ];

  const bestSellers = [
    { title: "SPF 30 Sunscreen", category: "Sunscreen", image: "/photo1.jpeg" },
    { title: "Anti-Aging Cream", category: "Moisturizer", image: "/photo2.jpg" },
    { title: "Clay Mask", category: "Mask", image: "/photo3.jpg" },
    { title: "Oil Control Serum", category: "Serum", image: "/photo4.jpg" }
  ];
  return (<>
   <section className="px-6 bg-white md:px-12 py-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
         Recommended For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>
    
     <section className="px-6 bg-white md:px-12 py-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        Trendy Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {trendingProducts.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>

     <section className="px-6 bg-white md:px-12 py-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
       Best Seller
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </section>
  </>
   
  );
}
