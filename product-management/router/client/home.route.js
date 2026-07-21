const express = require("express");
const router = express.Router();

// Dùng router.get thay vì app.get / app.use
const controller = require("../../controller/client/home.controller");
router.get("/", controller.index.index); // Sử dụng controller.index.index để truy cập phương thức index bên trong đối tượng index

// EXPORT ĐÚNG: Xuất ra đối tượng router
module.exports = router;
