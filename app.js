import express from "express";
import UserRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { buildAdminJS } from "./config/setup.js";

dotenv.config();
const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before proceeding
    await buildAdminJS(app); // Ensure AdminJS is fully set up

    app.get("/", (req, res) => {
      res.send("Welcome to Ecomm-native 🚀");
    });

    app.use("/api/auth", UserRoutes);
    app.use("/category", categoryRoutes);
    app.use("/product", productRoutes);
    app.use("/order", orderRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}/admin`)
    );
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

// Start the server properly
startServer();
