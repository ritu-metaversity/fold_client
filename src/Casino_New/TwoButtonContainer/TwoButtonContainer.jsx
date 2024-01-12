import { useContext, useEffect } from "react";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";

const TwoButtonContainer = ({ t2, noToolTip, setBetState }) => {
  return (
    <div className="content_container">
      <div className="d-flex gap-3">
        <SingleButton setBetState={setBetState} odd={t2[0]} />
        <SingleButton setBetState={setBetState} odd={t2[1]} />
      </div>
      {noToolTip && (
        <div className="w-100 text-end" style={{marginTop:"6px"}}>
          <span className="fw">Min:</span> <span>{t2[0].min}</span>{" "}
          <span className="fw">Max:</span> <span>{t2[0].max}</span>
        </div>
      )}
    </div>
  );
};

export default TwoButtonContainer;

export const SingleButton = ({ odd, setBetState }) => {

  console.log(odd, "oddoddoddoddodd");

  useEffect(() => {
    
  }, [setBetState]);

  const handleClick = () => {
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation:odd?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(odd.rate) || Number(odd.b1),
        marketId: odd.mid,
        placeTime: new Date().toString(),
        selectionId: odd.sid,
      }));
  };

  return (
    <div className="w-100 text-center">
      {odd.b1 || odd.rate}
      <button
        onClick={handleClick}
        className={clsx(
          "btn btn-primary w-100",
          odd.gstatus !== "ACTIVE" && !(odd.gstatus === true) && "suspended"
        )}
        style={{
          textTransform: "uppercase",
          fontWeight: 600,
          marginTop:"6px"
        }}>
        {odd.nation.replace("Dragon ", "").replace("Tiger ", "")}
      </button>
      {odd.pnl}
    </div>
  );
};
