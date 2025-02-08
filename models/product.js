import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image_uri: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: number, required: true },
    ar_uri: { type: string },

    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
