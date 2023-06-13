import React from "react";
import Itemdesk from "../itemPageforDesktop/Itemdesk";

const HomePage = () => {
  const SportId = localStorage.getItem("SportId");

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row itemHome">
            <Itemdesk SportId={SportId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
