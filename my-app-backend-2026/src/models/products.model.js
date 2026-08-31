const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Tiêu đề không được để trống"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Giá không được để trống"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[0-9]{1,3}(,?[0-9]{3})*(\.[0-9]{1,2})?$/,
        "Giá tiền KHÔNG hợp lệ",
      ],
    },
    stock: {
      type: String,
      required: [true, "Số lượng không được để trống"],
      default: 0,
    },
    brand: {
      type: String,
      required: [true, "Thương hiệu không được để trống"],
      default: "không có",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", userSchema);

module.exports = Product;
