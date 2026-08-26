import { Input, Modal, Button } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUserAPI } from "../../../services/api.service";

const UserForm = (props) => {
  const { loadUser } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSubmitBtn = async () => {
    if (!fullName || !email || !password || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email không đúng định dạng!");
      return;
    }

    if (password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    const isPhoneValid = /^[0-9]{10}$/.test(phone);

    if (!isPhoneValid) {
      toast.error("Số điện thoại phải bao gồm đúng 10 chữ số!");
      return;
    }

    try {
      const res = await createUserAPI({ fullName, email, password, phone });

      if (res && res.data) {
        toast.success("Tạo user thành công");
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsModalOpen(false);
        await loadUser();
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(errorMsg);
    }
  };

  const formItemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontWeight: "500",
    color: "#434343",
    fontSize: "14px",
  };

  return (
    <div
      className="user-form"
      style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "16px",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 600,
            color: "#1f1f1f",
          }}
        >
          Table User
        </h3>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create User
        </Button>
      </div>

      <Modal
        title={
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            Tạo mới user
          </span>
        }
        open={isModalOpen}
        onOk={handleSubmitBtn}
        onCancel={() => setIsModalOpen(false)}
        okText="Create"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            paddingTop: "16px",
          }}
        >
          <div style={formItemStyle}>
            <span style={labelStyle}>Full Name</span>
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div style={formItemStyle}>
            <span style={labelStyle}>Email</span>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@gmail.com"
            />
          </div>
          <div style={formItemStyle}>
            <span style={labelStyle}>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tối thiểu 6 ký tự"
            />
          </div>
          <div style={formItemStyle}>
            <span style={labelStyle}>Phone Number</span>
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UserForm;
