import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authorName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    data: Buffer,  
    contentType: String, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", BlogSchema);
