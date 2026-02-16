import express from "express";
import authenticate from "../middleware/authenticate.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/* ================= CREATE ORDER (CASH / ONLINE) ================= */
router.post("/checkout", authenticate, async (req, res) => {
  try {
    const { cartItems, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Reduce product stock
    for (let item of cartItems) {
      const product = await Product.findById(item._id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${product.name} is out of stock` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    // Save order
    const order = await Order.create({
      user: req.user._id,
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      totalAmount,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Checkout failed" });
  }
});

/* ================= GET LOGGED-IN USER ORDERS ================= */
router.get("/my-orders", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
