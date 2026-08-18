const { Sequelize } = require("sequelize");

// Cấu hình tài khoản MySQL của bạn tại đây
const sequelize = new Sequelize("my_app_react_2026", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Tắt dòng log câu lệnh SQL chạy ngầm ở terminal cho sạch
});

module.exports = sequelize;
