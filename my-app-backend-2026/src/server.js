const express = require("express");
const cors = require("cors");
const sequelize = require("./config/connection.db.js");
const {
  createUserController,
  getUsersController,
  updateUserController,
} = require("./controllers/user.controller.js");
const User = require("./models/user.model.js");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.post("/api/v1/users", createUserController);
app.get("/api/v1/users", getUsersController);
app.put("/api/v1/users", updateUserController);

// KẾT NỐI VÀ ĐỒNG BỘ MYSQL
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Kết nối Cơ sở dữ liệu MySQL thành công! 🐬");
    app.listen(PORT, () => {
      console.log(`Backend NodeJS đang chạy tại: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Lỗi kết nối MySQL thất bại: ", err.message);
  });
