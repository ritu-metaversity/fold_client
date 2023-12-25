import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import { MdOutlineClose } from "react-icons/md";
import { fantsyGameList } from "./FantsyGameList";
import LiveCasinoModals from "../LiveCasino/casinoTabs/LiveCasinoModals";
import { CasinoApi } from "../../apis/CasinoApi";
import CasinoModals from "../../component/Items/Slot/CasinoModals/CasinoModals";
import { GameAPI } from "../../apis/gameAPI";

const FantsyList = ({ providerFilter }) => {
  const [show, setShow] = useState(false);
  const [gameId, setGameId] = useState("");
  const [iframeData, setIframeData] = useState("");
  const [casinoShow, setCasinoShow] = useState(false);

  const [singleUserValue, setSingleUserValue] = useState();
  useEffect(() => {
    GameAPI.SINGLE_USER_VALUE().then((res) => {
      console.log(res?.data?.fantasyGames, "res?.data?.supernowa");
      setSingleUserValue(res?.data?.fantasyGames);
    });
  }, []);

  const handleAgree = () => {
    setShow(true);
    setCasinoShow(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    setGameId(val);
    if (setCasinoShow !== 1) {
      setCasinoShow(true);
    } else {
      setShow(true);
    }
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
          {fantsyGameList?.map((item) => {
            if (providerFilter !== item?.providerId) return <></>;
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleShow(item?.id)}>
                <img src={item?.image} alt="" />
              </div>
            );
          })}
        </div>
      </div>

      <Modal centered show={casinoShow} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals
            type={"fantasyGames"}
            singleUserValue={singleUserValue}
            show={setShow}
            setShow={setCasinoShow}
          />
          <div className="agree_btn">
            <button onClick={handleAgree}>Ok I Agree</button>
            <button onClick={() => setCasinoShow(false)}>
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

export default FantsyList;
