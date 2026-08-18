import React, { useEffect, useState } from "react";
import { Flex, Space, Table, Tag } from "antd";
import { getAllUserAPI } from "../../../services/api.service";

const UserTable = () => {
  const [dataUsers, setDataUser] = useState([]);

  const handleEditUser = () => {};

  const handleDeleteUser = () => {};

  useEffect(() => {
    loadUser();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "idUsers",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Space size="large">
            <a onClick={() => handleEditUser(record)}>Edit</a>
            <a
              onClick={() => handleDeleteUser(record.idUsers)}
              style={{ color: "red" }}
            >
              Delete
            </a>
          </Space>
        );
      },
    },
  ];

  const loadUser = async () => {
    const res = await getAllUserAPI();
    setDataUser(res.data.data);
  };

  return <Table columns={columns} dataSource={dataUsers} rowKey="idUsers" />;
};

export default UserTable;
