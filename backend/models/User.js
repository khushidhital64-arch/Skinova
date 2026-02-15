import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    skinType: { type: String, required: true },
    skinConcern: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
