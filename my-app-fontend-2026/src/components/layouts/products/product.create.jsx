import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  createProductAPI,
  handlerUploadFile,
} from "../../../services/api.service";

const ProductCreate = (props) => {
  const { loadProduct, isModalCreateOpen, setIsModalCreateOpen } = props;
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitBtn = async (values) => {
    const fileToUpload = selectedFile || values.thumbnail?.[0]?.originFileObj;

    if (!fileToUpload) {
      toast.error("Vui lòng tải lên ảnh sản phẩm!");
      return;
    }

    try {
      const resUpload = await handlerUploadFile(fileToUpload, "product");
      if (resUpload && resUpload.data) {
        const newThumbnail =
          resUpload.data?.data || resUpload.data?.file || resUpload.data;

        const resProduct = await createProductAPI({
          thumbnail: newThumbnail,
          title: values.title,
          price: values.price,
          stock: values.stock,
          brand: values.brand,
        });

        if (resProduct && resProduct.data && resProduct.data.success) {
          toast.success("Tạo sản phẩm thành công");
          resetAndCloseModal();
          if (loadProduct) {
            await loadProduct();
          }
        } else {
          const errorMsg =
            resProduct?.data?.message || "Có lỗi xảy ra khi tạo sản phẩm!";
          toast.error(errorMsg);
        }
      } else {
        toast.error("Upload ảnh thất bại!");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.message || "Có lỗi xảy ra!";
      toast.error(errorMsg);
    }
  };

  const resetAndCloseModal = () => {
    form.resetFields();
    setSelectedFile(null);
    setIsModalCreateOpen(false);
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: "16px", fontWeight: 600 }}>THÊM SẢN PHẨM</span>
      }
      open={isModalCreateOpen}
      onOk={() => form.submit()}
      onCancel={() => resetAndCloseModal()}
      mask={{ closable: false }}
      okText="Create"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitBtn}
        autoComplete="off"
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề sản phẩm!",
                },
              ]}
            >
              <Input placeholder="Nhập tiêu đề sản phẩm" size="large" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá tiền!" },
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) > 0 && !isNaN(value))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Giá tiền phải là số lớn hơn 0!"),
                    );
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập giá tiền"
                size="large"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  value !== undefined && value !== null && value !== ""
                    ? `${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₫`
                    : ""
                }
                parser={(value) => (value ? value.replace(/[^\d]/g, "") : "")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số lượng tồn kho"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng tồn kho!",
                },
                {
                  validator: (_, value) => {
                    if (!value || (Number(value) >= 0 && !isNaN(value))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Số lượng tồn kho phải là số hợp lệ!"),
                    );
                  },
                },
              ]}
            >
              <InputNumber
                placeholder="Nhập số lượng tồn kho"
                size="large"
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Thương hiệu"
              name="brand"
              rules={[
                { required: true, message: "Vui lòng chọn thương hiệu!" },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn thương hiệu"
                options={[
                  {
                    value: "Điện thoại & Tablet",
                    label: "Điện thoại & Tablet",
                  },
                  {
                    value: "Laptop & Máy tính xách tay",
                    label: "Laptop & Máy tính xách tay",
                  },
                  { value: "Thời trang nam", label: "Thời trang nam" },
                  { value: "Thời trang nữ", label: "Thời trang nữ" },
                  { value: "Gi giày dép", label: "Giày dép" },
                  {
                    value: "Túi xách & Phụ kiện",
                    label: "Túi xách & Phụ kiện",
                  },
                  {
                    value: "Mỹ phẩm & Chăm sóc cá nhân",
                    label: "Mỹ phẩm & Chăm sóc cá nhân",
                  },
                  {
                    value: "Đồng hồ & Trang sức",
                    label: "Đồng hồ & Trang sức",
                  },
                  { value: "Thiết bị gia dụng", label: "Thiết bị gia dụng" },
                  {
                    value: "Đồ nội thất & Trang trí nhà cửa",
                    label: "Đồ nội thất & Trang trí nhà cửa",
                  },
                  { value: "Thể thao & Du lịch", label: "Thể thao & Du lịch" },
                  { value: "Mẹ & Bé", label: "Mẹ & Bé" },
                  {
                    value: "Sách & Văn phòng phẩm",
                    label: "Sách & Văn phòng phẩm",
                  },
                  { value: "Ô tô & Xe máy", label: "Ô tô & Xe máy" },
                  {
                    value: "Thực phẩm & Đồ uống",
                    label: "Thực phẩm & Đồ uống",
                  },
                  { value: "Đồ chơi & Game", label: "Đồ chơi & Game" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Tải lên ảnh sản phẩm"
              name="thumbnail"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={(file) => {
                  setSelectedFile(file);
                  return false;
                }}
                onRemove={() => setSelectedFile(null)}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
