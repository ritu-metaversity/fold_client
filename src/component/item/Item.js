import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import Slot from "../Items/Slot/Slot";
import LiveCasino from "../../desktopLayout/LiveCasino/LiveCasino";
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
import SuperNowaHome from "../../CasinoHome/SuperNowaHome";
import { get } from "mongoose";

function Item({ gameIdForItemPage, casinoAllow }) {
  const [gameName, setGameName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [MatchListLength, setMatchListLength] = useState();

  if (!gameIdForItemPage) {
    gameIdForItemPage = 4;
  }

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://oddsapi.247idhub.com/betfair_api/active_match", {
        token: token,
      })
      .then((res) => {
        setGameName(res?.data?.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    var matchData =
      gameName &&
      gameName?.find((item) => item?.sportid === gameIdForItemPage)?.matchList
        ?.length;
    setMatchListLength(matchData);
  }, [
    gameName &&
      gameName?.find((item) => item?.sportid === gameIdForItemPage)?.matchList
        ?.length,
  ]);

  return (
    <div className="min_height">
      {isLoading ? (
        <p className="lodder">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        <>
          <div className="tab-pane container pl-0 pr-0 max_heirht">
            <div
              className={`game-listing-container main-container ${
                MatchListLength && MatchListLength > 3 ? "scrollItem" : ""
              }`}>
              <div>
                <div className="pt-2">
                  {gameName?.find((item) => item?.sportid === gameIdForItemPage)
                    ?.matchList?.length === 0 ||
                  gameName?.find((item) => item?.sportid === gameIdForItemPage)
                    ?.matchList?.length === undefined ? (
                    <p className="no-found" style={{ marginBottom: "12px" }}>
                      No Real Data Found
                    </p>
                  ) : gameName?.length > 0 ? (
                    gameName
                      ?.find((item) => item?.sportid === gameIdForItemPage)
                      ?.matchList.map((item) => {
                        return (
                          <Link
                            key={item.matchId}
                            to={`/m/gamedetail/${item.matchId}`}>
                            <div className="game-list pt-1 pb-1 container-fluid">
                              <div className="row row5">
                                <div className="col-8 game-head">
                                  <p className="mb-0 game-name">
                                    <span className="game-name">
                                      {item.matchName}
                                    </span>
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
                                          item.inPlay === false
                                            ? ""
                                            : "active-icon"
                                        }
                                        style={{
                                          verticalAlign: "bottom",
                                        }}></span>
                                    </span>
                                    <span
                                      className={`game-icon ${
                                        item?.F ? "" : "d-none"
                                      }`}>
                                      <i className="fa fa-tv"></i>
                                    </span>
                                    <span className="game-icon">
                                      <img
                                        src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/front/img/icons/ic_fancy.png"
                                        alt="game-icon"
                                        className={
                                          item?.F === false ? "d-none" : ""
                                        }
                                      />
                                    </span>
                                    <span className="game-icon">
                                      <img
                                        src="https://dzm0kbaskt4pv.cloudfront.net/v11/static/mobile/img/ic_bm.png"
                                        className={
                                          item?.bm ? "bm-icon" : "d-none"
                                        }
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
                                      {item.team1Back === 0
                                        ? "0"
                                        : item.team1Back}
                                    </div>
                                    <div className="btn-lay">
                                      {item.team1Lay === 0
                                        ? "0"
                                        : item.team1Lay}
                                    </div>
                                  </div>
                                  <div className="text-center game-col game-home">
                                    <div className="btn-back">
                                      {item.drawBack === 0
                                        ? "0"
                                        : item.drawBack}
                                    </div>
                                    <div className="btn-lay">
                                      {item.drawLay === 0 ? "0" : item.drawLay}
                                    </div>
                                  </div>
                                  <div className="text-center game-col game-home">
                                    <div className="btn-back">
                                      {item.team2Back === 0
                                        ? "0"
                                        : item.team2Back}
                                    </div>
                                    <div className="btn-lay">
                                      {item.team2Lay === 0
                                        ? "0"
                                        : item.team2Lay}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {casinoAllow?.Aura && <Slot />}

          <div className="casino-main">
            {casinoAllow?.Nowa && <SuperNowaHome path={"/m/sueprnowa"} />}
            {casinoAllow?.Qtech && (
              <>
                <LiveCasinoHome />
                <FantasyGamesHome path={"/m/fantsy"} />
                <SlotHome path={"/m/slots"} />
                <LotteryHome path={"/m/lottery"} />
              </>
            )}
          </div>

          {localStorage.getItem("token") === null && (
            <>
              <Slot />
              <div className="casino-main">
                <SuperNowaHome path={"/m/sueprnowa"} />

                <LiveCasinoHome />
                <FantasyGamesHome path={"/m/fantsy"} />
                <SlotHome path={"/m/slots"} />
                <LotteryHome path={"/m/lottery"} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Item;
