import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./Slot.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "antd";
import CasinoModals from "./CasinoModals/CasinoModals";
import { CasinoApi } from "../../../apis/CasinoApi";
import { isBrowser } from "react-device-detect";
import { EvolutionGamming, homeCasino } from "../../../common/casinoProvider/NewCasinoProvider";

const casinoImageData = [
  {
    name: "32 Cards",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/1.jpeg",
  },
  {
    name: "Andar Bahar",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/2.jpeg",
  },
  {
    name: "Auto Roulette",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/3.jpeg",
  },
  {
    name: "Auto Roulette 1",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/4.jpeg",
  },
  {
    name: "Baccarat",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/5.jpeg",
  },
  {
    name: "Baccarat A",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/6.jpeg",
  },
  {
    name: "Baccarat B",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/7.jpeg",
  },
  {
    name: "Baccarat C",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/8.jpeg",
  },
  {
    name: "Baccarat D",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/9.jpeg",
  },
  {
    name: "Bet on Teen Patti",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/10.jpeg",
  },
  {
    name: "Blackjack",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/11.jpeg",
  },
  {
    name: "Blackjack A",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/12.jpeg",
  },
  {
    name: "Casino Hold'em",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/13.jpeg",
  },
  {
    name: "Casino Marina Andar Bahar",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/14.jpeg",
  },
  {
    name: "Blackjack Salon Privé",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/15.jpeg",
  },
  {
    name: "Blackjack da Sorte",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/16.jpeg",
  },

  {
    name: "Casino Marina Baccarat A",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/18.jpeg",
  },
  {
    name: "Casino Marina Baccarat C",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/19.jpeg",
  },
  {
    name: "Casino Marina Roulette 1",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/20.jpeg",
  },
  {
    name: "Cricket Auto Roulette",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/21.jpeg",
  },
  {
    name: "Cricket War",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/22.jpeg",
  },
  {
    name: "Diamond Roulette",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/23.jpeg",
  },
  {
    name: "Lucky 7",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/24.jpeg",
  },
  {
    name: "Casino Marina Andar Bahar",
    url: "https://s3buket.blr1.cdn.digitaloceanspaces.com/casino/17.jpeg",
  },
];

const Slot = () => {
  const [ActiveClass, setActiveClass] = useState(323334);
  const [casinoListId, setCasinoListId] = useState(323334);
  const [casinoData, setCasinoData] = useState("");
  const [casinoName, setCasinoName] = useState("Live Casino");
  // const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [casinoId, setCasinoId] = useState();
  const [SportName, setSportName] = useState("");
  const [Casinoshow, setCasinoShow] = useState(false);
  const [iframeData, setIframeData] = useState("");

  const token = localStorage.getItem("token");

  // const finishLoading = () => {
  //   setIsLoading(false);
  // };

  const handleClose = () => setCasinoShow(false);
  // const handleShow = () => setShow(true);

  // useEffect(() => {
  //   GameAPI.CASINO_TYPES().then((res) => {
  //     setCasinoList(res);
  //   });
  // }, []);

  const [singleUserValue, setSingleUserValue] = useState();
  useEffect(() => {
    if (token !== null) {
      GameAPI.SINGLE_USER_VALUE().then((res) => {
        setSingleUserValue(res?.data?.aura);
      });
    }
  }, [token]);

  const handleClick = (id, name, e) => {
    setCasinoListId(id);
    setActiveClass(id);
    setCasinoName(name);
    if (localStorage.getItem("token") !== null) {
      setShow(true);
    }
    e.preventDefault();
  };

  const handleAgree = () => {
    setCasinoShow(true);
    setShow(false);
  };

  // useEffect(() => {
  //   fetch(
  //     "https://admin-api-banners-2.s3.ap-south-1.amazonaws.com/diamond.json"
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setCasinoData(res?.data);
  //       setIsLoading(false);
  //     });
  // }, []);


  const { pathname } = useLocation();
  const nav = useNavigate();
  const handleData = (id, gameName, e) => {
    const gameToken = localStorage.getItem("gameToken");
    const token = localStorage.getItem("token");
    setShow(true);
    setCasinoId(id);
    setSportName(gameName);
    if (localStorage.getItem("token") !== null ) {
      CasinoApi.Casino_GameLink({
        playerId: "121212",
        currency: "INR",
        country: "IN",
        gender: "M",
        gameName: id,
        birthDate: "1986-01-01",
        lang: "en_IN",
        mode: "real",
        device: isBrowser ? "desktop" : "mobile",
        returnUrl: window.location.origin,
        token: gameToken,
        walletSessionId: token,
      }).then((res) => {
        setIframeData(res?.data?.data?.url);
      });
    } else {
      nav("/login");
    }
    e.preventDefault();
  };


  const handleNav = (e)=>{
    e.preventDefault();
    const link = isBrowser?"/login":"/m/login"
    nav(link)
  }

  const gameToken = localStorage.getItem("gameToken");

  useEffect(() => {
    CasinoApi.Casino_Gamelist({
      gameCategory: "LIVECASINO",
      provider: "EZU",
      token: gameToken,
    }).then((response) => {
      if (response?.data?.data?.items?.length) {
        const { items } = response.data.data;
        setCasinoData(items);
        // setIsLoading(false);
      }
    });
  }, [gameToken]);

  return (
    <>
      <>
        {/* {isLoading ? (
          <p className="lodder">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
        ) : ( */}
        <div className="tab-content">
          <div id="live-casino" className="tab-pane live-casino">
            <div className="container-fluid">
              {localStorage.getItem("gameToken") !== null ? (
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
                              {homeCasino?.length > 0 &&
                                homeCasino.map((item, id) => {
                                  return (
                                    <div
                                      key={item.gameId}
                                      className="col-6 col-md-2 text-center"
                                      onClick={(e) =>
                                        handleData(item.id, item.name, e)
                                      }>
                                      <div className="casinoicons">
                                        <a href="/">
                                          <img
                                            src={item?.images[1]?.url}
                                            className="img-fluid"
                                            alt="casino-images"
                                          />
                                          <div className="casino-name">
                                            {item.name}
                                          </div>
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
              ) : (
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
                                casinoImageData === null ? "dis-none" : ""
                              }`}>
                              {casinoImageData?.length > 0 &&
                                casinoImageData.map((item, id) => {
                                  return (
                                    <div
                                      key={item.gameId}
                                      className="col-6 col-md-2 text-center"
                                      onClick={handleNav}>
                                      <div className="casinoicons">
                                        <a href="/">
                                          <img
                                            src={item?.url}
                                            className="img-fluid"
                                            alt="casino-images"
                                          />
                                          <div className="casino-name">
                                            {item.name}
                                          </div>
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
              )}
            </div>
          </div>
        </div>
        {/* // )} */}
      </>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals
            type={"qtech"}
            singleUserValue={singleUserValue}
            show={setCasinoShow}
            setShow={setShow}
          />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={() => setShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={Casinoshow}
        size="xl"
        className="slot-modal"
        onHide={handleClose}>
        <Modal.Header className="mob_none" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {SportName}
          </Modal.Title>
        </Modal.Header>
        <button
          onClick={() => setCasinoShow(false)}
          className="close_btn desk_none">
          X
        </button>
        <Modal.Body>
          <iframe
            src={iframeData}
            className="mobile_if"
            width="100%"
            title="mobile"
            allowFullScreen={true}
            // onLoad={finishLoading}
          />

          <iframe
            src={iframeData}
            className="desktop_if"
            width="100%"
            title="desktop"
            // onLoad={finishLoading}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Slot;
