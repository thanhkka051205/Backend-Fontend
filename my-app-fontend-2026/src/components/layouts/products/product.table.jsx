import { useState } from "react";
import { Space, Table, Popconfirm, Button } from "antd";
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import ProductDetail from "../products/product.detail";
import ProductCreate from "../products/product.create";

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

  //Xem chi tiet san pham
  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  //Update san pham
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  //Tạo mới sản phẩm
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

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
              setDataDetail(record);
              setIsDetailOpen(true);
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
      render: (text, record, index, action) => {
        if (text)
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
      },
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
              description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
              okText="Có"
              cancelText="Không"
              //onConfirm={() => handleDeleteProduct(record._id)}
            >
              <DeleteTwoTone style={{ cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onChange = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <h3 style={{ margin: 0 }}>Danh sách sản phẩm</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalCreateOpen(true)}
        >
          Thêm mới sản phẩm
        </Button>
      </div>

      <div style={{ marginTop: 15 }}>
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

        <ProductDetail
          dataDetail={dataDetail}
          setDataDetail={setDataDetail}
          isDetailOpen={isDetailOpen}
          setIsDetailOpen={setIsDetailOpen}
          loadProduct={loadProduct}
        />

        <ProductCreate
          isModalCreateOpen={isModalCreateOpen}
          setIsModalCreateOpen={setIsModalCreateOpen}
          loadProduct={loadProduct}
        />
      </div>
    </>
  );
};

export default ProductTable;
