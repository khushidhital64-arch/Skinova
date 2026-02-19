import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//////////////////////////////////////////////////////
// CREATE PRODUCT
//////////////////////////////////////////////////////

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
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

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

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