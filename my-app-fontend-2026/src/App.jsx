import { Outlet } from "react-router-dom";
import Header from "./components/layouts/header.jsx";
import Footer from "./components/layouts/footer.jsx";

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
