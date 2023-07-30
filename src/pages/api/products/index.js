import connectDB from "@/lib/dbConnect";
import ProductModel from "@/models/productModel";


export default async function handler(req, res) {
  const { method } = req;
  // Connect to the database
  await connectDB();
  switch (method) {
    case "POST":
      try {
        // Create a new category in the database
        const data = req.body;
        const newProduct = await ProductModel.create(data);
        res.status(201).json({
          success: true,
          message: "Product created successfully",
          data: newProduct,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create product",
          error: error?.message,
        });
      }
      break;
    case "GET":
      try {
        // Get all categories from the database
        const products = await ProductModel.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
