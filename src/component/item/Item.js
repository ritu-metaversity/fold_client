import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link} from "react-router-dom";
import axios from "axios";
import Slot from "../Items/Slot/Slot";

function Item({ gameIdForItemPage, spName }) {
  const [gameName, setGameName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [MatchListLength, setMatchListLength] = useState();



  if (!gameIdForItemPage) {
    gameIdForItemPage = 4;
  }

  localStorage.setItem("SportId", gameIdForItemPage);


  // useEffect(() => {
  //   if (gameIdForItemPage != null) {
  //     const token = localStorage.getItem("token");

  //     axios
  //       .get(
  //         `http://43.205.50.127:9000/betfair_api/active_match/${gameIdForItemPage}`,
  //         {token : token}
  //       )
  //       .then((res) => {
  //         setIsLoading(false);
  //         setGameName(res.data.data);
  //       });
  //   }
  //   // eslint-disable-next-line
  // }, [gameIdForItemPage]);

  useEffect(() => {
      const token = localStorage.getItem("token");
      axios
        .get(
          "http://43.205.50.127:9000/betfair_api/active_match",
          {token : token}
        )
        .then((res) => {
          setGameName(res?.data?.data);
          setIsLoading(false);
          
        });

        // setIsLoading(true)
  }, []);
  
  useEffect(()=>{
    setMatchListLength(gameName && gameName?.find((item) =>item?.sportid === gameIdForItemPage)?.matchList?.length);
  })


  return (
    <div>
      {isLoading ? (
        <p className="lodder">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        <>
          <div className="tab-pane container pl-0 pr-0">
            <div
              className={`game-listing-container main-container ${MatchListLength > 3 ?"scrollItem":""}`}>
              <div>
               
               <div className="">
                  {gameName?.find((item) => 
                  item?.sportid === gameIdForItemPage)?.matchList?.length === 0 ? (
                    <p className="no-found" style={{marginBottom:"12px"}}>No real-time records found</p>
                  ) : gameName?.length > 0 ? 
                    gameName?.find((item) => 
                      item?.sportid === gameIdForItemPage)?.matchList.map((item)=>{
                        return(
                          <Link to={`/gamedetail/${item.matchId}`} >
                          <div
                            className="game-list pt-1 pb-1 container-fluid"
                            key={item.matchId}
                            >
                            <div className="row row5">
                              <div className="col-8 game-head">
                                <p className="mb-0 game-name">
                                    <span className="game-name">{item.matchName}</span>
                                </p>
                                <p className="mb-0 d-i">
                                  {moment(item.openDate).format(
                                    "MMM DD YYYY h:mm a"
                                  )}
                                  (IST)
                                </p>
                              </div>
                              <div className="col-4 text-right">
                                <div className="game-icons">
                                  <span className="game-icon">
                                    <span
                                      className={
                                        item.inPlay === false ? "" : "active-icon"
                                      }
                                      style={{ verticalAlign: "bottom" }}></span>
                                  </span>
                                  <span className={`game-icon ${item?.F ? "bm-icon" : "d-none"}`}>
                                    <i className="fa fa-tv"></i>
                                  </span>
                                  <span className="game-icon">
                                    <img
                                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/ic_fancy.png"
                                      alt="game-icon"
                                      className={item.channelId === "0" ? "d-none" : ""}
                                    />
                                  </span>
                                  <span className="game-icon">
                                    <img
                                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/ic_bm.png"
                                      className={item.bm ? "bm-icon" : "d-none"}
                                      alt="game-icon"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row row5">
                              <div className="col-12">
                                <div className="text-center game-col game-home">
                                  <b>1</b>
                                </div>
                                <div className="text-center game-col game-home">
                                  <b>X</b>
                                </div>
                                <div className="text-center game-col game-home">
                                  <b>2</b>
                                </div>
                              </div>
                            </div>
                            <div className="row row5">
                              <div className="col-12">
                                <div className="text-center game-col game-home">
                                  <div className="btn-back">
                                    {item.team1Back === 0 ? "0" : item.team1Back}
                                  </div>
                                  <div className="btn-lay">
                                    {item.team1Lay === 0 ? "0" : item.team1Lay}
                                  </div>
                                </div>
                                <div className="text-center game-col game-home">
                                  <div className="btn-back">
                                    {item.drawBack === 0 ? "0" : item.drawBack}
                                  </div>
                                  <div className="btn-lay">
                                    {item.drawLay === 0 ? "0" : item.drawLay}
                                  </div>
                                </div>
                                <div className="text-center game-col game-home">
                                  <div className="btn-back">
                                    {item.team2Back === 0 ? "0" : item.team2Back}
                                  </div>
                                  <div className="btn-lay">
                                    {item.team2Lay === 0 ? "0" : item.team2Lay}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          </Link>
                        )
                      })
                    
                   : (
                    ""
                  )}
                </div>
              </div>
            </div>
            
          </div>
          <Slot/>
        </>
      )}
    </div>
  );
}

export default Item;
