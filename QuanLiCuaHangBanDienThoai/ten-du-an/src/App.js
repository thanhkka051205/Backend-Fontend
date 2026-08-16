import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Login from "./components/Auth/login";

const Home = () => (
  <div style={{ textAlign: "center", padding: "50px 0" }}>
    <h2>Chào mừng bạn đến với Shop Công Nghệ! 🎉</h2>
    <p>Nội dung danh sách sản phẩm sẽ hiển thị ở đây.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-container">
        <div className="App-header">
          <Header />
        </div>

        <div className="App-context">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <div className="App-footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
