const Product = require("../models/products.model");

const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find().select({});

    return res.status(200).json({
      message: "Lấy danh sách thành công!",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi Server: " + error.message });
  }
};

const createProductController = async (req, res) => {
  try {
    const { thumbnail, title, price, stock, brand } = req.body;

    if (!thumbnail || !title || !price || !stock || !brand) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin!",
      });
    }

    const newProduct = await Product.create({
      thumbnail,
      title,
      price,
      stock,
      brand,
    });

    return res.status(201).json({
      success: true,
      message: "Tạo product thành công!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi Controller Create Product:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi Server: " + error.message,
    });
  }
};

module.exports = { getAllProductsController, createProductController };
