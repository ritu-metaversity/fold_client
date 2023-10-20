import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LiveCasino from "../LiveCasinoModals";
import { CasinoApi } from "../../../../apis/CasinoApi";
import {isBrowser} from 'react-device-detect';
import {MdOutlineClose} from 'react-icons/md'
import LiveCasinoModals from "../LiveCasinoModals";
import CasinoModals from "../../../../component/Items/Slot/CasinoModals/CasinoModals";

const GameList = ({ gameLists, providerFilter }) => {
  const [show, setShow] = useState(false);
  const [ruleShow, setRuleShow] = useState(false);
  const [gameId, setGameId] = useState("");
  const [iframeData, setIframeData] = useState("");
  const [Casinoshow, setCasinoShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setGameId(val);
    setRuleShow(true)

  }

  const handleAgree=()=>{
    setCasinoShow(true)
    setShow(true);
    setRuleShow(false)
  }

  useEffect(() => {
    const gameToken = localStorage.getItem("gameToken");
    const token = localStorage.getItem("token")
    CasinoApi.Casino_GameLink({
      playerId: "121212",
      currency: "INR",
      country: "IN",
      gender: "M",
      gameName: gameId,
      birthDate: "1986-01-01",
      lang: "en_IN",
      mode: "real",
      device: isBrowser? "desktop":"mobile",
      returnUrl: window.location.host,
      token: gameToken,
      walletSessionId:token
    }).then((res)=>{
      setIframeData(res?.data?.data?.url)
    });
  }, [gameId]);

  return (
    <>
      <div className="provider_images">
        {gameLists?.map((item) => {
          console.log(item, "Dasdasd");
          if (
            providerFilter != "ALL" &&
            !item?.category?.includes(providerFilter)
          )
            return <></>;
          return (
            <div style={{cursor:"pointer"}} onClick={()=>handleShow(item?.id)}>
              <img src={item?.images[1]?.url} alt="" />
            </div>
          );
        })}
      </div>

      <Modal centered show={ruleShow}   onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals type={2}/>
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={()=>setRuleShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal className="if_modals" size="xl" show={show} onHide={handleClose}>
        <Modal.Body className="casino_iframe">
          <button onClick={handleClose} className="close_iframe"><MdOutlineClose /></button>
          <LiveCasinoModals  iframeData={iframeData}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GameList;
