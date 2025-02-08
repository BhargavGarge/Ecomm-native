import Product from "../models/product.js";

const getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found", success: false });
    }
    res.status(200).json({
      message: "Products found",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products by category",
      error: error.message,
      success: false,
    });
  }
};

export { getProductsByCategoryId };
