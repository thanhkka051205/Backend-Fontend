import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HomeTwoTone,
  UsergroupAddOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Header = (props) => {
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
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

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
