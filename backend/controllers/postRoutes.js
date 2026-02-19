import express from "express";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";
import Post from "../models/Post.js";
import Order from "../models/Order.js";

const router = express.Router();

// multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  authenticate,
  upload.single("photo"),
  async (req, res) => {
    try {
      const { productId, review, rating } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      if (!productId || !review || !rating) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // ✅ CHECK IF USER BOUGHT THIS PRODUCT
      const order = await Order.findOne({
        user: req.user._id,
        "items.product": productId,
        // paymentStatus: "completed", // optional but recommended
      });

      if (!order) {
        return res.status(403).json({
          message: "You can only review products you have purchased",
        });
      }

      // ❌ PREVENT MULTIPLE REVIEWS FOR SAME PRODUCT
      const alreadyPosted = await Post.findOne({
        user: req.user._id,
        product: productId,
      });

      if (alreadyPosted) {
        return res
          .status(400)
          .json({ message: "You already reviewed this product" });
      }

      // ✅ CREATE POST
      const post = await Post.create({
        user: req.user._id,
        product: productId,
        review,
        rating,
        image: {
          data: file.buffer,
          contentType: file.mimetype,
        },
      });

      res.status(201).json({
        success: true,
        message: "Review posted successfully",
        post,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Post upload failed" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
          .populate("user", "name skinType skinConcern")
      .populate("product", "name");

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      user: post.user,
      product: post.product,
      review: post.review,
      rating: post.rating,
      image: `data:${post.image.contentType};base64,${post.image.data.toString(
        "base64"
      )}`,
      createdAt: post.createdAt,
    }));

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});


export default router;
