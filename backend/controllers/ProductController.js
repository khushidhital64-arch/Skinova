import express from "express";
import Product from "../models/Product.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage(); // store in buffer
const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      description,
      ingredients,
      category,
    } = req.body;

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      ingredients,
      category,

      skinType: Array.isArray(req.body.skinType)
        ? req.body.skinType
        : req.body.skinType
        ? [req.body.skinType]
        : [],

      concerns: Array.isArray(req.body.concerns)
        ? req.body.concerns
        : req.body.concerns
        ? [req.body.concerns]
        : [],

      imageUrl: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newProduct.save();

    res.status(201).json({ message: "Product Added Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//////////////////////////////////////////////////////
// BULK INSERT
//////////////////////////////////////////////////////

router.post("/bulk", async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);

    res.status(201).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////
// GET ALL PRODUCTS
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// GET ALL PRODUCTS (Convert Buffer → Base64)
//////////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithImages = products.map((product) => {
      let imageBase64 = null;

      if (product.imageUrl?.data) {
        imageBase64 = `data:${product.imageUrl.contentType};base64,${product.imageUrl.data.toString("base64")}`;
      }

      return {
        ...product._doc,
        imageUrl: imageBase64, // 🔥 send base64 instead of buffer
      };
    });

    res.json(productsWithImages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////
// GET SINGLE PRODUCT
//////////////////////////////////////////////////////

router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////
// UPDATE PRODUCT
//////////////////////////////////////////////////////

router.put("/:id", async (req, res) => {
  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////
// DELETE PRODUCT
//////////////////////////////////////////////////////

router.delete("/:id", async (req, res) => {
  try {

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//////////////////////////////////////////////////////
// DELETE ALL PRODUCTS (optional)
//////////////////////////////////////////////////////

router.delete("/", async (req, res) => {
  try {

    await Product.deleteMany();

    res.json({ message: "All products deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
