const express = require("express");
const router = express.Router();
const {
  createUserController,
  getUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");

router.post("/users", createUserController);
router.get("/users", getUsersController);
router.put("/users", updateUserController);
router.delete("/users/:idUsers", deleteUserController);

module.exports = router;
