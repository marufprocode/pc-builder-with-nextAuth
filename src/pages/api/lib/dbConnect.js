import mongoose from "mongoose";

const database_url = process.env.MONGO_URL;
let connection;

const connectDB = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(database_url);
    }
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
