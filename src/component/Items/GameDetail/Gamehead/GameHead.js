import React, { useState } from "react";
import "../../../navBar/TopNav.css";
import MatchBet from "../../MatchBet/MatchBet";
import GameDetail from "../GameDetail";
import "./GameHead.css";

function GameHead({ SportId, matchLength }) {
  const [ActiveNavbar, setActiveNavBar] = useState(1);
  const [betLength, setBetlenght] = useState(0);
  const [stackValue, setstackValue] = useState([]);
  const handleClick = (val) => {
    setActiveNavBar(val);
  };

 

  const stackValDesk = (val)=>{
    stackValue(val)
  }
  return (
    <>
      <div className="">
        <ul className="nav nav-tabs ">
          <li className={`nav-item ${ActiveNavbar === 1 ? "active2" : ""}`}>
            <button
              data-toggle="tab"
              className="nav-link nav2 nav-btn"
              onClick={() => handleClick(1)}>
              Odds
            </button>
          </li>
          <li className={`nav-item ${ActiveNavbar === 2 ? "active2" : ""}`}>
            <button
              data-toggle="tab"
              className="nav-link nav-btn"
              onClick={() => handleClick(2)}>
              Matched Bet ({betLength})
            </button>
          </li>
        </ul>
        
      </div>
      <div style={{ display: ActiveNavbar === 1 ? "block" : "none" }}>
        <GameDetail SportId={SportId} />
      </div>
      <div style={{ display: ActiveNavbar === 2 ? "block" : "none" }}>
        <MatchBet matchLength={betLength} setMatchLength={setBetlenght} />
      </div>
      {/* <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
            <SideBar/>
            </div>
            <div className="col-md-10 featured-box load game-page">
              <div className="row row5">
                <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
                    <GameDetail stackValDesk={stackValDesk}/>
                </div>
                <div id="sidebar-right" className="col-md-3 sidebar-right" style={{position: "relative", top: "0px", right: "0px", width: "25.5%",
                    }}>
                    <div className="ps">
                      <Placebet stackValue={stackValue}/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default GameHead;
