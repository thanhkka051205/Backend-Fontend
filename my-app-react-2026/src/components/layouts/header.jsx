import React from "react";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/react.svg";

const Header = (props) => {
  const cartItemCount = 0;

  return (
    <header className="app-header">
      {/* Khối Logo */}
      <div className="header-logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </NavLink>
      </div>

      {/* Khối Menu Điều Hướng */}
      <nav className="header-nav">
        <ul>
          <li>
            <NavLink to="/">Trang chủ</NavLink>
          </li>
          <li>
            <NavLink to="/products">Sản phẩm</NavLink>
          </li>
          <li>
            <NavLink to="/user">User</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Liên hệ</NavLink>
          </li>
        </ul>
      </nav>

      {/* Khối Hành Động (Giỏ hàng & Đăng nhập) */}
      <div className="header-actions">
        <div className="cart-status">
          <span>Giỏ hàng ({cartItemCount})</span>
        </div>
        <NavLink to="/login" className="btn-login">
          Đăng nhập
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
