import React, { useState, useEffect } from "react";
import "./GameDetail.css";
import Modal from "react-bootstrap/Modal";
import Placebet from "../../MobPlacebet/Placebet";
import moment from "moment";
import AlertBtn from "../../Alert/AlertBtn";
import Accordion from "react-bootstrap/Accordion";
import { socket } from "./socket";
import FancyModals from "./FancyModals/FancyModals";
import { createProfits } from "./eventUtil";
import { UserAPI } from "../../../apis/UserAPI";
import { GameAPI } from "../../../apis/gameAPI";
// import SideBar from "../../sidebar/SideBar";

function GameDetail({ getStackValue}) {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const pTime = moment(curr).format("YYYY-MM-DD HH:mm:ss.SSS");
  const [showModals, setShowModals] = useState(false);
  const [currentFancy, setCurrentFancy] = useState("Fancy2");
  const [matchodd, setMatchodd] = useState({});
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
  const [mFancyOdds, setMFancyOdds] = useState();
  // eslint-disable-next-line
  const [errorMsg, setErrorMsg] = useState(false);
  const [sId, setSid] = useState();
  const [OddSocketConnected, setOddSocketConnected] = useState(false);
  const [matchDetail, setMatchDelatil] = useState("");
  const [FancyID, setFancyID] = useState();
  const [fancyOddsPnl, setFancyOddsPnl] = useState([]);
  const [pValue, setPvalue] = useState();
  const [showFancyModals, setShowFancyModals] = useState(false);
  const [oddsPnl, setOddsPnl] = useState([]);
  const [StackVal, setStackVal] = useState([]);
  const [userbalance, setUserbalance] = useState("0.00");
  const [error, setError] = useState(false);
  const [userIP, setUserIP] = useState("");

  const [profits, setProfits] = useState({
    Odds: {},
    Bookmaker: [],
    Fancy: [],
  });

  useEffect(() => {
    const time = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token !== null || localStorage.getItem("Password-type" !== "old")) {
        UserAPI.User_Balance()
          .then((res) => {
            setUserbalance(res?.data?.balance);
          })
          .catch((error) => {
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

  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);
  const mid = Gameid.slice(12);

  // useEffect(() => {
  //   if(SportId===""){
  //     setSid(4)
  //   }else{
  //     setSid(SportId)
  //   }
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get(`http://43.205.50.127:9000/betfair_api/fancy/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       setMFancyOdds(res.data);
  //       setMaxBet(res.data.Bookmaker[0]);
  //       setMinBet(res.data);
  //     });
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const SporId = localStorage.getItem("SportId");
    if (SporId === "") {
      setSid(4);
    } else {
      setSid(SporId);
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("SportId")]);


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

  // const nav = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token === null) {
  //     nav("/login");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // const { lastMessage: lastOddsPnl } = useWebSocket(
  //   `ws://13.233.248.48:8082/enduserodd/${id}/${token}`,
  //   { shouldReconnect: (event) => true }
  // );
  // useEffect(() => {
  //   if (lastOddsPnl?.data && JSON.parse(lastOddsPnl?.data))
  //     if (
  //       lastOddsPnl?.data &&
  //       JSON.parse(lastOddsPnl && lastOddsPnl?.data)?.data !== null
  //     ) {
  //       setOddsPnl(JSON.parse(lastOddsPnl?.data)?.data);
  //     } else {
  //       setOddsPnl([]);
  //     }
  // }, [lastOddsPnl]);

  useEffect(() => {
    fetch("http://15.207.182.173:3333/")
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
  // useEffect(() => {
  //   createProfits({
  //     fancyOdds,
  //     fancyPnl: fancyOddsPnl,
  //     betDetails: {
  //       isFancy: fancy,
  //       isBack: cName === "back" ? true : false,
  //       odds: spanValueRate,
  //       marketName: "",
  //       selectionId: parseInt(selectionId),
  //       priceValue: fancy === false ? spanValueRate : pValue,
  //       marketId: marketId === "" ? selectionId : marketId,
  //       matchId: matchId,
  //     },
  //     pnl: oddsPnl,
  //     setProfits,
  //   });
  // }, [
  //   selectionId,
  //   marketId
  // ]);

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

  // const { lastMessage: FoddsPnl } = useWebSocket(
  //   `ws://13.233.248.48:8082/enduserfancy/${id}/${token}`,
  //   { shouldReconnect: (event) => true }
  // );
  // useEffect(() => {
  //   if (FoddsPnl?.data && JSON.parse(FoddsPnl?.data)?.data) {
  //     setFancyOddsPnl(JSON.parse(FoddsPnl?.data)?.data);
  //   } else {
  //     setFancyOddsPnl([]);
  //   }
  // }, [FoddsPnl]);

  // useEffect(() => {
  //   const time = setInterval(() => {
  //     axios.get(`http://89.39.105.69:9001/fancy/${id}`).then((res) => {
  //       if (fancyOdds) {
  //         const oldOdds = { ...fancyOdds };
  //         setPreviousState(oldOdds);
  //       } else {
  //         setPreviousState(res.data);
  //       }
  //       setIsLoading(false);
  //       setFancyOdds(res.data);
  //       setGameName(Object.keys(res.data));
  //       setMatchodd(res.data.Odds);
  //       var matchData = res.data.Odds[0];
  //       setETime(matchData);
  //       setMatchDelatil(matchData.runners);
  //     });
  //   }, 1000);
  //   return () => clearInterval(time);
  // }, [id, matchodd,  fancyOdds]);

  const handleGameName = (item, id) => {
    setCurrentFancy(item);
    // setFancyActive(id);
  };
  const handleSpanValueBack = (
    vll1,
    id,
    clr,
    mid,
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
    setMatchId(mid);
    setMarketId(marketId);
    setSelectionId(sid);
    setMarketName(mName);
    setPlaceDate(pDate);
    setFancy(isFancy);
    setStatus(false);
    setPvalue(priceValue);
  };

  const handleCloseModal = () => setShowModals(false);
  const handleShow = (e, id) => {
    e.preventDefault();
    setShowModals(true);
    if (id === 1 || id === 2) {
      setShowModals(false);
    }
  };
  const handleSpanValueLay = (
    val1,
    id,
    clr,
    mid,
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
    setMatchId(mid);
    setMarketId(marketId);
    setSelectionId(sid);
    setMarketName(mName);
    setPlaceDate(pDate);
    setFancy(isFancy);
    setStatus(false);
    setPvalue(priceValue);
  };
  const data = (vl) => {
    setStatus(vl?.status);
    setMessege(vl?.message);
  };

  const popupClose = (vl) => {
    setErrorMsg(vl);
  };

  const handleCloseFancyModal = () => setShowFancyModals(false);
  const handleFancyBook = (e, mid, fanId) => {
    e.preventDefault();
    setShowFancyModals(true);
    setMatchId(mid);
    setFancyID(fanId);
  };

  const [toggleBtn1, settoggleBtn1] = useState(true);
  const [toggleBtn, settoggleBtn] = useState(false);
  const [TvHideShow, setTvHideShow] = useState(false);

  const handleSwitchInput = (e) => {
    e.preventDefault();
    if (toggleBtn1 === true) {
      settoggleBtn1(false);
    } else {
      settoggleBtn1(true);
      setTvHideShow(false)
    }
  };

  const handleSwitchInput1 = (e) => {
    e.preventDefault();
    if (toggleBtn === true) {
      settoggleBtn(false);
    } else {
      settoggleBtn(true);   
      setTvHideShow(false)

    }
  };

  const handleTvHideShow = () => {
    if (TvHideShow === false) {
      setTvHideShow(true);
      settoggleBtn(false);
      settoggleBtn1(false)
    } else {
      setTvHideShow(false);
    }
  };

  return (
    <>
      <div className="main-div">
        {isLoading ? (
          <p className="lodder">
            <i className="fa fa-spinner fa-spin"></i>
          </p>
        ) : (
          <div className="wrapper">
            {status === true ? (
              <AlertBtn color="success" val={messege} popupClose={popupClose} />
            ) : (
              ""
            )}
            {status === 400 ? (
              <AlertBtn color="danger" val={messege} popupClose={popupClose} />
            ) : (
              ""
            )}
            <div className="scoreCard-icon">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ScoreboardIcon">
                <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
              </svg>
              <div>
                <label
                  className={`onoffbtn ${toggleBtn1 ? "active" : ""}`}
                  onClick={handleSwitchInput}>
                  <input type="checkbox" />
                </label>
              </div>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium icon-medium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ScoreboardIcon">
                <path d="M17.5 13.5H16v-3h1.5v3zM20 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9.5 11.5c0 .55-.45 1-1 1h-2v1h3V15H5v-2.5c0-.55.45-1 1-1h2v-1H5V9h3.5c.55 0 1 .45 1 1v1.5zm3.25 6.5h-1.5v-1.5h1.5V18zm0-3.5h-1.5V13h1.5v1.5zm0-3.5h-1.5V9.5h1.5V11zm0-3.5h-1.5V6h1.5v1.5zM19 14c0 .55-.45 1-1 1h-2.5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1H18c.55 0 1 .45 1 1v4z"></path>
              </svg>
              <div>
                <label
                  className={`onoffbtn ${toggleBtn ? "active" : ""}`}
                  onClick={handleSwitchInput1}>
                  <input type="checkbox" />
                </label>
                
              </div>
              <div className="" onClick={handleTvHideShow}>
                  <p className="mb-0 tvIcon">
                    <i className="fa fa-tv"></i>
                  </p>
                </div>
            </div>

            <div className="tab-content main-containor">
              <div id="odds" className="tab-pane ">
                <div className="match-title">
                  <span className="match-name">
                    {matchDetail?.length && matchDetail[0]?.name} v{" "}
                    {matchDetail?.length && matchDetail[1]?.name}
                  </span>{" "}
                  <span className="float-right">{eTime?.eventTime}</span>
                </div>
                {matchDetail?.length === 0 || matchDetail?.length === "" ? (
                  <p className="no-found">No real-time records found</p>
                ) : (
                  <>
                    {TvHideShow ? (
                      <div id="scoreboard-box">
                        <div className="scorecard scorecard-mobile">
                          <div className="score-inner">
                            <iframe
                              src={`https://stream.openhomepageforapi.live/YGapp/play.html?name=ttfour&amp;autoplay=true`}
                              width="100%"
                              className="score-card"
                              title="scorecord"
                              allowFullScreen={true}></iframe>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {toggleBtn ? (
                      <div id="scoreboard-box">
                        <div className="scorecard scorecard-mobile">
                          <div className="score-inner">
                            <iframe
                              src={`http://15.207.182.173:3050/event/${id}?theme=crazy-diamond `}
                              width="100%"
                              className="score-card"
                              title="scorecord"
                              allowFullScreen={true}></iframe>
                          </div>
                        </div>
                      </div>
                    ) : toggleBtn1 ? (
                      <div id="scoreboard-box">
                        <div className="scorecard scorecard-mobile">
                          <div className="score-inner">
                            <iframe
                              src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sId}/${id}`}
                              width="100%"
                              className="score-card"
                              title="scorecord"
                              allowFullScreen={true}></iframe>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      {matchodd?.map((item, id1) => {
                        return (
                          <div key={item}>
                            <div
                              className={`market-title mt-1
                            ${item?.runners.length === 0 ? "d-none" : ""}
                            `}>
                              {item?.Name}
                              <p className="float-right mb-0">
                                <i className="fa fa-info-circle"></i>
                              </p>
                            </div>
                            <div
                              className={`main-market ${
                                item?.runners.length === 0 ? "d-none" : ""
                              }`}>
                              <div className="table-header">
                                <div className="float-left country-name box-6 min-max">
                                  <b>
                                    Min:
                                    <span>{minBet?.Odds[id1]?.minBet}</span>
                                  </b>
                                  <b style={{ marginLeft: "6px" }}>
                                    Max:
                                    <span>{minBet?.Odds[id1]?.maxBet}</span>
                                  </b>
                                  <b style={{ marginLeft: "6px" }}>
                                    BetDelay:{" "}
                                    <span>{minBet?.Odds[id1]?.betDelay}</span>
                                  </b>
                                </div>
                                <div className="back box-1 box-7 float-left text-center">
                                  <b>BACK</b>
                                </div>
                                <div className="lay box-1 box-7 float-left text-center">
                                  <b>LAY</b>
                                </div>
                              </div>
                              <div data-title="OPEN" className="table-body">
                                {item?.runners?.length &&
                                  item?.runners?.map((event, index) => {
                                    const availableToBack = [
                                      ...event?.ex?.availableToBack,
                                    ];
                                    const availableToLay = [
                                      ...event?.ex?.availableToLay,
                                    ];
                                    return (
                                      <div
                                        data-title="ACTIVE"
                                        className={`table-row ${
                                          item.status === "SUSPENDED"
                                            ? "suspended"
                                            : ""
                                        }  `}
                                        key={event + index}>
                                        <div className="float-left country-name box-4 box-8">
                                          <span
                                            className="team-name"
                                            style={{
                                              fontSize: "14px",
                                              fontWeight: "300",
                                            }}>
                                            <b className="fanct-title">
                                              {event?.name}
                                            </b>
                                          </span>

                                          <p>
                                            <span
                                              style={{ color: "black" }}
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
                                        {availableToBack?.length &&
                                          availableToBack
                                            ?.map((e, id) => {
                                              return (
                                                <div
                                                  key={e?.size + e?.price + id}
                                                  onClick={(e) =>
                                                    handleShow(e, id)
                                                  }
                                                  className={`box-1 box-7 float-left text-center 
                                                ${
                                                  id === 1
                                                    ? "back-2 ds-none"
                                                    : id === 2
                                                    ? "back-1 ds-none"
                                                    : "back"
                                                } 
                                                 ${
                                                   e?.price !==
                                                   previousState?.Odds[id1]
                                                     ?.runners[index]?.ex
                                                     ?.availableToBack[id]
                                                     ?.price
                                                     ? "blink"
                                                     : ""
                                                 }`}>
                                                  <button
                                                    className="odbtn"
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e?.price,
                                                        event?.name,
                                                        "back",
                                                        mid,
                                                        item?.marketId,
                                                        event?.selectionId,
                                                        item?.Name,
                                                        pTime,
                                                        false
                                                      )
                                                    }>
                                                    <span className="odd d-block">
                                                      {e?.price}
                                                    </span>{" "}
                                                    <span className="d-block">
                                                      {e.size === ""
                                                        ? "0.0"
                                                        : e?.size}
                                                    </span>
                                                  </button>
                                                </div>
                                              );
                                            }).reverse()
                                          }
                                        {availableToLay?.length &&
                                          availableToLay?.map((e, id) => {
                                            return (
                                              <div
                                                key={e?.size + e?.price}
                                                onClick={(e) =>
                                                  handleShow(e, id)
                                                }
                                                className={`box-1 box-7 float-left text-center 
                                                ${
                                                  id === 1
                                                    ? "lay-1 ds-none"
                                                    : id === 2
                                                    ? "lay-2 ds-none"
                                                    : "lay"
                                                }
                                                ${
                                                  e?.price !==
                                                  previousState?.Odds[id1]
                                                    ?.runners[index]?.ex
                                                    ?.availableToLay[id]?.price
                                                    ? "blink"
                                                    : ""
                                                } `}>
                                                <button
                                                  className="odbtn"
                                                  onClick={() =>
                                                    handleSpanValueLay(
                                                      e?.price,
                                                      event?.name,
                                                      "lay",
                                                      mid,
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
                                          })}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                            <div className="table-remark text-right remark">
                              {item?.display_message}
                            </div>
                          </div>
                        );
                      })}
                      {status === true || status === 400 ? (
                        ""
                      ) : (
                        <Modal
                          show={showModals}
                          className={``}
                          onHide={handleCloseModal}
                          style={{
                            marginTop: "12px",
                            marginInline: "2%",
                            width: "95%",
                          }}>
                          <Modal.Header closeButton closeVariant="white">
                            <Modal.Title>Placebet</Modal.Title>
                          </Modal.Header>
                          <Modal.Body
                            className={`place-value ${
                              cName === "back" ? "back" : "lay"
                            }`}>
                            <Placebet
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
                              data={data}
                              priceValue={pValue}
                              userIP={userIP}
                            />
                          </Modal.Body>
                        </Modal>
                      )}
                      <div></div>
                    </div>
                    <div
                      className={`${
                        fancyOdds?.Bookmaker?.length === 0 ? "d-none" : ""
                      }`}>
                      <div className="market-title mt-1">
                        Bookmaker
                        <p className="float-right mb-0">
                          <i className="fa fa-info-circle"></i>
                        </p>
                      </div>
                      <div className="bookmaker-market">
                        <div className="table-header">
                          <div className="float-left country-name box-6 min-max">
                            <b>
                              Min:{maxBet?.minBet} Max:{maxBet?.maxBet}
                            </b>
                          </div>
                          <div className="back box-1 float-left text-center">
                            <b>BACK</b>
                          </div>
                          <div className="lay box-1 float-left text-center">
                            <b>LAY</b>
                          </div>
                        </div>
                        <div className="table-body">
                          {fancyOdds?.Bookmaker?.length &&
                            fancyOdds?.Bookmaker?.map((bookmaker, id) => {
                              return (
                                <>
                                  <div
                                    key={bookmaker + id}
                                    data-title={bookmaker?.gstatus}
                                    className={`table-row ${
                                      bookmaker?.gstatus === "SUSPENDED"
                                        ? "suspended"
                                        : bookmaker?.gstatus === "BALL RUNNING"
                                        ? "ballrunning"
                                        : ""
                                    } ${
                                      bookmaker?.t === "TOSS" ? "d-none" : ""
                                    }`}>
                                    <div className="float-left country-name box-4">
                                      <span className="team-name">
                                        <b className="fanct-title">
                                          {bookmaker?.nation}
                                        </b>
                                      </span>
                                      <p>
                                        <span
                                          className={`float-left ${
                                            profits?.Bookmaker?.find(
                                              (profit) =>
                                                profit?.sid === bookmaker?.sid
                                            )?.value > 0
                                              ? "text-success"
                                              : profits.Bookmaker?.find(
                                                  (profit) =>
                                                    profit?.sid ===
                                                    bookmaker?.sid
                                                )?.value < 0
                                              ? "text-danger"
                                              : ""
                                          }`}
                                          style={{ color: "black" }}>
                                          {profits?.Bookmaker?.find(
                                            (profit) =>
                                              profit?.sid === bookmaker?.sid
                                          )?.value?.toFixed(2) || 0}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="box-1  float-left back-1  text-center">
                                      <button>
                                        <span className="odd d-block">0</span>
                                        <span className="d-block">0.0</span>
                                      </button>
                                    </div>
                                    <div className="box-1 float-left back-2  text-center">
                                      <button>
                                        <span className="odd d-block">0</span>{" "}
                                        <span className="d-block">0.0</span>
                                      </button>
                                    </div>

                                    <div
                                      onClick={(e) => handleShow(e)}
                                      className={`box-1 back float-left text-center cPointer ${
                                        bookmaker?.b1 !==
                                        previousState?.Bookmaker[id]?.b1
                                          ? "blink"
                                          : ""
                                      }`}>
                                      <button
                                        className="odbtn"
                                        onClick={() =>
                                          handleSpanValueBack(
                                            bookmaker?.b1,
                                            bookmaker?.nation,
                                            "back",
                                            mid,
                                            bookmaker?.mid,
                                            bookmaker?.sid,
                                            bookmaker?.nation,
                                            pTime,
                                            false,
                                            bookmaker?.t
                                          )
                                        }>
                                        <span className="odd d-block">
                                          {bookmaker?.b1}
                                        </span>
                                        <span className="d-block">
                                          {bookmaker?.bs1 === ""
                                            ? "0.0"
                                            : bookmaker?.bs1}
                                        </span>
                                      </button>
                                    </div>

                                    <div
                                      onClick={(e) => handleShow(e)}
                                      className={`box-1 lay float-left text-center cPointer ${
                                        bookmaker?.l1 !==
                                        previousState?.Bookmaker[id]?.l1
                                          ? "blink"
                                          : ""
                                      }`}>
                                      <button
                                        className="odbtn"
                                        onClick={() =>
                                          handleSpanValueLay(
                                            bookmaker?.l1,
                                            bookmaker?.nation,
                                            "lay",
                                            mid,
                                            bookmaker?.mid,
                                            bookmaker?.sid,
                                            bookmaker?.nation,
                                            pTime,
                                            false,
                                            bookmaker?.t
                                          )
                                        }>
                                        <span className="odd d-block">
                                          {bookmaker?.l1}
                                        </span>{" "}
                                        <span className="d-block">
                                          {bookmaker?.ls1 === ""
                                            ? "0.0"
                                            : bookmaker?.ls1}
                                        </span>
                                      </button>
                                    </div>
                                    <div className="box-1 lay2 float-left  text-center">
                                      <button>
                                        <span className="odd d-block">0</span>{" "}
                                        <span className="d-block">0.0</span>
                                      </button>
                                    </div>
                                    <div className="box-1 lay1 float-left  text-center">
                                      <button>
                                        <span className="odd d-block">0</span>{" "}
                                        <span className="d-block">0.0</span>
                                      </button>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          <div className="table-remark text-right remark">
                            {fancyOdds?.Bookmaker[0]?.display_message}
                          </div>
                        </div>
                      </div>

                      <div></div>
                    </div>
                    {sId == 4 ? (
                      <div className="fancy-markets">
                        <ul className="nav nav-tabs mt-2 fancy-nav">
                          {gameName?.length &&
                            gameName?.map((item, id) => {
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

                              return (
                                <li
                                  key={item + id}
                                  className={`nav-item cPointer ${
                                    currentFancy === item ? "active" : ""
                                  }`}
                                  onClick={() => handleGameName(item, id)}>
                                  <p data-toggle="tab" className="nav-link">
                                    {item === "Fancy2"
                                      ? "Fancy"
                                      : item === "Fancy3"
                                      ? "Fancy2"
                                      : item}
                                  </p>
                                </li>
                              );
                            })}
                          {gameName?.length &&
                            gameName?.map((item, id) => {
                              if (
                                [
                                  "Odds",
                                  "Bookmaker",
                                  "OddEven",
                                  "Fancy",
                                  "Fancy2",
                                  "Fancy3",
                                ].includes(item)
                              ) {
                                return null;
                              }

                              return (
                                <li
                                  key={item + id}
                                  className={`nav-item cPointer ${
                                    currentFancy === item ? "active" : ""
                                  }`}
                                  onClick={() => handleGameName(item, id)}>
                                  <p data-toggle="tab" className="nav-link">
                                    {item}
                                  </p>
                                </li>
                              );
                            })}
                        </ul>
                        {fancyOdds[currentFancy]?.length ? (
                          <>
                            <div className="tab-content">
                              <div className="fancy-market">
                                <div>
                                  <div className="table-header">
                                    <div className="market-title float-left country-name box-4">
                                      <span>Session Market</span>
                                      <p className="float-right mb-0">
                                        <i className="fa fa-info-circle"></i>
                                      </p>
                                    </div>
                                    <div className="box-1 float-left lay text-center">
                                      <b>No</b>
                                    </div>
                                    <div className="back box-1 float-left back text-center">
                                      <b>Yes</b>
                                    </div>
                                  </div>
                                  {fancyOdds[currentFancy]?.map((item, id) => {
                                    return (
                                      <div
                                        className="table-body"
                                        key={item + id}>
                                        <div className="fancy-tripple">
                                          <div
                                            data-title=""
                                            className="table-row">
                                            <div className="float-left country-name box-4">
                                              <span>
                                                <b className="fanct-title">
                                                  {item?.nation}
                                                </b>
                                              </span>
                                              <div className="float-right">
                                                <div className="info-block">
                                                  <Accordion>
                                                    <Accordion.Item
                                                      eventKey={id}>
                                                      <Accordion.Header>
                                                        <p
                                                          data-toggle="collapse"
                                                          data-target="/min-max-info355"
                                                          aria-expanded="false"
                                                          className="info-icon collapsed">
                                                          <i className="fa fa-info-circle m-l-10"></i>
                                                        </p>
                                                      </Accordion.Header>
                                                      <Accordion.Body>
                                                        <div
                                                          id="min-max-info355"
                                                          className="min-max-info">
                                                          <span>
                                                            <b>Min:</b>
                                                            <br />
                                                            {
                                                              mFancyOdds[
                                                                currentFancy
                                                              ][id]?.minBet
                                                            }
                                                          </span>
                                                          <br />
                                                          <span>
                                                            <b>Max:</b>
                                                            <br />
                                                            {
                                                              mFancyOdds[
                                                                currentFancy
                                                              ][id]?.maxBet
                                                            }
                                                          </span>
                                                          <br />
                                                        </div>
                                                      </Accordion.Body>
                                                    </Accordion.Item>
                                                  </Accordion>
                                                </div>
                                              </div>
                                              <p
                                                className="cpointer"
                                                onClick={(e) =>
                                                  handleFancyBook(
                                                    e,
                                                    mid,
                                                    item.sid
                                                  )
                                                }>
                                                <span
                                                  className={`float-left ${
                                                    fancyOddsPnl?.find(
                                                      (pnl) =>
                                                        pnl?.marketId ===
                                                        item?.sid
                                                    )?.pnl > 0
                                                      ? "sucess"
                                                      : fancyOddsPnl?.find(
                                                          (pnl) =>
                                                            pnl?.marketId ===
                                                            item?.sid
                                                        )?.pnl < 0
                                                      ? "danger"
                                                      : ""
                                                  }`}
                                                  style={{ color: "black" }}>
                                                  {fancyOddsPnl?.find(
                                                    (pnl) =>
                                                      pnl?.marketId ===
                                                      item?.sid
                                                  )?.pnl || 0}
                                                </span>
                                              </p>
                                            </div>

                                            <div
                                              className="box-1 lay float-left text-center"
                                              onClick={(e) => handleShow(e)}>
                                              <button
                                                className="odbtn"
                                                onClick={() =>
                                                  handleSpanValueLay(
                                                    item?.l1,
                                                    item?.nation,
                                                    "lay",
                                                    mid,
                                                    item?.sid,
                                                    0,
                                                    currentFancy,
                                                    pTime,
                                                    true,
                                                    item?.ls1
                                                  )
                                                }>
                                                <span className="odd d-block">
                                                  {item?.l1 === ""
                                                    ? "0"
                                                    : item?.l1}
                                                </span>{" "}
                                                <span className="d-block">
                                                  {item?.ls1}
                                                </span>
                                              </button>
                                            </div>
                                            <div
                                              data-title={item?.gstatus}
                                              className={`box-1 back float-left text-center ${
                                                item?.gstatus === "SUSPENDED"
                                                  ? "suspended"
                                                  : item?.gstatus ===
                                                    "BALL RUNNING"
                                                  ? "ballrunning"
                                                  : ""
                                              }`}
                                              onClick={(e) => handleShow(e)}>
                                              <button
                                                className="odbtn"
                                                onClick={() =>
                                                  handleSpanValueBack(
                                                    item?.b1,
                                                    item?.nation,
                                                    "back",
                                                    mid,
                                                    item?.sid,
                                                    0,
                                                    currentFancy,
                                                    pTime,
                                                    true,
                                                    item?.bs1
                                                  )
                                                }>
                                                <span className="odd d-block">
                                                  {item?.b1}
                                                </span>{" "}
                                                <span className="d-block">
                                                  {item?.bs1 === ""
                                                    ? "0"
                                                    : item?.bs1}
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <Modal
                                    show={showFancyModals}
                                    className={``}
                                    onHide={handleCloseFancyModal}
                                    style={{
                                      marginTop: "12px",
                                      marginInline: "2%",
                                      width: "95%",
                                    }}>
                                    <Modal.Header
                                      closeButton
                                      closeVariant="white">
                                      <Modal.Title>Run Amount</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <FancyModals
                                        matchId={mid}
                                        FancyID={FancyID}
                                      />
                                    </Modal.Body>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p className="no-found">No real-time records found</p>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default GameDetail;
