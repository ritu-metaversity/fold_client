import React, { useState } from "react";
import "../../../navBar/TopNav.css";
import MatchBet from "../../MatchBet/MatchBet";
import GameDetail from "../GameDetail";
import "./GameHead.css";
import NavBar from "../../../navBar/NavBar";

function GameHead({SportId, matchLength}) {
  const [ActiveNavbar, setActiveNavBar] = useState(1);
  const [betLength, setBetlenght] = useState(0)
  const handleClick = (val) => {
    setActiveNavBar(val);
    
  };
  // console.log(matchLength)

  return (
    <>
    <NavBar/>
      <div >
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
        <div className="tv-icon">
          <p className="mb-0">
            <i className="fa fa-tv"></i>
          </p>
        </div>
      </div>
      <div style={{display:ActiveNavbar===1?"block":"none"}}>
        <GameDetail SportId={SportId}/> : 
      </div>
      <div style={{display:ActiveNavbar===2?"block":"none"}}>
        <MatchBet matchLength={betLength} setMatchLength = {setBetlenght}/>
      </div>
    </>
  );
}

export default GameHead;
