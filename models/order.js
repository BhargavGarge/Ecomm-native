import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  quantity: { type: Number, require: true },
});

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    deliveryDate: {
      type: Date,
      require: true,
    },
    address: { type: String },
    items: {
      type: [ItemSchema],
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: [
        "Order Placed",
        "Shipped",
        "Delivered",
        "Out for Delivery",
        "Cancelled",
      ],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
