import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {isBrowser} from 'react-device-detect';
import {MdOutlineClose} from 'react-icons/md'
import { CasinoApi } from "../../apis/CasinoApi";
import axios from "axios";
import LiveCasinoModals from "../LiveCasino/casinoTabs/LiveCasinoModals";

const SuperNowa = () => {
  const [show, setShow] = useState(false);
  const [gameData, setGameData] = useState([])
  const [gameId, setGameId] = useState("");
  const [iframeData, setIframeData] = useState("");
  const [pCode, setPcode] = useState("SN")

  const handleClose = () => setShow(false);
  const handleShow = (val, providerCode) => {
    setGameId(val);
    setPcode(providerCode)
    setShow(true);
  }

  useEffect(()=>{
    CasinoApi.Super_Nowa_Game_List({
        providerCode: "SN",
    }).then((res)=>{
        setGameData(res?.data?.games)   
    })
  }, [])

  useEffect(() => {
    const TokenId = localStorage.getItem("token");
    let dtatata = {
      "game": {
        "gameCode": gameId,
        "providerCode": pCode,
      },
      "timestamp": new Date().getTime(),
      user: {
        currency: "INR",
        backUrl: `${window.location.protocol}//${window.location.hostname}/Slot-Game-list`,
      }
    }
    axios
      .post(
        `http://3.0.144.254/api/supernowa/authentication`, dtatata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TokenId}`,
          },
        }
      )
      .then((response) => {
        if (response) {
            setIframeData(response?.data?.data?.launchURL)
          console.log(response?.data?.launchURL, "sdfsdfsdfsdfsdfsdfsd")
        } else {
        }
      })
  }, [gameId, pCode])

  return (
    <>
      <div className="provider_images">
        {gameData?.map((item) => {
          console.log(item, "Dasdasd");
          return (
            <div style={{cursor:"pointer"}} onClick={()=>handleShow(item?.code, item?.providerCode)}>
              <img height="96px;" src={item?.thumb} alt="" />
            </div>
          );
        })}
      </div>

      <Modal className="if_modals" size="xl" show={show} onHide={handleClose}>
        <Modal.Body className="casino_iframe">
          <button onClick={handleClose} className="close_iframe"><MdOutlineClose /></button>
          <LiveCasinoModals  iframeData={iframeData}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SuperNowa;
