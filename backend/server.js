import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./DBconfig/db.js";

import userroutes from "./controllers/registerController.js";
import productRoutes from "./controllers/ProductController.js";
import blogRoutes from "./controllers/BlogController.js";
import userRoutes from "./controllers/userRoutes.js";

import orderRoutes from "./controllers/orderRoutes.js";
import progressroutes from "./controllers/progressRoutes.js";
import postRoutes from "./controllers/postRoutes.js";



dotenv.config();

const app = express();

/* ---------- Database ---------- */
connectdb();

/* ---------- CORS Setup ---------- */
app.use(cors({
  origin: "http://localhost:5173",   // your React dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

/* ---------- Routes ---------- */
app.use("/api/users", userroutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/progress",progressroutes)
app.use("/api/post",postRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
