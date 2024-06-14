import React from "react";
import Itemdesk from "../itemPageforDesktop/Itemdesk";
import LatestEvent from "../../common/LatestEvent";

const HomePage = () => {
  const SportId = localStorage.getItem("SportId");

  return (
    <>
      <div className="main">
      {/* <LatestEvent iplPath="/gamedetail/28127348" elePath="/gamedetail/1706456690"/> */}
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
