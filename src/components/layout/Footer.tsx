import React, { useEffect, useState } from "react";
import { utilServices } from "../../utils/api/util/services";
import CustomizedDialog2 from "../common/Dailog2";
import Faq from "./rules/Faq";
import "./footer.css";
import { Box, Button, DialogActions } from "@mui/material";

interface FooterImageInterface {
  id: string;
  appUrl: string;
  support: string;
  mobileNo: string;
  s_whatsapp: {
    icon: string;
    link: string;
  };
  s_telegram: {
    icon: string;
    link: string;
  };
  s_youtube: {
    icon: string;
    link: string;
  };
  s_facebook: {
    icon: string;
    link: string;
  };
  s_twitter: {
    icon: string;
    link: string;
  };
  s_instagram: {
    icon: string;
    link: string;
  };
  u_paytm: string;
  u_googlePay: string;
  u_phonePe: string;
  u_upi: string;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterImageInterface | null>(
    null
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getFooterData = async () => {
      const { response } = await utilServices.footerImages();
      if (response) {
        setFooterData(response.data);
      }
    };
    getFooterData();
  }, []);

  return (
    <div>
      <CustomizedDialog2
        title="Rules"
        maxWidth="md"
        open={open}
        handleClose={() => setOpen(false)}
      >
        <Faq />
        <DialogActions>
          <Box className="modal-footer-rules">
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
            >
              Close
            </Button>
          </Box>
        </DialogActions>
      </CustomizedDialog2>
      <footer className="footer">
        <div className="support">
          <div>
            <div className="w-100 text-center">
              <b>{footerData?.support}</b>
            </div>
            <div className="text-center w-100">
              <span className="phones">{footerData?.mobileNo}</span>
            </div>
          </div>
          <div className="footer-social">
            {footerData?.s_whatsapp && (
              <a
                href={footerData?.s_whatsapp?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_whatsapp?.icon} />
              </a>
            )}
            {footerData?.s_facebook && (
              <a
                href={footerData?.s_facebook?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_facebook?.icon} />
              </a>
            )}
            {footerData?.s_instagram && (
              <a
                href={footerData?.s_instagram?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_instagram?.icon} />
              </a>
            )}
            {footerData?.s_telegram && (
              <a
                href={footerData?.s_telegram?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_telegram?.icon} />
              </a>
            )}
            {footerData?.s_twitter && (
              <a
                href={footerData?.s_twitter?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_twitter?.icon} />
              </a>
            )}
            {footerData?.s_youtube && (
              <a
                href={footerData?.s_youtube?.link}
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src={footerData?.s_youtube?.icon} />
              </a>
            )}
          </div>
        </div>
        <div className="footer-menu">
          <ul>
            <li>
              <a href="/about-us" className="" target="_blank" rel="noreferrer">
                About Us
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                className=""
                onClick={() => setOpen(true)}
                rel="noreferrer"
              >
                Rules
              </a>
            </li>
            <li>
              <a
                href="/terms-and-conditions"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                Terms and Conditions
              </a>
            </li>
            <li>
              <a
                href="/responsible-gaming"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                Responsible Gaming
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-box">
          <div className="footer-top">
            <div className="secure-logo">
              <div>
                <img
                  src="https://sitethemedata.com/v89/static/front/img/ssl.png"
                  alt=""
                />
              </div>{" "}
              <div className="ml-2">
                <b>100% SAFE</b>{" "}
                <div>Protected connection and encrypted data.</div>
              </div>
            </div>
            <div className="d-inline-block footer-other">
              <a href="/" role="button">
                <img
                  src="https://sitethemedata.com/v89/static/front/img/18plus.png"
                  alt=""
                />
              </a>{" "}
              <a href=" /" target="_blank" rel="noreferrer">
                <img
                  src="https://sitethemedata.com/v89/static/front/img/gamecare.png"
                  alt=""
                />
              </a>{" "}
              <a href=" /" target="_blank" rel="noreferrer">
                <img
                  src="https://sitethemedata.com/v89/static/front/img/gt.png"
                  alt=""
                />
              </a>
              <a href="/" className="vm badge-icon">
                <div
                  id="apg-750c6d2a-0352-4b88-aaa7-72085659af51"
                  data-apg-seal-id="750c6d2a-0352-4b88-aaa7-72085659af51"
                  data-apg-image-size="45"
                  data-apg-image-type="basic-light-large"
                  className="d-inline-block vm"
                ></div>
              </a>
            </div>
          </div>{" "}
          <div className="payments">
            <ul>
              {footerData?.u_googlePay && (
                <li>
                  <img
                    src={footerData?.u_googlePay}
                    alt="effect"
                    className="img-fluid"
                  />
                </li>
              )}
              {footerData?.u_paytm && (
                <li>
                  <img
                    src={footerData?.u_paytm}
                    alt="effect"
                    className="img-fluid"
                  />
                </li>
              )}
              {footerData?.u_phonePe && (
                <li>
                  <img
                    src={footerData?.u_phonePe}
                    alt="effect"
                    className="img-fluid"
                  />
                </li>
              )}
              {footerData?.u_upi && (
                <li>
                  <img
                    src={footerData?.u_upi}
                    alt="effect"
                    className="img-fluid"
                  />
                </li>
              )}
            </ul>
          </div>{" "}
          <div className="footer-bottom">
            <span className="ws-pre-wrap">
              {window.location.hostname.replace("www.", "")}.
            </span>
          </div>
        </div>
        <div className="w-100 copyright">
          Copyright 2020. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
