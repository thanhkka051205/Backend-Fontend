import { Outlet } from "react-router-dom";
import Header from "./components/layouts/header.jsx";
import Footer from "./components/layouts/footer.jsx";
import "react-toastify/dist/ReactToastify.css";
import { getAccountAPI } from "./services/api.service.js";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context.jsx";
import { Spin } from "antd";

const App = () => {
  const { setUser, isLoading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await getAccountAPI();

      if (res && res.data && res.data.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin size="large" description="Đang tải dữ liệu..." />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
