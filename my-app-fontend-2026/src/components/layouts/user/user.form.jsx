import { Input } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUserAPI } from "../../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickBtn = async () => {
    // 1. ĐÃ SỬA: Điều kiện check chuẩn (tất cả đều có dấu ! và dùng toán tử ||)
    if (!fullName || !email || !password || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      // 2. ĐÃ SỬA: Gộp các trường thành 1 Object { } truyền vào API
      const res = await createUserAPI({ fullName, email, password, phone });

      // Kiểm tra phản hồi dựa trên cấu hình interceptor của bạn
      // Nếu interceptor đã bóc tách sẵn data, bạn có thể chỉ cần: if(res && res.data)
      if (res && res.data) {
        toast.success("Tạo user thành công");

        // Reset lại form xóa chữ cũ
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
      }
    } catch (error) {
      // 3. ĐÃ SỬA: Dùng đúng error.response thay vì error.res
      const errorMsg = error?.response?.data?.message || "Có lỗi xảy ra!";
      toast.error(errorMsg);
    } finally {
      console.log("Luôn chạy vào đây");
    }
  };

  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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
        <button onClick={handleClickBtn} type="primary">
          Create User
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserForm;
