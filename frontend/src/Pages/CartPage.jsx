import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Payment from "../Payment/Payment";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const [user, setUser] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH USER POINTS ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:3001/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data.user.UseSkinovapoint || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  /* ================= CALCULATIONS ================= */
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountedTotal = usePoints ? total * 0.9 : total;

  /* ================= CHECKOUT ================= */
  const handleCheckout = async (method) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      let uuid = null;
      if (method === "online") {
        uuid = uuidv4();
        setTransactionId(uuid);
      }

      await axios.post(
        "http://localhost:3001/api/orders/checkout",
        {
          cartItems: cart,
          paymentMethod: method,
          paymentTransactionUuid: uuid,
          totalAmount: discountedTotal,
          usedPoints: usePoints,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (method === "cash") {
        alert("Order placed successfully 🎉");
        localStorage.removeItem("cart");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#F6F0F1] text-[#1A0A0E] px-6 py-3">
        
        {/* TITLE + POINTS SAME ROW */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[30px] font-serif">
            Your Bag ({cart.length})
          </h1>

          <h1 className="text-[20px] text-[#B04455] font-serif">
            My Points: {user}
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="border border-[#1A0A0E] px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#1A0A0E] hover:text-white transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            
            {/* CART ITEMS */}
            <div className="space-y-10 border-b border-[#E6DCDD] pb-10">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="w-28 h-28 bg-[#EADDE0] rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl mb-2">{item.name}</h3>
                    <p className="text-[#B04455] mb-4">
                      Rs {item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="w-8 h-8 border border-[#D8C6C9] text-lg"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-[#D8C6C9] text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-[#9E5A66] hover:text-red-500 text-sm tracking-wide"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL SECTION */}
            <div className="flex justify-between items-center mt-10">
              <p className="uppercase tracking-widest text-sm text-[#9E5A66]">
                Total
              </p>
              <h2 className="text-3xl font-serif">
                Rs {discountedTotal.toFixed(2)}
              </h2>
            </div>

            {/* POINTS MESSAGE BELOW TOTAL */}
            <div className="mt-4 mb-6">
              {user >= 1000 ? (
                !usePoints ? (
                  <button
                    onClick={() => setUsePoints(true)}
                    className="bg-[#B04455] text-white px-4 py-2 rounded"
                  >
                    Use points (10% off)
                  </button>
                ) : (
                  <p className="text-[#B04455] text-[20px]">
                    10% discount applied!
                  </p>
                )
              ) : (
                <p className="text-[#B04455]">
                  Get 1000 points to use 10% discount
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="mt-10 space-y-4">
              <button
                onClick={() => handleCheckout("cash")}
                disabled={loading}
                className="w-full bg-[#2B0C12] text-white py-4 uppercase tracking-widest text-sm hover:opacity-90 transition"
              >
                {loading ? "Processing..." : "Proceed to Checkout →"}
              </button>

              <button
                onClick={() => handleCheckout("online")}
                disabled={loading}
                className="w-full border border-[#D8C6C9] py-4 uppercase tracking-widest text-sm hover:bg-[#EADDE0] transition"
              >
                Online Payment
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-[#D8C6C9] py-4 uppercase tracking-widest text-sm hover:bg-[#EADDE0] transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* ONLINE PAYMENT SECTION */}
        {transactionId && (
          <div className="max-w-xl mx-auto mt-16">
            <Payment amount={discountedTotal} transactionId={transactionId} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
