import React, { useEffect, useState } from "react";
// import "./MatchBet.css";
import { GameAPI } from "../../apis/gameAPI";

function MyBet(props) {
  const [matchBet, setMatchBet] = useState([]);
  // const [matchLength, setMatchLength] = useState();
  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);

  useEffect(() => {
    GameAPI.Match_Bet_List({
      matchId: id,
    }).then((Item) => {
      if (Item?.data) {
        setMatchBet(Item);
        const bets = Item?.data;
        const vals = Object.values(bets);
        let noOfBets = 0;
        for (let val of vals) {
          noOfBets += val.length;
        }
        // props.setMatchLength(noOfBets);
      }
    });
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      GameAPI.Match_Bet_List({
        matchId: id,
      }).then((Item) => {
        if (Item?.data) {
          setMatchBet(Item);
          const bets = Item?.data;
          const vals = Object.values(bets);
          let noOfBets = 0;
          for (let val of vals) {
            noOfBets += val.length;
          }
          props.setMatchLength(noOfBets);
        }
      });
    }, 5000);
    return () => clearInterval(time);
  }, [id]);

  return (
    <>
      <>
        {matchBet?.data &&
          Object.keys(matchBet?.data).map((key) => (
            <>
              {matchBet?.data[key].map((item, id) => {
                return (
                  <tr
                    key={id}
                    className={`myBet ${item?.back === true ? "back" : "lay"}`}>
                    <td>{item?.nation}</td>
                    <td className="text-right">
                      {item?.rate} {" "}
                      {["fancy", "oddeven", "ballbyball"]?.find((i) =>item?.marketName?.toLowerCase().includes(i)) ? `(${item.priveValue})`: ""}
                      </td>

                    <td className="text-right">{item?.amount}</td>
                  </tr>
                );
              })}
            </>
          ))}
      </>
    </>
  );
}
export default MyBet;
