import { useContext, useEffect } from "react";
// import ToolTip from "../../../common/tooltip/ToolTip";
import "./CardContainer.css";
import clsx from "clsx";
import moment from "moment";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";



const CardContainer = ({ t2, noToolTip, setBetState,  setDraganRate, setTigerRate}) => {


  const handleClick = (odd) => {
    // console.log(odd, "oddoddoddoddwde")
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

  useEffect(()=>{
    setDraganRate(t2[0].rate)
    setTigerRate(t2[0].rate)
  }, [t2])

  if (t2.length)
    return (
      <div className="content_container">
        {/* {!noToolTip && (
          <div className="w-100">
            <ToolTip title={`Min:${t2[0].min} Max:${t2[0].max}`} />
          </div>
        )} */}
        {/* <div className="w-100 text-center">{t2[0].rate}</div> */}
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
                alt=""
                  src={
                    "/img/" +
                    item.nation
                      .replace("Dragon ", "")
                      .replace("Tiger ", "")
                      .toUpperCase() +
                    ".png"
                  }
                />
              </div>
              {item.pnl}
            </div>
          ))}
        </div>
        {noToolTip && (
          <div className="w-100 text-end" style={{marginTop:"6px"}}>
            <span className="fw">Min:</span> <span>{t2[0].min}</span>{" "}
            <span className="fw">Max:</span> <span>{t2[0].max}</span>
          </div>
        )}
      </div>
    );
  else return <></>;
};

export default CardContainer;
