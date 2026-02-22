import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    skinType: { type: String, required: true },
    skinConcern: { type: [String], required: true },
       address: { type: String },
       Skinovapoint: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
