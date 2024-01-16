import React, { useEffect, useState } from "react";
// import TwoButtonContainer from "../bollywoodTable/TwoButtonContainer";
// import CardContainer from "../aaa/components/CardContainer";
import "./DT20.css";
import DT20SpecialButton from "./DT20SpecialButton";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import CardContainer from "../CardContainer/CardContainer";
import { Link } from "react-router-dom";

const dummyt2 = [
  {
    mid: "11.233008122045",
    nation: "Player A",
    sid: "1",
    rate: "1.98",
    gstatus: "0",
    pnl: 0,
  },
  {
    mid: "11.233008122045",
    nation: "Pair plus A",
    sid: "2",
    rate: "2.00",
    gstatus: "0",
    pnl: 0,
  },
];

const DT20 = ({ odds, setBetState, setShowBetSection, setOpen }) => {
  const { t2BySid } = odds?.data;

  const [draganRate, setDraganRate] = useState(0);
  const [tigerRate, setTigerRate] = useState(0);
  const [activeClass, setActiveClass] = useState(1);
  const [casinoShow, setCasinoShow] = useState(1);

  const handleCasino = (val) => {
    setCasinoShow(val);
    setActiveClass(val);
  };

  return (
    <>
      <DT20SpecialButton
        setBetState={setBetState}
        setOpen={setOpen}
        noToolTip
        t2={[t2BySid["1"], t2BySid["3"], t2BySid["2"], t2BySid["4"]]}
      />

      <div className="fancy_aaa_container dt20_container ">
        <div className="mob-view-casino">
          <div>
            <ul className="nav nav-tabs main-gameHead1 game-nav-bar">
              <li
                className={`nav-item ${activeClass === 1 ? "activeClass" : ""}`}
                onClick={() => handleCasino(1)}
                style={{ flex: "unset" }}>
                <Link className="nav-link navlink1">DRAGON</Link>
              </li>
              <li
                className={`nav-item ${activeClass === 2 ? "activeClass" : ""}`}
                style={{ flex: "unset" }}>
                <Link onClick={() => handleCasino(2)} className="nav-link ">
                  TIGER
                </Link>
              </li>
            </ul>
          </div>
          {activeClass === 1 ? (
            <div>
              <div className="content_container text-center">
                <TwoButtonContainer
            toolTipshow={false}
                  className={"d-flex"}
                  setBetState={setBetState}
                  setOpen={setOpen}
                  setShowBetSection={setShowBetSection}
                  t2={[t2BySid["5"], t2BySid["6"]]}
                  noToolTip></TwoButtonContainer>
                <TwoButtonContainer
            toolTipshow={false}
                  className={"d-flex"}
                  setBetState={setBetState}
                  setOpen={setOpen}
                  setShowBetSection={setShowBetSection}
                  t2={[t2BySid["7"], t2BySid["8"]]}
                  noToolTip></TwoButtonContainer>
              </div>
              <br />
              <CardContainer
                setBetState={setBetState}
                setShowBetSection={setShowBetSection}
                setOpen={setOpen}
                setTigerRate={setTigerRate}
                setDraganRate={setDraganRate}
                t2={[
                  t2BySid["9"],
                  t2BySid["10"],
                  t2BySid["11"],
                  t2BySid["12"],
                  t2BySid["13"],
                  t2BySid["14"],
                  t2BySid["15"],
                  t2BySid["16"],
                  t2BySid["17"],
                  t2BySid["18"],
                  t2BySid["19"],
                  t2BySid["20"],
                  t2BySid["21"],
                ]}
                noToolTip
              />
            </div>
          ) : (
            <div>
              <div className="content_container text-center">
                <TwoButtonContainer
            toolTipshow={false}
                  setOpen={setOpen}
                  className={"d-flex"}
                  setBetState={setBetState}
                  setShowBetSection={setShowBetSection}
                  t2={[t2BySid["22"], t2BySid["23"]]}
                  noToolTip></TwoButtonContainer>
                <TwoButtonContainer
            toolTipshow={false}
                  setOpen={setOpen}
                  className={"d-flex"}
                  setBetState={setBetState}
                  setShowBetSection={setShowBetSection}
                  t2={[t2BySid["24"], t2BySid["25"]]}
                  noToolTip></TwoButtonContainer>
              </div>
              <br />
              <CardContainer
                setShowBetSection={setShowBetSection}
                setTigerRate={setTigerRate}
                setOpen={setOpen}
                setBetState={setBetState}
                setDraganRate={setDraganRate}
                t2={[
                  t2BySid["26"],
                  t2BySid["27"],
                  t2BySid["28"],
                  t2BySid["29"],
                  t2BySid["30"],
                  t2BySid["31"],
                  t2BySid["32"],
                  t2BySid["33"],
                  t2BySid["34"],
                  t2BySid["35"],
                  t2BySid["36"],
                  t2BySid["37"],
                  t2BySid["38"],
                ]}
                noToolTip
              />
            </div>
          )}
        </div>

        <div className="content_container text-center desk-view-casino">
          <h4 style={{ fontWeight: 600, marginBottom:"-20px" }}>DRAGON</h4>
          <TwoButtonContainer
            toolTipshow={false}
            setOpen={setOpen}
            className={"d-flex"}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            t2={[t2BySid["5"], t2BySid["6"]]}
            noToolTip/>
          <TwoButtonContainer
            toolTipshow={false}
            setOpen={setOpen}
            className={"d-flex"}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            t2={[t2BySid["7"], t2BySid["8"]]}
            noToolTip></TwoButtonContainer>
        </div>
        <div className="content_container text-center desk-view-casino">
          <h4 style={{ fontWeight: 600, marginBottom:"-20px" }}>TIGER</h4>
          <TwoButtonContainer
            toolTipshow={false}
            setOpen={setOpen}
            className={"d-flex"}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            t2={[t2BySid["22"], t2BySid["23"]]}
            noToolTip></TwoButtonContainer>
          <TwoButtonContainer
            toolTipshow={false}
            setOpen={setOpen}
            className={"d-flex"}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            t2={[t2BySid["24"], t2BySid["25"]]}
            noToolTip></TwoButtonContainer>
        </div>
      </div>
      <div className="fancy_aaa_container dt20_container desk-view-casino">
        <div className="content_container text-center">
          <h4 style={{ fontWeight: 600 }}>DRAGON {draganRate}</h4>
          <CardContainer
            setOpen={setOpen}
            setBetState={setBetState}
            setShowBetSection={setShowBetSection}
            setTigerRate={setTigerRate}
            setDraganRate={setDraganRate}
            t2={[
              t2BySid["9"],
              t2BySid["10"],
              t2BySid["11"],
              t2BySid["12"],
              t2BySid["13"],
              t2BySid["14"],
              t2BySid["15"],
              t2BySid["16"],
              t2BySid["17"],
              t2BySid["18"],
              t2BySid["19"],
              t2BySid["20"],
              t2BySid["21"],
            ]}
            noToolTip
          />
        </div>
        <div className="content_container text-center">
          <h4 style={{ fontWeight: 600 }}>TIGER {tigerRate}</h4>
          <CardContainer
            setOpen={setOpen}
            setShowBetSection={setShowBetSection}
            setTigerRate={setTigerRate}
            setBetState={setBetState}
            setDraganRate={setDraganRate}
            t2={[
              t2BySid["26"],
              t2BySid["27"],
              t2BySid["28"],
              t2BySid["29"],
              t2BySid["30"],
              t2BySid["31"],
              t2BySid["32"],
              t2BySid["33"],
              t2BySid["34"],
              t2BySid["35"],
              t2BySid["36"],
              t2BySid["37"],
              t2BySid["38"],
            ]}
            noToolTip
          />
        </div>
      </div>
    </>
  );
};

export default DT20;
