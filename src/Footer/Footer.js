import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* الجزء الأيسر */}
        <div className="footer-left">
          <img src="./logo1949.jpg" alt="Logo" className="footer-logo" />
          <p className="footer-text">
            Our vision is to make all people <br /> the best place to live for them.
          </p>
        </div>

        {/* الجزء الأوسط */}
        <div className="footer-center">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-menu">
            <li><a href="#">Property</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* الجزء الأيمن */}
        <div className="footer-right">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">145 New York, FL 4571, USA</p>
          <p className="footer-text">Email: contact@example.com</p>
          <p className="footer-text">Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
