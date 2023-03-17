import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "../Nav.css";

function Mobilenav() {
let {pathname}=useLocation()
 
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    setActive(val);
  };


  return (
    <>
      <ul className="nav nav-tabs game-nav-bar">
          <li className={`nav-item ${Active === 1 ? "active2" : null}`}>
              <Link
                data-toggle="tab"
                to="/m/In-play"
                className="nav-link navlink1"
                onClick={() => handleClick(1)}>
                In-play
              </Link>
            </li>
            <li className={`nav-item ${Active === 2 ? "active2" : null}`}>
              <Link
                data-toggle="tab"
                to="/m/Sports"
                className="nav-link navlink1"
                onClick={() => handleClick(2)}>
                Sports
              </Link>
            </li>
            <li className={`nav-item ${Active === 3 ? "active2" : null}`}>
              <Link
                data-toggle="tab"
                to="/m/slot"
                className="nav-link navlink1"
                onClick={() => handleClick(3)}>
                Casino+Slot
              </Link>
            </li>
            <li
              
              className={`nav-item ${Active === 4 ? "active2" : null}`}
             >
              <Link
                data-toggle="tab"
                to="/m/Others"
                className="nav-link navlink1"
                onClick={() => handleClick(4)}>
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

