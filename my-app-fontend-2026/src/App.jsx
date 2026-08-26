import { Outlet } from "react-router-dom";
import Header from "./components/layouts/header.jsx";
import Footer from "./components/layouts/footer.jsx";
import { ToastContainer } from "react-toastify"; // 1. Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // 2. Import CSS của nó

const App = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>

      <div className="app-footer">
        <Footer />
      </div>
    </>
  );
};

export default App;
