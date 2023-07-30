import {models, model, Schema} from 'mongoose';

// Define the user schema
const categoriesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    unique: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});



// Create the User model using the categoriesSchema
const CategoriesModel = models.Categories || model('Categories', categoriesSchema);

export default CategoriesModel;
