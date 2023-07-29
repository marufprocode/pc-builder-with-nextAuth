import connectDB from "../lib/dbConnect";
import CategoriesModel from "../models/categoriesModel";
import ProductModel from "../models/productModel";

export default async function handler(req, res) {
  const { method, query } = req;

  // Connect to the database
  await connectDB();

  switch (method) {
    case "GET":
      const { category } = query;
      try {
        // Get the category by ID
        const targetCategory = await CategoriesModel.findById(category);

        if (!targetCategory) {
          return res.status(404).json({ error: "Category not found" });
        }

        // Get all products for the specified category
        const productsForCategory = await ProductModel.find({
          category: category,
        }).populate('category');

        res.status(200).json(productsForCategory);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Failed to fetch products for the category" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
