// DÒNG 1 CHUẨN: Sử dụng require để import Model (Chú ý chữ r viết thường)
const User = require("../models/user.model");

// 1. API POST: Tạo user và lưu vào MySQL
const createUserController = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Kiểm tra trùng email bằng hàm findOne của Sequelize
    const isEmailExist = await User.findOne({ where: { email: email } });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email này đã được sử dụng!" });
    }

    // Lưu vào MySQL bằng hàm create
    const newUser = await User.create({ fullName, email, password, phone });

    return res.status(201).json({
      message: "Tạo user vào MySQL thành công!",
      data: newUser,
    });
  } catch (error) {
    console.error("Chi tiết lỗi Sequelize:", error);

    // Nếu là lỗi validation của Sequelize, lấy thông báo cụ thể gửi về Frontend
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      return res.status(400).json({
        message: `Lỗi dữ liệu: ${error.errors[0].message}`,
      });
    }

    return res.status(500).json({ message: "Có lỗi xảy ra tại hệ thống!" });
  }
};

// 2. API GET: Lấy toàn bộ danh sách user từ MySQL ra
const getUsersController = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      message: "Lấy danh sách thành công!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi Server: " + error.message });
  }
};

module.exports = {
  createUserController,
  getUsersController,
};
