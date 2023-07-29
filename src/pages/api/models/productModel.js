import { models, model, Schema } from "mongoose";

// Define the user schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

// Create the User model using the productSchema
const ProductModel = models.Product || model("Product", productSchema);

export default ProductModel;
