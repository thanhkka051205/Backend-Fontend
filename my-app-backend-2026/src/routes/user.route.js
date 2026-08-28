const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
  uploadFileController,
  registerUserController,
  loginUserController,
} = require("../controllers/user.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../public/uploads");

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

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.put("/users", updateUserController);
router.delete("/users/:id", deleteUserController);
router.post("/file/upload", upload.single("file"), uploadFileController);
router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);
router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Lấy thông tin profile thành công!",
    user: req.user,
  });
});

module.exports = router;
