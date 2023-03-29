import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import Mobilenav from "../../navBar/MobileNav/Mobilenav";
import NavBar from "../../navBar/NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Slot.css";

const Slot = () => {
  const [casinoList, setCasinoList] = useState("");
  const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState("");
  const [casinoName, setCasinoName] = useState("Indian Casino");
  const [isLoading, setIsLoading]=useState(true)

  useEffect(() => {
    GameAPI.CASINO_TYPES().then((res) => {
      setCasinoList(res);
    });
  }, []);

  const handleClick = (id, name, e) => {
    setCasinoListId(id);
    setActiveClass(id);
    setCasinoName(name)
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

  const history = useHistory();
  const handleData = (id) => {
    history.push(`/casino/${id}`);
  };

  return (
    <>
      <NavBar />
      <Mobilenav />
      {
        isLoading?<p className="lodder"><i className="fa fa-spinner fa-spin"></i></p>:<div className="tab-content">
        <div id="live-casino" className="tab-pane live-casino">
          <div className="container-fluid">
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
            <div className="row">
              <div className="tab-content casino-main">
                <div id="casino" className="tab-pane  container">
                  <div className="tab-content">
                    <div className="tab-pane  casino-tables">
                      <div className="container-fluid">
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
                            casinoData.map((item) => {
                              return (
                                <div key={item.gameId} className="coll-6 text-center" onClick={()=>handleData(item.gameId)}>
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
  );
};

export default Slot;
