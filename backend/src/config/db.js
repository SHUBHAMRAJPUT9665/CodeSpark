import mongoose from "mongoose";

const connectDB = async () => {
   const connectHost =  await mongoose.connect("mongodb+srv://shubhamrajput9665:shubham123@cluster0.w4ptbgq.mongodb.net/DV-TINDER");
   console.log("DB connect to Host", connectHost.connection.host)
}


export default connectDB
