const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;

    if (!url) {
      console.error("❌ Lỗi: Biến MONGO_URL trong file .env đang trống!");
      return;
    }

    await mongoose.connect(url);
    console.log("Kết nối Database MongoDB thành công! 🍃");
  } catch (error) {
    console.error("Lỗi kết nối DB MongoDB thất bại:", error.message);
    throw error;
  }
};

module.exports = connectDB;
