import express from "express";
import authenticate from "../middleware/authenticate.js";
import ProgressPhoto from "../models/ProgressPhoto.js";
import multer from "multer";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post(
  "/upload",
  authenticate,
  upload.single("photo"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ message: "No file uploaded" });

      const progressPhoto = await ProgressPhoto.create({
        user: req.user._id,
        title,
        description,
        image: {
          data: file.buffer,
          contentType: file.mimetype,
        },
      });

      res.status(201).json({
        success: true,
        message: "Photo uploaded successfully",
        photo: progressPhoto,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// ---------------- GET ALL USER PHOTOS ----------------
router.get("/", authenticate, async (req, res) => {
  try {
    const photos = await ProgressPhoto.find({ user: req.user._id }).sort({ createdAt: -1 });

    // Convert image Buffer to base64 string
    const photosWithBase64 = photos.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      image: `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`,
    }));

    res.status(200).json({ success: true, photos: photosWithBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch photos" });
  }
});

export default router;
