import React, { useState, useEffect } from "react";
import "./GamedetailPage.css";
import moment from "moment";
import AlertBtn from "../../component/Alert/AlertBtn";
import { socket } from "../../component/Items/GameDetail/socket";
import { createProfits } from "../../component/Items/GameDetail/eventUtil";
import { UserAPI } from "../../apis/UserAPI";
import { GameAPI } from "../../apis/gameAPI";
import { useParams } from "react-router-dom";
import Bet from "../Bet/Bet";
import SideBar from "../sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import FancyModalsForDesk from "./FancyModalsForDesk";

function GamedetailPage({ getStackValue, SportId, TvHideShow }) {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const pTime = moment(curr).format("YYYY-MM-DD HH:mm:ss.SSS");
  const [currentFancy, setCurrentFancy] = useState("Fancy3");
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
  const [mFancyOdds, setMFancyOdds] = useState({});
  const [show, setShow] = useState(false);
  const [FancyID, setFancyID] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [sId, setSid] = useState(SportId);
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

  const { id } = useParams();
  const matId = id;

  useEffect(() => {
    const SporId = localStorage.getItem("SportId");
    if (SportId === "") {
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

  const data = (data)=>{
    setStatus(data?.status);
    setMessege(data?.message);

  }

  const [updated, setUpdated] = useState(0)

  const StackValueForProfit = (val)=>{
    setUpdated(val)
  }



  // if (
  //   marketId?.includes("BM") ||
  //   marketId?.includes("bm") ||
  //   marketId?.includes("Bm")
  // ) {
  // profits.Bookmaker?.filter(
  //     (item) => item?.mid === marketId
  //   ).map((profit) =>
  //     profit.sid == selectionId
  //       ? (
  //           (profit?.value || 0) +
  //           ((cName === "back" ? 1 : -1) * spanValueRate * updated) / 100
  //         ).toFixed(2)
  //       : (
  //           (profit?.value || 0) +
  //           (cName === "back" ? -1 : 1) * updated
  //         ).toFixed(2)
  //   );
  // }

  // console.log(profits, "asDFds")

  const popupClose = (vl) => {
    setErrorMsg(vl);
  };


  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          {
            status === 400 ?(
              <AlertBtn color="danger" val={messege} popupClose={popupClose} />
            ):""
          }
          {
            status === true && <AlertBtn color="success" val={messege} popupClose={popupClose} /> 
          }

          
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>

            <div className="col-md-10 featured-box load game-page">
              <div className="row row5">
                <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
                  {isLoading ? (
                    <p className="lodder">
                      <i className="fa fa-spinner fa-spin"></i>
                    </p>
                  ) : (
                    <>
                      <div className="game-heading">
                        <span className="card-header-title">
                          {matchDetail?.length && matchDetail[0]?.name} v{" "}
                          {matchDetail?.length && matchDetail[1]?.name}
                        </span>{" "}
                        <span className="float-right">{eTime?.eventTime}</span>
                      </div>
                      <div className="back tvHeading">
                        <span className="card-header-title">
                          {matchDetail?.length && matchDetail[0]?.name} v{" "}
                          {matchDetail?.length && matchDetail[1]?.name}
                        </span>{" "}
                        <span className="float-right">{eTime?.eventTime}</span>
                      </div>
                      {
                        eTime?.inplay === true ?(
                          <div id="scoreboard-box">
                          <div className="scorecard scorecard-mobile">
                            <div className="score-inner">
                              <iframe
                              src = {`http://15.207.182.173:3050/event/${id}?theme=crazy-diamond `}
                                // src={`https://internal-consumer-apis.jmk888.com/go-score/template/${sId}/${id}`}
                                width="100%"
                                height="240px"
                                className="score-card card-scor"
                                title="scorecord"
                                allowFullScreen={true}></iframe>
                            </div>
                          </div>
                        </div>
                        ):""
                      }
                      <div className="markets">
                        {matchodd?.length &&
                          matchodd?.map((item, index) => {
                            return (
                              <div className="main-market" key={index}>
                                <div
                                  className={`market-title mt-1 ${
                                    item.runners.length === 0 ? "d-none" : ""
                                  }`}>
                                  {item.Name}
                                  <span className="float-right">
                                    Min Bet{" "}
                                    <span>{minBet?.Odds[index]?.minBet}</span> Max
                                    Bet <span>{minBet?.Odds[index]?.maxBet}</span>{" "}
                                    <a href="/" className="game-rules-icon">
                                      <span>
                                        <i className="fa fa-info-circle float-right  ml-2"></i>
                                      </span>
                                    </a>
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
                                          key={index}>
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
                                                    className={`box-d-1 back2  float-left back-2 text-center ${
                                                      id === 1
                                                        ? "back-2 ds-none"
                                                        : id === 2
                                                        ? "back-1 ds-none"
                                                        : "back"
                                                    } 
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]?.runners[id1]
                                                        ?.ex?.availableToBack[id]?.price
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
                                                    className={`box-d-1 lay float-left text-center ${
                                                      id === 1
                                                        ? "lay-1 ds-none"
                                                        : id === 2
                                                        ? "lay-2 ds-none"
                                                        : "lay"
                                                    }
                                                    ${
                                                      e?.price !==
                                                      previousState?.Odds[index]?.runners[id1]
                                                        ?.ex?.availableToLay[id]?.price
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
                                                          ? ""
                                                          : e.price}
                                                      </span>{" "}
                                                      <span className="d-block">
                                                        {e.size === 0
                                                          ? ""
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

                        <div className="row row5 bookmaker-market mt-1">
                          <div className="bm1 col-xl-12">
                            <div>
                              <div className="market-title mt-1">
                                Bookmaker market
                                <a href="/" className="m-r-5 game-rules-icon">
                                  <b>
                                    Min:{maxBet?.minBet} Max:{maxBet?.maxBet}{" "}
                                  </b>
                                  <span>
                                    <i className="fa fa-info-circle float-right"></i>
                                  </span>
                                </a>
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
                                  fancyOdds?.Bookmaker?.map((bookmaker) => {
                                    return (
                                      <div
                                        data-title="SUSPENDED"
                                        className={`table-row ${
                                          bookmaker?.gstatus === "SUSPENDED"
                                            ? "suspended"
                                            : bookmaker?.gstatus ===
                                              "BALL RUNNING"
                                            ? "ballrunning"
                                            : ""
                                        } ${
                                          bookmaker?.t === "TOSS"
                                            ? "d-none"
                                            : ""
                                        }`}>
                                        <div className="float-left country-name box-4">
                                          
                                          <span className="team-name">
                                            <b>{bookmaker?.nation}</b>
                                          </span>
                                          {
                                            
                                          }
                                          <p>
                                            <span
                                              className={`float-left ${
                                                profits?.Bookmaker?.find(
                                                  (profit) =>
                                                    profit?.sid ===
                                                    bookmaker?.sid
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
                                              style={{
                                                color: "black",
                                                fontSize: "12px",
                                              }}>
                                              {(()=>{ 
                                                const profit=profits?.Bookmaker?.find(
                                                (profit) =>
                                                profit.sid === bookmaker.sid)
                                                if(profit)return  selectionId == bookmaker.sid
                                                ? ((profit?.value || 0) +
                                                  (cName === "back" ? 1 : -1) *
                                                    spanValueRate *
                                                    updated/100).toFixed(2)
                                                : ((profit?.value || 0) +
                                                (cName === "back" ? -1 : 1) * updated).toFixed(2)
                                                  else return null
                                                }
                                                )()}
                                            </span>


                                          </p>
                                          <p>
                                          {}
                                          </p>
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
                                            <span>{bookmaker?.b1}</span><br/>
                                            <span style={{fontSize:"12px"}}>{bookmaker?.bs1}</span>
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
                                            <span>{bookmaker?.l1}</span><br/>
                                            <span style={{fontSize:"12px"}}>{bookmaker?.ls1}</span>
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
                      </div>

                      <div className="fancy-market row row5">
                        <div className="col-6">
                          <div>
                            <div className="market-title mt-1">
                              Session Market
                              <a href="/" className="m-r-5 game-rules-icon">
                                <span>
                                  <i className="fa fa-info-circle float-right"></i>
                                </span>
                              </a>
                            </div>

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
                              {fancyOdds["Fancy2"]?.map((e, id) => {
                                return (
                                  <div key={e+id} className="fancy-tripple">
                                    <div
                                      className={`table-row ${
                                        e?.gstatus === "SUSPENDED"
                                          ? "suspended"
                                          : e?.gstatus === "BALL RUNNING"
                                          ? "ballrunning"
                                          : ""
                                      }`}>
                                      <div
                                        className="float-left country-name box-6"
                                        style={{ borderBottom: "0px" }}>
                                        <p className="m-b-0">
                                          <a href="/">{e.nation}</a>
                                        </p>
                                        <span
                                          onClick={() =>
                                            handleFancyData(e?.sid, matId)
                                          }
                                          className={`float-left cPointer ${
                                            fancyOddsPnl?.find(
                                              (pnl) => pnl?.marketId === e?.sid
                                            )?.pnl > 0
                                              ? "sucess"
                                              : fancyOddsPnl?.find(
                                                  (pnl) =>
                                                    pnl?.marketId === e?.sid
                                                )?.pnl < 0
                                              ? "danger"
                                              : ""
                                          }`}
                                          style={{
                                            color: "black",
                                            fontSize: "12px",
                                          }}>
                                          {fancyOddsPnl?.find(
                                            (pnl) => pnl?.marketId === e?.sid
                                          )?.pnl || 0}
                                        </span>
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
                                          <span>{e.l1}</span><br/>
                                            <span style={{fontSize:"12px"}}>{e?.ls1}</span>
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
                                          <span>{e.b1}</span><br/>
                                            <span style={{fontSize:"12px"}}>{e?.bs1}</span>
                                        </button>
                                      </div>
                                      <div
                                        className="box-2 float-left text-right min-max"
                                        style={{ borderBottom: "0px" }}>
                                        <span className="d-block">
                                          Min:{" "}
                                          <span>
                                            {mFancyOdds[currentFancy][id]?.minBet}
                                          </span>
                                        </span>{" "}
                                        <span className="d-block">
                                          Max:{" "}
                                          <span>
                                            {mFancyOdds[currentFancy][id]?.maxBet}
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
                        <div className="col-6"></div>
                      </div>

                      <ul className="nav nav-tabs mt-1">
                        {gameName?.length &&
                          gameName.slice(2)?.map((item, id) => {
                            if (
                              [
                                "Odds",
                                "Bookmaker",
                                "Fancy",
                                "Fancy2",
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
                                  currentFancy === item ? "active-nav" : ""
                                }`}
                                onClick={() => handleGameName(item, id)}>
                                <button
                                  data-toggle="tab"
                                  className="nav-link fancy-linkbtn">
                                  {item === "Fancy2"
                                    ? "Fancy"
                                    : item === "Fancy3"
                                    ? "Fancy1"
                                    : item}
                                </button>
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
                                  currentFancy === item ? "active-nav" : ""
                                }`}
                                onClick={() => handleGameName(item, id)}>
                                <button
                                  data-toggle="tab"
                                  className="nav-link fancy-linkbtn">
                                  {item}
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                      {fancyOdds[currentFancy]?.length ? (
                        <div className="tab-content fancy-tab">
                          <div id="fancy" className="tab-pane ">
                            <div className="fancy-market row row5">
                              <div className="col-6">
                                <div className="market-title mt-1">
                                  <span>
                                    {currentFancy === "Fancy3"
                                      ? "Fancy1"
                                      : currentFancy}{" "}
                                    Market
                                  </span>{" "}
                                  <a href="/" className="m-r-5 game-rules-icon">
                                    <span>
                                      <i className="fa fa-info-circle float-right"></i>
                                    </span>
                                  </a>
                                </div>
                                <div className="table-header">
                                  <div className="float-left country-name box-6"></div>
                                  <div className="back box-d-1 float-left lay text-center">
                                    <b>No</b>
                                  </div>
                                  <div className="box-d-1 float-left back text-center">
                                    <b>Yes</b>
                                  </div>
                                  <div className="box-2 float-left"></div>
                                </div>
                                {fancyOdds[currentFancy]?.map((item, id) => {
                                  return (
                                    <>
                                      <div
                                        className="table-body"
                                        key={item?.sid + id}>
                                        <div
                                          data-title=""
                                          className="fancy-tripple">
                                          <div className="table-row">
                                            <div
                                              className="float-left country-name box-6"
                                              style={{ borderBottom: "0px" }}>
                                              <p className="m-b-0">
                                                <span>{item?.nation}</span>
                                              </p>
                                              <p
                                                className="m-b-0"
                                                onClick={() =>
                                                  handleFancyData(
                                                    item?.sid,
                                                    matId
                                                  )
                                                }
                                                // onClick={() => setShow(true)}
                                              >
                                                <span
                                                  className={`float-left cPointer ${
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
                                                  style={{
                                                    color: "black",
                                                    fontSize: "12px",
                                                  }}>
                                                  {fancyOddsPnl?.find(
                                                    (pnl) =>
                                                      pnl?.marketId ===
                                                      item?.sid
                                                  )?.pnl || 0}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="box-d-1 lay float-left text-center">
                                              <button
                                                className="odbtn"
                                                onClick={() =>
                                                  handleSpanValueLay(
                                                    item?.l1,
                                                    item?.nation,
                                                    "lay",
                                                    matId,
                                                    item?.sid,
                                                    0,
                                                    currentFancy,
                                                    pTime,
                                                    true,
                                                    item?.ls1
                                                  )
                                                }>
                                                <span className="odd d-block">
                                                  {item?.l1}
                                                </span>
                                                <span>{item?.ls1}</span>
                                              </button>
                                            </div>
                                            <div className="box-d-1 back float-left text-center">
                                              <button
                                                className="odbtn"
                                                onClick={() =>
                                                  handleSpanValueBack(
                                                    item?.b1,
                                                    item?.nation,
                                                    "back",
                                                    matId,
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
                                                </span>
                                                <span>{item?.bs1}</span>
                                              </button>
                                            </div>
                                            <div
                                              className="box-2 float-left text-right min-max"
                                              style={{ borderBottom: "0px" }}>
                                              <span className="d-block">
                                                Min:
                                                <span>
                                                  {
                                                    mFancyOdds[currentFancy][id]
                                                      ?.minBet
                                                  }
                                                </span>
                                              </span>
                                              <span className="d-block">
                                                Max:
                                                <span>
                                                  {
                                                    mFancyOdds[currentFancy][id]
                                                      ?.maxBet
                                                  }
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="no-found">No real-time records found</p>
                      )}

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
                  <div className="ps">
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
                    />
                  </div>
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
