import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Nav.css";

function Mobilenav({ casinoAllow }) {
  const [Active, setActive] = useState(1);

  const handleClick = (val, e) => {
    // e.preventDefault()
    setActive(val);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/m/slot") {
      setActive(3);
    } else if (pathname === "/m/sports") {
      setActive(2);
    } else if (pathname === "/m/In-play") {
      setActive(1);
    } else if (pathname === "/m/lottery") {
      setActive(8);
    } else if (pathname === "/m/livecasino") {
      setActive(4);
    } else if (pathname === "/m/slots") {
      setActive(3);
    } else if (pathname === "/m/fantsy") {
      setActive(5);
    } else if (pathname === "/m/aura") {
      setActive(6);
    } else if (pathname === "/m/sueprnowa") {
      setActive(7);
    } else if (pathname?.slice(0, 7) === "/casino") {
      setActive(3);
    } else if (pathname === "/") {
      setActive(2);
    }
  }, [pathname]);

  return (
    <>
      <ul className="nav nav-tabs main-gameHead1 game-nav-bar">
        <li
          className={`nav-item ${Active === 1 ? "active2" : ""}`}
          onClick={(e) => handleClick(1, e)}>
          <Link to="/m/In-play" className="nav-link navlink1">
            In-play
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 2 ? "active2" : ""}`}
          onClick={(e) => handleClick(2, e)}>
          <Link to="/m/sports" className="nav-link navlink1">
            Sports
          </Link>
        </li>
        {(casinoAllow?.Aura || localStorage.getItem("token") == null) && (
          <li
            className={`nav-item ${Active === 6 ? "active2" : ""}`}
            onClick={(e) => handleClick(6, e)}>
            <Link to="/m/aura" className="nav-link navlink1">
              Aura
            </Link>
          </li>
        )}
        {(casinoAllow?.Nowa || localStorage.getItem("token") == null) && (
          <li
            className={`nav-item ${Active === 7 ? "active2" : ""}`}
            onClick={(e) => handleClick(7, e)}>
            <Link to="/m/sueprnowa" className="nav-link navlink1">
              Super Nowa
            </Link>
          </li>
        )}
        {(casinoAllow?.Qtech || localStorage.getItem("token") == null)&& (
          <>
            <li
              className={`nav-item ${Active === 3 ? "active2" : ""}`}
              onClick={(e) => handleClick(3, e)}>
              <Link to="/m/slots" className="nav-link navlink1">
                Slot
              </Link>
            </li>
            <li
              className={`nav-item ${Active === 4 ? "active2" : ""}`}
              onClick={(e) => handleClick(4, e)}>
              <Link to="/m/livecasino" className="nav-link navlink1">
                Live Casino
              </Link>
            </li>
            <li
              className={`nav-item ${Active === 5 ? "active2" : ""}`}
              onClick={(e) => handleClick(5, e)}>
              <Link to="/m/fantsy" className="nav-link navlink1">
                Fantsy
              </Link>
            </li>
            <li
              className={`nav-item ${Active === 8 ? "active2" : ""}`}
              onClick={(e) => handleClick(8, e)}>
              <Link to="/m/lottery" className="nav-link">
                Lottery
              </Link>
            </li>
          </>
        )}
      </ul>
      <Outlet />
    </>
  );
}

export default Mobilenav;
