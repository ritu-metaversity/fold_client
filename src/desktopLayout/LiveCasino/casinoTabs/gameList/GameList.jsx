import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LiveCasino from "../LiveCasinoModals";
import { CasinoApi } from "../../../../apis/CasinoApi";
import { isBrowser } from "react-device-detect";
import { MdOutlineClose } from "react-icons/md";
import LiveCasinoModals from "../LiveCasinoModals";
import CasinoModals from "../../../../component/Items/Slot/CasinoModals/CasinoModals";
import { GameAPI } from "../../../../apis/gameAPI";

const GameList = ({
  gameLists,
  providerFilter,
  gameId,
  setGameId,
  show,
  setShow,
  ruleShow,
  setRuleShow,
}) => {
  const [iframeData, setIframeData] = useState("");
  const [Casinoshow, setCasinoShow] = useState(false);

  const [singleUserValue, setSingleUserValue] = useState();
  useEffect(() => {
    GameAPI.SINGLE_USER_VALUE().then((res) => {
      console.log(res?.data?.qtech, "res?.data?.supernowa");
      setSingleUserValue(res?.data?.qtech);
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setGameId(val);
    if (singleUserValue !== 1) {
      setRuleShow(true);
    } else {
      setShow(true);
    }
  };

  const handleAgree = () => {
    setCasinoShow(true);
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
    <>
      <div className="fantsy_img">
        <div className="provider_images">
          {gameLists?.map((item) => {
            if (
              providerFilter != "ALL" &&
              !item?.category?.includes(providerFilter)
            )
              return <></>;
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleShow(item?.id)}>
                <img src={item?.images[1]?.url} alt="" />
              </div>
            );
          })}
        </div>
      </div>

      <Modal centered show={ruleShow} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals type={"qtech"} singleUserValue={singleUserValue} show={setShow} setShow={setRuleShow} />
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
    </>
  );
};

export default GameList;
