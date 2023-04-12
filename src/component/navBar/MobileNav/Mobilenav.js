import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Nav.css";

function Mobilenav() {
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    setActive(val);
    e.preventDefault();
  };

  const {pathname} = useLocation()

  useEffect(()=>{
    if(pathname === '/m/slot'){
      setActive(3)
    }else if(pathname === '/m/Sports'){
      setActive(2)
    }else if(pathname ==='/m/In-play'){
      setActive(1)
    }else if((pathname ==='/m/Others')){
      setActive(4)
    }else{
      setActive(1)
    }

  },[pathname])

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
