import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeTwoTone,
  UsergroupAddOutlined,
  ProductOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Space, Avatar } from "antd";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    if (setUser) setUser(null);
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const mainNavItems = [
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

  const userMenuSettings = {
    items: [
      {
        key: "welcome",
        label: (
          <span style={{ fontWeight: "bold" }}>
            👋 Chào, {user?.fullName || "Thành viên"}
          </span>
        ),
        disabled: true,
      },
      { type: "divider" },
      {
        key: "profile",
        label: <Link to="/profile">Hồ sơ cá nhân</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "settings",
        label: <Link to="/settings">Cài đặt</Link>,
        icon: <SettingOutlined />,
      },
      { type: "divider" },
      {
        key: "logout",
        label: <span onClick={handleLogout}>Đăng xuất</span>,
        icon: <LogoutOutlined />,
        danger: true,
      },
    ],
  };

  return (
    <header style={styles.header}>
      <div style={styles.flexCenter}>
        <Link to="/" style={styles.logoLink}>
          <span style={{ fontSize: "20px" }}>🚀</span>
          <span style={styles.logoText}>MyBrand</span>
        </Link>
      </div>

      <div style={styles.menuContainer}>
        <Menu
          onClick={(e) => setCurrent(e.key)}
          selectedKeys={[current]}
          mode="horizontal"
          items={mainNavItems}
          style={styles.menu}
        />
      </div>

      <div style={styles.rightNav}>
        {user?.id ? (
          <Dropdown menu={userMenuSettings} trigger={["click"]}>
            <Space style={styles.avatarSpace}>
              <Avatar
                style={{ backgroundColor: "#2563eb" }}
                icon={<UserOutlined />}
              />
              <span style={styles.username}>
                {user?.fullName || "Tài khoản"}
              </span>
            </Space>
          </Dropdown>
        ) : (
          <>
            <Link to="/login" style={styles.btnLogin}>
              Đăng nhập
            </Link>
            <Link to="/register" style={styles.btnRegister}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "64px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
    width: "100%",
    boxSizing: "border-box",
  },
  flexCenter: { display: "flex", alignItems: "center" },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    gap: "8px",
  },
  logoText: { fontSize: "18px", fontWeight: "bold", color: "#1f2937" },
  menuContainer: { flex: 1, display: "flex", justifyContent: "center" },
  menu: {
    borderBottom: "none",
    background: "transparent",
    minWidth: "300px",
    justifyContent: "center",
  },
  rightNav: { display: "flex", alignItems: "center", gap: "12px" },
  avatarSpace: { cursor: "pointer", padding: "4px 8px", borderRadius: "6px" },
  username: { fontWeight: 500, color: "#374151" },
  btnLogin: {
    padding: "8px 16px",
    borderRadius: "6px",
    color: "#2563eb",
    border: "1px solid #2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
  btnRegister: {
    padding: "8px 16px",
    borderRadius: "6px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default Header;
