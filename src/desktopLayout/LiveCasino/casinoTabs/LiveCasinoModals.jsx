import React from "react";

const LiveCasinoModals = ({ iframeData }) => {
  return (
    <>
      <iframe
        src={iframeData}
        className="desktop_iframe"
        width="100%"
        title="mobile"
        height="100vh"
        allowFullScreen={true}
      />
    </>
  );
};

export default LiveCasinoModals;

