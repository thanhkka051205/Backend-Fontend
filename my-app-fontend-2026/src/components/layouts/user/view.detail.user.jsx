import { Button, Drawer } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  updateUserAvatarAPI,
  handlerUploadFile,
} from "../../../services/api.service";

const ViewUser = (props) => {
  const {
    isModalViewUser,
    setModalViewUser,
    dataDetail,
    setDataDetail,
    loadUser,
  } = props;

  const [selectFile, setSelectFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleClose = () => {
    setModalViewUser(false);
    setDataDetail(null);
    setSelectFile(null);
    setPreview(null);
  };

  const handleOnchangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    setSelectFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadFileSave = async () => {
    try {
      if (!selectFile) {
        toast.error("Vui lòng chọn ảnh");
        return;
      }

      const resUpload = await handlerUploadFile(selectFile, "avatar");

      if (!resUpload.data || !resUpload.data.file) {
        toast.error("Upload file thất bại");
        return;
      }

      const newAvatar = resUpload.data.file.path;

      if (!newAvatar) {
        toast.error("Backend không trả về thuộc tính path");
        return;
      }

      const resUpdateAvatar = await updateUserAvatarAPI(
        newAvatar,
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone,
      );

      if (
        resUpdateAvatar &&
        (resUpdateAvatar.data || resUpdateAvatar.success)
      ) {
        const updatedUserData =
          resUpdateAvatar.data?.data || resUpdateAvatar.data;

        if (updatedUserData) {
          setDataDetail(updatedUserData);
        }

        await loadUser();

        setSelectFile(null);
        setPreview(null);

        toast.success("Cập nhật ảnh đại diện thành công!");
      } else {
        toast.error("Update thất bại");
      }
    } catch (error) {
      console.error("Upload avatar error:", error);
      toast.error("Có lỗi xảy ra trong quá trình cập nhật");
    }
  };

  return (
    <Drawer
      style={{ width: "80vh" }}
      title="Chi tiết người dùng"
      closable={{ "aria-label": "Close Button" }}
      onClose={handleClose}
      open={isModalViewUser}
    >
      {dataDetail ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p>
            <strong>ID:</strong> {dataDetail._id}
          </p>

          <p>
            <strong>Full Name:</strong> {dataDetail.fullName}
          </p>

          <p>
            <strong>Email:</strong> {dataDetail.email}
          </p>

          <p>
            <strong>Phone:</strong> {dataDetail.phone}
          </p>

          <div>
            <img
              height="250px"
              width="300px"
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
              src={
                dataDetail?.avatar &&
                dataDetail.avatar !== "public/man.png" &&
                dataDetail.avatar !== "man.png"
                  ? `${import.meta.env.VITE_BACKEND_URL}/${dataDetail.avatar.replace(/^\/+/, "")}`
                  : `${import.meta.env.VITE_BACKEND_URL}/public/uploads/avatar/man.png`
              }
              alt="avatar"
            />
          </div>

          <div>
            <label
              htmlFor="btnUpload"
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                backgroundColor: "#007AFF",
                color: "#fff",
                borderRadius: "4px",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Chọn Ảnh Mới
            </label>

            <input
              type="file"
              hidden
              id="btnUpload"
              accept="image/*"
              onChange={handleOnchangeFile}
            />
          </div>

          {preview && (
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Ảnh xem trước:</strong>
              </p>
              <img
                height="250px"
                width="300px"
                style={{ objectFit: "cover", borderRadius: "8px" }}
                src={preview}
                alt="preview"
              />
              <Button type="primary" onClick={handleUploadFileSave}>
                Xác nhận Lưu Ảnh
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewUser;
