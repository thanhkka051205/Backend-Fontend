const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "public/man.png",
    },
    fullName: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email không đúng định dạng",
      ],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại không được để trống"],
      trim: true,
      match: [
        /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
        "Số điện thoại không đúng định dạng",
      ],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
