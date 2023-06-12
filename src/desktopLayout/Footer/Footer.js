import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {FaFacebookF, FaTelegramPlane, FaWhatsapp, FaYoutube, FaTwitter, FaInstagram} from 'react-icons/fa'


function Footer() {

    const hostname = (window.location.host).split(".");

  

  return (
    <div>
      <footer>
        <div className='footer-menu'>
            <ul>
              <li><Link to="/about-us">About</Link></li>
              <li><Link to="/" >Rules</Link></li>
              <li><Link to="terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link to="/responsible-gaming">Responsible Gaming</Link></li>
            </ul>

            <ul className='footer_icon'>
              <li><FaFacebookF /></li>
              <li><FaTelegramPlane/></li>
              <li><FaWhatsapp/></li>
              <li><FaYoutube/></li>
              <li><FaTwitter/></li>
              <li><FaInstagram/></li>
            </ul>
           
        </div>
        <p className='fotterP'>
            © Copyright 2023. All Rights Reserved. Powered by {hostname[0]}.
            </p>
      </footer>
    </div>
  );
}

export default Footer;
