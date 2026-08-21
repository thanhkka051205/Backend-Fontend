import React, { useState } from "react";
import { Space, Table, Popconfirm } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import UpdateUser from "./user.update";
import ViewUSer from "./user.detail";
import { deleteUserAPI } from "../../../services/api.service";
import { toast } from "react-toastify";

const UserTable = (props) => {
  const { dataUsers, loadUser } = props;

  // Update
  const [isModalUpdateUser, setModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  // View
  const [isModalViewUser, setModalViewUser] = useState(false);
  const [viewData, setViewData] = useState(null);

  // Delete
  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteUserAPI({ idUsers: id });

      if (res && res.data) {
        toast.success("Xóa thành công");
        await loadUser(); // Tải lại danh sách
      } else {
        toast.error("Xóa không thành công từ máy chủ");
      }
    } catch (error) {
      toast.error("Xoá không thành công");
    }
  };

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
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có chắc chắn muốn xóa người dùng này không?"
              okText="Có"
              cancelText="Không"
              // SỬA: Bọc lại bằng Arrow function để tránh tự kích hoạt hàm khi render
              onConfirm={() => handleDeleteUser(record.idUsers)}
            >
              <DeleteTwoTone style={{ cursor: "pointer" }} />
            </Popconfirm>
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
