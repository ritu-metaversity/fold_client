import React, { useEffect, useState } from "react";
import { GameAPI } from "../../../apis/gameAPI";
import "./MatchBet.css";
import { useParams } from "react-router-dom";

function MatchBet(props) {
  const [matchBet, setMatchBet] = useState([]);
  // const [matchLength, setMatchLength] = useState();
  // const Gameid = window.location.pathname;
  // const id = Gameid.slice(12);



  const {id} = useParams("id")


  useEffect(()=>{
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
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const time = setInterval(()=>{
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
    }, 3000)
    return ()=> clearInterval(time)
    // eslint-disable-next-line
  }, [id]);

  // const { Item } = useWebSocket(
  //   `ws://13.233.248.48:8082/chat/${id}/${localStorage.getItem("token")}`,
  //   { shouldReconnect: (event) => true }
  // );

  // useEffect(()=>{
  //     if (lastMessage?.data && JSON.parse(lastMessage?.data)?.data){
  //       setMatchBet(JSON.parse(lastMessage?.data))
  //       const bets  = JSON.parse(lastMessage?.data)?.data
  //       const vals = Object.values(bets);
  //       let noOfBets = 0;
  //       for (let val of vals ){
  //         noOfBets+=(val.length)
  //       }
  //       props.setMatchLength(noOfBets)
  //     }
  //   // eslint-disable-next-line
  // }, [lastMessage])

  return (
    <>
      <div data-v-4a9e4d9c="" className="tab-content max_height">
        <div data-v-4a9e4d9c="" id="matched-bet" className="tab-pane">
          <div
            data-v-4a9e4d9c=""
            className="table-responsive1"
            style={{ backgroundColor: "#fff" }}>
            <table
              className={`table table-bordered 
              ${props.matchLength === 0 ? "d-none" : ""}
              `}>
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
                      {matchBet?.data[key].map((item, id) => {
                        return (
                          <tr key={id} className={`${item?.back === true ? "back" :"lay"}`}>
                            <td>{item?.nation}</td>
                            <td className="text-right">{item?.rate}</td>

                            <td className="text-right">{item?.amount}</td>
                          </tr>
                        );
                      })}
                    </>
                  ))}
              </tbody>
            </table>
            <div className={`${props.matchLength === 0 ? "" : "d-none"}`}>
              <p colSpan="4" className="text-center no-real">
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
