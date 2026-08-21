import { Drawer } from "antd";

const ViewUser = (props) => {
  const { isModalViewUser, setModalViewUser, viewData, setViewData } = props;

  const handleClose = () => {
    setModalViewUser(false);
    setViewData(null);
  };

  return (
    <Drawer
      title="Chi tiết người dùng"
      closable={{ "aria-label": "Close Button" }}
      onClose={handleClose}
      open={isModalViewUser}
    >
      {viewData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            <strong>ID:</strong> {viewData.idUsers}
          </p>
          <p>
            <strong>Full Name:</strong> {viewData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {viewData.email}
          </p>
          <p>
            <strong>Phone:</strong> {viewData.phone}
          </p>
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewUser;
