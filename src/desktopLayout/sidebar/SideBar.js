import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import Accordion from "react-bootstrap/Accordion";

import axios from "axios";

function SideBar() {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [toggle, setToggle] = useState();
  const [matchList, setMatchList] = useState("");
  const [casinoData, setCasinoData] = useState([]);
  const [SportId, setSportId] = useState();
  const [show, setShow] = useState(false);
  const [closeAllSportData, setCloseAllSportData] = useState(true);

  function collapse() {
    if (visible === true) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }
  function collapse2() {
    if (visible2 === true) {
      setVisible2(false);
    } else {
      setVisible2(true);
    }
  }
  const handleSportId = (id, val) => {
    setToggle(id);
    localStorage.setItem("SportId", val);
    setSportId(val);
    setShow(!show);
    setCloseAllSportData(false);
  };

  useEffect(() => {
    axios
      .post(
        "https://api.247365.exchange/admin-new-apis/enduser/left-menu-data-open"
      )
      .then((res) => {
        setMatchList(res?.data?.data);
      });
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://admin-api-banners-new.s3.ap-south-1.amazonaws.com/diamond.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setCasinoData(res?.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="">
      <div
        data-toggle="collapse"
        data-target=".casino"
        onClick={collapse}
        className={`sidebar-title ${visible ? "" : "collapsed"}`}
        aria-expanded={`${visible ? true : false}`}>
        <h5 className="d-inline-block m-b-0">Others</h5>
        <p className="arrow-line">
          {visible ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </p>
      </div>
      <nav className={`casino ${visible ? "collapse show" : "d-none"}`}>
        <ul>
          {/* <li className="nav-item">
            <Link to="/livecasino" className="nav-link">
              <span className="new-launch-text">Live Casino</span>
            </Link>
          </li> */}
          {casinoData?.map((res, id) => {
            return (
              <li className="nav-item" key={id}>
                <Link to={`/casino/${res?.gameId}`} className="nav-link">
                  <span className="new-launch-text">{res?.gameName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="sidebar-title m-t-5 theme2bg"
        onClick={collapse2}
        aria-controls="events"
        aria-expanded="true"
        role="button">
        <h5 className="text-white d-inline-block m-b-0">All Sports</h5>
        <p className="arrow-line">
          {visible2 ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </p>
      </div>
      {matchList?.length && visible2 &&
        matchList?.map((e, id) => {
          return (
            <Accordion flush className="main_sport_header">
              <Accordion.Item eventKey={id}>
                <Accordion.Header onClick={() => handleSportId(id, e?.sportId)} className="sport_header">
                { toggle === id && show ?<AiOutlineMinusSquare />: <AiOutlinePlusSquare />}
                   {e?.sportName}
                </Accordion.Header>
                {e?.matchList?.map((item, index) => {
                  return (
                    <Accordion.Body>
                      <p className="nav-item" key={index}>
                        <Link
                          to={`/gamedetail/${item?.matchId}`}
                          className="sub-nav-link">
                          <span className="new-launch-text">
                            {item?.matchName}
                          </span>
                        </Link>
                      </p>
                    </Accordion.Body>
                  );
                })}
              </Accordion.Item>
            </Accordion>
          );
        })}
    </div>
  );
}

export default SideBar;
