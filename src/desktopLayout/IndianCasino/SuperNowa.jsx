import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {isBrowser} from 'react-device-detect';
import {MdOutlineClose} from 'react-icons/md'
import { CasinoApi } from "../../apis/CasinoApi";
import axios from "axios";
import LiveCasinoModals from "../LiveCasino/casinoTabs/LiveCasinoModals";
import CasinoModals from "../../component/Items/Slot/CasinoModals/CasinoModals";
import { GameAPI } from "../../apis/gameAPI";

const SuperNowa = () => {
  const [show, setShow] = useState(false);
  const [casinoShow, setCasinoShow] = useState(false)
  const [gameData, setGameData] = useState([])
  const [gameId, setGameId] = useState("");
  const [iframeData, setIframeData] = useState("");
  const [pCode, setPcode] = useState("SN");
  const [isLoading, setIsloading] = useState(true)
//   const [Casinoshow, setCasinoShow] = useState(false);

  const handleClose = () => setShow(false);

 

  const handleAgree=()=>{
    setCasinoShow(true)
    setShow(true);
    setCasinoShow(false)
  }


  useEffect(()=>{
    CasinoApi.Super_Nowa_Game_List({
        providerCode: "SN",
    }).then((res)=>{
        setGameData(res?.data?.games)  
        setIsloading(false); 

    })
  }, [])

  const [singleUserValue, setSingleUserValue] = useState();
  useEffect(() => {
    GameAPI.SINGLE_USER_VALUE().then((res) => {
      console.log(res?.data?.supernowa, "res?.data?.supernowa")
      setSingleUserValue(res?.data?.supernowa);
      
    });
  }, []);

  const handleShow = (val, providerCode) => {
    setGameId(val);
    setPcode(providerCode)
    if (singleUserValue !== 1) {
      setCasinoShow(true);  
    }else{
      setShow(true)
    }
  }


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
        backUrl: `${window.location.protocol}//${window.location.hostname.replace('www.','')}`,
      }
    }
    axios
      .post(
        `https://adminapi.247idhub.com/admin-new-apis/api/supernowa/v1/authentication`, dtatata,
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
        } else {
        }
      })
  }, [gameId, pCode])

  return (
    <>
    <div style={{height:"calc(100vh - 240px)", overflowY:"scroll"}}>
    {
        isLoading ?<p className="lodder lodder_footer">
        <i className="fa fa-spinner fa-spin"></i>
      </p> :
      
       <div className="provider_images">
        {gameData?.map((item) => {
          return (
            <div style={{cursor:"pointer"}} onClick={()=>handleShow(item?.code, item?.providerCode)}>
              <img height="96px;" src={item?.thumb} alt="" />
            </div>
          );
        })}
      </div>
      
    }
      

      <Modal centered show={casinoShow}   onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals type={"supernowa"} singleUserValue={singleUserValue} show={setShow} setShow={setCasinoShow}/>
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={()=>setCasinoShow(false)}>No, I Don't Agree</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal  className="if_modals" size="xl" show={show} onHide={handleClose}>
        <Modal.Body className="casino_iframe">
          <button onClick={handleClose} className="close_iframe"><MdOutlineClose /></button>
          <LiveCasinoModals  iframeData={iframeData}/>
        </Modal.Body>
      </Modal>


      </div>
    </>
  );
};

export default SuperNowa;
