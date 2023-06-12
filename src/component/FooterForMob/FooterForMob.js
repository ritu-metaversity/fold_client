import React, { useEffect, useState } from "react";
import "./FooterForMob.css";
import { Link, Outlet } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

function FooterForMob() {
  const [footerImage, setFooterImage] = useState([]);
  const hostName = window.location.host.split(".");

  useEffect(() => {
    GameAPI.FOOTER_IMAGESS().then((res) => {
      setFooterImage(res?.data);
    });
  }, []);

  console.log(footerImage, "dsafawfe");

  return (
    <div>
      <footer>
        <div className="footer-menu">
          <ul>
            <li>
              <Link to="/about-us">About</Link>
            </li>
            <li>
              <Link to="/">Rules</Link>
            </li>
            <li>
              <Link to="terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/responsible-gaming">Responsible Gaming</Link>
            </li>
          </ul>

          <ul className="footer_icon">
            <li>
              <img
                src={footerImage?.u_upi}
                alt="upi"
                className="img-fluid"
              />
            </li>
            <li>
              <img
                src={footerImage?.u_paytm}
                alt="paytm"
                className="img-fluid"
              />
            </li>
            <li>
              <img
                src={footerImage?.u_phonePe}
                alt="phonepe"
                className="img-fluid"
              />
            </li>
            <li>
              <img
                src={footerImage?.u_googlePay}
                alt="GPay"
                className="img-fluid"
              />
            </li>
          </ul>
        </div>
        <p className="fotterP">
          © Copyright 2023. All Rights Reserved. Powered by {hostName[0]}.
        </p>
      </footer>
    </div>
  );
}

export default FooterForMob;
