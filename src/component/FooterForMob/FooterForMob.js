import React, { useEffect, useState } from "react";
import "./FooterForMob.css";
import { Link } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";

function FooterForMob({ ItselfAllowed }) {
  const [footerImage, setFooterImage] = useState([]);
  const hostName = window.location.host.split(".");

  useEffect(() => {
    GameAPI.FOOTER_IMAGESS().then((res) => {
      setFooterImage(res?.data);
    });
  }, []);

  return (
    <div>
      {ItselfAllowed && (
        <section class="footer_main">
          <div class="footer-top">
            <div class="support-detail">
              <h2>24X7 Support</h2>
              <p></p>
            </div>
            <div class="social-icons-box">
              {
                footerImage?.s_whatsapp &&  <div class="social-icon">
                <a
                  href={footerImage?.s_whatsapp?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_whatsapp?.icon} alt="Twitter" />
                </a>
              </div>
              }
              {
                footerImage?.s_facebook && <div class="social-icon">
                <a
                  href={footerImage?.s_facebook?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_facebook?.icon} alt="facebook" />
                </a>
              </div>
              }
              {
                footerImage?.s_instagram && <div class="social-icon">
                <a
                  href={footerImage?.s_instagram?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_instagram?.icon} alt="Telegram" />
                </a>
              </div>
              }
              {
                footerImage?.s_telegram && <div class="social-icon">
                <a
                  href={footerImage?.s_telegram?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_telegram?.icon} alt="Twitter" />
                </a>
              </div>
              }
              
              {
                footerImage?.s_youtube &&  <div class="social-icon">
                <a
                  href={footerImage?.s_youtube?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_youtube?.icon} alt="Twitter" />
                </a>
              </div>
              }
              {footerImage?.s_twitter && (
                <div class="social-icon">
                  <a
                    href={footerImage?.s_twitter?.link}
                    target="_blank"
                    rel="noreferrer">
                    <img src={footerImage?.s_twitter?.icon} alt="Twitter" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <footer>
        <div className="footer-menu">
          <ul>
            <li>
              <Link to="/about-us">About</Link>
            </li>
            <li>
              <Link to="terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/responsible-gaming">Responsible Gaming</Link>
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
