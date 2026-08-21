import { Input } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUserAPI } from "../../../services/api.service";
import { Modal } from "antd";

const UserForm = (props) => {
  const { loadUser } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    if (!fullName || !email || !password || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
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
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: "16px",
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
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "#1677ff",
              color: "#ffffff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: 500,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#4096ff")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#1677ff")
            }
          >
            Create User
          </button>
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
          mask={{ closable: false }}x
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
              />
            </div>
            <div style={formItemStyle}>
              <span style={labelStyle}>Password</span>
              <Input.Password
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
