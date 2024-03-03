import React from "react";
import { Link } from "react-router-dom";
import "./WhatsAppBox.css";

const WhatsAppBox = ({ whatsapp }) => {
  return (
    <>
      <div className="whatsapp-box">
        <div>
          <span>Register as New User</span>
          <h4>Get your instant ID from whatsapp</h4>
        </div>

        <Link
          to={whatsapp?.link}
          target="_blank"
          className="create-whatsapp-link">
          <div className="whatsapp-icon">
            <i className="fab fa-whatsapp" />
          </div>
          <div className="click-here">click here</div>
        </Link>
      </div>
    </>
  );
};

export default WhatsAppBox;
