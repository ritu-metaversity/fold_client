import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./MatchBet.css";

function MatchBet() {
  const [matchBet, setMatchBet] = useState("");
  const [matchLength, setMatchLength] = useState();
  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);

  useEffect(() => {
    GameAPI.Match_Bet_List({
      matchId: id,
    }).then((Item) => {
      setMatchBet(Item);
      setMatchLength(Object.keys(Item.data)?.length)
    });
  }, [id]);

  return (
    <>
      <div data-v-4a9e4d9c="" className="tab-content">
        <div data-v-4a9e4d9c="" id="matched-bet" className="tab-pane active">
          <div
            data-v-4a9e4d9c=""
            className="table-responsive"
            style={{ backgroundColor: "#fff" }}>
            <table className={`table table-bordered ${matchLength===0?"d-none":""}`}>
              <thead>
                <tr className="matchbet-detail">
                  <th className="box-6">Nation</th>
                  <th className="box-2 text-right">Odds</th>
                  <th className="box-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {matchBet?.data &&
                  Object.keys(matchBet?.data).map((key) => (
                    <>
                      {matchBet?.data[key].map((item, id)=> (  
                          <tr key={id}>
                            <td>{item?.nation}</td>
                            <td>{item?.rate}</td>

                            <td>{item?.amount}</td>
                          </tr>
                      ))}
                    </>
                  ))}
              </tbody>
            </table>
            <div className={`${matchLength===0?"":"d-none"}`}>
                  
                    <p colspan="4" class="text-center no-real">
                      No real-time records found
                    </p>
                  
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MatchBet;
