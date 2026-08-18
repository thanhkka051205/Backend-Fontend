import { useRouteError, Link } from "react-router-dom";
import "../styles/error.scss";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "Đã xảy ra lỗi không mong muốn.";
  let errorStatus = error?.status || "Lỗi";

  if (error?.status === 404) {
    errorMessage = "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.";
  } else if (error?.status === 500) {
    errorMessage = "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.";
  } else {
    errorMessage = error?.statusText || error?.message || errorMessage;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.status}>{errorStatus}</h1>
        <h2 style={styles.title}>Oops! Có lỗi xảy ra</h2>
        <p style={styles.message}>{errorMessage}</p>

        <div style={styles.actionGroup}>
          <Link to="/" style={styles.homeBtn}>
            Về trang chủ
          </Link>
          <button
            onClick={() => window.location.reload()}
            style={styles.retryBtn}
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
