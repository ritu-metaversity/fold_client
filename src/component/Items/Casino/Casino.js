import React from "react";
import Mobilenav from "../../navBar/MobileNav/Mobilenav";
import NavBar from "../../navBar/NavBar";
import "./Casino.css";

const Casino = () => {
  const token = localStorage.getItem("token");

  const Gameid = window.location.pathname;
  const id = Gameid.slice(8);
  return (
    <>
      <NavBar />
      <Mobilenav />
      <iframe
        src={`https://m2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        className="mobile_if"
        width="100%"
        title="mobile"
        allowFullScreen={true}></iframe>

      <iframe
        src={`https://d2.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        className="desktop_if"
        width="100%"
        title="desktop"
      />
    </>
  );
};

export default Casino;
