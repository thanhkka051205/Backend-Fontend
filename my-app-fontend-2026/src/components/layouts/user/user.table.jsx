import React, { useEffect, useState } from "react";
import { Flex, Space, Table, Tag } from "antd";

const UserTable = (props) => {
  const { dataUsers } = props;
  
  const handleEditUser = () => {};

  const handleDeleteUser = () => {};

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

  return <Table columns={columns} dataSource={dataUsers} rowKey="idUsers" />;
};

export default UserTable;
