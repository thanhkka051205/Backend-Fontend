import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section company-info">
            <h3>SHOP CÔNG NGHỆ</h3>
            <p>
              Địa chỉ: Toà nhà Innovation, Công viên phần mềm Quang Trung, Quận
              12, TP. Hồ Chí Minh.
            </p>
            <p>Hotline: 1900 1919 (8:00 - 22:00)</p>
            <p>Email: cskh@shopcongnghe.com</p>
          </div>

          <div className="footer-section links">
            <h3>HỖ TRỢ KHÁCH HÀNG</h3>
            <ul>
              <li>
                <a href="#chinh-sach-bao-hanh">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#chinh-sach-doi-tra">Chính sách đổi trả</a>
              </li>
              <li>
                <a href="#phuong-thuc-thanh-toan">Phương thức thanh toán</a>
              </li>
              <li>
                <a href="#tuyen-dung">Tuyển dụng</a>
              </li>
            </ul>
          </div>

          <div className="footer-section social-connect">
            <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="social-icons">
              <a href="#facebook" className="icon-fb">
                Facebook
              </a>
              <a href="#youtube" className="icon-yt">
                Youtube
              </a>
              <a href="#zalo" className="icon-zl">
                Zalo
              </a>
            </div>
            <div className="payment-methods">
              <p>Hỗ trợ thanh toán:</p>
              <span className="badge">Visa</span>
              <span className="badge">MasterCard</span>
              <span className="badge">Momo</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Shop Công Nghệ. Tất cả các quyền
            được bảo lưu.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
