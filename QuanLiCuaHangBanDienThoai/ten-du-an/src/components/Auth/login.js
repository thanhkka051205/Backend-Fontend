import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <h2 className="login-title">Đăng Nhập</h2>

        <div className="form-group">
          <input
            type="tel" 
            id="soDienThoai"
            name="soDienThoai"
            placeholder="Nhập vào số điện thoại..."
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập vào mật khẩu..."
            className="form-input"
          />
        </div>

        <div className="login-options">
          <div className="remember-check-box">
            <input type="checkbox" id="check-box" />
            <label htmlFor="check-box">Lưu thông tin</label>
          </div>
          <a href="#forgot" className="forgot-password">
            Quên mật khẩu?
          </a>
        </div>

        <button type="submit" className="btn-submit">
          Đăng nhập
        </button>

        <p className="register-redirect">
          Chưa có tài khoản? <a href="#register">Đăng ký ngay</a>
        </p>
      </div>
    </>
  );
};

export default Login;
