import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Nav.css";

function Mobilenav() {
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    setActive(val);
    e.preventDefault();
  };

  return (
    <>
      <ul className="nav nav-tabs game-nav-bar">
        <li
          className={`nav-item ${Active === 1 ? "active2" : ""}`}
          onClick={(e) => handleClick(1, e)}>
          <Link data-toggle="tab" to="/m/In-play" className="nav-link navlink1">
            In-play
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 2 ? "active2" :""}`}
          onClick={(e) => handleClick(2, e)}>
          <Link data-toggle="tab" to="/m/Sports" className="nav-link navlink1">
            Sports
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 3 ? "active2" : ""}`}
          onClick={(e) => handleClick(3, e)}>
          <Link data-toggle="tab" to="/m/slot" className="nav-link navlink1">
            Casino+Slot
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 4 ? "active2" : ""}`}
          onClick={(e) => handleClick(4, e)}>
          <Link data-toggle="tab" to="/m/Others" className="nav-link">
            Others
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Mobilenav;
