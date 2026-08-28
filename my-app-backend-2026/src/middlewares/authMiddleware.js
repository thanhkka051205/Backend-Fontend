const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Bạn chưa cung cấp token xác thực (Token is not defined)!",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key_sieu_an_toan",
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn!",
    });
  }
};

module.exports = authMiddleware;
