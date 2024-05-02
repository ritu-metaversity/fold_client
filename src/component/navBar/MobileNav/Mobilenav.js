import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../Nav.css";
import LatestEvent from "../../../common/LatestEvent";

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
    } else if (pathname === "/lottery") {
      setActive(8);
    } else if (pathname === "/m/livecasino") {
      setActive(4);
    } else if (pathname === "/slot") {
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
    } else if (pathname === "/instantWin") {
      setActive(2);
    } else if (pathname === "/m/60/casino") {
      setActive(10);
    } else if (pathname === "/m/54/casino") {
      setActive(11);
    } else if (pathname === "/m/52/casino") {
      setActive(12);
    } else if (pathname === "/m/61/casino") {
      setActive(13);
    } else if (pathname === "/m/53/casino") {
      setActive(18);
    } else if (pathname === "/m/51/casino") {
      setActive(14);
    } 
    else if (pathname === "/m/55/casino") {
      setActive(15);
    }
    else if (pathname === "/m/57/casino") {
      setActive(16);
    }
    else if (pathname === "/instantWin") {
      setActive(9);
    }
  }, [pathname]);

  return (
    <>
        <LatestEvent iplPath="/m/gamedetail/28127348" elePath="/m/gamedetail/1706456690"/>

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
        {/* {(casinoAllow?.Aura || localStorage.getItem("token") == null) && (
          <li
            className={`nav-item ${Active === 6 ? "active2" : ""}`}
            onClick={(e) => handleClick(6, e)}>
            <Link to="/m/aura" className="nav-link navlink1">
              Aura
            </Link>
          </li>
        )} */}
        {/* {(casinoAllow?.Nowa || localStorage.getItem("token") == null) && (
          <li
            className={`nav-item ${Active === 7 ? "active2" : ""}`}
            onClick={(e) => handleClick(7, e)}>
            <Link to="/m/sueprnowa" className="nav-link navlink1">
              Super Nowa
            </Link>
          </li>
        )} */}
        {(casinoAllow?.Qtech || localStorage.getItem("token") == null) && (
          <>
            <li
              className={`nav-item ${Active === 3 ? "active2" : ""}`}
              onClick={(e) => handleClick(3, e)}>
              <Link to="/slot" className="nav-link navlink1">
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
              <Link to="/lottery" className="nav-link navlink1">
                Lottery
              </Link>
            </li>
            <li
              className={`nav-item ${Active === 9 ? "active2" : ""}`}
              onClick={(e) => handleClick(9, e)}>
              <Link to="/instantWin" className="nav-link navlink1">
                Instant Win
              </Link>
            </li>
          </>
        )}
        {/* <li
          className={`nav-item ${Active === 10 ? "active2" : ""}`}
          onClick={(e) => handleClick(10, e)}>
          <Link to="/m/60/casino" className="nav-link navlink1">
            ANDAR BAHAR
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 11 ? "active2" : ""}`}
          onClick={(e) => handleClick(11, e)}>
          <Link to="/m/54/casino" className="nav-link navlink1">
            AMAR AKBAR ANTHONY
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 12 ? "active2" : ""}`}
          onClick={(e) => handleClick(12, e)}>
          <Link to="/m/52/casino" className="nav-link navlink1">
            20-20 DRAGON TIGER
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 13 ? "active2" : ""}`}
          onClick={(e) => handleClick(13, e)}>
          <Link to="/m/61/casino" className="nav-link navlink1">
            1 DAY DRAGON TIGER
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 18 ? "active2" : ""}`}
          onClick={(e) => handleClick(18, e)}>
          <Link to="/m/53/casino" className="nav-link navlink1">
            LUCKY 7 - B
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 14 ? "active2" : ""}`}
          onClick={(e) => handleClick(14, e)}>
          <Link to="/m/51/casino" className="nav-link navlink1">
            20-20 Teenpatti
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 15 ? "active2" : ""}`}
          onClick={(e) => handleClick(15, e)}>
          <Link to="/m/55/casino" className="nav-link navlink1">
            BOLLYWOOD TABLE
          </Link>
        </li>
        <li
          className={`nav-item ${Active === 16 ? "active2" : ""}`}
          onClick={(e) => handleClick(16, e)}>
          <Link to="/m/57/casino" className="nav-link">
            1 DAY TEENPATTI
          </Link>
        </li> */}
      </ul>
      <Outlet />
    </>
  );
}

export default Mobilenav;
