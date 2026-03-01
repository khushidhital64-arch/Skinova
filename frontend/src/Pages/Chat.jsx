import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
// Import Lucide Icons
import { SendHorizontal, Sparkles, ArrowUpRight, Loader2 } from "lucide-react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendQuestion = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/api/chat/answer", {
        question: input,
      });
      setAnswer(res.data.answer);
      setProductIds(res.data.productIds || []);
      setInput("");
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <Navbar />

      <div className="p-6 md:p-12 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-4xl text-[#1A0A0E] mb-2">
            Skinova Concierge<span className="text-[#C9536A]">.</span>
          </h2>
          <p className="text-[#8B5E6A] tracking-wide text-sm">
            Ask us anything about your skincare routine or products.
          </p>
        </div>

        {/* Chat Input Container */}
        <div className="relative group mb-8">
          <input
            type="text"
            placeholder="Search for ingredients, concerns, or products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-4 pr-14 bg-white/50 backdrop-blur-sm border border-pink-100 rounded-full 
                       focus:ring-2 focus:ring-[#C9536A]/20 focus:border-[#C9536A] outline-none 
                       transition-all placeholder:text-[#8B5E6A]/50 text-[#1A0A0E]"
          />
          <button
            onClick={sendQuestion}
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 w-12 bg-[#C9536A] text-white rounded-full 
                       hover:bg-[#a74257] transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <SendHorizontal className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Response Area */}
        {answer && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 bg-white border border-pink-100 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#C9536A]" />
                <h3 className="font-serif text-xl text-[#1A0A0E]">
                  AI Specialist
                </h3>
              </div>

              <p className="whitespace-pre-line text-[#8B5E6A] leading-relaxed mb-6">
                {answer}
              </p>

              {productIds.length > 0 && (
                <div className="pt-6 border-t border-pink-50">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9536A] mb-4">
                    Recommended for you
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {productIds.map((id, index) => (
                      <button
                        key={id}
                        onClick={() => navigate(`/product/${id}`)}
                        className="group flex items-center justify-between px-5 py-4 border border-pink-50 
                                   rounded-2xl text-[#1A0A0E] hover:bg-[#FDF6F0] hover:border-[#C9536A] transition-all"
                      >
                        <span className="text-sm font-medium tracking-tight text-[#8B5E6A]">
                          View Product {index + 1}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#C9536A] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
