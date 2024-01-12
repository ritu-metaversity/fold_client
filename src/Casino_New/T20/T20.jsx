import {  useContext } from "react";
import "./T20.css";
import moment from "moment";
import { globalContext } from "../CasinoMainPage/CasinoMainPage";
import PlayerPlusComponent from "./PlayerPlusComponent/PlayerPlusComponent";
import useMediaQuery from "../useMediaQuery/useMediaQuery";

const T20 = ({ odds }) => {
  const mobile = useMediaQuery("(max-width: 768px)");
  const t2 = odds?.data.t2 || [];
  const { setBetDetails } = useContext(globalContext);

  const handleClick = (t2) => {
    setBetDetails &&
      Number(t2.rate) &&
      setBetDetails({
        casinoName: 2,
        isBack: true,
        marketId: t2.mid,
        odds: t2.rate,
        placeTime: moment().format("DD-MM-YYYY HH:mm:sss"),
        selectionId: t2.sid,
        nation: t2.nation,
      });
  };
  
  return (
    <div className="t20_container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th colSpan={mobile ? 2 : 1}>Back</th>
            <th style={{ display: mobile ? "none" : "" }}></th>
          </tr>
        </thead>
        <tbody>
          <PlayerPlusComponent showRateForFirstT2 t2={[t2[0], t2[1]]} />
          <PlayerPlusComponent showRateForFirstT2 t2={[t2[2], t2[3]]} />
        </tbody>
      </table>
    </div>
  );
};

export default T20;
