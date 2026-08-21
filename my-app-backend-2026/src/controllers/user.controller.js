const User = require("../models/user.model");

// 1. API POST: Tạo user vào MongoDB
const createUserController = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email này đã được sử dụng!" });
    }

    const newUser = await User.create({ fullName, email, password, phone });

    return res.status(201).json({
      message: "Tạo user vào MongoDB thành công!",
      data: newUser,
    });
  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra tại hệ thống!" });
  }
};

// 2. API GET: Lấy danh sách user từ MongoDB ra
const getUsersController = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      message: "Lấy danh sách thành công!",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi Server: " + error.message });
  }
};

// 3. API PUT: Cập nhật thông tin user
const updateUserController = async (req, res) => {
  try {
    const { idUsers, fullName, phone } = req.body;

    if (!fullName || !phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const updateResult = await User.updateOne(
      { idUsers: idUsers },
      { $set: { fullName, phone } },
    );

    if (updateResult.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để cập nhật!" });
    }

    return res.status(200).json({
      message: "Update user thành công!",
    });
  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra tại hệ thống!" });
  }
};

// 4. API DELETE: Xóa user theo idUsers từ URL Params
const deleteUserController = async (req, res) => {
  try {
    const { idUsers } = req.params;

    if (!idUsers) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin ID người dùng cần xóa!" });
    }

    const deleteResult = await User.deleteOne({ idUsers: idUsers });

    if (deleteResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại hoặc đã bị xóa trước đó!" });
    }

    return res.status(200).json({
      message: "Xóa user thành công!",
      data: { idUsers },
    });
  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra tại hệ thống Backend!" });
  }
};

module.exports = {
  createUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
};
