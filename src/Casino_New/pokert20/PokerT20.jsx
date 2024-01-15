import { FC } from "react";
import PlayerPlusComponent from "../teenPattiOpen/PlayerPlusComponent";

interface Props {
  odds: OddsData;
}
const PokerT20: FC<Props> = ({ odds }) => {
  const { t2BySid } = odds.data;
  return (
    <div className="t20_container">
      <div className="d-flex gap-3">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Player A</th>
              <th>Player B</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9).keys()].map((index) => {
              if (index <= 4)
                return (
                  <PlayerPlusComponent
                    showRateForSecondT2Also
                    showRateForFirstT2
                    t2={[t2BySid[index + 11 + ""], t2BySid[+index + 21 + ""]]}
                  />
                );
            })}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Back</th>
              <th>Back</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(9).keys()].map((index) => {
              if (index > 4)
                return (
                  <PlayerPlusComponent
                    showRateForFirstT2
                    showRateForSecondT2Also
                    t2={[t2BySid[index + 11 + ""], t2BySid[+index + 21 + ""]]}
                  />
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokerT20;
