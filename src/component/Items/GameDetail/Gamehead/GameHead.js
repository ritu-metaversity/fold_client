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
      
    </>
  );
}

export default GameHead;
