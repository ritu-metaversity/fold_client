import React, { useState } from "react";
import "../../../navBar/TopNav.css";
import MatchBet from "../../MatchBet/MatchBet";
import GameDetail from "../GameDetail";
import "./GameHead.css";
import NavBar from "../../../navBar/NavBar";

function GameHead({SportId}) {
  const [ActiveNavbar, setActiveNavBar] = useState(1);
  const handleClick = (val) => {
    setActiveNavBar(val);
    
  };
  console.log(SportId)

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
              Matched Bet (0)
            </button>
          </li>
        </ul>
        <div className="tv-icon">
          <p className="mb-0">
            <i className="fas fa-tv"></i>
          </p>
        </div>
      </div>
      {ActiveNavbar === 1 ? <GameDetail SportId={SportId}/> : <MatchBet />}
    </>
  );
}

export default GameHead;
