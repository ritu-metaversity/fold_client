import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import { MdOutlineClose } from "react-icons/md";
import { avitorList, fantsyGameList } from "./FantsyGameList";
import LiveCasinoModals from "../LiveCasino/casinoTabs/LiveCasinoModals";
import { CasinoApi } from "../../apis/CasinoApi";
import CasinoModals from "../../component/Items/Slot/CasinoModals/CasinoModals";
import { GameAPI } from "../../apis/gameAPI";
import { useNavigate } from "react-router-dom";

const fanSlot = [
  {
    match_id: "70001",
  },
  {
    match_id: "70003",
  },
  {
    match_id: "70004",
  },
  {
    match_id: "70005",
  },
  {
    match_id: "70006",
  },
  {
    match_id: "70008",
  },
  {
    match_id: "70009",
  },
  {
    match_id: "70010",
  },
  {
    match_id: "70011",
  },
  {
    match_id: "70013",
  },
  {
    match_id: "677222",
  },
];

const FantsyList = ({ providerFilter, showHome }) => {
  const [show, setShow] = useState(false);
  const [gameId, setGameId] = useState("");
  const [iframeData, setIframeData] = useState("");
  const [casinoShow, setCasinoShow] = useState(false);

  const [singleUserValue, setSingleUserValue] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) {
      GameAPI.SINGLE_USER_VALUE().then((res) => {
        setSingleUserValue(res?.data?.fantasyGames);
      });
    }
  }, [token]);

  const handleAgree = () => {
    setShow(true);
    setCasinoShow(false);
  };

  const nav = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (val) => {
    const token = localStorage.getItem("token");

    const link = isBrowser ? "/login" : "/m/login";

    if (!token) {
      nav(link);
    } else {
      setGameId(val);
      if (setCasinoShow !== 1) {
        setCasinoShow(true);
      } else {
        setShow(true);
      }
    }
  };

  // useEffect(() => {
  //   const gameToken = localStorage.getItem("gameToken");
  //   if (token !== null) {
  //     CasinoApi.Casino_GameLink({
  //       playerId: "121212",
  //       currency: "INR",
  //       country: "IN",
  //       gender: "M",
  //       gameName: gameId,
  //       birthDate: "1986-01-01",
  //       lang: "en_IN",
  //       mode: "real",
  //       device: isBrowser ? "desktop" : "mobile",
  //       // returnUrl: window.location.host,
  //       returnUrl: window.location.origin,
  //       token: gameToken,
  //       walletSessionId: token,
  //     }).then((res) => {
  //       setIframeData(res?.data?.data?.url);
  //     });
  //   }
  // }, [gameId, token]);

  return (
    <>
      {/* {showHome ? ( */}
      <div
        className="casino-main"
        style={{
          margin: "14px 7px",
          padding: "12px 0px",
        }}>
        {/* <h4
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "uppercase",
              paddingLeft: "12px",
            }}>
            Fantasy Game
          </h4> */}
        <div className="provider_images">
          {fanSlot?.map((item) => {
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleShow(item?.match_id)}>
                <img
                  src={`https://s3buket.blr1.cdn.digitaloceanspaces.com/avitor/${item?.match_id}.avif`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* ) : (
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
      )} */}

      <Modal centered show={casinoShow} onHide={handleClose}>
        <Modal.Body className="casino_modals_body">
          <CasinoModals
            type={"aura"}
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
          {/* <LiveCasinoModals iframeData={iframeData} /> */}
          <iframe
            src={`https://aura.fawk.app/${token}/9677/${gameId}`}
            className="desktop_if"
            width="100%"
            title="mobile"
            height="100vh"
            allowFullScreen={true}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FantsyList;
