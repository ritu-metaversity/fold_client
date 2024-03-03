import React, { useContext } from "react";
import { Link } from "react-router-dom";
import './WhatsAppBox.css'
import { UserContext } from "../../../App";

const WhatsAppBox = () => {
  const { footerData } = useContext(UserContext);
  if (!footerData?.s_whatsapp.link) {
    return <></>
  }
  return (
    <>
      <div className="whatsapp-box">
        <div>
          <span>Register as New User</span>
          <h4>Get your instant ID from whatsapp</h4>
        </div>
        {footerData?.s_whatsapp?.link != null &&
        footerData?.s_whatsapp?.link != "" ? (
          <Link
            to={footerData?.s_whatsapp?.link}
            target="_blank"
            className="create-whatsapp-link"
          >
            <div className="whatsapp-icon">
              <img alt="whatsapp" src="/assets/images/images.png"></img>
              {/* <i className="fab fa-whatsapp" /> */}
            </div>
            <div className="click-here">click here</div>
          </Link>
        ) : (
          <div className="create-whatsapp-link">
            <div className="whatsapp-icon">
              <i className="fab fa-whatsapp" />
            </div>
            <div className="click-here">click here</div>
          </div>
        )}
      </div>
      <div className="or_text">
        <div></div>
        OR
        <div></div>
      </div>
    </>
  );
};

export default WhatsAppBox;
