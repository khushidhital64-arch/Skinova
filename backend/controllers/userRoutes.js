import express from "express";
import User from "../models/User.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

/* ================= GET USER PROFILE ================= */
router.get("/profile", authenticate, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user, // comes from middleware
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE USER PROFILE ================= */
router.put("/profile", authenticate, async (req, res) => {
  try {
    const { name, age, skinType, skinConcern } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        age,
        skinType,
        skinConcern,
      },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
