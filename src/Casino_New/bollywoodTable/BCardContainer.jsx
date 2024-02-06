import {  useContext } from "react";
// import "./card.css";
import clsx from "clsx";
import moment from "moment";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import ToolTip from "../tooltip/Tooltip";



const BCardContainer = ({ t2, noToolTip, setOpen, setBetState,  setUpdated, setShowBetSection }) => {
  const handleClick = (odd) => {
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
      setUpdated(0);
      setShowBetSection(true)
  };
  if (t2.length)
    return (
      <div className="content_container">
        {!noToolTip && (
          <div className="w-100">
            <p className="desk-view-casino">

            <ToolTip title={`Min:${t2[0].min} Max:${t2[0].max}`} />
            </p>
            <p className="mob-view-casino text-right" style={{
              fontSize:"12px",
              margin:"4px"
            }}>
            {`Min:${t2[0].min} Max:${t2[0].max}`}
            </p>
          </div>
        )}
        <div className="w-100 text-center rate_heading" style={{fontWeight:"bold", margin:"5px"}}>{t2[0].rate}</div>
        <div className="card_card_card">
          {t2.map((item) => (
            <div className="text-center">
              <div
                onClick={() => handleClick(item)}
                className={clsx(
                  item.gstatus != "ACTIVE" &&
                    "suspended" &&
                    !(item.gstatus === true) &&
                    "suspended"
                )}
              >
                <img
                  src={
                    "/img/" +
                    item.nation
                      .replace("Dragon ", "")
                      .replace("Tiger ", "")
                      .toUpperCase() +
                    ".png"
                  }
                alt=""
                />
              </div>
              <div className={`desk-view-casino ${item?.pnl >= 0? "text-success":"text-danger"}`}>
              {item.pnl}
              </div>
            </div>
          ))}
        </div>
        {noToolTip && (
          <div className="w-100 text-end min-max-casino">
            {`Min:${t2[0].min} Max:${t2[0].max}`}
          </div>
        )}
      </div>
    );
  else return <></>;
};

export default BCardContainer;
