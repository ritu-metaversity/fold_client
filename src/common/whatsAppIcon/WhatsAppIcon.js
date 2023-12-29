/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './WhatsAppIcon.css'
import { GameAPI } from "../../apis/gameAPI";

const WhatsAppIcon = ({top}) => {
  const [footerImage, setFooterImage] = useState({});

  useEffect(() => {
    GameAPI.FOOTER_IMAGESS().then((res) => {
      setFooterImage(res?.data);
    });
  }, []);
  
  return (
    <div>
      <a
        href={footerImage?.s_whatsapp?.link != null ? footerImage?.s_whatsapp?.link:"#"}
        className="whatsapp-fixed"
        style={{top: `calc(${top}px + 80vh)`}}>
        <div className="whatsapp-text">
          <span>Get an ID Instantly on Whatsapp</span>{" "}
          <span>Click Here Now</span>
        </div>
        <img alt="whatsapp" src="/images/whatsapp_img.png" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;

