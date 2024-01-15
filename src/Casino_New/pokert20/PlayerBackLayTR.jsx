import { useContext } from "react";
import moment from "moment";
import clsx from "clsx";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";

const PlayerBackLayTR = ({
  t2,
  showRateForSecondT2Also,
  title,
  showRateForFirstT2,
  setShowBetSection,
  setBetState,
  setOpen
}) => {
  const { setBetDetails } = useContext(globalContext);
 
  const handleClick = (t2, l1b1, colorName) => {
    setBetState &&
      setBetState((prev) => ({
        ...prev,
        nation:t2?.nation,
        casinoName: 2,
        isBack: true,
        odds: Number(l1b1) ,
        marketId: t2.mid,
        placeTime: new Date().toString(),
        selectionId: t2.sid,
        colorName:colorName
      }));
      setOpen(true)
  };


  return (
    <tr
      className={clsx(
        t2.gstatus != "ACTIVE" &&
          "suspended" &&
          !(t2.gstatus === true) &&
          "suspended"
      )}
    >
      <td>
        <p>{title || t2?.nationEle || t2?.nation}</p>
        <span>{t2?.pnl}</span>
      </td>
      <td onClick={() => handleClick(t2, t2.b1, "back")}>
        <p>{showRateForFirstT2 ? t2?.b1 : t2?.nation}</p>
        <span>{t2?.bs1}</span>
      </td>
      <td className="lay" onClick={() => handleClick(t2, t2.l1, "lay" )}>
        <p>{showRateForSecondT2Also ? t2?.l1 : t2?.nation}</p>
        <span>{t2?.ls1}</span>
      </td>
    </tr>
  );
};

export default PlayerBackLayTR;
