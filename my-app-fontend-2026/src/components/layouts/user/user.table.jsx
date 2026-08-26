import { useState } from "react";
import { Space, Table, Popconfirm } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import UpdateUser from "./user.update";
import ViewUSer from "./view.detail.user";
import { deleteUserAPI } from "../../../services/api.service";
import { toast } from "react-toastify";

const UserTable = (props) => {
  const {
    dataUsers,
    loadUser,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
  } = props;

  // Update
  const [isModalUpdateUser, setModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  // View
  const [isModalViewUser, setModalViewUser] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  // Delete
  const handleDeleteUser = async (id) => {
    try {
      const res = await deleteUserAPI(id);

      if (res && res.data) {
        toast.success("Xóa người dùng thành công!");
        await loadUser();
      } else {
        toast.error(res?.message || "Xóa không thành công!");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Xóa không thành công!";
      toast.error(errorMsg);
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },

    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record) => {
        return (
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              setModalViewUser(true);
              setDataDetail(record);
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
              onConfirm={() => handleDeleteUser(record._id)}
            >
              <DeleteTwoTone style={{ cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // Nếu thay đổi trang (current page khác)
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    // Nếu thay đổi số lượng bản ghi trên 1 trang
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey="_id"
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />

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
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
