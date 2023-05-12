import app from "./app.js";
import { connectDB } from "./config/connectDB.js";
import cloudinary from "cloudinary";

// Connect to database
connectDB();

// cloudinary config

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running on ${process.env.DEV_MODE} mode At http://localhost:${process.env.PORT}`
  );
});
