import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/h&m");
    if (res) {
      console.log("mongodb connected");
    }
  } catch (error) {
    console.log("Error while connecting MONGODB");
  }
};
