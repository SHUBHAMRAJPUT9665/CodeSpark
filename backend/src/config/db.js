import mongoose from "mongoose";

const connectDB = async () => {
   const connectHost =  await mongoose.connect(process.env.DB_STRING);
   console.log("DB connect to Host", connectHost.connection.host)
}


export default connectDB