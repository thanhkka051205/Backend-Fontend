import { useState } from "react";
import { Space, Table, Popconfirm } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const ProductTable = (props) => {
  const {
    dataProducts,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
    loadProduct,
  } = props;

  const [isProducts, setProducts] = useState(false);

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
              //setModalViewUser(true);
              //setDataDetail(record);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "stock",
    },
    { title: "Thương hiệu", dataIndex: "brand" },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Space size="large">
            <EditTwoTone
              style={{ cursor: "pointer" }}
              //   onClick={() => {
              //     setDataUpdate(record);
              //     setModalUpdateUser(true);
              //   }}
            />
            <Popconfirm
              title="Xóa Sản Phẩm"
              description="Bạn có chắc chắn muốn xóa người dùng này không?"
              okText="Có"
              cancelText="Không"
              //onConfirm={() => handleDeleteUser(record._id)}
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
        dataSource={dataProducts}
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
    </>
  );
};

export default ProductTable;
