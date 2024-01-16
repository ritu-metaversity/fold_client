import "./T20.css";
import PlayerPlusComponent from "./PlayerPlusComponent/PlayerPlusComponent";
import useMediaQuery from "../useMediaQuery/useMediaQuery";

const T20 = ({ odds, t1, setOpen }) => {
  const mobile = useMediaQuery("(max-width: 768px)");
  const t2 = odds?.data.t2 || [];
  
  return (
    <div className="t20_container">
      <table>
        <thead>
          <tr>
            <th>
              <span className="mob-view-casino">
              Min: {t1?.min} | Max:{" "}
                  {t1?.max}
              </span>
            </th>
            <th colSpan={mobile ? 2 : 1}>BACK</th>
            <th style={{ display: mobile ? "none" : "" }}></th>
          </tr>
        </thead>
        <tbody>
          <PlayerPlusComponent setOpen={setOpen} showRateForFirstT2 t2={[t2[0], t2[1]]} />
          <PlayerPlusComponent setOpen={setOpen} showRateForFirstT2 t2={[t2[2], t2[3]]} />
        </tbody>
      </table>
    </div>
  );
};

export default T20;
