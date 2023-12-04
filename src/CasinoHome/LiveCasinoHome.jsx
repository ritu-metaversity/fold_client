import React, { useEffect, useState } from "react";
import { CasinoProviderList } from "../common/casinoProvider/CasinoProviderList";
import './LiveCasinoHome.css'

import { CasinoApi } from "../apis/CasinoApi";
import { isBrowser } from "react-device-detect";
import { Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import CasinoModals from "../component/Items/Slot/CasinoModals/CasinoModals";
import LiveCasinoModals from "../desktopLayout/LiveCasino/casinoTabs/LiveCasinoModals";


const LiveCasinoHome = () => {
    const [iframeData, setIframeData] = useState("");
    const [gameId, setGameId] = useState("");
    const [ruleShow, setRuleShow] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (val) => {
      setGameId(val);
      setRuleShow(true);
    };
  
    const handleAgree = () => {
      setShow(true);
      setRuleShow(false);
    };


    useEffect(() => {
        const gameToken = localStorage.getItem("gameToken");
        const token = localStorage.getItem("token");
        CasinoApi.Casino_GameLink({
          playerId: "121212",
          currency: "INR",
          country: "IN",
          gender: "M",
          gameName: gameId,
          birthDate: "1986-01-01",
          lang: "en_IN",
          mode: "real",
          device: isBrowser ? "desktop" : "mobile",
          returnUrl: window.location.host,
          token: gameToken,
          walletSessionId: token,
        }).then((res) => {
          setIframeData(res?.data?.data?.url);
        });
      }, [gameId]);

  return (
    <div>
    
    <h4 className="casino_name">Live Casino</h4>
    
    <div className="live_casino_home">
      {CasinoProviderList.map((item) => {
        return (
          <div onClick={()=>handleShow(item?.gameCode)} className="sub_live_casino">
            <img className="live_casino_logo" src={item?.logo} alt="fsfsdfsd" />
            <p style={{fontWeight:"900", paddingTop: "2px"}}>{item?.name}</p>
          </div>
        );
      })}
    </div>
    <Modal centered show={ruleShow} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals type={"qtech"} />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={() => setRuleShow(false)}>
              No, I Don't Agree
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal className="if_modals" size="xl" show={show} onHide={handleClose}>
        <Modal.Body className="casino_iframe">
          <button onClick={handleClose} className="close_iframe">
            <MdOutlineClose />
          </button>
          <LiveCasinoModals iframeData={iframeData} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LiveCasinoHome;
