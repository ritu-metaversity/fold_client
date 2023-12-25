import React, { useEffect, useState } from "react";
import './WhatsAppIcon.css'

const WhatsAppIcon = ({top}) => {

  console.log(top, "isVisibale")
  
  return (
    <div>
      <a
        href="https://web.whatsapp.com/"
        className="whatsapp-fixed"
        target="_blank"
        style={{top: `calc(${top}px + 80vh)`}} rel="noreferrer">
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

