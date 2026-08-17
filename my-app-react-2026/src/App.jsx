import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import Header from "./components/layouts/header.jsx";
import Footer from "./components/layouts/footer.jsx";

const App = () => {
  return (
    <>
      <Header />
      <div className="app-header">
        <h2>Chào bạn đã quay trở lại với Thành Kka</h2>
      </div>
      <div className="app-container">
        <input type="text" />
        <button>Add</button>
      </div>

      <div className="app-image">
        <img src={reactLogo} alt="Logo" />
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </>
  );
};

export default App;
