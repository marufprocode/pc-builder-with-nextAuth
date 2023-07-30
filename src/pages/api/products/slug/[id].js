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
        const targetProduct = await ProductModel.findById(id).populate(
          "category"
        );

        if (!targetProduct) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(targetProduct);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
