import React, { useState } from "react";
import { Space, Table } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import UpdateUser from "./user.update";
import ViewUSer from "./user.detail"; // Hoặc đổi tên thành ViewUser nếu đã sửa file bên kia

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;

  //Update
  const [isModalUpdateUser, setModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  //View
  const [isModalViewUser, setModalViewUser] = useState(false);
  const [viewData, setViewData] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "idUsers",
      render: (text, record) => {
        return (
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              setModalViewUser(true);
              setViewData(record);
            }}
          >
            {text}
          </a>
        );
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
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDataUpdate(record);
                setModalUpdateUser(true);
              }}
            />
            <DeleteTwoTone style={{ cursor: "pointer" }} />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey="idUsers" />

      <UpdateUser
        isModalUpdateUser={isModalUpdateUser}
        setModalUpdateUser={setModalUpdateUser}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUSer
        isModalViewUser={isModalViewUser}
        setModalViewUser={setModalViewUser}
        viewData={viewData}
        setViewData={setViewData}
      />
    </>
  );
};

export default UserTable;
