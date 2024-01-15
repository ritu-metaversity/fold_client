import {  useContext, useMemo } from "react";
import "./aaa.css";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import ToolTip from "../tooltip/Tooltip";
import TwoButtonContainer from "../TwoButtonContainer/TwoButtonContainer";
import BCardContainer from "../bollywoodTable/BCardContainer";
import AaaMob from "./AaaMob";


const abc = ["A", "B", "C", "D", "E"];
const Aaa = ({ odds, setShowBetSection,setBetState, setOpen }) => {
  const t2 = odds?.data?.t2 || [];

  const t2BySid = useMemo(() => {
    return t2.reduce((accu, curr) => {
      accu[curr?.sid] = curr;
      return accu;
    });
  }, [odds]);

  const { setBetDetails } = useContext(globalContext);
  const handleClick = (odd, isBack) => {
    setBetDetails &&
      Number(odd.rate) &&
      setBetDetails({
        casinoName: 2,
        isBack,
        odds: Number(odd?.rate),
        marketId: odd?.mid,
        placeTime: new Date().toString(),
        selectionId: odd?.sid,
        nation: odd?.nation,
      });
  };
  return (
    <>
      <div className="content_container aaa-container desk-view-casino">
        <div className="w-100 ">
          <ToolTip title={`Min: ${t2[0]?.min} Max: ${t2[0]?.max}`} />
        </div>
        <div className="row ">
          {t2?.map((item, index) =>
            item?.gtype === "aaa" ? (
              <div className="col-4 text-center aaa-font">
                <div>
                  <span className="d-block ">
                    <b>
                      <span className="text-danger text-capitalize">
                        {abc[index]}.
                      </span>
                      {item?.nation}
                    </b>
                  </span>
                </div>
                <div
                  className={clsx({
                    "aaa-button": true,
                    clearfix: true,
                    suspended: item?.gstatus !== "ACTIVE",
                  })}
                >
                  <button
                    onClick={() =>
                      handleClick({ ...item, rate: item?.b1 || "" }, true)
                    }
                    className="back"
                  >
                    <span className="odd">{item?.b1}</span>
                  </button>{" "}
                  <button
                    onClick={() =>
                      handleClick({ ...item, rate: item?.l1 || "" }, false)
                    }
                    className="lay"
                  >
                    <span className="odd">{item?.l1}</span>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
       
      </div>
      <div className="row mob-view-casino">
          <AaaMob t2={t2} abc={abc}/>
        </div>
      <div className="fancy_aaa_container">
        <TwoButtonContainer setOpen={setOpen} className={"d-block"} setShowBetSection={setShowBetSection}  setBetState={setBetState} t2={[t2BySid["4"], t2BySid["5"]]} />
        <TwoButtonContainer setOpen={setOpen} className={"d-block"} setShowBetSection={setShowBetSection}  setBetState={setBetState} t2={[t2BySid["6"], t2BySid["7"]]} />
        <TwoButtonContainer setOpen={setOpen} className={"d-block"} setShowBetSection={setShowBetSection}  setBetState={setBetState} t2={[t2BySid["21"], t2BySid["22"]]} />
      </div>
      <br />
      <BCardContainer
      setOpen={setOpen}
      setBetState={setBetState} setShowBetSection={setShowBetSection}
        t2={t2?.filter((item) => item?.nation?.toLowerCase().includes("card"))}
      />
    </>
  );
};

export default Aaa;
