import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CasinoModal from "../CasinoBetSlip/Modal/CasinoModal";
import '../Common.css'
import { Toaster } from "react-hot-toast";
import { GameAPI } from "../../apis/gameAPI";
import { nameById, titleById } from "../Constant/Constant";
import DT20 from "../DT20/DT20";
import CasinoBetSlip from "../CasinoBetSlip/CasinoBetSlip/CasinoBetSlip";
import { UseOdds } from "../useOdds/UseOdds.jsx";
import Video from "../Video/Video.jsx";
// import Bet from "../../desktopLayout/Bet/Bet.js";
import T20 from "../T20/T20.jsx";
import { useParams } from "react-router-dom";
import LastResult from "../LastResult/LastResult.jsx";

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
  const [stakes, setButtonValue] = useState(defaultStake);
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const { odds, setBetPlace } = UseOdds(nameById[id]);
  const t1 = odds?.data?.t1?.[0];
  const token = localStorage.getItem("token");
  const [betState, setBetState] = useState({
    nation:"",
        casinoName: 0,
        isBack: true,
        odds: null,
        marketId: "",
        placeTime: null,
        selectionId: null,
  });
  
  useEffect(() => {
    GameAPI.Get_Stack_Value().then((res) => {
      console.log(res, "ASDfasfewrwerfew");
      setButtonValue(res);
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

  const openRulesModal = () => setOpen(true);



  return (
    <>
      <CasinoModal title="Rules" handleClose={() => setOpen(false)} open={open}>
        <img
          className="rules_image"
          src={`/assets/img/${id}-rules.jpg`}
          alt=""
        />
      </CasinoModal>

      <div ref={divRef} className="row row5">
        <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
        <div className="app_container">
          <div>
            <div className="w-100  text-white p-2 d-flex" style={{background:"#0088cc"}}>
              {titleById[id]}
              <span className="ms-1" onClick={openRulesModal}>
                Rules
              </span>
              <div className="ms-auto">
                Round ID: {t1?.mid?.split(".")[1]} | Min: {t1?.min} | Max:{" "}
                {t1?.max}
              </div>
            </div>
            {odds?.data?.t1 && (
              <Video t3={odds.data.t3} t1={odds?.data?.t1?.[0]} />
            )}
            
            {id == "51" && odds && <T20  odds={odds} />}
            {/* {id === "56" && odds && <TeenPattiOpen odds={odds} />}
            {id === "59" && odds && <PokerT20 odds={odds} />}
            {id === "60" && odds && <AndarBaharKarna odds={odds} />} */}
          </div>

          {id == "52" && odds && <DT20  setBetState={setBetState} odds={odds} />}
          {/* {id === "53" && odds && <Luck7B odds={odds} />}
          {id === "54" && odds && <Aaa odds={odds} />}
          {id === "55" && odds && <BTable odds={odds} />}
          {id === "57" && odds && <TeenPatti1Day odds={odds} />}
          {id === "58" && odds && <Poker1D odds={odds} />}
          {id === "61" && odds && <DT1Day odds={odds} />} */}
          <div>
            <LastResult  matchId={t1?.mid[1]}/>
          </div>
        </div>
        </div>
        <div
          id="sidebar-right"
          className="col-md-3 sidebar-right"
          style={{
            position: "relative",
            top: 0,
            right: 0,
            width: "25.5%",
          }}>
           
            <CasinoBetSlip betState={betState} stakes={stakes}/>
          </div>
      </div>

      <Toaster />
    </>
  );
};

export default CasinoMainPage;
