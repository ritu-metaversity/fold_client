import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GameAPI } from "../../apis/gameAPI";

function Item({ gameIdForItemPage, sportId}) {
  let urldtaa = window.location.pathname;
  const history = useHistory();
  const [gameName, setGameName] = useState("");
  let url = urldtaa.slice(1);


  console.log(sportId?.id)

  useEffect(() => {
    if (gameIdForItemPage != null ) {
      GameAPI.Active_Match_Sport_Wise({
        sportId: gameIdForItemPage === "" || gameIdForItemPage === undefined ? "4" : gameIdForItemPage,
      }).then((res) => {
        setGameName(res);
      });
    }
  }, [gameIdForItemPage]);

  const handleData = (id) => {
    history.push(`/gamedetail/${id}`);
  };


  return (
    <div>
      {/* <div className="desk-top-view">
        <ul
          role="tablist"
          id="home-events"
          className={url === "home" || url === "" || url === "Home" ? "d-none" : "nav nav-tabs"}>
          <li className="nav-item " style={{ background: "#2c3e50" }}>
            <a href="/" data-toggle="tab" className="nav-link active">
              {url === "home" || url === "" || url === "Home" ? "" : url}
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane active">
            <div className="coupon-card coupon-card-first">
              <div className="card-content" style={{ overflow: "scroll" }}>
                <table className="table coupon-table">
                  <thead>
                    <tr>
                      <th style={{ width: "63%" }}>Game</th>
                      <th colSpan="2">1</th>
                      <th colSpan="2">X</th>
                      <th colSpan="2">2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    gameName?.length!==0 &&
                      gameName?.map((item) => {

                          return (
                            <tr key={item.matchId}>
                              <td>
                                <div
                                  className="game-name"
                                  onClick={() => handleData(item?.matchId)}>
                                  <Link className="text-dark">
                                    {item.matchName} /
                                    {moment(item.openDate).format(
                                      "MMM DD YYYY h:mm a"
                                    )}
                                  </Link>
                                </div>
                                <div className="game-icons">
                                  <span className="game-icon">
                                    <span
                                      className={
                                        item.inPlay === false ? "" : "active"
                                      }></span>
                                  </span>
                                  <span className="game-icon">
                                    <i className="fas fa-tv v-m icon-tv"></i>
                                  </span>
                                  <span className="game-icon">
                                    <img
                                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_fancy.png"
                                      alt=""
                                      className="fancy-icon"
                                    />
                                  </span>
                                  <span className="game-icon">
                                    <img
                                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_bm.png"
                                      alt=""
                                      className={
                                        item.bm ? "bookmaker-icon" : "d-none"
                                      }
                                    />
                                  </span>
                                  <span className="game-icon">
                                    <img
                                      src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_vir.png"
                                      alt=""
                                      className="ic-card"
                                    />
                                  </span>
                                </div>
                              </td>
                              <td>
                                <button className="back">
                                  <span className="odd">
                                    {item.team1Back === 0
                                      ? "0"
                                      : item.team1Back}
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button className="lay">
                                  <span className="odd">
                                    {item.team1Lay === 0 ? "0" : item.team1Lay}
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button className="back">
                                  <span className="odd">
                                    {item.drawBack === 0 ? "0" : item.drawBack}
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button className="lay">
                                  <span className="odd">
                                    {item.drawLay === 0 ? "0" : item.drawLay}
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button className="back">
                                  <span className="odd">
                                    {item.team2Back === 0
                                      ? "0"
                                      : item.team2Back}
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button className="lay">
                                  <span className="odd">
                                    {item.team2Lay === 0 ? "0" : item.team2Lay}
                                  </span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* mobile view */}
      {/* -------------------------- */}
      {/* -------------------------- */}
      {/* -------------------------- */}

      <div className="mob-view-item">
        <div data-v-0a31b3b9="" className="tab-pane container pl-0 pr-0">
          <div
            data-v-0a31b3b9=""
            className="game-listing-container"
            style={{
              maxHeight: "calc((100vh - 184px))",
              overflowX: "auto",
            }}>
            <div data-v-0a31b3b9="">
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
                          <div className="col-8">
                            <p className="mb-0 game-name">
                              <Link to="/gamedetail">
                                <strong>{item.matchName}</strong>
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
                              <span className="game-icon">
                                <i className="fas fa-tv"></i>
                              </span>
                              <span className="game-icon">
                                <img
                                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/ic_fancy.png"
                                  alt="game-icon"
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
                              <Link to="/" className="btn-back">
                                {item.team1Back === 0 ? "0" : item.team1Back}
                              </Link>
                              <Link to="/" className="btn-lay">
                                {item.team1Lay === 0 ? "0" : item.team1Lay}
                              </Link>
                            </div>
                            <div className="text-center game-col game-home">
                              <Link to="/" className="btn-back">
                                {item.drawBack === 0 ? "0" : item.drawBack}
                              </Link>
                              <Link to="/" className="btn-lay">
                                {item.drawLay === 0 ? "0" : item.drawLay}
                              </Link>
                            </div>
                            <div className="text-center game-col game-home">
                              <Link to="/" className="btn-back">
                                {item.team2Back === 0 ? "0" : item.team2Back}
                              </Link>
                              <Link href="/" className="btn-lay">
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
    </div>
  );
}

export default Item;
