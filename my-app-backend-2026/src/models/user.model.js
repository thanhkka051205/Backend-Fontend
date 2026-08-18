const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.db");

const User = sequelize.define(
  "User",
  {
    idUsers: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "idUsers",
    },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    // Cấu hình trường role đồng bộ với ENUM của MySQL
    role: {
      type: DataTypes.ENUM("user", "admin", "manager"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true, // Bật lên true vì SQL trên đã có createdAt và updatedAt
  },
);

module.exports = User;
