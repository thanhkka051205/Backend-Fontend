const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const {
  getAllProductsController,
  createProductController,
} = require("../controllers/product.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../public/products");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname) || ".png";
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/product", getAllProductsController);
router.post("/products", createProductController);

module.exports = router;
