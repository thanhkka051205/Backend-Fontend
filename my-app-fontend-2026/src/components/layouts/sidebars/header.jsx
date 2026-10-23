import { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
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
import { AuthContext } from "../../context/auth.context";

const Header = () => {
  const location = useLocation();
  const currentKey = location.pathname.split("/")[1] || "home";
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Có lỗi xảy ra khi gọi API!";
      toast.error(errorMessage);
    } finally {
      localStorage.removeItem("access_token");
      if (setUser) setUser(null);
      navigate("/");
    }
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
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        height: "64px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "20px" }}>🚀</span>
          <span
            style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937" }}
          >
            MyBrand
          </span>
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Menu
          selectedKeys={[currentKey]}
          mode="horizontal"
          items={mainNavItems}
          style={{
            borderBottom: "none",
            background: "transparent",
            minWidth: "300px",
            justifyContent: "center",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user?.id ? (
          <Dropdown menu={userMenuSettings} trigger={["click"]}>
            <Space
              style={{
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "6px",
              }}
            >
              <Avatar
                style={{ backgroundColor: "#2563eb" }}
                icon={<UserOutlined />}
              />
              <span style={{ fontWeight: 500, color: "#374151" }}>
                {user?.fullName || "Tài khoản"}
              </span>
            </Space>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                color: "#2563eb",
                border: "1px solid #2563eb",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
