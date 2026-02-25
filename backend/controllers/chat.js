import express from "express";

const router = express.Router();

// Fixed Questions & Answers
const fixedQA = [
  { question: "Which languages were used?", answer: "We used React, Node.js, and MongoDB." },
  { question: "How do I order?", answer: "Add products to cart and click checkout." },
  { question: "How do I login?", answer: "Click login and enter your email and password." },
  { question: "Do you have trainers?", answer: "Yes, we have certified trainers available." },
  { question: "How to track order?", answer: "Go to My Orders section." }
];

// GET all questions
router.get("/questions", (req, res) => {
  res.json(fixedQA);
});

// POST answer by question
router.post("/answer", (req, res) => {
  const { question } = req.body;

  const found = fixedQA.find(q => q.question.toLowerCase() === question.toLowerCase());
  if (found) res.json({ answer: found.answer });
  else res.json({ answer: "Question not found" });
});

export default router;