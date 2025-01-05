
import { config } from "dotenv";
config()
import connectDB from "./config/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
     console.log("DB Connected");
    app.listen(5003, (req, res) => {
        console.log("Server running on port 5003");
      });
    app.on("error", (error) => {
      console.error("Server error:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("DB not connectd");
  });
