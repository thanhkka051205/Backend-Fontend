import { Input } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUserAPI } from "../../../services/api.service";
import { Modal } from "antd";

const UserForm = () => {
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
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(errorMsg);
    } finally {
      console.log("Luôn chạy vào đây");
    }
  };

  return (
    <div className="user-form">
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3> Table User</h3>
          <button onClick={() => setIsModalOpen(true)} type="primary">
            Create User
          </button>
          <ToastContainer />
        </div>
        <Modal
          title="Tạo mới user"
          open={isModalOpen}
          onOk={handleSubmitBtn}
          onCancel={() => setIsModalOpen(false)}
          maskClosable={false}
          okText="Create"
        >
          <div>
            <span>Full Name</span>
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div>
            <span>Email</span>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <span>Password</span>
            <Input.Password
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <span>Phone Number</span>
            <Input
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserForm;
