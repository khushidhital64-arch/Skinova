import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./DBconfig/db.js";

import userroutes from "./controllers/registerController.js";
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

app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
