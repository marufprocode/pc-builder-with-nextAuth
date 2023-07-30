import connectDB from "@/lib/dbConnect";
import CategoriesModel from "@/models/categoriesModel";

export default async function handler(req, res) {
  const { method } = req;
  // Connect to the database
  await connectDB();
  switch (method) {
    case "POST":
      try {
        // Create a new category in the database
        const data = req.body;
        const newCategory = await CategoriesModel.create(data);
        res.status(201).json({
          success: true,
          message: "Category created successfully",
          data: newCategory,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: "Failed to create the category",
          message: error?.message,
        });
      }
      break;
    case "GET":
      try {
        // Get all categories from the database
        const categories = await CategoriesModel.find({});
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
