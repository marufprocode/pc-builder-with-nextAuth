import connectDB from "../lib/dbConnect";
import UserModel from "../models/userModel";

export default async function handler (req, res) {
  if (req.method === "POST") {
    const data = req.body;
    await connectDB()
    const existUser = await UserModel.findOne({email: data.email})
    if(existUser){
      res.status(422).json({
        success: false,
        error: "Email is already in use"
      })
    } 
    const user = await UserModel.create(data)
    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email
      },
      message: "User created successfully"
    })
  }
}
