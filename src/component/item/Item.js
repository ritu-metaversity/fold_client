import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthorAPI } from "../../apis/AuthorAPI";

function Item({ gameIdForItemPage, sportId }) {
  const [gameName, setGameName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  if (gameIdForItemPage === "" || gameIdForItemPage === undefined) {
    gameIdForItemPage = 4;
  }

  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token === null) {
  //     history.push("/login");
  //     window.location.reload();
  //   }
  //   eslint-disable-next-line
  // }, [token]);

  useEffect(() => {
    if (gameIdForItemPage != null) {
      axios
        .get(
          `http://43.205.50.127:9000/betfair_api/active_match/${gameIdForItemPage}`,
          token
        )
        .then((res) => {
          setIsLoading(false);
          setGameName(res.data.data);
        });
    }
    // eslint-disable-next-line
  }, [gameIdForItemPage]);
const nav  = useNavigate()
  const handleData = (id) => {
    nav(`/gamedetail/${id}`);
  };

  return (
    <div>
      {isLoading ? (
        <p className="lodder">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        <div className="">
          <div className="tab-pane container pl-0 pr-0">
            <div
              className="game-listing-container"
              style={{
                maxHeight: "calc((100vh - 184px))",
                overflowX: "auto",
              }}>
              <div>
                <div className="">
                  {gameName.length === 0 ? (
                    <p className="no-found">No real-time records found</p>
                  ) : gameName?.length > 0 ? (
                    gameName?.map((item, id) => {
                      return (
                        <div
                          className="game-list pt-1 pb-1 container-fluid"
                          key={id}
                          onClick={() => handleData(item?.matchId)}>
                          <div className="row row5">
                            <div className="col-8 game-head">
                              <p className="mb-0 game-name">
                                <Link to="/gamedetail">
                                  <span className="game-name">{item.matchName}</span>
                                </Link>
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
                                <Link className="btn-back">
                                  {item.team1Back === 0 ? "0" : item.team1Back}
                                </Link>
                                <Link className="btn-lay">
                                  {item.team1Lay === 0 ? "0" : item.team1Lay}
                                </Link>
                              </div>
                              <div className="text-center game-col game-home">
                                <Link className="btn-back">
                                  {item.drawBack === 0 ? "0" : item.drawBack}
                                </Link>
                                <Link className="btn-lay">
                                  {item.drawLay === 0 ? "0" : item.drawLay}
                                </Link>
                              </div>
                              <div className="text-center game-col game-home">
                                <Link className="btn-back">
                                  {item.team2Back === 0 ? "0" : item.team2Back}
                                </Link>
                                <Link className="btn-lay">
                                  {item.team2Lay === 0 ? "0" : item.team2Lay}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
