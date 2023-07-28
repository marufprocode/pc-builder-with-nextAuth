import {models, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  }
});


// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // Fetch the user from the database and include the 'password' field
    const user = await UserModel.findOne({ email: this.email }).select('password');
    // If user is not found or 'password' field is missing, return false
    if (!user || !user.password) {
      return false;
    }
    // Compare the entered password with the hashed password
    return await bcrypt.compare(enteredPassword, user.password);
  } catch (error) {
    throw error;
  }

};



// Create the User model using the userSchema
const UserModel = models.User || model('User', userSchema);

export default UserModel;
