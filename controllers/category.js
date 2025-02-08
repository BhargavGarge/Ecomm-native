//get all categories controller
import Category from "../models/category.js";
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
      success: false,
    });
  }
};

export { getAllCategories };
