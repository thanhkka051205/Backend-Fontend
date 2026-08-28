import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { Button, Form, Input, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Dữ liệu đăng nhập thành công:", values);
    toast.success("Đăng nhập thành công!");
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
            maxWidth: 500,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            boxSizing: "border-box",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: 24, fontWeight: 600 }}
          >
            Đăng Nhập
          </Title>

          <Form
            name="login_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email của bạn!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="example@email.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            <Form.Item style={{ marginTop: "12px", marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ backgroundColor: "#2563eb" }}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text type="secondary">Chưa có tài khoản? </Text>
            <a href="/register">Đăng ký ngay</a>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
