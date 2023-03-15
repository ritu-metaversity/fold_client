import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./MatchBet.css";

function MatchBet() {
  const [matchBet, setMatchBet] = useState("");
  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);

  useEffect(() => {
    GameAPI.Match_Bet_List({
      matchId: id,
    }).then((Item) => {
      console.log(Item);
      setMatchBet(Item);
    });
  }, [id]);

  //  Object.keys(MatchBet?.data && MatchBet?.data.map((res)=>{
  //   console.log(res)
  //  }))

  return (
    <>
      <div data-v-4a9e4d9c="" className="tab-content">
        <div data-v-4a9e4d9c="" id="matched-bet" className="tab-pane active">
          <div
            data-v-4a9e4d9c=""
            className="table-responsive"
            style={{ backgroundColor: "#fff" }}>
            <table className="table table-bordered">
              <thead>
                <tr className="matchbet-detail">
                  <th className="box-6">Nation</th>
                  <th className="box-2 text-right">Odds</th>
                  <th className="box-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {matchBet?.data &&
                  Object.keys(matchBet?.data).map((key) => {
                    {
                      matchBet?.data[key].map((item) => {
                        <tr className="matchbet-detail">
                          <td className="text-center">{item?.nation}</td>
                          <td className="text-center">{item?.priveValue}</td>
                          <td className="text-center">{item?.amount}</td>
                        </tr>
                      });
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default MatchBet;
