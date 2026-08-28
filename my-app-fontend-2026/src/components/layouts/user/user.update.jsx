import { Input, Modal, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { updateUserAPI } from "../../../services/api.service";

const UpdateUser = (props) => {
  const {
    loadUser,
    isModalUpdateUser,
    setModalUpdateUser,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate]);

  const handleSubmitBtn = async () => {
    if (!fullName || !phone) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await updateUserAPI({ id, fullName, phone });

      if (res && res.data) {
        toast.success("Update thành công");
        setId("");
        setFullName("");
        setPhone("");
        setRole("");
        setDataUpdate(null);
        setModalUpdateUser(false);
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
        <Modal
          title={
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              Update User
            </span>
          }
          open={isModalUpdateUser}
          onOk={handleSubmitBtn}
          onCancel={() => {
            setModalUpdateUser(false);
            setDataUpdate(null);
          }}
          mask={{ closable: false }}
          okText="Save"
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
              <span style={labelStyle}>Id</span>
              <Input value={id} disabled />
            </div>
            <div style={formItemStyle}>
              <span style={labelStyle}>Full Name</span>
              <Input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div style={formItemStyle}>
              <span style={labelStyle}>Phone Number</span>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <Space wrap>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={labelStyle}>Role</span>
                <Select
                  defaultValue="User"
                  style={{ width: 100 }}
                  options={[
                    { value: "User", label: "User" },
                    { value: "Admin", label: "Admin" },
                  ]}
                />
              </div>
            </Space>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
