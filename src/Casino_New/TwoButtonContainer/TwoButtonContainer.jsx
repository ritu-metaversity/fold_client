import { useContext, useEffect } from "react";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import ToolTip from "../tooltip/Tooltip";

const TwoButtonContainer = ({ t2, noToolTip, setBetState, className, setOpen, toolTipshow, setShowBetSection,  setUpdated }) => {
  return (
    <div className="content_container">
      {
        toolTipshow && <div className="w-100 mt-1 view-casino">
        <ToolTip title={`Min: ${t2[0]?.min} Max: ${t2[0]?.max}`} />
      </div>
      }
       
      <div className={`${className} gap-3`}>
        <SingleButton setOpen={setOpen}  setUpdated={setUpdated} setShowBetSection={setShowBetSection} setBetState={setBetState} odd={t2[0]} />
        <SingleButton setOpen={setOpen}  setUpdated={setUpdated} setShowBetSection={setShowBetSection} setBetState={setBetState} odd={t2[1]} />
      </div>
      {noToolTip && (
        <div className="w-100 text-end min-max-casino" style={{ marginTop: "6px" }}>
          <span className="fw">Min:</span> <span>{t2[0]?.min}</span>{" "}
          <span className="fw">Max:</span> <span>{t2[0]?.max}</span>
        </div>
      )}
    </div>
  );
};

export default TwoButtonContainer;

export const SingleButton = ({ odd, setBetState, setOpen, setShowBetSection, setUpdated }) => {
  const handleClick = () => {
    setOpen(true);
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation: odd?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(odd?.rate) || Number(odd?.b1),
        marketId: odd?.mid,
        selectionId: odd?.sid,
        colorName: "back",
      }));
      setShowBetSection(true);
      setUpdated(0)
  };

  return (
    <div className="w-100 text-center" style={{overflow:"hidden"}}>
      <p className="rate_heading" style={{padding:'8px 0px'}}><b>{odd?.b1 || odd?.rate}</b> </p>
      <button
        onClick={handleClick}
        className={clsx(
          "btn btn-primary w-100 aaa-font",
          odd?.gstatus !== "ACTIVE" && !(odd?.gstatus === true) && "suspended"
        )}
        style={{
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
        {odd?.nation?.replace("Dragon ", "").replace("Tiger ", "") == "Red" ? (
          <>
            <img
              src={`http://admin.kalyanexch.com/images/cards/pan.png`}
              alt=""
              className="small_icon_image_card"
            />
            <img
              src={`http://admin.kalyanexch.com/images/cards/eat.png`}
              alt=""
              className="small_icon_image_card"
            />
          </>
        ) : odd?.nation?.replace("Dragon ", "").replace("Tiger ", "") ==
          "Black" ? (
          <>
            <img
              src={`http://admin.kalyanexch.com/images/cards/hukum.png`}
              alt=""
              className="small_icon_image_card"
            />
            <img
              src={`http://admin.kalyanexch.com/images/cards/cdee.png`}
              alt=""
              className="small_icon_image_card"
            />
          </>
        ) : (
          odd?.nation?.replace("Dragon ", "").replace("Tiger ", "")
        )}
      </button>
      <p className="desk-view-casino">
      {odd?.pnl}
      </p>
    </div>
  );
};
