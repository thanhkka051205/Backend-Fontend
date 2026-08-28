import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { Button, Form, Input, Row, Col, Card, Typography } from "antd";
import { registerUserAPI } from "../services/api.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await registerUserAPI(values);
      if (res.data) {
        toast.success("Đăng kí thành công");
        navigate("/login");
      }
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Dữ liệu không hợp lệ (400)";
      toast.error(backendMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validate thất bại:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px 16px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Card
          variant="borderless"
          style={{
            width: "100%",
            maxWidth: 800,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            boxSizing: "border-box",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: 24, fontWeight: 600 }}
          >
            Tạo tài khoản mới
          </Title>

          <Form
            name="register_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            form={form}
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên của bạn!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ và tên của bạn" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input placeholder="example@email.com" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ (10-11 số)!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                  ]}
                >
                  <Input.Password placeholder="••••••••" size="large" />
                </Form.Item>
              </Col>

              {/* Nút Đăng Ký */}
              <Col xs={24}>
                <Form.Item style={{ marginTop: "8px", marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    style={{ backgroundColor: "#2563eb" }}
                  >
                    Đăng Ký
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text type="secondary">Đã có tài khoản? </Text>
            <a href="/login">Đăng nhập ngay</a>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
