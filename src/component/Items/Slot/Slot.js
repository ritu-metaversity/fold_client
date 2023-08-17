import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./Slot.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "antd";
import CasinoModals from "./CasinoModals/CasinoModals";

const Slot = () => {
  const [casinoList, setCasinoList] = useState("");
  const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState("");
  const [casinoName, setCasinoName] = useState("Indian Casino");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [casinoId, setCasinoId] = useState();
  const [SportName, setSportName] = useState("");
  const [Casinoshow, setCasinoShow] = useState(false);

  const token = localStorage.getItem("token");

  const finishLoading = () => {
    setIsLoading(false);
  };

  const handleClose = () => setCasinoShow(false);
  // const handleShow = () => setShow(true);

  // useEffect(() => {
  //   GameAPI.CASINO_TYPES().then((res) => {
  //     setCasinoList(res);
  //   });
  // }, []);

  const handleClick = (id, name, e) => {
    setCasinoListId(id);
    setActiveClass(id);
    setCasinoName(name);

    if (localStorage.getItem("token") !== null) {
      setShow(true);
    }
    e.preventDefault();
  };

  // useEffect(() => {
  //   GameAPI.CASINO_LIST_BY_TYPE({
  //     id: casinoListId,
  //   }).then((res) => {
  //     setCasinoData(res);
  //     setIsLoading(false)
  //   });
  // }, [casinoListId]);

  const handleAgree=()=>{
    setCasinoShow(true)
    setShow(false)
  }

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

  const { pathname } = useLocation();
  const nav = useNavigate();
  const handleData = (id, gameName, e) => {
    setCasinoId(id);
    setSportName(gameName);
    if (localStorage.getItem("token") !== null) {
      setShow(true);
    } else {
      nav("/login");
    }
    e.preventDefault();
  };

  return (
    <>
      <>
        {isLoading ? (
          <p className="lodder">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
        ) : (
          <div className="tab-content">
            <div id="live-casino" className="tab-pane live-casino">
              <div className="container-fluid">
                {pathname === "/home" ||
                pathname === "/m/In-play" ||
                pathname === "/Home" ||
                pathname === "/m/Others" ? (
                  ""
                ) : (
                  <div className="row">
                    <ul className="nav nav-tabs slot-nav-bar">
                      {casinoList?.length > 0 &&
                        casinoList.map((item) => {
                          return (
                            <li
                              key={item.id}
                              className={`nav-item ${
                                ActiveClass === item.id ? "active2" : ""
                              }`}
                              onClick={(e) =>
                                handleClick(item.id, item.name, item.gameId, e)
                              }>
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
                )}

                <div className="row">
                  <div className="tab-content casino-main">
                    <div id="casino" className="tab-pane ">
                      <div className="tab-content">
                        <div className="tab-pane casino-tables">
                          <div className="">
                            <div className="row row5">
                              <div className="col-12">
                                <h4 className="text-uppercase mt-3">
                                  {casinoName}
                                </h4>
                              </div>
                            </div>
                            <div
                              className={`row row5 mt-2 ${
                                casinoData === null ? "dis-none" : ""
                              }`}>
                              {casinoData?.length > 0 &&
                                casinoData.map((item, id) => {
                                  return (
                                    <div
                                      key={item.gameId}
                                      className="col-3 text-center"
                                      onClick={(e) =>
                                        handleData(
                                          item.gameId,
                                          item.gameName,
                                          e
                                        )
                                      }>
                                      <div className="casinoicons">
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
                                        id===0?<div className="new-launch-casino">New Launch</div>:""
                                      } */}
                                        </a>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div
                              className={`row row5 mt-2 ${
                                casinoData === null ? "" : "dis-none"
                              }`}
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
        )}
      </>

      <Modal centered show={show}   onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals/>
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={()=>setShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>



      <Modal show={Casinoshow} size="xl" className="slot-modal" onHide={handleClose}>
        <Modal.Header className="mob_none" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {SportName}
          </Modal.Title>
        </Modal.Header>
        <button onClick={() => setCasinoShow(false)} className="close_btn desk_none">
          X
        </button>
        <Modal.Body>
          {isLoading ? (
            <p className="lodder">
              <i className="fa fa-spinner fa-spin"></i>
            </p>
          ) : (
            <iframe
              src={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${casinoId}`}
              className="mobile_if"
              width="100%"
              title="mobile"
              allowFullScreen={true}
              onLoad={finishLoading}
            />
          )}

          <iframe
            src={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${casinoId}`}
            className="desktop_if"
            width="100%"
            title="desktop"
            onLoad={finishLoading}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Slot;
