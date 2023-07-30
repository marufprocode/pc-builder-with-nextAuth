import connectDB from "@/lib/dbConnect";
import CategoriesModel from "@/models/categoriesModel";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await connectDB();

  switch (method) {
    case "GET":
      try {
        const featuredCategories = await CategoriesModel.find({
          featured: true,
        });
        res.status(200).json(featuredCategories);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch featured products" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
