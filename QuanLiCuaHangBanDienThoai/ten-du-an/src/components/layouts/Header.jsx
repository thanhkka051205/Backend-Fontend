import React from "react";
import logo from "../../assets/img/logo.svg";
import "./Header.scss";

const Header = (props) => {
  const cartItemCount = 0;

  return (
    <>
      <div className="header-container">
        <div className="header-left">
          <div className="header-text">
            <img src={logo} alt="Logo" className="header-logo" />
          </div>

          <div className="header-categories">
            <select name="categories" id="header-categories-select">
              <option value="">Danh mục</option>
              <option value="dien-thoai">Điện thoại</option>
              <option value="lap-top">Laptop</option>
              <option value="phu-kien">Phụ kiện</option>
              <option value="khuyen-mai">Khuyến mãi</option>
            </select>
          </div>
        </div>

        <div className="header-main">
          <input
            type="search"
            id="header-search"
            placeholder="Tìm kiếm sản phẩm..."
          />
          <i class="fa-thin fa-magnifying-glass search-icon"></i>
        </div>

        <div className="header-contact">
          <span>Liên hệ: 19001919</span>
        </div>

        <div className="header-right">
          <div className="header-cart">
            <button className="btn btn-cart">
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Giỏ hàng</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>

          <div className="header-auth">
            <button className="btn btn-login" >Đăng nhập/Đăng kí</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
