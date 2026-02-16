import express from "express";
import multer from "multer";
import { Blog } from "../models/Blog.js";

const router = express.Router();
const upload = multer(); // memory storage, for buffer

// ==========================
// CREATE BLOG
// ==========================
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, authorName, description } = req.body;

    const blog = new Blog({
      title,
      authorName,
      description,
      image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ==========================
// GET ALL BLOGS
// ==========================
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const blogsWithBase64 = blogs.map((b) => {
      const blogObj = b.toObject();
      if (b.image?.data) {
        blogObj.imageBase64 = `data:${b.image.contentType};base64,${b.image.data.toString("base64")}`;
      }
      return blogObj;
    });
    res.json(blogsWithBase64);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ==========================
// GET BLOG BY ID
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const blogObj = blog.toObject();
    if (blog.image?.data) {
      blogObj.imageBase64 = `data:${blog.image.contentType};base64,${blog.image.data.toString("base64")}`;
    }

    res.json(blogObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ==========================
// UPDATE BLOG
// ==========================
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, authorName, description } = req.body;
    const updatedData = {
      title,
      authorName,
      description,
    };

    if (req.file) {
      updatedData.image = { data: req.file.buffer, contentType: req.file.mimetype };
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ==========================
// DELETE BLOG
// ==========================
router.delete("/delete/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
