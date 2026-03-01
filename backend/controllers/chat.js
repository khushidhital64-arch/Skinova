// routes/chat.js
import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 1️⃣ Keyword-based Fixed Q/A
const fixedQAKW = [
  { keywords: ["hello", "hi"], answer: "Hi there! How can I help you today?" },
   { keywords: ["boss", "owner"], answer: "The owner of this store is Abhisarika dhital" },
  { keywords: ["store", "location"], answer: "Hey, we are online-based." },
  { keywords: ["exchange"], answer: "You can exchange the product if it is unopened." },
  { keywords: ["refund", "return"], answer: "You can request a refund within 7 days of purchase for unopened products." },
  { keywords: ["delivery"], answer: "We deliver all products nationwide. Delivery usually takes 3-7 business days." },
];

// GET all fixed questions
router.get("/questions", (req, res) => {
  res.json(fixedQAKW.map(q => q.keywords.join(", ")));
});

// POST answer by user question
router.post("/answer", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.json({ answer: "Please type a question." });

  const qLower = question.toLowerCase().trim();

  // 1️⃣ Check keyword-based fixed Q/A
  for (let item of fixedQAKW) {
    if (item.keywords.some(kw => qLower.includes(kw))) {
      return res.json({ answer: item.answer });
    }
  }

  try {
    // 2️⃣ Prepare dynamic product query
    let query = {};

    // 2a️⃣ Concerns
    const concerns = [
      "acne",
      "dark spots",
      "aging",
      "wrinkles",
      "dryness",
      "oiliness",
      "redness",
      "sensitivity",
      "uneven texture",
      "large pores",
      "glow",
    ];
    const matchedConcerns = concerns.filter(c => qLower.includes(c));
    if (matchedConcerns.length > 0) {
      query.concerns = { $in: matchedConcerns.map(c => c.charAt(0).toUpperCase() + c.slice(1)) };
    }

    // 2b️⃣ Categories
    const categories = ["cleanser", "serum", "moisturizer", "sunscreen"];
    const matchedCategories = categories.filter(c => qLower.includes(c));
    if (matchedCategories.length > 0) {
      query.category = { $in: matchedCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)) };
    }

    // 2c️⃣ Skin types
    const skinTypes = ["oily", "dry", "combination", "sensitive"];
    const matchedSkinTypes = skinTypes.filter(s => qLower.includes(s));
    if (matchedSkinTypes.length > 0) {
      query.skinType = { $in: matchedSkinTypes.map(s => s.charAt(0).toUpperCase() + s.slice(1)) };
    }

    // 3️⃣ Fetch products if any filter matched
    let products = [];
    if (Object.keys(query).length > 0) {
      products = await Product.find(query);
    }

    if (products.length > 0) {
      const answerText = products
        .map(
          (p, index) =>
            `${index + 1}. "${p.name}" - Rs ${p.price.toFixed(2)} | Category: ${p.category} | Skin Type: ${p.skinType.join(", ")}`
        )
        .join("\n");

      return res.json({
        answer: `Here are some products you might like:\n${answerText}`,
        productIds: products.map(p => p._id),
      });
    }

    // 4️⃣ Default response
    return res.json({ answer: "Sorry, I didn't understand that or no products found." });
  } catch (err) {
    console.error(err);
    return res.json({ answer: "Server error fetching products." });
  }
});

export default router;
