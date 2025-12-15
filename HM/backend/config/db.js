import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGODB_URI);
    if (res) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log("Error while connecting MONGODB");
  }
};
