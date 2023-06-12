import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GameAPI } from '../../apis/gameAPI';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import NewLunch from '../Newlunch/NewLunch';

const DefauilItemPage = () => {
    const [gameName, setGameName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [MatchListLength, setMatchListLength] = useState();
  const [activeSportList, setactiveSportList] = useState({});
  const [gameIdForItemPage, setgameIdForItemPage] = useState(4);
  const [active, setActive] = useState(4);

  useEffect(() => {
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setactiveSportList(res);
    });
    setIsLoading(true);

    const token = localStorage.getItem("token");

    axios
      .get("http://43.205.50.127:9000/betfair_api/active_match", {
        token: token,
      })
      .then((res) => {
        setGameName(res?.data?.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setMatchListLength(
      gameName &&
        gameName?.find((item) => item?.sportid === gameIdForItemPage)?.matchList?.length
    );
  }, [gameName?.find((item) => item?.sportid === gameIdForItemPage)?.matchList]);

  const handleSportId = (id) => {
    setgameIdForItemPage(id);
    setActive(id);
  };

  const nav = useNavigate();

  const handleData = (id) => {
    nav(`/gamedetail/${id}`);
  };
  return (
    <>
     <div className="main">
      <div className="container-fluid container-fluid-5">
        <div className="row itemHome">
          <div className="header-btm">
            <nav className="navbar navbar-expand-md btco-hover-menu">
              <div className="collapse navbar-collapse">
                <ul className="list-unstyled .header-bottom navbarNav">
                  {activeSportList?.length &&
                    activeSportList?.map((res) => {
                      return (
                        <li
                          className={`nav-item ${
                            active === res?.sportId ? "activeList" : ""
                          } `}
                          onClick={() => handleSportId(res?.sportId)}>
                          <Link className="nav-link  nav-b">
                            {res?.sportName}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </nav>
          </div>
          <div>
            <>
              <div className="tab-content">
                <div className="tab-pane">
                  <div className="coupon-card coupon-card-first">
                    <div
                      className={`card-content ${
                        MatchListLength > 5 ? "scrollItem1" : ""
                      }`}>
                      <table className="table item-table coupon-table">
                        <thead>
                          <tr>
                            <th style={{ width: "63%" }}>Game</th>
                            <th colSpan="2">1</th>
                            <th colSpan="2">X</th>
                            <th colSpan="2">2</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <p className="lodder homePage-lodder">
                            <i className="fa fa-spinner fa-spin"></i>
                          </p>
                        ) : (
                          <tbody>
                            {gameName?.find(
                              (item) => item?.sportid === gameIdForItemPage
                            )?.matchList?.length > 0
                              ? gameName?.length > 0
                                ? gameName
                                    ?.find(
                                      (item) =>
                                        item?.sportid === gameIdForItemPage
                                    )
                                    ?.matchList?.map((item) => {
                                      return (
                                        <tr key={item.matchId}>
                                          <td>
                                            <div
                                              className="game-name gName"
                                              onClick={() =>
                                                handleData(item?.matchId)
                                              }>
                                              <Link className="text-dark">
                                                {item.matchName} /{" "}
                                                {moment(item.openDate).format(
                                                  "MMM DD YYYY h:mm a"
                                                )}
                                              </Link>
                                            </div>
                                            <div className="game-icons gIcon">
                                              <span className="game-icon">
                                                <span
                                                  className={
                                                    item.inPlay === false
                                                      ? ""
                                                      : "active"
                                                  }>
                                                  {" "}
                                                </span>
                                              </span>
                                              <span className="game-icon">
                                                <i className="fa fa-tv v-m icon-tv"></i>
                                              </span>
                                              <span className="game-icon">
                                                <img
                                                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_fancy.png"
                                                  alt=""
                                                  className={`fancy-icon ${
                                                    item?.F ? "" : "d-none"
                                                  }`}
                                                />
                                              </span>
                                              <span className="game-icon">
                                                <img
                                                  src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_bm.png"
                                                  alt=""
                                                  className={
                                                    item.bm
                                                      ? "bookmaker-icon "
                                                      : "d-none"
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
                                                  ? "-"
                                                  : item.team1Back}
                                              </span>
                                            </button>
                                          </td>
                                          <td>
                                            <button className="lay">
                                              <span className="odd">
                                                {item.team1Lay === 0
                                                  ? "-"
                                                  : item.team1Lay}
                                              </span>
                                            </button>
                                          </td>
                                          <td>
                                            <button className="back">
                                              <span className="odd">
                                                {item.drawBack === 0
                                                  ? "-"
                                                  : item.drawBack}
                                              </span>
                                            </button>
                                          </td>
                                          <td>
                                            <button className="lay">
                                              <span className="odd">
                                                {item.drawLay === 0
                                                  ? "-"
                                                  : item.drawLay}
                                              </span>
                                            </button>
                                          </td>
                                          <td>
                                            <button className="back">
                                              <span className="odd">
                                                {item.team2Back === 0
                                                  ? "-"
                                                  : item.team2Back}
                                              </span>
                                            </button>
                                          </td>
                                          <td>
                                            <button className="lay">
                                              <span className="odd">
                                                {item.team2Lay === 0
                                                  ? "-"
                                                  : item.team2Lay}
                                              </span>
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                : ""
                              : ""}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
            <NewLunch />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DefauilItemPage