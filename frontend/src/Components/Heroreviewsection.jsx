import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSectionReview = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen grid md:grid-cols-2 pt-32 overflow-hidden bg-[#FDF6F0]">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#F2C4CE]/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9536A]/20 blur-[120px] rounded-full"></div>
      </div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-20 py-16">
        
        {/* Eyebrow */}
        <div className="text-xs tracking-[4px] uppercase text-[#C9536A] mb-6 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#C9536A]"></span>
          New Collection — Spring 2026
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[clamp(48px,6vw,80px)] leading-tight mb-6 text-[#1A0A0E]">
          Wear Your <em className="italic text-[#C9536A]">Boldest</em> Self
        </h1>

        {/* Description */}
        <p className="text-[#8B5E6A] max-w-md mb-10 text-lg">
          Luxury cosmetics crafted for every skin tone. From barely-there glow
          to full glam — find your perfect finish.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 items-center">
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#1A0A0E] text-white px-8 py-4 text-sm tracking-widest uppercase 
                       hover:bg-[#C9536A] transition duration-300 shadow-lg"
          >
            Shop Now
          </button>

          <button className="text-[#8B5E6A] hover:text-[#C9536A] transition">
            Watch Lookbook →
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-16 pt-10 border-t border-pink-200">
          <div>
            <div className="font-serif text-3xl text-[#1A0A0E]">240+</div>
            <div className="text-xs tracking-widest uppercase text-[#8B5E6A]">
              Products
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl text-[#1A0A0E]">98%</div>
            <div className="text-xs tracking-widest uppercase text-[#8B5E6A]">
              Vegan
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl text-[#1A0A0E]">1k</div>
            <div className="text-xs tracking-widest uppercase text-[#8B5E6A]">
              Reviews
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center justify-center relative bg-gradient-to-br from-[#F2C4CE] via-[#E8A5B5] to-[#C9536A]">

        {/* Floating Card - Top */}
        <div className="absolute top-20 -left-8 bg-white p-4 rounded-xl shadow-xl text-sm">
          <div className="text-xs uppercase text-[#8B5E6A]">Best Seller</div>
          <div className="font-serif text-xl mt-1 text-black">Velvet Lip</div>
          <div className="text-yellow-500 text-xs mt-1">★★★★★ 4.9</div>
        </div>

       <div className="w-[380px] h-[480px] 
                rounded-[60%_40%_70%_30%/50%_60%_40%_50%] 
                bg-white/20 backdrop-blur-xl border border-white/30 
                flex items-center justify-center 
               hover:scale-105 transition duration-500 overflow-hidden">

  <img 
    src="/velvet.webp" 
    alt="Velvet Lip Product"
    className="w-72 object-contain drop-shadow-2xl"
  />

</div>

        {/* Floating Card - Bottom */}
        <div className="absolute bottom-24 -right-6 bg-white p-4 rounded-xl shadow-xl text-sm">
          <div className="text-xs uppercase text-[#8B5E6A]">New Drop</div>
          <div className="font-serif text-xl mt-1 text-black">Velvet lipgloss</div>
          <div className="text-[#C9536A] font-medium mt-1">$42 · Limited</div>
        </div>

      </div>
    </section>
  );
};

export default HeroSectionReview;