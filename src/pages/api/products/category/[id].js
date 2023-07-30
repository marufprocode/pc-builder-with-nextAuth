import connectDB from "@/lib/dbConnect";
import ProductModel from "@/models/productModel";

export default async function handler(req, res) {
  const { method, query } = req;

  // Connect to the database
  await connectDB();

  switch (method) {
    case "GET":
      const { id } = query;
      try {
        // Get the category by ID
        const products = await ProductModel.find({category:id}).populate("category")
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch Category Products", message: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
