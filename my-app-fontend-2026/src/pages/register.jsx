import { React, useState } from "react";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { Button, Form, Input } from "antd";

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Dữ liệu đăng ký thành công:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validate thất bại:", errorInfo);
  };

  return (
    <div className="page-wrapper">
      <Header />

      <main className="register-container">
        <div className="register-card">
          <h2 className="register-title">Tạo tài khoản mới</h2>

          <Form
            name="register_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên của bạn!" },
              ]}
            >
              <Input placeholder="Nhập họ và tên của bạn" size="large" />
            </Form.Item>

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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ backgroundColor: "#2563eb" }}
                onClick={() => {
                  form.submit();
                }}
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>

          <p className="register-footer">
            Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
