import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HomeTwoTone,
  UsergroupAddOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./header.scss";

const Header = (props) => {
  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <NavLink to="/">Home</NavLink>,
      key: "home",
      icon: <HomeTwoTone />,
    },
    {
      label: <NavLink to="/products">Products</NavLink>,
      key: "products",
      icon: <ProductOutlined />,
    },
    {
      label: <NavLink to="/user">User</NavLink>,
      key: "user",
      icon: <UsergroupAddOutlined />,
    },
  ];

  return (
    <header className="app-header">
      {/* 1. Logo cá nhân */}
      <div className="header-logo">
        <Link to="/">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">MyBrand</span>
        </Link>
      </div>

      {/* 2. Menu chính */}
      <div className="header-menu">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ borderBottom: "none", background: "transparent" }}
        />
      </div>

      {/* 3. Khu vực Login / Register */}
      <div className="header-auth">
        <Link to="/login" className="auth-btn login-btn">
          Đăng nhập
        </Link>
        <Link to="/register" className="auth-btn register-btn">
          Đăng ký
        </Link>
      </div>
    </header>
  );
};

export default Header;
