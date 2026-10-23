import { Button, Drawer } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  handlerUploadMultipleFiles,
  updateProductSliderAPI,
} from "../../../services/api.service";

const ProductDetail = (props) => {
  const {
    dataDetail,
    setDataDetail,
    isDetailOpen,
    setIsDetailOpen,
    loadProduct,
  } = props;

  const [selectFiles, setSelectFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleClose = () => {
    setIsDetailOpen(false);
    setDataDetail(null);
    setSelectFiles([]);
    setPreviews([]);
  };

  const handleOnchangeFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      setSelectFiles([]);
      setPreviews([]);
      return;
    }

    setSelectFiles(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleUploadSliderSave = async () => {
    try {
      if (!selectFiles || selectFiles.length === 0) {
        toast.error("Vui lòng chọn ít nhất một ảnh");
        return;
      }

      // Gọi hàm upload và truyền mảng selectFiles
      const resUpload = await handlerUploadMultipleFiles(
        selectFiles,
        "product",
      );

      const uploadedFiles =
        resUpload.data?.data || resUpload.data?.files || resUpload.data;

      if (!uploadedFiles || uploadedFiles.length === 0) {
        toast.error("Upload file thất bại, không nhận được đường dẫn");
        return;
      }

      const newSliderFilenames = uploadedFiles.map(
        (file) => file.filename || file,
      );

      const resUpdateSlider = await updateProductSliderAPI(
        dataDetail._id,
        newSliderFilenames,
      );

      if (
        resUpdateSlider &&
        (resUpdateSlider.data || resUpdateSlider.success)
      ) {
        setDataDetail({
          ...dataDetail,
          slider: [...(dataDetail.slider || []), ...newSliderFilenames],
        });

        await loadProduct();
        setSelectFiles([]);
        setPreviews([]);
        toast.success("Thêm ảnh slider thành công!");
      } else {
        toast.error("Cập nhật slider thất bại");
      }
    } catch (error) {
      console.error("Upload slider error:", error);
      const errorMsg =
        error?.response?.data?.message ||
        "Có lỗi xảy ra trong quá trình cập nhật";
      toast.error(errorMsg);
    }
  };

  return (
    <Drawer
      style={{ width: "80vh" }}
      title="Chi tiết Sản Phẩm"
      closable={{ "aria-label": "Close Button" }}
      onClose={handleClose}
      open={isDetailOpen}
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

          <div>
            <p style={{ marginBottom: "6px" }}>
              <strong>Ảnh đại diện (Thumbnail):</strong>
            </p>
            <img
              height="150px"
              width="200px"
              style={{
                objectFit: "contain",
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "4px",
                backgroundColor: "#f9f9f9",
              }}
              src={
                dataDetail?.thumbnail
                  ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${dataDetail.thumbnail.replace(/^\/+/, "").replace(/^uploads\//, "")}`
                  : `${import.meta.env.VITE_BACKEND_URL}/uploads/default-product.png`
              }
              alt="thumbnail"
            />
          </div>

          {dataDetail.slider && dataDetail.slider.length > 0 && (
            <div>
              <p style={{ marginBottom: "6px" }}>
                <strong>Ảnh Slider hiện tại:</strong>
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {dataDetail.slider.map((img, index) => (
                  <img
                    key={index}
                    height="80px"
                    width="80px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${img.replace(/^\/+/, "").replace(/^uploads\//, "")}`}
                    alt="slider item"
                  />
                ))}
              </div>
            </div>
          )}

          <p>
            <strong>Tiêu đề:</strong> {dataDetail.title}
          </p>

          <p>
            <strong>Giá tiền:</strong>{" "}
            {dataDetail.price
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataDetail.price)
              : "0 đ"}
          </p>

          <p>
            <strong>Số lượng tồn kho:</strong> {dataDetail.stock}
          </p>

          <p>
            <strong>Thương hiệu:</strong> {dataDetail.brand}
          </p>

          <div>
            <label
              htmlFor="btnUploadSlider"
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
              Chọn Thêm Ảnh Slider (Nhiều ảnh)
            </label>

            <input
              type="file"
              hidden
              id="btnUploadSlider"
              accept="image/*"
              multiple
              onChange={handleOnchangeFile}
            />
          </div>

          {previews.length > 0 && (
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
                <strong>Ảnh xem trước ({previews.length}):</strong>
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    height="100px"
                    width="100px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #1890ff",
                    }}
                    src={src}
                    alt={`preview-${index}`}
                  />
                ))}
              </div>
              <Button type="primary" onClick={handleUploadSliderSave}>
                Xác Nhận Lưu Ảnh Slider
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

export default ProductDetail;
