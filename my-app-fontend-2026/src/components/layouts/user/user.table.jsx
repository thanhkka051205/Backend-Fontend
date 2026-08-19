import React, { useEffect, useState } from "react";
import { Flex, Space, Table, Tag } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import UpdateUser from "./user.update";

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;
  const [isModalUpdateUser, setModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const handleDeleteUser = () => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "idUsers",
      render: (_, record) => {
        return <a href="#">{record.idUsers}</a>;
      },
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
            <EditTwoTone
              onClick={() => {
                setDataUpdate(record);
                setModalUpdateUser(true);
              }}
            />
            <DeleteTwoTone />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey="idUsers" />;
      <UpdateUser
        isModalUpdateUser={isModalUpdateUser}
        setModalUpdateUser={setModalUpdateUser}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
