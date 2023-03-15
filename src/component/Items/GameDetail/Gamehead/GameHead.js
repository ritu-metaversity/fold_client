import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../../navBar/NavBar";
import "../../../navBar/TopNav.css";
import MatchBet from "../../MatchBet/MatchBet";
import GameDetail from "../GameDetail";
import "./GameHead.css";

function GameHead() {
  const [ActiveNavbar, setActiveNavBar] = useState(1);

  const handleClick = (val) => {
    setActiveNavBar(val);
  };

  return (
    <>
      <NavBar />

      <div >
        <ul className="nav nav-tabs ">
          <li className={`nav-item ${ActiveNavbar === 1 ? "active2" : ""}`}>
            <Link
              data-toggle="tab"
              className="nav-link nav2"
              onClick={() => handleClick(1)}>
              Odds
            </Link>
          </li>
          <li className={`nav-item ${ActiveNavbar === 2 ? "active2" : ""}`}>
            <Link
              data-toggle="tab"
              className="nav-link"
              onClick={() => handleClick(2)}>
              Matched Bet (0)
            </Link>
          </li>
        </ul>
        <div className="tv-icon">
          <p className="mb-0">
            <i className="fas fa-tv"></i>
          </p>
        </div>
      </div>

      {ActiveNavbar === 1 ? <GameDetail /> : <MatchBet />}
    </>
  );
}

export default GameHead;
