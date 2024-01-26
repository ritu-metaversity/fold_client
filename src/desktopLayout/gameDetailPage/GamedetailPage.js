import React, { useState, useEffect } from "react";
import "./GamedetailPage.css";
import moment from "moment";
import AlertBtn from "../../component/Alert/AlertBtn";
import { socket } from "../../component/Items/GameDetail/socket";
import { createProfits } from "../../component/Items/GameDetail/eventUtil";
import { UserAPI } from "../../apis/UserAPI";
import { GameAPI } from "../../apis/gameAPI";
import { useNavigate, useParams } from "react-router-dom";
import Bet from "../Bet/Bet";
import Modal from "react-bootstrap/Modal";
import FancyModalsForDesk from "./FancyModalsForDesk";
import { useCollapse } from "react-collapsed";

function GamedetailPage({ getStackValue, SportId }) {
  var curr = new Date();
  curr.setDate(curr.getDate());
  const pTime = moment(curr).format("YYYY-MM-DD HH:mm:ss.SSS");
  const [currentFancy, setCurrentFancy] = useState("Fancy3");
  const [matchodd, setMatchodd] = useState([]);
  const [gameName, setGameName] = useState("");
  const [fancyOdds, setFancyOdds] = useState("");
  const [eTime, setETime] = useState("");
  const [matchId, setMatchId] = useState("");
  const [marketId, setMarketId] = useState();
  const [selectionId, setSelectionId] = useState();
  const [marketName, setMarketName] = useState("");
  const [spanValueRate, setSpanValueRate] = useState("");
  const [spanValueName, setSpanGameName] = useState("");
  const [previousState, setPreviousState] = useState("");
  const [cName, setCname] = useState("");
  const [PlaceDate, setPlaceDate] = useState();
  const [fancy, setFancy] = useState();
  const [status, setStatus] = useState();
  const [messege, setMessege] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [maxBet, setMaxBet] = useState();
  const [minBet, setMinBet] = useState();
  const [mFancyOdds, setMFancyOdds] = useState({});
  const [show, setShow] = useState(false);
  const [FancyID, setFancyID] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [sId, setSid] = useState(4);
  const [OddSocketConnected, setOddSocketConnected] = useState(false);
  const [matchDetail, setMatchDelatil] = useState("");
  const [fancyOddsPnl, setFancyOddsPnl] = useState([]);
  const [pValue, setPvalue] = useState();
  const [oddsPnl, setOddsPnl] = useState([]);
  const [StackVal, setStackVal] = useState([]);
  const [userbalance, setUserbalance] = useState("0.00");
  const [error, setError] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [betModals, setBetmodals] = useState(false);
  const [profits, setProfits] = useState({
    Odds: {},
    Bookmaker: [],
    Fancy: [],
  });
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const [activeIndex, setActiveIndex] = useState(0);

  const nav = useNavigate();

  useEffect(() => {
    const time = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token !== null && localStorage.getItem("Password-type") !== "old") {
        UserAPI.User_Balance()
          .then((res) => {
            setUserbalance(res?.data?.balance);
          })
          .catch((error) => {
            if (error?.response?.status === 401) {
              setError(true);
              nav("/login");
              localStorage.clear();
            }
            setError(true);
          });
      }
    }, 1000);

    return () => clearInterval(time);
  }, []);

  // Stack Value Api

  useEffect(() => {
    GameAPI.Place_Bet().then((res) => {
      setStackVal(res);
    });
  }, []);

  const { id } = useParams();
  const matId = id;

  useEffect(() => {
    const SporId = localStorage.getItem("SportId");
    if (SporId === "" || SporId === null) {
      setSid(4);
    } else {
      setSid(SporId);
    }
    // eslint-disable-next-line
  }, [sId]);

  const oddFromSocketSlower = (res) => {
    if (res) {
      setFancyOdds((fancyOdds) => {
        if (fancyOdds) {
          const oldOdds = { ...fancyOdds };
          setPreviousState(oldOdds);
        } else {
          setPreviousState(res);
        }
        return res;
      });

      setMFancyOdds(res);
      setMaxBet(res?.Bookmaker[0]);
      setMinBet(res);
      setIsLoading(false);
      setGameName(Object.keys(res));
      setMatchodd(res?.Odds);
      var matchData = res?.Odds[0];
      setETime(matchData);
      setMatchDelatil(matchData?.runners);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setOddSocketConnected(false);
    });
    socket.on("OddsUpdated", oddFromSocketSlower);
    socket.on("JoinedSuccessfully", () => {
      setOddSocketConnected(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timer = setInterval(
      () =>
        !OddSocketConnected &&
        socket.emit("JoinRoom", {
          eventId: id,
        }),
      1000
    );
    return () => {
      clearInterval(timer);
    };
  }, [OddSocketConnected, id, matchodd, fancyOdds]);

  useEffect(() => {
    OddSocketConnected && setOddSocketConnected(false);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    fetch("https://oddsapi.247idhub.com/betfair_api/my-ip")
      .then((res) => res.json())
      .then((res) => {
        setUserIP(res?.ip);
      });
  }, []);

  useEffect(() => {
    UserAPI.USER_ODDS_PNL({
      matchId: id,
    }).then((res) => {
      setOddsPnl(res?.data || []);
    });
    const time = setInterval(() => {
      UserAPI.USER_ODDS_PNL({
        matchId: id,
      }).then((res) => {
        setOddsPnl(res?.data || []);
      });
    }, 5000);

    return () => clearInterval(time);
  }, [id]);

  useEffect(() => {
    createProfits({
      fancyOdds,
      fancyPnl: fancyOddsPnl,
      betDetails: {
        isFancy: fancy,
        isBack: cName === "back" ? true : false,
        odds: spanValueRate,
        marketName: "",
        selectionId: parseInt(selectionId),
        priceValue: fancy === false ? spanValueRate : pValue,
        marketId: marketId === "" ? selectionId : marketId,
        matchId: matchId,
      },
      rechange: true,
      pnl: oddsPnl,
      setProfits,
    });
  }, [
    // spanValueRate,
    oddsPnl,
    fancyOddsPnl,
    isLoading,
    marketId,
    selectionId,
  ]);

  useEffect(() => {
    UserAPI.USER_FANCY_PNL({
      matchId: id,
    }).then((res) => {
      setFancyOddsPnl(res?.data || []);
    });
    const time = setInterval(() => {
      UserAPI.USER_FANCY_PNL({
        matchId: id,
      }).then((res) => {
        setFancyOddsPnl(res?.data || []);
      });
    }, 5000);

    return () => clearInterval(time);
  }, [id]);

  const handleGameName = (item, id) => {
    setCurrentFancy(item);
  };

  const handleSpanValueBack = (
    vll1,
    id,
    clr,
    matId,
    marketId,
    sid,
    mName,
    pDate,
    isFancy,
    priceValue
  ) => {
    setSpanValueRate(vll1);
    setSpanGameName(id);
    setCname(clr);
    setMatchId(matId);
    setMarketId(marketId);
    setSelectionId(sid);
    setMarketName(mName);
    setPlaceDate(pDate);
    setFancy(isFancy);
    setStatus(false);
    setPvalue(priceValue);
    setBetmodals(true);
  };

  const handleSpanValueLay = (
    val1,
    id,
    clr,
    matId,
    marketId,
    sid,
    mName,
    pDate,
    isFancy,
    priceValue
  ) => {
    setSpanValueRate(val1);
    setSpanGameName(id);
    setCname(clr);
    setMatchId(matId);
    setMarketId(marketId);
    setSelectionId(sid);
    setMarketName(mName);
    setPlaceDate(pDate);
    setFancy(isFancy);
    setStatus(false);
    setPvalue(priceValue);
    setBetmodals(true);
  };

  const handleFancyData = (val1, val2) => {
    setFancyID(val1);
    setMatchId(val2);
    setShow(true);
  };

  const data = (data) => {
    setStatus(data?.status);
    setMessege(data?.message);
  };

  const [updated, setUpdated] = useState(0);

  const StackValueForProfit = (val) => {
    setUpdated(val);
  };

  const popupClose = (vl) => {
    setErrorMsg(vl);
  };

  const [toggleBtn1, settoggleBtn1] = useState(true);
  const [toggleBtn, settoggleBtn] = useState(false);

  const handleSwitchInput = (e) => {
    e.preventDefault();
    if (toggleBtn1 === true) {
      settoggleBtn1(false);
    } else {
      settoggleBtn1(true);
      settoggleBtn(false);
    }
  };

  const handleSwitchInput1 = (e) => {
    e.preventDefault();
    if (toggleBtn === true) {
      settoggleBtn(false);
    } else {
      settoggleBtn(true);
      settoggleBtn1(false);
    }
  };

  const [stackySideBar, setStackySideBar] = useState("");
  const [marketIdForPnl, setMarketIdForPnl] = useState();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > 121) {
      setStackySideBar("Po-fixed");
    } else {
      setStackySideBar("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const [fanDatalength, setFanDatalength] = useState();

  useEffect(() => {
    if (fancyOdds["Fancy2"]?.length % 2 === 0) {
      setFanDatalength(fancyOdds["Fancy2"]?.length / 2);
    } else {
      setFanDatalength((fancyOdds["Fancy2"]?.length + 1) / 2);
    }
    // }
  }, [fancyOdds["Fancy2"]]);

  const [fancyDataLength, setFancyDataLength] = useState();

  useEffect(() => {
    if (fancyOdds[currentFancy]?.length % 2 === 0) {
      setFancyDataLength(fancyOdds[currentFancy]?.length / 2);
    } else {
      setFancyDataLength((fancyOdds[currentFancy]?.length + 1) / 2);
    }
    // }
  }, [fancyOdds[currentFancy]]);

  const handleAccClick = (val) => {
    setActiveIndex(val === activeIndex ? 0 : val);
  };

  const [oddsObject, setOddsObject] = useState({});
  const [winnerData, setWinnerData] = useState();

  useEffect(()=>{
    matchodd?.map((res)=>{
      setMarketIdForPnl(res?.marketId)
    })
  }, [matchodd])


  useEffect(() => {
    UserAPI.WINNER_PNL({
      marketId: marketIdForPnl,
    }).then((res) => {
      console.log(res, "Dasdasdasdasdsada")
      setWinnerData(res?.data || []);
    });
    const time = setInterval(() => {
      UserAPI.WINNER_PNL({
        marketId: marketIdForPnl,
      }).then((res) => {
        setWinnerData(res?.data || []);
      });
    }, 5000);

    return () => clearInterval(time);
  }, [marketIdForPnl]);

  
  
  useEffect(() => {
    let resultObject = {};
    winnerData?.forEach((item) => {
      resultObject[item.selctionId] = item.liability;
    });
    setOddsObject(resultObject);
  }, [winnerData]);
  

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          {status === 400 ? (
            <AlertBtn color="danger" val={messege} popupClose={popupClose} />
          ) : (
            ""
          )}
          {status === true && (
            <AlertBtn color="success" val={messege} popupClose={popupClose} />
          )}
          <div className="itemHome">
            <div className="row row5">
              <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
                {isLoading ? (
                  <p className="lodder">
                    <i className="fa fa-spinner fa-spin"></i>
                  </p>
                ) : (
                  <>
                    <div className="game-heading desk_game_heading d-flex">
                      <div className="card-header-title">
                        {matchDetail?.length && matchDetail[0]?.name} v{" "}
                        {matchDetail?.length && matchDetail[1]?.name}
                      </div>{" "}
                      <div className="score_detail">
                        <div className="event_time">{eTime?.eventTime}</div>
                        <div className="">
                          <div className="scoreCard-icon desk_score score_card_update">
                            {/* <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              data-testid="ScoreboardIcon">
                              <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
                            </svg> */}
                            <div style={{ margin: "0px 12px" }}>
                              <label
                                className={`onoffbtn ${
                                  toggleBtn1 ? "active1" : ""
                                }`}
                                onClick={handleSwitchInput}>
                                <input type="checkbox" />
                              </label>
                            </div>
                            {/* <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
                              focusable="false"
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              data-testid="ScoreboardIcon">
                              <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
                            </svg> */}
                            <div>
                              <label
                                className={`onoffbtn ${
                                  toggleBtn ? "active1" : ""
                                }`}
                                onClick={handleSwitchInput1}>
                                <input type="checkbox" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {toggleBtn ? (
                      <div id="scoreboard-box">
                        <div className="scorecard scorecard-mobile">
                          <div className="score-inner">
                            <iframe
                              // src={`http://15.207.182.173:3050/event/${matId}?theme=crazy-diamond`}
                              src={`https://score.247idhub.com/index.html/event/${matId}?theme=crazy-diamond`}
                              width="100%"
                              className="score-card desk_score_card"
                              title="scorecord"
                              allowFullScreen={true}></iframe>
                          </div>
                        </div>
                      </div>
                    ) : toggleBtn1 ? (
                      <div id="scoreboard-box">
                        <div className="scorecard scorecard-mobile">
                          <div className="score-inner ">
                            <iframe
                              // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sId}/${matId}`}
                              src={`https://score.247idhub.com/go-score/template/${sId}/${matId}`}
                              width="100%"
                              className="score-card desk_score_card"
                              title="scorecord"
                              allowFullScreen={true}></iframe>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="markets">
                      {matchodd?.length &&
                        matchodd?.map((item, index) => {
                          if(item?.Name === "Tied Match") return <></>
                          return (
                            <div className="main-market" key={index + index}>
                              <div
                                className={`market-title mt-1 ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.Name}
                                <span className="float-right">
                                  Min Bet:{" "}
                                  <span>{minBet?.Odds[index]?.minBet}</span> Max
                                  Bet:{" "}
                                  <span>{minBet?.Odds[index]?.maxBet}</span>{" "}
                                  <span className="game-rules-icon">
                                    <span>
                                      <i className="fa fa-info-circle float-right  ml-2"></i>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div
                                className={`table-header ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                <div className="float-left country-name box min-max">
                                  <b></b>
                                </div>
                                <div className="box-d-1 float-left"></div>
                                <div className="box-d-1 float-left"></div>
                                <div className="back box-d-1 float-left text-center">
                                  <b>BACK</b>
                                </div>
                                <div className="lay box-d-1 float-left text-center">
                                  <b>LAY</b>
                                </div>
                                <div className="box-d-1 float-left"></div>
                                <div className="box-d-1 float-left"></div>
                              </div>

                              <div
                                data-title="OPEN"
                                className={`table-body ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.runners?.length &&
                                  item.runners.map((event, id1) => {
                                    return (
                                      <div
                                        data-title="ACTIVE"
                                        className={"table-row"}
                                        key={id1}>
                                        <div className="float-left country-name box">
                                          <span className="team-name">
                                            <b>{event.name}</b>
                                          </span>
                                          <p>
                                            {
                                              (item?.Name)?.includes("Winner")?<span
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}
                                              className={`float-left ${
                                                oddsObject[event?.selectionId] > 0
                                                  ? "text-success"
                                                  : oddsObject[event?.selectionId] < 0
                                                  ? "text-danger"
                                                  : ""
                                              }`}>
                                              
                                                {
                                                  oddsObject[event?.selectionId]
                                                }
                                            </span>: <span
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}
                                              className={`float-left ${
                                                profits?.Odds[
                                                  Number(item?.marketId)
                                                ]?.find(
                                                  (profit) =>
                                                    profit?.sid ==
                                                    event?.selectionId
                                                )?.value > 0
                                                  ? "text-success"
                                                  : profits?.Odds[
                                                      Number(item?.marketId)
                                                    ]?.find(
                                                      (profit) =>
                                                        profit?.sid ==
                                                        event?.selectionId
                                                    )?.value < 0
                                                  ? "text-danger"
                                                  : ""
                                              }`}>
                                              {profits.Odds[
                                                Number(item?.marketId)
                                              ]
                                                ?.find(
                                                  (profit) =>
                                                    profit?.sid ==
                                                    event?.selectionId
                                                )
                                                ?.value?.toFixed(2) || 0}
                                            </span>
                                            }
                                            
                                          </p>
                                        </div>
                                        {event?.ex?.availableToBack?.length &&
                                          event?.ex?.availableToBack
                                            .map((e, id) => {
                                              return (
                                                <div
                                                  key={id}
                                                  className={`box-d-1 back2  float-left back-2 text-center ${
                                                    id === 1
                                                      ? "back-2 ds-none"
                                                      : id === 2
                                                      ? "back-1 ds-none"
                                                      : "back"
                                                  } 
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]
                                                        ?.runners[id1]?.ex
                                                        ?.availableToBack[id]
                                                        ?.price
                                                        ? "blink"
                                                        : ""
                                                    }`}>
                                                  <button
                                                    className="odbtn"
                                                    disabled={
                                                      id === 1 || id === 2
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e?.price,
                                                        event?.name,
                                                        "back",
                                                        matId,
                                                        item?.marketId,
                                                        event?.selectionId,
                                                        item?.Name,
                                                        pTime,
                                                        false
                                                      )
                                                    }>
                                                    <span className="odd d-block">
                                                      {e?.price}
                                                    </span>
                                                    <span className="d-block">
                                                      {e?.size}
                                                    </span>
                                                  </button>
                                                </div>
                                              );
                                            })
                                            .reverse()}

                                        {event?.ex?.availableToLay?.length &&
                                          event.ex.availableToLay.map(
                                            (e, id) => {
                                              return (
                                                <div
                                                  key={id}
                                                  className={`box-d-1 lay float-left text-center ${
                                                    id === 1
                                                      ? "lay-1 ds-none"
                                                      : id === 2
                                                      ? "lay-2 ds-none"
                                                      : "lay"
                                                  }
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]
                                                        ?.runners[id1]?.ex
                                                        ?.availableToLay[id]
                                                        ?.price
                                                        ? "blink"
                                                        : ""
                                                    }`}>
                                                  <button
                                                    className="odbtn"
                                                    disabled={
                                                      id === 1 || id === 2
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={() =>
                                                      handleSpanValueLay(
                                                        e?.price,
                                                        event?.name,
                                                        "lay",
                                                        matId,
                                                        item?.marketId,
                                                        event?.selectionId,
                                                        item?.Name,
                                                        pTime,
                                                        false
                                                      )
                                                    }>
                                                    <span className="odd d-block">
                                                      {e.price === 0
                                                        ? "0"
                                                        : e.price}
                                                    </span>{" "}
                                                    <span className="d-block">
                                                      {e.size === 0
                                                        ? "0"
                                                        : "0.00"}
                                                    </span>
                                                  </button>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className="table-remark text-right remark">
                                {item?.display_message}
                              </div>
                            </div>
                          );
                        })}

                      {fancyOdds?.Bookmaker?.length != 0 && (
                        <div className="row row5 bookmaker-market mt-1">
                          <div className="bm1 col-xl-12">
                            <div>
                              <div className="market-title mt-1">
                                Bookmaker market
                                <span className=" game-rules-icon">
                                  <b className="m-r-5">
                                    Min:{maxBet?.minBet} Max:{maxBet?.maxBet}{" "}
                                  </b>
                                  <span>
                                    <i className="fa fa-info-circle float-right"></i>
                                  </span>
                                </span>
                              </div>
                              <div className="table-header">
                                <div className="float-left country-name box-4 text-info"></div>
                                <div className="box-1 float-left"></div>
                                <div className="box-1 float-left"></div>
                                <div className="back box-1 float-left text-center">
                                  <b>BACK</b>
                                </div>
                                <div className="lay box-1 float-left text-center">
                                  <b>LAY</b>
                                </div>
                                <div className="box-1 float-left"></div>
                                <div className="box-1 float-left"></div>
                              </div>
                              <div className="table-body">
                                {fancyOdds?.Bookmaker?.length &&
                                  fancyOdds?.Bookmaker?.map((bookmaker, id) => {
                                    const BookmakerProfitVal =
                                      profits?.Bookmaker?.find(
                                        (profit) =>
                                          profit?.sid === bookmaker?.sid
                                      )?.value;
                                    if (bookmaker?.t == "TOSS") return <></>;
                                    return (
                                      <div
                                        key={id}
                                        data-title="SUSPENDED"
                                        className={`table-row ${
                                          bookmaker?.gstatus === "SUSPENDED"
                                            ? "suspended"
                                            : bookmaker?.gstatus ===
                                              "BALL RUNNING"
                                            ? "ballrunning"
                                            : ""
                                        } 
               
                `}>
                                        <div className="float-left country-name box-4">
                                          <span className="team-name">
                                            <b>{bookmaker?.nation}</b>
                                          </span>
                                          {}
                                          <p>
                                            <span
                                              className={`float-left ${
                                                BookmakerProfitVal > 0
                                                  ? "text-success"
                                                  : BookmakerProfitVal < 0
                                                  ? "text-danger"
                                                  : ""
                                              }`}
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}>
                                              {parseFloat(
                                                BookmakerProfitVal
                                              )?.toFixed(2) || 0}
                                            </span>
                                          </p>
                                          <p>{}</p>
                                        </div>
                                        <div className="box-d-1 back-1 float-left text-center betting-disabled"></div>
                                        <div className="box-d-1 back-2 float-left back-2 text-center betting-disabled"></div>
                                        <div className="box-d-1 back float-left back lock text-center betting-disabled">
                                          <button
                                            className="odbtn"
                                            onClick={() =>
                                              handleSpanValueBack(
                                                bookmaker?.b1,
                                                bookmaker?.nation,
                                                "back",
                                                matId,
                                                bookmaker?.mid,
                                                bookmaker?.sid,
                                                bookmaker?.nation,
                                                pTime,
                                                false,
                                                bookmaker?.t
                                              )
                                            }>
                                            <span>{bookmaker?.b1}</span>
                                            <br />
                                            <span style={{ fontSize: "12px" }}>
                                              {bookmaker?.bs1}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="box-d-1 lay float-left text-center betting-disabled">
                                          <button
                                            className="odbtn"
                                            onClick={() =>
                                              handleSpanValueLay(
                                                bookmaker?.l1,
                                                bookmaker?.nation,
                                                "lay",
                                                matId,
                                                bookmaker?.mid,
                                                bookmaker?.sid,
                                                bookmaker?.nation,
                                                pTime,
                                                false,
                                                bookmaker?.t
                                              )
                                            }>
                                            <span>{bookmaker?.l1}</span>
                                            <br />
                                            <span style={{ fontSize: "12px" }}>
                                              {bookmaker?.ls1}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="box-d-1 lay-2 float-left text-center betting-disabled"></div>
                                        <div className="box-d-1 lay-1 float-left text-center betting-disabled"></div>
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className="table-remark text-right remark">
                                {/* {fancyOdds?.Bookmaker[0]?.display_message} */}
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      )}

{matchodd?.length &&
                        matchodd?.map((item, index) => {
                          if(item?.Name !== "Tied Match") return <></>
                          return (
                            <div className="main-market" key={index + index}>
                              <div
                                className={`market-title mt-1 ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.Name}
                                <span className="float-right">
                                  Min Bet:{" "}
                                  <span>{minBet?.Odds[index]?.minBet}</span> Max
                                  Bet:{" "}
                                  <span>{minBet?.Odds[index]?.maxBet}</span>{" "}
                                  <span className="game-rules-icon">
                                    <span>
                                      <i className="fa fa-info-circle float-right  ml-2"></i>
                                    </span>
                                  </span>
                                </span>
                              </div>
                              <div
                                className={`table-header ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                <div className="float-left country-name box min-max">
                                  <b></b>
                                </div>
                                <div className="box-d-1 float-left"></div>
                                <div className="box-d-1 float-left"></div>
                                <div className="back box-d-1 float-left text-center">
                                  <b>BACK</b>
                                </div>
                                <div className="lay box-d-1 float-left text-center">
                                  <b>LAY</b>
                                </div>
                                <div className="box-d-1 float-left"></div>
                                <div className="box-d-1 float-left"></div>
                              </div>

                              <div
                                data-title="OPEN"
                                className={`table-body ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.runners?.length &&
                                  item.runners.map((event, id1) => {
                                    return (
                                      <div
                                        data-title="ACTIVE"
                                        className={"table-row"}
                                        key={id1}>
                                        <div className="float-left country-name box">
                                          <span className="team-name">
                                            <b>{event.name}</b>
                                          </span>
                                          <p>
                                            <span
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}
                                              className={`float-left ${
                                                profits?.Odds[
                                                  Number(item?.marketId)
                                                ]?.find(
                                                  (profit) =>
                                                    profit?.sid ==
                                                    event?.selectionId
                                                )?.value > 0
                                                  ? "text-success"
                                                  : profits?.Odds[
                                                      Number(item?.marketId)
                                                    ]?.find(
                                                      (profit) =>
                                                        profit?.sid ==
                                                        event?.selectionId
                                                    )?.value < 0
                                                  ? "text-danger"
                                                  : ""
                                              }`}>
                                              {profits.Odds[
                                                Number(item?.marketId)
                                              ]
                                                ?.find(
                                                  (profit) =>
                                                    profit?.sid ==
                                                    event?.selectionId
                                                )
                                                ?.value?.toFixed(2) || 0}
                                            </span>
                                          </p>
                                        </div>
                                        {event?.ex?.availableToBack?.length &&
                                          event?.ex?.availableToBack
                                            .map((e, id) => {
                                              return (
                                                <div
                                                  key={id}
                                                  className={`box-d-1 back2  float-left back-2 text-center ${
                                                    id === 1
                                                      ? "back-2 ds-none"
                                                      : id === 2
                                                      ? "back-1 ds-none"
                                                      : "back"
                                                  } 
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]
                                                        ?.runners[id1]?.ex
                                                        ?.availableToBack[id]
                                                        ?.price
                                                        ? "blink"
                                                        : ""
                                                    }`}>
                                                  <button
                                                    className="odbtn"
                                                    disabled={
                                                      id === 1 || id === 2
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e?.price,
                                                        event?.name,
                                                        "back",
                                                        matId,
                                                        item?.marketId,
                                                        event?.selectionId,
                                                        item?.Name,
                                                        pTime,
                                                        false
                                                      )
                                                    }>
                                                    <span className="odd d-block">
                                                      {e?.price}
                                                    </span>
                                                    <span className="d-block">
                                                      {e?.size}
                                                    </span>
                                                  </button>
                                                </div>
                                              );
                                            })
                                            .reverse()}

                                        {event?.ex?.availableToLay?.length &&
                                          event.ex.availableToLay.map(
                                            (e, id) => {
                                              return (
                                                <div
                                                  key={id}
                                                  className={`box-d-1 lay float-left text-center ${
                                                    id === 1
                                                      ? "lay-1 ds-none"
                                                      : id === 2
                                                      ? "lay-2 ds-none"
                                                      : "lay"
                                                  }
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]
                                                        ?.runners[id1]?.ex
                                                        ?.availableToLay[id]
                                                        ?.price
                                                        ? "blink"
                                                        : ""
                                                    }`}>
                                                  <button
                                                    className="odbtn"
                                                    disabled={
                                                      id === 1 || id === 2
                                                        ? true
                                                        : false
                                                    }
                                                    onClick={() =>
                                                      handleSpanValueLay(
                                                        e?.price,
                                                        event?.name,
                                                        "lay",
                                                        matId,
                                                        item?.marketId,
                                                        event?.selectionId,
                                                        item?.Name,
                                                        pTime,
                                                        false
                                                      )
                                                    }>
                                                    <span className="odd d-block">
                                                      {e.price === 0
                                                        ? "0"
                                                        : e.price}
                                                    </span>{" "}
                                                    <span className="d-block">
                                                      {e.size === 0
                                                        ? "0"
                                                        : "0.00"}
                                                    </span>
                                                  </button>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    );
                                  })}
                              </div>
                             
                            </div>
                          );
                        })}

                      {fancyOdds?.Bookmaker?.length > 2 && (
                        <div className="row row5 bookmaker-market mt-1">
                          <div className="bm1 col-xl-12">
                            <div>
                              <div className="market-title mt-1">
                                Toss
                                <span className=" game-rules-icon">
                                  <b className="m-r-5">
                                    Min:{maxBet?.minBet} Max:{maxBet?.maxBet}{" "}
                                  </b>
                                  <span>
                                    <i className="fa fa-info-circle float-right"></i>
                                  </span>
                                </span>
                              </div>
                              <div className="table-header">
                                <div className="float-left country-name box-4 text-info"></div>
                                <div className="box-1 float-left"></div>
                                <div className="box-1 float-left"></div>
                                <div className="back box-1 float-left text-center">
                                  <b>BACK</b>
                                </div>
                                <div className="lay box-1 float-left text-center">
                                  <b>LAY</b>
                                </div>
                                <div className="box-1 float-left"></div>
                                <div className="box-1 float-left"></div>
                              </div>
                              <div className="table-body">
                                {fancyOdds?.Bookmaker?.length &&
                                  fancyOdds?.Bookmaker?.map((bookmaker, id) => {
                                    const BookmakerProfitVal =
                                      profits?.Bookmaker?.find(
                                        (profit) =>
                                          profit?.sid === bookmaker?.sid
                                      )?.value;
                                    if (bookmaker?.t !== "TOSS") return <></>;
                                    return (
                                      <div
                                        key={id}
                                        data-title="SUSPENDED"
                                        className={`table-row ${
                                          bookmaker?.gstatus === "SUSPENDED"
                                            ? "suspended"
                                            : bookmaker?.gstatus ===
                                              "BALL RUNNING"
                                            ? "ballrunning"
                                            : ""
                                        }`}>
                                        <div className="float-left country-name box-4">
                                          <span className="team-name">
                                            <b>{bookmaker?.nation}</b>
                                          </span>
                                          {}
                                          <p>
                                            <span
                                              className={`float-left ${
                                                BookmakerProfitVal > 0
                                                  ? "text-success"
                                                  : BookmakerProfitVal < 0
                                                  ? "text-danger"
                                                  : ""
                                              }`}
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}>
                                              {parseFloat(
                                                BookmakerProfitVal
                                              )?.toFixed(2) || 0}
                                            </span>
                                          </p>
                                          <p>{}</p>
                                        </div>
                                        <div className="box-d-1 back-1 float-left text-center betting-disabled"></div>
                                        <div className="box-d-1 back-2 float-left back-2 text-center betting-disabled"></div>
                                        <div className="box-d-1 back float-left back lock text-center betting-disabled">
                                          <button
                                            className="odbtn"
                                            onClick={() =>
                                              handleSpanValueBack(
                                                bookmaker?.b1,
                                                bookmaker?.nation,
                                                "back",
                                                matId,
                                                bookmaker?.mid,
                                                bookmaker?.sid,
                                                bookmaker?.nation,
                                                pTime,
                                                false,
                                                bookmaker?.t
                                              )
                                            }>
                                            <span>{bookmaker?.b1}</span>
                                            <br />
                                            <span style={{ fontSize: "12px" }}>
                                              {bookmaker?.bs1}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="box-d-1 lay float-left text-center betting-disabled">
                                          <button
                                            className="odbtn"
                                            onClick={() =>
                                              handleSpanValueLay(
                                                bookmaker?.l1,
                                                bookmaker?.nation,
                                                "lay",
                                                matId,
                                                bookmaker?.mid,
                                                bookmaker?.sid,
                                                bookmaker?.nation,
                                                pTime,
                                                false,
                                                bookmaker?.t
                                              )
                                            }>
                                            <span>{bookmaker?.l1}</span>
                                            <br />
                                            <span style={{ fontSize: "12px" }}>
                                              {bookmaker?.ls1}
                                            </span>
                                          </button>
                                        </div>
                                        <div className="box-d-1 lay-2 float-left text-center betting-disabled"></div>
                                        <div className="box-d-1 lay-1 float-left text-center betting-disabled"></div>
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className="table-remark text-right remark">
                                {/* {fancyOdds?.Bookmaker[0]?.display_message} */}
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      )}


                    </div>

                    <div
                      className={`fancy-market row row5`}>
                      {gameName?.map((item, id2) => {
                        if (
                          [
                            "Odds",
                            "Bookmaker",
                            "Fancy",
                            "Khado",
                            "Ball",
                            "Meter",
                          ].includes(item)
                        ) {
                          return null;
                        }

                        console.log( fancyOdds[item]?.length,fancyOdds[item]
                          .slice(0,fancyOdds[item]?.length ==1?1 :fancyOdds[item]?.length / 2), "fadfaedfada")
                        return (
                          <>
                            <div
                              onClick={() => handleAccClick(id2)}
                              className={`market-title mt-1 ${
                                fancyOdds[item]?.length === 0 ? "d-none" : ""
                              }`}>
                              {item}
                              <span className="m-r-5 game-rules-icon">
                                <span>
                                  <i className="fa fa-info-circle float-right"></i>
                                </span>
                              </span>
                            </div>
                            {id2 !== activeIndex && (
                              <>
                                <div className="col-6">
                                  <div
                                    className={
                                      fancyOdds[item]?.length === 0
                                        ? "d-none"
                                        : ""
                                    }>
                                    <div className="table-header">
                                      <div className="float-left country-name box-6"></div>
                                      <div className="box-d-1 float-left lay text-center">
                                        <b>No</b>
                                      </div>
                                      <div className="back box-d-1 float-left back text-center">
                                        <b>Yes</b>
                                      </div>
                                      <div className="box-2 float-left"></div>
                                    </div>

                                    <div className="table-body">
                                      {fancyOdds[item]
                                        .slice(0, fancyOdds[item]?.length == 1? 1 :fancyOdds[item]?.length / 2)
                                        ?.map((e, id) => {
                                          return (
                                            <div
                                              key={id + id}
                                              className="fancy-tripple">
                                              <div
                                                className={`table-row ${
                                                  e?.gstatus === "SUSPENDED"
                                                    ? "suspended"
                                                    : e?.gstatus ===
                                                      "BALL RUNNING"
                                                    ? "ballrunning"
                                                    : ""
                                                }`}>
                                                <div
                                                  className="float-left country-name box-6"
                                                  style={{
                                                    borderBottom: "0px",
                                                  }}>
                                                  <div style={{display:"flex", alignItems:"center"}}>
                                                    {
                                                      e?.ball != undefined && 
                                                      <p style={{paddingRight:"8px"}}>
                                                      <span
                                                        style={{
                                                          background: "#08c",
                                                          color: "#fff",
                                                          borderRadius: "50%",
                                                          padding: "6px 4px",
                                                          margin: "auto",
                                                          fontSize: "12px",
                                                        }}>
                                                        {e?.ball || 0}
                                                      </span>
                                                    </p>
                                                    }
                                                    <p className="m-b-0">
                                                      <p
                                                        style={{
                                                          fontSize: "13px",
                                                        }}>
                                                        {e?.nation}
                                                      </p>
                                                      <span
                                                      onClick={() =>
                                                        handleFancyData(
                                                          e?.sid,
                                                          matId
                                                        )
                                                      }
                                                      className={`float-left cPointer ${
                                                        fancyOddsPnl?.find(
                                                          (pnl) =>
                                                            pnl?.marketId ===
                                                            e?.sid
                                                        )?.pnl > 0
                                                          ? "sucess"
                                                          : fancyOddsPnl?.find(
                                                              (pnl) =>
                                                                pnl?.marketId ===
                                                                e?.sid
                                                            )?.pnl < 0
                                                          ? "danger"
                                                          : ""
                                                      }`}
                                                      style={{
                                                        color: "black",
                                                        fontSize: "12px",
                                                      }}>
                                                      {fancyOddsPnl?.find(
                                                        (pnl) =>
                                                          pnl?.marketId ===
                                                          e?.sid
                                                      )?.pnl || 0}
                                                    </span>
                                                    </p>
                                                    
                                                  </div>
                                                </div>
                                                <div className="box-d-1 lay float-left text-center betting-disabled">
                                                  <button
                                                    className="odbtn"
                                                    onClick={() =>
                                                      handleSpanValueLay(
                                                        e?.l1,
                                                        e?.nation,
                                                        "lay",
                                                        matId,
                                                        e?.sid,
                                                        0,
                                                        currentFancy,
                                                        pTime,
                                                        true,
                                                        e?.ls1
                                                      )
                                                    }>
                                                    <span>{e.l1}</span>
                                                    <br />
                                                    <span
                                                      style={{
                                                        fontSize: "12px",
                                                      }}>
                                                      {e?.ls1}
                                                    </span>
                                                  </button>
                                                </div>
                                                <div className="box-d-1 back float-left text-center betting-disabled">
                                                  <button
                                                    className="odbtn"
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e?.b1,
                                                        e?.nation,
                                                        "back",
                                                        matId,
                                                        e?.sid,
                                                        0,
                                                        currentFancy,
                                                        pTime,
                                                        true,
                                                        e?.bs1
                                                      )
                                                    }>
                                                    <span>{e.b1}</span>
                                                    <br />
                                                    <span
                                                      style={{
                                                        fontSize: "12px",
                                                      }}>
                                                      {e?.bs1}
                                                    </span>
                                                  </button>
                                                </div>
                                                <div
                                                  className="box-2 float-left text-right min-max"
                                                  style={{
                                                    borderBottom: "0px",
                                                  }}>
                                                  <span className="d-block">
                                                    Min:{" "}
                                                    <span>
                                                      {
                                                        mFancyOdds[item][id]
                                                          ?.minBet
                                                      }
                                                    </span>
                                                  </span>{" "}
                                                  <span className="d-block">
                                                    Max:{" "}
                                                    <span>
                                                      {
                                                        mFancyOdds[item][id]
                                                          ?.maxBet
                                                      }
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>

                                    <div></div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div
                                    className={
                                      fancyOdds[item]?.length === 0 ||
                                      fancyOdds[item]?.length === 1
                                        ? "d-none"
                                        : ""
                                    }>
                                    <div className="table-header">
                                      <div className="float-left country-name box-6"></div>
                                      <div className="box-d-1 float-left lay text-center">
                                        <b>No</b>
                                      </div>
                                      <div className="back box-d-1 float-left back text-center">
                                        <b>Yes</b>
                                      </div>
                                      <div className="box-2 float-left"></div>
                                    </div>

                                    <div className="table-body">
                                      {fancyOdds[item]
                                        .slice(fancyOdds[item]?.length / 2)
                                        ?.map((e, id) => {
                                          return (
                                            <div
                                              key={id + id}
                                              className="fancy-tripple">
                                              <div
                                                className={`table-row ${
                                                  e?.gstatus === "SUSPENDED"
                                                    ? "suspended"
                                                    : e?.gstatus ===
                                                      "BALL RUNNING"
                                                    ? "ballrunning"
                                                    : ""
                                                }`}>
                                                <div
                                                  className="float-left country-name box-6"
                                                  style={{
                                                    borderBottom: "0px",
                                                  }}>
                                                  <div style={{display:"flex", alignItems:"center"}}>
                                                    {
                                                      e?.ball != undefined && <p style={{paddingRight:"8px"}}>
                                                      <span
                                                        style={{
                                                          background: "#08c",
                                                          color: "#fff",
                                                          borderRadius: "50%",
                                                          padding: "6px 4px",
                                                          margin: "auto",
                                                          fontSize: "12px",
                                                        }}>
                                                        {e?.ball || 0}
                                                      </span>
                                                    </p>
                                                    }
                                                    
                                                    <p className="m-b-0">
                                                      <p
                                                        style={{
                                                          fontSize: "13px",
                                                        }}>
                                                        {e?.nation}
                                                      </p>
                                                      <span
                                                      onClick={() =>
                                                        handleFancyData(
                                                          e?.sid,
                                                          matId
                                                        )
                                                      }
                                                      className={`float-left cPointer ${
                                                        fancyOddsPnl?.find(
                                                          (pnl) =>
                                                            pnl?.marketId ===
                                                            e?.sid
                                                        )?.pnl > 0
                                                          ? "sucess"
                                                          : fancyOddsPnl?.find(
                                                              (pnl) =>
                                                                pnl?.marketId ===
                                                                e?.sid
                                                            )?.pnl < 0
                                                          ? "danger"
                                                          : ""
                                                      }`}
                                                      style={{
                                                        color: "black",
                                                        fontSize: "12px",
                                                      }}>
                                                      {fancyOddsPnl?.find(
                                                        (pnl) =>
                                                          pnl?.marketId ===
                                                          e?.sid
                                                      )?.pnl || 0}
                                                    </span>
                                                    </p>
                                                    
                                                  </div>
                                                </div>
                                                <div className="box-d-1 lay float-left text-center betting-disabled">
                                                  <button
                                                    className="odbtn"
                                                    onClick={() =>
                                                      handleSpanValueLay(
                                                        e?.l1,
                                                        e?.nation,
                                                        "lay",
                                                        matId,
                                                        e?.sid,
                                                        0,
                                                        currentFancy,
                                                        pTime,
                                                        true,
                                                        e?.ls1
                                                      )
                                                    }>
                                                    <span>{e.l1}</span>
                                                    <br />
                                                    <span
                                                      style={{
                                                        fontSize: "12px",
                                                      }}>
                                                      {e?.ls1}
                                                    </span>
                                                  </button>
                                                </div>
                                                <div className="box-d-1 back float-left text-center betting-disabled">
                                                  <button
                                                    className="odbtn"
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e?.b1,
                                                        e?.nation,
                                                        "back",
                                                        matId,
                                                        e?.sid,
                                                        0,
                                                        currentFancy,
                                                        pTime,
                                                        true,
                                                        e?.bs1
                                                      )
                                                    }>
                                                    <span>{e.b1}</span>
                                                    <br />
                                                    <span
                                                      style={{
                                                        fontSize: "12px",
                                                      }}>
                                                      {e?.bs1}
                                                    </span>
                                                  </button>
                                                </div>
                                                <div
                                                  className="box-2 float-left text-right min-max"
                                                  style={{
                                                    borderBottom: "0px",
                                                  }}>
                                                  <span className="d-block">
                                                    Min:{" "}
                                                    <span>
                                                      {
                                                        mFancyOdds[item][id]
                                                          ?.minBet
                                                      }
                                                    </span>
                                                  </span>{" "}
                                                  <span className="d-block">
                                                    Max:{" "}
                                                    <span>
                                                      {
                                                        mFancyOdds[item][id]
                                                          ?.maxBet
                                                      }
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                    <div></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <Modal
                      size="xl"
                      show={show}
                      onHide={() => setShow(false)}
                      dialogClassName="modal-100w"
                      aria-labelledby="example-custom-modal-styling-title">
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          Run Amount
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <FancyModalsForDesk
                          matchId={matchId}
                          FancyID={FancyID}
                        />
                      </Modal.Body>
                    </Modal>
                  </>
                )}
              </div>

              <div
                id="sidebar-right"
                className="col-md-3 sidebar-right"
                style={{
                  position: "relative",
                  top: "0px",
                  right: "0px",
                  width: "25.5%",
                }}>
                <div className={`ps ${stackySideBar}`}>
                  <Bet
                    profits={profits}
                    StackVal={StackVal}
                    spanValueRate={spanValueRate}
                    spanValueName={spanValueName}
                    fancyOdds={fancyOdds}
                    colorName={cName}
                    getStackValue={getStackValue}
                    matchId={matchId}
                    marketId={marketId}
                    selectionId={selectionId}
                    MarketName={marketName}
                    placeTime={PlaceDate}
                    isFancy={fancy}
                    toss=""
                    priceValue={pValue}
                    userIP={userIP}
                    betModals={betModals}
                    setBetmodals={setBetmodals}
                    data={data}
                    StackValueForProfit={StackValueForProfit}
                    matId={matId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default GamedetailPage;
