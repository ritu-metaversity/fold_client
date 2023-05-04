import React from "react";
import NewLunch from "../Newlunch/NewLunch";
import SideBar from "../sidebar/SideBar";

const LiveCasino = () => {
  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
            <SideBar/>
            </div>
            <div className="col-md-10 featured-box load game-page">
              <NewLunch/>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default LiveCasino;
