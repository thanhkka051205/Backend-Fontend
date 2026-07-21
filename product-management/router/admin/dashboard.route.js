// File: router/admin/dashboard.route.js
const express = require("express");
const router = express.Router();

// Gọi đúng đường dẫn đến controller vừa tạo ở Bước 2
const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashboard);

module.exports = router;