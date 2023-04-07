import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameAPI } from "../../apis/gameAPI";

function SideBar() {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [toggle, setToggle] = useState("");
  const [ulshow, setUlShow] = useState(false);
  const [subulshow, setSubUlShow] = useState(false);
  const [matchList, setMatchList] = useState("");

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
  const handleShowSingleSport = (id) => {
    setToggle(id);
    // toggle === id
  };
  // const allSport = [
  //   "Football",
  //   "Tennis",
  //   "Cricket",
  //   "Ice Hockey",
  //   "Volleyball",
  //   "Politics",
  //   "Basketball",
  //   "Table Tennis",
  //   "Darts",
  //   "Badminton",
  //   "Kabaddi",
  //   "Boxing",
  //   "Mixed Martial Arts",
  //   "Motor Sport",
  // ];

  const ulExpended = () => {
    if (ulshow === true) {
      setUlShow(false);
    } else {
      setUlShow(true);
    }
  };

  const subulExpended = () => {
    if (subulshow === true) {
      setSubUlShow(false);
    } else {
      setSubUlShow(true);
    }
  };

  useEffect(()=>{
    GameAPI.Side_Bar_Data().then((res)=>{
      setMatchList(res)
    })

  },[])
  
  return (
    <div className="side-desk-view">
      <div
        data-toggle="collapse"
        data-target=".casino"
        onClick={collapse}
        className="sidebar-title collapsed"
        aria-expanded="false">
        <h5 className="d-inline-block m-b-0">Others</h5>
        <i
          className={!visible ? "fa fa-chevron-right" : "fa fa-chevron-down"}
          style={{ color: "#fff" }}></i>
      </div>
      <nav className="casino ">
        {visible && (
          <ul>
            <li className="nav-item ">
              <Link to="/livcasino" className="nav-link">
                <span className="new-launch-text">Live Casino</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/slotgame" className="nav-link">
                <span className="new-launch-text">Slot Game</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/race" className="nav-link">
                <span>Race 20-20</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link  className="nav-link">
                <span>Casino Queen</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dtlist" className="nav-link">
                <span>Dragon Tiger</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sportcasino" className="nav-link">
                <span>Sports Casino</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/andarbahar" className="nav-link">
                <span>Andar Bahar</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bollywoodtable" className="nav-link">
                <span>Bollywood Casino</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/casinowar" className="nav-link">
                <span>Casino War</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/worlilist" className="nav-link">
                <span>Worli</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lottery" className="nav-link">
                <span>Lottery</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cardjud" className="nav-link">
                <span>3 Cards Judgement</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/binary" className="nav-link">
                <span>Binary</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/virtualsports" className="nav-link">
                <span>Virtual Sports</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cricketcasino" className="nav-link">
                <span>Cricket Casino</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <div
        className="sidebar-title m-t-5 theme2bg"
        onClick={collapse2}
        aria-controls="events"
        aria-expanded="true"
        role="button">
        <h5 className="text-white d-inline-block m-b-0">All Sports</h5>
        <i
          className={!visible2 ? "fa fa-chevron-right" : "fa fa-chevron-down"}
          style={{ color: "#fff" }}></i>
      </div>

      <div id="events" className="mtree-main collapse show">
        <div className="ps">
          {visible2 &&
            matchList?.length>0 && matchList.map((e, id) => {
              return (
                <nav key={id}>
                  <ul className="mtree transit bubba">
                    <li className="mtree-node  item">
                      <div className="text-dark" onClick={ulExpended}>
                        <span onClick={() => handleShowSingleSport(id)}>
                          <i
                            className={
                              id === toggle && !ulshow
                                ? "far fa-minus-square"
                                : "far fa-plus-square"
                            }></i>
                        </span>
                        <span>{e.sportName}</span>
                      </div>
                      {toggle === id && !ulshow ? (
                        <ul className="mtree-level-1" key={id} style={{}}>
                          <li className="mtree-node text-dark">
                            <div className="text-dark" onClick={subulExpended}>
                              <span onClick={() => handleShowSingleSport(id)}>
                             
                              {e.matchList.map((event, id)=>{
                                return(
                                  <p key={id}><i className="fas fa-caret-right"></i> {event.matchName}</p>
                                )
                              })}
                               </span>
                            </div> 
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </nav>
              );
            })}

          <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
            <div
              className="ps__thumb-x"
              tabIndex="0"
              style={{ left: "0px", width: "0px" }}>
              {" "}
            </div>
          </div>
          <div className="ps__rail-y" style={{ top: "0px", right: "0px" }}>
            <div
              className="ps__thumb-y"
              tabIndex="0"
              style={{ top: "0px", height: "0px" }}>
              {" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
