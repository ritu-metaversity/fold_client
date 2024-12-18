import React, { useEffect, useState } from "react";
import "./FooterForMob.css";
import { Link } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";

function FooterForMob({ ItselfAllowed }) {
  const [footerImage, setFooterImage] = useState({});
  const hostName = window.location.host.split(".");

  useEffect(() => {
    GameAPI.FOOTER_IMAGESS().then((res) => {
      setFooterImage(res?.data);
    });
  }, []);
  

  return (
    <div>
      {(ItselfAllowed || footerImage != null) && (
        <section className="footer_main">
          <div className="footer-top">
            <div className="support-detail">
              <h2>{footerImage?.support}</h2>
              <p>{footerImage?.mobileNo}</p>
            </div>
            <div className="social-icons-box">
              {
                footerImage?.s_whatsapp &&  <div className="social-icon">
                <a
                  href={footerImage?.s_whatsapp?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_whatsapp?.icon}  />
                </a>
              </div>
              }
              {
                footerImage?.s_facebook && <div className="social-icon">
                <a
                  href={footerImage?.s_facebook?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_facebook?.icon} alt="facebook" />
                </a>
              </div>
              }
              {
                footerImage?.s_instagram && <div className="social-icon">
                <a
                  href={footerImage?.s_instagram?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_instagram?.icon} alt="Telegram" />
                </a>
              </div>
              }
              {
                footerImage?.s_telegram && <div className="social-icon">
                <a
                  href={footerImage?.s_telegram?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_telegram?.icon}  />
                </a>
              </div>
              }
              
              {
                footerImage?.s_youtube &&  <div className="social-icon">
                <a
                  href={footerImage?.s_youtube?.link}
                  target="_blank"
                  rel="noreferrer">
                  <img src={footerImage?.s_youtube?.icon}  />
                </a>
              </div>
              }
              {footerImage?.s_twitter && (
                <div className="social-icon">
                  <a
                    href={footerImage?.s_twitter?.link}
                    target="_blank"
                    rel="noreferrer">
                    <img src={footerImage?.s_twitter?.icon}  />
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
