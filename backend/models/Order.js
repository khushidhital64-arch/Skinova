import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        imageUrl: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
  finalAmount: {
      type: Number, 
    },

    usedPoints: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      default: "processing",
    },
    paymentTransactionUuid: {
      type: String,
     
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
