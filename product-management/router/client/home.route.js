const express = require("express");
const router = express.Router();

// Dùng router.get thay vì app.get / app.use
const controller = require("../../controllers/client/home.controller");
router.get("/", controller.index.index); 

module.exports = router;
