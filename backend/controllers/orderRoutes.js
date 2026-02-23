import express from "express";
import authenticate from "../middleware/authenticate.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import CryptoJS from "crypto-js";
import User from "../models/User.js";

const router = express.Router();


/* ================= CREATE ORDER (CASH / ONLINE) ================= */

router.post("/checkout", authenticate, async (req, res) => {
  try {
    const { cartItems, paymentMethod, paymentTransactionUuid, usedPoints } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Apply 10% discount if user used points
    let finalAmount = usedPoints ? totalAmount * 0.9 : totalAmount;

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

    // Create order
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
      finalAmount,
      paymentMethod,
      usedPoints: usedPoints || false, // save whether points were used
      paymentTransactionUuid:
        paymentMethod === "online" ? paymentTransactionUuid : null,
    });

    // Points logic
    const earnedPoints = 100; // points earned for every purchase
    const pointsToDeduct = usedPoints ? 1000 : 0; // points spent if discount applied

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          UseSkinovapoint: earnedPoints - pointsToDeduct, // add 100 points, subtract 1000 if used
          Skinovapoint: earnedPoints, // total points for badge
        },
      },
      { new: true }
    );

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
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // latest first

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

router.post("/paymentverify/:data", authenticate, async (req, res) => {
  console.log("🔥 PAYMENT VERIFY ROUTE HIT");
  try {
    const { data } = req.params;

    // Decode Base64 data
    const decodedString = Buffer.from(data, "base64").toString("utf8");
    const decoded = JSON.parse(decodedString);

    // Build hash string
    const hashString =
      `transaction_code=${decoded.transaction_code},` +
      `status=${decoded.status},` +
      `total_amount=${decoded.total_amount},` +
      `transaction_uuid=${decoded.transaction_uuid},` +
      `product_code=${decoded.product_code},` +
      `signed_field_names=${decoded.signed_field_names}`;

    const secret = "8gBm/:&EnhH.1/q";
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const serverSig = CryptoJS.enc.Base64.stringify(hash);

    if (serverSig !== decoded.signature) {
      return res.status(400).json({
        success: false,
        message: "INVALID SIGNATURE",
      });
    }

    if (decoded.status !== "COMPLETE") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const order = await Order.findOne({
      paymentTransactionUuid: decoded.transaction_uuid,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.json({
        success: true,
        message: "Payment already verified",
        order,
      });
    }

    // ✅ UPDATE ORDER
    order.paymentStatus = "paid";
    order.orderStatus = "processing"; // or confirmed
    await order.save();

    return res.json({
      success: true,
      message: "Payment verified & order updated",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL ORDERS ================= */
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // get user name and email
      .populate("items.product", "name price "); // optional if products are referenced
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE ORDER STATUS ================= */
router.put("/:id/status", async (req, res) => {
  const { status } = req.body; // "pending" or "delivered"

  if (!["pending", "delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    // Total revenue
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    // Total orders
    const totalOrders = orders.length;

    // Total users
    const totalUsers = await User.countDocuments();

    // Total products
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
