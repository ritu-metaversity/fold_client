import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Nav.css";

function Mobilenav() {
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    // e.preventDefault()
    setActive(val);
    // console.log(val, "fewfwfdwefdf")
  };

  const {pathname} = useLocation();



  useEffect(()=>{
    if(pathname === '/m/slot'){
      setActive(3)
    }
    else if(pathname === '/m/sports'){
      setActive(2)
    }
    else if(pathname ==='/m/In-play'){
      setActive(1)
    }else if((pathname ==='/m/Others')){
      setActive(4)
    }
    else if((pathname?.slice(0,7) === '/casino')){
      setActive(3)
    }
    else if(pathname==="/"){
      setActive(2)
    }

  },[pathname])

  return (
    <>
      <ul className="nav nav-tabs main-gameHead1 game-nav-bar">
        <li
          className={`nav-item ${Active === 1 ? "active2" : ""}`}
          onClick={(e) => handleClick(1, e)}>
          <Link  to="/m/In-play" className="nav-link navlink1">
            In-play
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 2 ? "active2" :""}`}
          onClick={(e) => handleClick(2, e)}>
          <Link to="/m/sports" className="nav-link navlink1">
            Sports
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 3 ? "active2" : ""}`}
          onClick={(e) => handleClick(3, e)}>
          <Link  to="/m/slot" className="nav-link navlink1">
            Casino + Slot
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 4 ? "active2" : ""}`}
          onClick={(e) => handleClick(4, e)}>
          <Link to="/m/Others" className="nav-link">
            Others
          </Link>
        </li>
      </ul>
      <Outlet/>
    </>
  );
}

export default Mobilenav;
