import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Nav.css";

function Mobilenav() {
 
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    e.preventDefault();
    setActive(val);
  };


  return (
    <>
      <ul className="nav nav-tabs game-nav-bar">
          <li className={`nav-item ${Active === 1 ? "active2" : null}`} onClick={(e) => handleClick(1, e)}>
              <Link
                data-toggle="tab"
                to="/m/In-play"
                className="nav-link navlink1"
                >
                In-play
              </Link>
            </li>
            <li className={`nav-item ${Active === 2 ? "active2" : null}`} onClick={(e) => handleClick(2, e)}>
              <Link
                data-toggle="tab"
                to="/m/Sports"
                className="nav-link navlink1"
                >
                Sports
              </Link>
            </li>
            <li className={`nav-item ${Active === 3 ? "active2" : null}`} onClick={(e) => handleClick(3, e)}>
              <Link
                data-toggle="tab"
                to="/m/slot"
                className="nav-link navlink1"
                >
                Casino+Slot
              </Link>
            </li>
            <li
              
              className={`nav-item ${Active === 4 ? "active2" : null}`}
              onClick={(e) => handleClick(4, e)}
             >
              <Link
                data-toggle="tab"
                to="/m/Others"
                className="nav-link navlink1"
                >
                Others
              </Link>
            </li>
        {/* {subNav.map((e, id) => {
          return (
            <li
              className={`nav-item ${ActiveClass === id ? "active2" : ""}`}
              key={id}
              onClick={() => handleActiveClass(id)}>
              <Link
                // eslint-disable-next-line
                to={"/m/" + `${e.split(" ").join("")}`}
                className="nav-link navlink1 nav-active">
                {e}
              </Link>
            </li>
          );
        })} */}
      </ul>
    </>
  );
}

export default Mobilenav;

