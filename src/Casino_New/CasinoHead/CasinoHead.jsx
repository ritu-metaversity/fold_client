import React, { useState } from "react";
import MatchBet from "../../component/Items/MatchBet/MatchBet";
import './casinoHead.css'

function CasinoHead({ setOpenRulesModal, t1, setActiveNavBar, ActiveNavbar }) {

  const [betLength, setBetlenght] = useState(0);
  const handleClick = (val) => {
    setActiveNavBar(val);
  };

  return (
    <>
      <div className="d-flex w-100 nav-tabs casino_tab">
        <ul className="nav nav-tabs ">
          <li className={`nav-item ${ActiveNavbar === 1 ? "active2" : ""}`}>
            <button
              data-toggle="tab"
              className="nav-link nav2 nav-btn"
              onClick={() => handleClick(1)}>
              Game
            </button>
          </li>
          <li className={`nav-item ${ActiveNavbar === 2 ? "active2" : ""}`}>
            <button
              data-toggle="tab"
              className="nav-link nav-btn"
              onClick={() => handleClick(2)}>
              Place Bet (0)
            </button>
          </li>
        </ul>
        <div>
          <div
            className="w-100  text-white p-2"
            style={{ background: "#0088cc" }}>
            <p
              className="ms-1 rule_font"
              onClick={() => setOpenRulesModal(true)}>
              <u>Rules</u>
            </p>
            <div className="ms-auto round_id">
              Round ID: {t1?.mid?.split(".")[1]} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CasinoHead;
