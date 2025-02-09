import express from "express";
import UserRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to Ecomm-native 🚀");
});
app.use("/api/auth", UserRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
