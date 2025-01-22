/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./Slot.css";
import { Link,  useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import CasinoModals from "./CasinoModals/CasinoModals";
import { auraData } from "../../../Json/auraData";





const Slot = () => {
  // const [ActiveClass, setActiveClass] = useState(323334);
  // const [casinoListId, setCasinoListId] = useState(323334);
  // const [casinoData, setCasinoData] = useState("");
  // const [casinoName, setCasinoName] = useState("Live Casino");
  // const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [casinoId, setCasinoId] = useState();
  // const [SportName, setSportName] = useState("");
  const [Casinoshow, setCasinoShow] = useState(false);
  // const [iframeData, setIframeData] = useState("");

  const token = localStorage.getItem("token");

  const handleClose = () => setCasinoShow(false);

  const [singleUserValue, setSingleUserValue] = useState();
  useEffect(() => {
    if (token !== null) {
      GameAPI.SINGLE_USER_VALUE().then((res) => {
        setSingleUserValue(res?.data?.aura);
      });
    }
  }, [token]);

  // const handleClick = (id, name, e) => {
  //   setCasinoListId(id);
  //   setActiveClass(id);
  //   setCasinoName(name);
  //   if (localStorage.getItem("token") !== null) {
  //     setShow(true);
  //   }
  //   e.preventDefault();
  // };

  const handleAgree = () => {
    setCasinoShow(true);
    setShow(false);
    nav(`/indian-casino/${casinoId}`)
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

  // const { pathname } = useLocation();
  const nav = useNavigate();
  // const handleData = (id, gameName, e) => {
  //   const gameToken = localStorage.getItem("gameToken");
  //   const token = localStorage.getItem("token");
  //   setShow(true);
  //   setCasinoId(id);
  //   setSportName(gameName);
  //   if (localStorage.getItem("token") !== null ) {
  //     CasinoApi.Casino_GameLink({
  //       playerId: "121212",
  //       currency: "INR",
  //       country: "IN",
  //       gender: "M",
  //       gameName: id,
  //       birthDate: "1986-01-01",
  //       lang: "en_IN",
  //       mode: "real",
  //       device: isBrowser ? "desktop" : "mobile",
  //       returnUrl: window.location.origin,
  //       token: gameToken,
  //       walletSessionId: token,
  //     }).then((res) => {
  //       setIframeData(res?.data?.data?.url);
  //     });
  //   } else {
  //     nav("/login");
  //   }
  //   e.preventDefault();
  // };

  const handleData = (id, gameName, e) => {
    e.preventDefault();

    if (token !== null) {
      setShow(true);
      setCasinoId(id);
      // setSportName(gameName);
    } else {
      nav("/login");
    }
  };

  // const handleNav = (e)=>{
  //   e.preventDefault();
  //   const link = isBrowser?"/login":"/m/login"
  //   nav(link)
  // }

  // const gameToken = localStorage.getItem("gameToken");

  // useEffect(() => {
  //   CasinoApi.Casino_Gamelist({
  //     gameCategory: "LIVECASINO",
  //     provider: "EZU",
  //     token: gameToken,
  //   }).then((response) => {
  //     if (response?.data?.data?.items?.length) {
  //       const { items } = response.data.data;
  //       setCasinoData(items);
  //       // setIsLoading(false);
  //     }
  //   });
  // }, [gameToken]);

  const pathname = window.location.pathname;
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
              {/* {localStorage.getItem("gameToken") !== null ? (
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
              ) : ( */}
              <div className="row">
                <div className="tab-content casino-main">
                  <div id="casino" className="tab-pane ">
                    <div className="tab-content">
                      <div className="tab-pane casino-tables">
                        <div className="">
                          <div className="row row5">
                            <div className="col-12">
                              <h4 className="text-uppercase mt-3">
                                {pathname?.includes("livecasino")
                                  ? ""
                                  : "INDIAN CASINO"}
                              </h4>
                            </div>
                          </div>
                          <div className={`row row5 mt-2`}>
                            {auraData?.data?.map((item, id) => {
                              return (
                                <div
                                  key={item.name}
                                  className="col-6 col-md-2 text-center"
                                  // onClick={handleNav}
                                >
                                  <div
                                    className="casinoicons"
                                    onClick={(e) =>
                                      handleData(
                                        item.game_id,
                                        item.name,
                                        e
                                      )
                                    }>
                                    <Link href="#">
                                      <img
                                        // src={`https://s3buket.blr1.cdn.digitaloceanspaces.com/lotus-logos/${item?.match_id}.jpeg`}
                                        src={item?.thumb}
                                        className="img-fluid"
                                        alt="casino-images"
                                      />
                                      {/* <div className="casino-name">
                                        {item.name}
                                      </div> */}
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {/* <div
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* // )} */}
            </div>
          </div>
        </div>
        {/* // )} */}
      </>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          {/* <CasinoModals
            type={"qtech"}
            singleUserValue={singleUserValue}
            show={setCasinoShow}
            setShow={setShow}
          /> */}
          <CasinoModals
            type={"aura"}
            singleUserValue={singleUserValue}
            show={setCasinoShow}
            setShow={setShow}
            casinoId={casinoId}
          />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={() => setShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal
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
            src={`https://aura.fawk.app/${token}/9677/${casinoId}`}
            className="desktop_if"
            width="100%"
            title="desktop"
          />
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Slot;
