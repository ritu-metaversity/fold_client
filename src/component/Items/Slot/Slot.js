import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./Slot.css";
import { useLocation, useNavigate } from "react-router-dom";

const Slot = () => {
  const [casinoList, setCasinoList] = useState("");
  const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState("");
  const [casinoName, setCasinoName] = useState("Indian Casino");
  const [isLoading, setIsLoading]=useState(true);

  useEffect(() => {
    GameAPI.CASINO_TYPES().then((res) => {
      setCasinoList(res);
    });
  }, []);

  const handleClick = (id, name, e) => {
    setCasinoListId(id);
    setActiveClass(id);
    setCasinoName(name);
    e.preventDefault();
  };

  useEffect(() => {
    GameAPI.CASINO_LIST_BY_TYPE({
      id: casinoListId,
    }).then((res) => {
      setCasinoData(res); 
      setIsLoading(false)
    });
  }, [casinoListId]);

  const {pathname} = useLocation();
  const nav = useNavigate();
  const handleData = (id, e) => {
    nav(`/casino/${id}`);
    e.preventDefault();
  };

  return (
    <>
      <>
      {
        isLoading?<p className="lodder"><i className="fa fa-spinner fa-spin"></i></p>:
        <div className="tab-content">
        <div id="live-casino" className="tab-pane live-casino">
          <div className="container-fluid">
            {
              pathname==="/home" || pathname ==="/m/In-play" || pathname==="/Home" || pathname === "/m/Others"?"":(
                <div className="row">
              <ul className="nav nav-tabs slot-nav-bar">
                {casinoList?.length > 0 &&
                  casinoList.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={`nav-item ${
                          ActiveClass === item.id ? "active2" : ""
                        }`
                      }
                        onClick={(e) => handleClick(item.id, item.name, item.gameId, e)}>
                        <a
                          data-toggle="tab"
                          href="#casino"
                          className="nav-link active">
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
              )
            }
            
            <div className="row">
              <div className="tab-content casino-main">
                <div id="casino" className="tab-pane ">
                  <div className="tab-content">
                    <div className="tab-pane casino-tables">
                      <div className="" >
                        
                            <div className="row row5">
                            <div className="col-12">
                              <h4 className="text-uppercase mt-3">{casinoName}</h4>
                            </div>
                          </div>
                        <div
                          className={`row row5 mt-2 ${
                            casinoData === null ? "dis-none" : ""
                          }`}>
                          {casinoData?.length > 0 &&
                            casinoData.map((item, id) => {
                              return (
                                <div key={item.gameId} className="col-3 text-center" onClick={(e)=>handleData(item.gameId, e)}>
                                  <div className="casinoicons" >
                                    <a href="/">
                                      <img
                                        src={item.imageUrl}
                                        className="img-fluid"
                                        alt="casino-images"
                                      />
                                      <div className="casino-name">
                                        {item.gameName}
                                      </div>
                                      {/* {
                                        id===0?<div class="new-launch-casino">New Launch</div>:""
                                      } */}
                                      
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div
                          className={`row row5 mt-2 ${casinoData === null ? "" : "dis-none"}`}
                          style={{ borderTop: "2px solid #000" }}>
                          <div
                            style={{
                              borderTop: "2px solid #ddd",
                              paddingBottom: "12px",
                              paddingTop: "12px",
                            }}>
                            <p style={{ textAlign: "center" }}>
                              No Casino Found
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </>
    </>
  );
};

export default Slot;
