import React, { useEffect, useState } from "react";
// import TwoButtonContainer from "../bollywoodTable/TwoButtonContainer";
// import CardContainer from "../aaa/components/CardContainer";
import "./DT20.css";
import DT20SpecialButton from "./DT20SpecialButton";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import CardContainer from "../CardContainer/CardContainer";

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


const DT20 = ({ odds, setBetState }) => {



  const { t2BySid } = odds?.data;

  const [draganRate, setDraganRate] = useState(0);
  const [tigerRate, setTigerRate] = useState(0)


  return (
    <>
      <DT20SpecialButton
      setBetState={setBetState}
        noToolTip
        t2={[t2BySid["1"], t2BySid["3"], t2BySid["2"], t2BySid["4"]]}
      />
      <div className="fancy_aaa_container dt20_container ">
        <div className="content_container text-center">
          <h4 style={{fontWeight:600}}>DRAGON</h4>
          <TwoButtonContainer
          setBetState={setBetState}
            t2={[t2BySid["5"], t2BySid["6"]]}
            noToolTip
          ></TwoButtonContainer>
          <TwoButtonContainer
           setBetState={setBetState}
            t2={[t2BySid["7"], t2BySid["8"]]}
            noToolTip
          ></TwoButtonContainer>
        </div>
        <div className="content_container text-center">
          <h4 style={{fontWeight:600}}>TIGER</h4>
          <TwoButtonContainer
           setBetState={setBetState}
            t2={[t2BySid["22"], t2BySid["23"]]}
            noToolTip
          ></TwoButtonContainer>
          <TwoButtonContainer
           setBetState={setBetState}
            t2={[t2BySid["24"], t2BySid["25"]]}
            noToolTip
          ></TwoButtonContainer>
        </div>
      </div>
      <div className="fancy_aaa_container dt20_container">
        <div className="content_container text-center">
          <h4 style={{fontWeight:600}}>DRAGON {draganRate}</h4>

          <CardContainer
          setBetState={setBetState}
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
          <h4 style={{fontWeight:600}}>TIGER {tigerRate}</h4>
          <CardContainer
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
