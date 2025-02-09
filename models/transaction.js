import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    paymentId: { type: String, require: true },
    orderId: { type: String, require: true },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
