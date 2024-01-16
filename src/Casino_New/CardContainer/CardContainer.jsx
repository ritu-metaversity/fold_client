import { useContext, useEffect } from "react";
// import ToolTip from "../../../common/tooltip/ToolTip";
import "./CardContainer.css";
import clsx from "clsx";
import ToolTip from "../tooltip/Tooltip";




const CardContainer = ({ t2, noToolTip, setBetState,  setDraganRate, setTigerRate, setShowBetSection}) => {


  const handleClick = (odd) => {
    // console.log(odd, "oddoddoddoddwde")
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation:odd?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(odd?.rate) || Number(odd?.b1),
        marketId: odd?.mid,
        placeTime: new Date().toString(),
        selectionId: odd?.sid,
        colorName:"back"
      }));
      setShowBetSection(true);
  };

  useEffect(()=>{
    setDraganRate(t2[0]?.rate)
    setTigerRate(t2[0]?.rate)
  }, [t2])

  if (t2.length)
    return (
      <div className="content_container">
        {!noToolTip && (
          <div className="w-100">
            <ToolTip title={`Min:${t2[0]?.min} Max:${t2[0]?.max}`} />
          </div>
        )}
        <div className="w-100 text-center rate_heading card_rate_heading">{t2[0]?.rate}</div>
        <div className="card_card_card">
          {t2.map((item) => (
            <div className="text-center">
              <div
                onClick={() => handleClick(item)}
                className={clsx(
                  item?.gstatus != "ACTIVE" &&
                    "suspended" &&
                    !(item?.gstatus === true) &&
                    "suspended"
                )}
              >
                <img
                alt=""
                  src={
                    "/img/" +
                    item?.nation
                      .replace("Dragon ", "")
                      .replace("Tiger ", "")
                      .toUpperCase() +
                    ".png"
                  }
                />
              </div>
              <div className="desk-view-casino">
              {item?.pnl}
              </div>
            </div>
          ))}
        </div>
        {noToolTip && (
          <div className="w-100 text-end min-max-casino" style={{marginTop:"6px"}}>
            <span className="fw">Min:</span> <span>{t2[0]?.min}</span>{" "}
            <span className="fw">Max:</span> <span>{t2[0]?.max}</span>
          </div>
        )}
      </div>
    );
  else return <></>;
};

export default CardContainer;
