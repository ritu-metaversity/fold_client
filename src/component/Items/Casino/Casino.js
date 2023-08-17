import React, { useState } from "react";
import Mobilenav from "../../navBar/MobileNav/Mobilenav";
import "./Casino.css";

const Casino = () => {
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const Gameid = window.location.pathname;
  const id = Gameid.slice(8);

  const finishLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Mobilenav />

      {isLoading ? (
        <p className="lodder">
        <i className="fa fa-spinner fa-spin"></i>
      </p>
      ) : (
        <iframe
          src={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
          className="mobile_if"
          width="100%"
          title="mobile"
          allowFullScreen={true}
          onLoad={finishLoading} />
      )}

      <iframe
        src={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
        className="desktop_if"
        width="100%"
        title="desktop"
        onLoad={finishLoading}
      />
    </>
  );
};

export default Casino;
