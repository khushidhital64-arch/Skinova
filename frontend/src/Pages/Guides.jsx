import React from "react";
import Navbar from "../Components/Navbar";
import { PlayCircle, BookOpen, Sparkles } from "lucide-react";

const videoIds = [
  "UyBMKPlEw0U",
  "UyBMKPlEw0U", // change this to different video IDs later
  "UyBMKPlEw0U"
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <Navbar />

      <div className="py-6 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <span className="bg-white px-4 py-1 rounded-full border border-pink-100 flex items-center gap-2 text-[#C9536A] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3 h-3" /> Masterclass
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-[#1A0A0E] mb-4">
            Guides<span className="text-[#C9536A]">.</span>
          </h2>

          <p className="text-[#8B5E6A] tracking-wide text-sm max-w-md mx-auto leading-relaxed italic">
            "Beauty is a ritual. Follow our curated video guide to master your
            Skinova glow from the comfort of your vanity."
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {videoIds.map((id, index) => (
            <div
              key={index}
              className="w-full max-w-xs aspect-[9/16] rounded-3xl overflow-hidden shadow-lg border border-pink-200 hover:scale-105 transition duration-500"
            >
              <iframe
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                title={`Makeup Guide ${index}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>

        {/* Metadata */}
        <div className="mt-10 flex justify-center gap-8 items-center text-[#8B5E6A]">
          <div className="flex flex-col items-center gap-1">
            <PlayCircle className="w-6 h-6 text-[#C9536A]" />
            <span className="text-[10px] uppercase font-bold">
              Watch
            </span>
          </div>

          <div className="w-px h-8 bg-pink-200" />

          <div className="flex flex-col items-center gap-1">
            <BookOpen className="w-6 h-6 text-[#C9536A]" />
            <span className="text-[10px] uppercase font-bold">
              Learn
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="font-serif text-[#1A0A0E]/30 text-2xl tracking-[0.5em] uppercase">
            Skinova
          </p>
        </div>
      </div>
    </div>
  );
};

export default Guides;