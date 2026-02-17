import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /* ================= CHECKOUT HANDLER ================= */
  const handleCheckout = async (paymentMethod) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      await axios.post(
        "http://localhost:3001/api/orders/checkout",
        {
          cartItems: cart,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully 🎉");

      // Clear cart
      localStorage.removeItem("cart");
      window.location.reload();
    
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
      setShowPayment(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6 text-black min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center md:items-start justify-between bg-gray-50 p-4 rounded-lg shadow"
              >
                {/* Product Image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded"
                />

                {/* Product Info */}
                <div className="flex-1 md:ml-6 mt-2 md:mt-0">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="mt-1">Rs {item.price.toFixed(2)}</p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-3 md:mt-0 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 flex justify-end">
              <h2 className="text-2xl font-bold">
                Total: Rs {total.toFixed(2)}
              </h2>
            </div>

            {/* Checkout */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowPayment(true)}
                className="px-6 py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-4">Choose Payment Method</h3>

            <button
              disabled={loading}
              onClick={() => handleCheckout("cash")}
              className="w-full mb-3 bg-green-500 text-white py-2 rounded"
            >
              Cash on Delivery
            </button>

            <button
              disabled={loading}
              onClick={() => handleCheckout("online")}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Online Payment
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-3 text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
