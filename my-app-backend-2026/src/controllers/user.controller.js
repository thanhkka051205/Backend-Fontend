const User = require("../models/user.model");
const multer = require("multer");

// 1. API POST: Tạo user vào MongoDB
const createUserController = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    const newUser = await User.create({ fullName, email, password, phone });

    return res.status(201).json({
      success: true,
      message: "Tạo user thành công!",
      data: newUser,
    });
  } catch (error) {
    console.error("Lỗi Controller Create User:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email này đã được sử dụng trong hệ thống!",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Lỗi Server: " + error.message,
    });
  }
};

// 2. API GET: Lấy danh sách user
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

// 3. API PUT: Cập nhật thông tin user & Avatar
const updateUserController = async (req, res) => {
  try {
    const { _id, fullName, phone, avatar } = req.body;

    if (!_id || !fullName || !phone) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const updateData = { fullName, phone };
    if (avatar) {
      updateData.avatar = avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      returnDocument: "after",
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để cập nhật!" });
    }

    return res.status(200).json({
      message: "Update user thành công!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra tại hệ thống!" });
  }
};

// 4. API DELETE: Xóa user theo id từ URL Params
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Không tìm thấy thông tin ID người dùng cần xóa!" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Người dùng không tồn tại hoặc đã bị xóa trước đó!" });
    }

    return res.status(200).json({
      message: "Xóa user thành công!",
      data: { id },
    });
  } catch (error) {
    console.error("Lỗi Controller:", error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra tại hệ thống Backend!" });
  }
};

// 5. UploadFile
const uploadFileController = (req, res) => {
  try {
    const currentFile = req.file;

    if (!currentFile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded hoặc sai key truyền lên từ Frontend",
      });
    }

    const relativePath = `uploads/${currentFile.filename}`;

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        ...currentFile,
        path: relativePath,
      },
    });
  } catch (error) {
    console.error("Upload file error chi tiết:", error);
    return res.status(500).json({
      success: false,
      message: "Upload file failed tại hệ thống",
    });
  }
};

module.exports = {
  createUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
  uploadFileController,
};
