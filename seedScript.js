import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";
import Category from "./models/category.js";
import { categoriesData, productData } from "./seedData.js";

dotenv.config();
async function seedDataBase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryDocs = await Category.insertMany(categoriesData);
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    });
    const productWithCateogoryIds = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));
    await Product.insertMany(productWithCateogoryIds);
    console.log("DB SEEDED SUCCESFULLY");
  } catch (error) {
    console.error(error, "Seed DB ");
  } finally {
    mongoose.connection.close();
  }
}
seedDataBase();
