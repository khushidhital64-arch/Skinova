import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Payment from "../Payment/Payment";
import { v4 as uuidv4 } from "uuid";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // ⭐ store UUID here
  const [transactionId, setTransactionId] = useState(null);

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /* ================= CHECKOUT HANDLER ================= */
  const handleCheckout = async (method) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      let uuid = null;

      // ⭐ ONLY generate UUID for ONLINE
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ⭐ CASH → clear cart immediately
      if (method === "cash") {
        alert("Order placed successfully 🎉");

        localStorage.removeItem("cart");

        window.location.reload(); // ok for now (later use context)
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

      <div className="container mx-auto p-6 text-black min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between bg-gray-50 p-4 rounded-lg shadow"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1 md:ml-6">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p>Rs {item.price.toFixed(2)}</p>

                  <div className="flex gap-3 mt-3">
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

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* TOTAL */}
            <div className="flex justify-end">
              <h2 className="text-2xl font-bold">
                Total: Rs {total.toFixed(2)}
              </h2>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4">

              {/* CASH */}
              <button
                onClick={() => handleCheckout("cash")}
                disabled={loading}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg"
              >
                Cash on Delivery
              </button>

              {/* ONLINE */}
              <button
                onClick={() => handleCheckout("online")}
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg"
              >
                Online Payment
              </button>

            </div>
          </div>
        )}

        {/* ⭐ SHOW PAYMENT ONLY AFTER ORDER */}
        {transactionId && (
          <div className="max-w-xl mx-auto mt-10">
            <Payment
              amount={total}
              transactionId={transactionId}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
