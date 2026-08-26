import { React, useState } from "react";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { Button, Form, Input } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Dữ liệu đăng nhập thành công:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validate thất bại:", errorInfo);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="login-container">
        <div className="login-card">
          <h2 className="login-title">Đăng Nhập</h2>

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

            <Form.Item>
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

          <p className="login-footer">
            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
