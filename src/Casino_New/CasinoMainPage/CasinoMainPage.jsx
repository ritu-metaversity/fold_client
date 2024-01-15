import React, { createContext, useEffect, useRef, useState } from "react";
import CasinoModal from "../CasinoBetSlip/Modal/CasinoModal";
import "../Common.css";
import { Toaster } from "react-hot-toast";
import { GameAPI } from "../../apis/gameAPI";
import { nameById, titleById } from "../Constant/Constant";
import DT20 from "../DT20/DT20";
import CasinoBetSlip from "../CasinoBetSlip/CasinoBetSlip/CasinoBetSlip";
import { UseOdds } from "../useOdds/UseOdds.jsx";
import Video from "../Video/Video.jsx";
import T20 from "../T20/T20.jsx";
import { useParams } from "react-router-dom";
import LastResult from "../LastResult/LastResult.jsx";
import DT1Day from "../DT1Day/DT1Day.jsx";
import BTable from "../bollywoodTable/Btable.jsx";
import Aaa from "../aaa/Aaa.jsx";
import AndarBaharKarna from "../andarBahar/AndarBaharKarna.jsx";
import Luck7B from "../Luck7B/Luck7B.jsx";
import CasinoHead from "../CasinoHead/CasinoHead.jsx";
import MatchBet from "../../component/Items/MatchBet/MatchBet.js";

const defaultStake = {
  stack1: 0,
  stack2: 0,
  stack3: 0,
  stack4: 0,
  stack5: 0,
  stack6: 0,
  stack7: 0,
  stack8: 0,
  stack9: 0,
  stack10: 0,
};

export const globalContext = createContext({
  matchId: "",
  stakes: defaultStake,
  betDetails: null,
  setBetDetails: null,
  setBetPlace: null,
});

const CasinoMainPage = () => {
  const divRef = useRef(null);
  const [stakes, setStakes] = useState(defaultStake);
  const [openRulesModal, setOpenRulesModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [ActiveNavbar, setActiveNavBar] = useState(1);
  const { odds, setBetPlace } = UseOdds(nameById[id]);
  const t1 = odds?.data?.t1?.[0];
  const token = localStorage.getItem("token");
  const [betState, setBetState] = useState({
    nation: "",
    casinoName: 0,
    isBack: true,
    odds: null,
    marketId: "",
    placeTime: null,
    selectionId: null,
    colorName: "back",
  });
  const [showBetSection, setShowBetSection] = useState(true);

  useEffect(() => {
    GameAPI.Get_Stack_Value().then((res) => {
      setStakes(res);
    });
  }, []);

  useEffect(() => {
    if (!divRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      window.parent?.postMessage(
        {
          type: "height",
          message: divRef.current?.clientHeight,
        },
        "*"
      );
    });
    resizeObserver.observe(divRef.current);
    return () => resizeObserver.disconnect();
  }, [divRef]);

  console.log(open, "openopenopen")

  return (
    <>
      <CasinoModal
        size="sm"
        title="Rules"
        handleClose={() => setOpenRulesModal(false)}
        open={openRulesModal}>
        <img
          width="100%"
          className="rules_image"
          src={`/img/${id}-rules.jpg`}
          alt=""
        />
      </CasinoModal>

      <div className="mob-view-casino">
        <CasinoHead t1={t1} ActiveNavbar={ActiveNavbar} setOpenRulesModal={setOpenRulesModal} setActiveNavBar={setActiveNavBar}/>
      </div>

      <div ref={divRef} className={`${window.innerWidth < 800?"":"row"} row5`}>
        <div className={`col-md-9 featured-box-detail sports-wrapper m-b-10`}>
          {
            ActiveNavbar == 1 ?  <div className="app_container">
            <div>
              <div
                className="w-100  text-white p-2 d-flex"
                style={{ background: "#0088cc" }}>
                {titleById[id]}
                <span
                  className="ms-1 rule_font desk-view-casino"
                  onClick={() => setOpenRulesModal(true)}>
                  <u>Rules</u>
                </span>
                <div className="ms-auto desk-view-casino">
                  Round ID: {t1?.mid?.split(".")[1]} | Min: {t1?.min} | Max:{" "}
                  {t1?.max}
                </div>
              </div>
              {odds?.data?.t1 && (
                <Video t3={odds.data.t3} t1={odds?.data?.t1?.[0]} />
              )}
              {id == "51" && odds && (
                <T20 setOpen={setOpen}  setBetState={setBetState} setShowBetSection={setShowBetSection} t1={t1} odds={odds} />
              )}
              {id === "60" && odds && <AndarBaharKarna setOpen={setOpen} setShowBetSection={setShowBetSection}
                setBetState={setBetState} odds={odds} />}
            </div>

            {id == "52" && odds && (
              <DT20
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                odds={odds}
                setOpen={setOpen}
              />
            )}
            {id === "54" && odds && (
              <Aaa
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                odds={odds}
                setOpen={setOpen}
              />
            )}
            {id === "55" && odds && (
              <BTable
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                odds={odds}
                setOpen={setOpen}
              />
            )}
            {id === "61" && odds && (
              <DT1Day
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                odds={odds}
                setOpen={setOpen}
              />
            )}
            {id === "53" && odds && (
              <Luck7B
                setShowBetSection={setShowBetSection}
                setBetState={setBetState}
                odds={odds}
                setOpen={setOpen}
              />
            )}

            <div>
              <LastResult matchId={t1?.mid[1]} />
            </div>
          </div>:<MatchBet/>
          }
          
        </div>
        <div
          id="sidebar-right"
          className="col-md-3 sidebar-right desk-view-casino"
          style={{ position: "relative", top: 0, right: 0, width: "25.5%" }}>
          <CasinoBetSlip
            setShowBetSection={setShowBetSection}
            showBetSection={showBetSection}
            betState={betState}
            stakes={stakes}
            open={open}
            setOpen={setOpen}
          />
        </div>
        <div className="mob-view-casino">
        <CasinoBetSlip
            setShowBetSection={setShowBetSection}
            showBetSection={showBetSection}
            betState={betState}
            stakes={stakes}
            open={open}
            setOpen={setOpen}
          />
        </div>
        
      </div>

      <Toaster />
    </>
  );
};

export default CasinoMainPage;
