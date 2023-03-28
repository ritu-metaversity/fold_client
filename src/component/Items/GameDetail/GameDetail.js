import React, { useState, useEffect } from "react";
import "./GameDetail.css";
import Modal from "react-bootstrap/Modal";
import Placebet from "../../MobPlacebet/Placebet";
import axios from "axios";
import moment from "moment";
import AlertBtn from "../../Alert/AlertBtn";
import Accordion from "react-bootstrap/Accordion";

function GameDetail({ getStackValue }) {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const pTime = moment(curr).format("YYYY-MM-DD h:mm:ss");

  const [showModals, setShowModals] = useState(false);
  const [currentFancy, setCurrentFancy] = useState("Fancy2");
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
  const [FancyActive, setFancyActive] = useState(1);
  const [PlaceDate, setPlaceDate] = useState();
  const [fancy, setFancy] = useState();
  // eslint-disable-next-line
  const [toss, setToss] = useState();
  const [status, setStatus] = useState();
  const [messege, setMessege] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [maxBet, setMaxBet] = useState();
  const [minOdd, setMinOdds] = useState();
  const [mFancyOdds, setMFancyOdds] = useState();
  // eslint-disable-next-line
  const [errorMsg, setErrorMsg] = useState(false)

  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);
  const mid = Gameid.slice(12);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://43.205.50.127:9000/betfair_api/fancy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMFancyOdds(res.data);
        setMaxBet(res.data.Bookmaker[0]);
        setMinOdds(res.data);
      });
      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const time = setInterval(() => {
      // http://89.39.105.69:9001/fancy/${id} //Old Api
      axios.get(`http://89.39.105.69:9001/fancy/${id}`).then((res) => {
        if (fancyOdds) {
          const oldOdds = { ...fancyOdds };
          setPreviousState(oldOdds);
        } else {
          setPreviousState(res.data);
        }
        setIsLoading(false);
        setFancyOdds(res.data);
        setGameName(Object.keys(res.data));
        setMatchodd(res.data.Odds);
        var matchData = res.data.Odds[0];
        setETime(matchData);
        setMatchDelatil(matchData.runners);
      }); // eslint-disable-next-line
    }, 1000);
    return () => clearInterval(time);
  }, [id, fancyOdds]);

  const handleGameName = (item, id) => {
    setCurrentFancy(item);
    setFancyActive(id);
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
    Toss
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
    setToss(Toss);
    setStatus(false);
  };

  const handleCloseModal = () => setShowModals(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShowModals(true);
  };

  const [matchDetail, setMatchDelatil] = useState("");

  const handleSpanValueGay = (
    val1,
    id,
    clr,
    mid,
    marketId,
    sid,
    mName,
    pDate,
    isFancy,
    Toss
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
    setToss(Toss);
    setStatus(false);
  };

  const data = (vl) => {
    setStatus(vl.status);
    // if(vl.status==false){
    //   setErrorMsg(true)
    // }else{
    //   setErrorMsg(false)
    // }
    setMessege(vl.message);
  };

  // setTimeout(() => {
  //   setTimeOut(1);
  // }, 15000);

  const popupClose=(vl)=>{
    setErrorMsg(vl)
  }


  // console.log(errorMsg)

  // const handlecollaps = (e) => {
  //   e.preventDefault();
  //   if (showColleps === false) {
  //     setShowColleps(true);
  //   } else {
  //     setShowColleps(false);
  //   }
  // };

  return (
    <div>
      {isLoading ? (
        <p className="lodder">
          <i className="fa fa-spinner fa-spin"></i>
        </p>
      ) : (
        <div className="wrapper">
          {status === true
            ?<AlertBtn color="success" val={messege} popupClose={popupClose} />
            : ""}
          {status === 400
            ? <AlertBtn color="danger" val={messege} popupClose={popupClose} />
            : ""}

          <div className="tab-content">
            <div id="odds" className="tab-pane ">
              <div className="match-title">
                <span className="match-name">
                  {matchDetail?.length && matchDetail[0].name} v{" "}
                  {matchDetail?.length && matchDetail[1].name}
                </span>{" "}
                <span className="float-right">{eTime?.eventTime}</span>
              </div>
              {matchDetail.length === 0 || matchDetail.length === "" ? (
                <p className="no-found">No real-time records found</p>
              ) : (
                <>
                  <div>
                    {matchodd.map((item, id1) => {
                      // console.log(item)
                      return (
                        <div key={item + id1}>
                          <div
                            className={`market-title mt-1 ${
                              item.runners.length === 0 ? "d-none" : ""
                            }`}>
                            {item.Name}
                            <p className="float-right mb-0">
                              <i className="fas fa-info-circle"></i>
                            </p>
                          </div>
                          <div
                            className={`main-market ${
                              item.runners.length === 0 ? "d-none" : ""
                            }`}>
                            <div className="table-header">
                              <div className="float-left country-name box-6 min-max">
                                <b>
                                  Min:
                                  <span>{minOdd?.Odds[id1]?.minBet}</span>
                                </b>
                                <b style={{ marginLeft: "6px" }}>
                                  Max:
                                  <span>{minOdd?.Odds[id1]?.maxBet}</span>
                                </b>
                              </div>
                              <div className="back box-1 float-left text-center">
                                <b>BACK</b>
                              </div>
                              <div className="lay box-1 float-left text-center">
                                <b>LAY</b>
                              </div>
                            </div>
                            <div data-title="OPEN" className="table-body">
                              {item.runners?.length &&
                                item.runners.map((event, index) => {
                                  return (
                                    <div
                                      data-title="ACTIVE"
                                      className="table-row"
                                      key={event + index}>
                                      <div className="float-left country-name box-4">
                                        <span
                                          className="team-name"
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "300",
                                          }}>
                                          <b>{event.name}</b>
                                        </span>
                                        <p>
                                          <span
                                            className="float-left"
                                            style={{ color: "black" }}>
                                            0
                                          </span>
                                        </p>
                                      </div>

                                      {event.ex.availableToBack?.length &&
                                        event.ex.availableToBack.map(
                                          (e, id) => {
                                            return (
                                              <div
                                                key={e.size + e.price + id}
                                                className={`box-1 back1 float-left back-1 text-center ${
                                                  id === 0 || id === 1
                                                    ? "d-none"
                                                    : ""
                                                }  ${
                                                  e.price !==
                                                  previousState?.Odds[id1]
                                                    .runners[index]?.ex
                                                    ?.availableToBack[id]?.price
                                                    ? "blink"
                                                    : ""
                                                }`}>
                                                <button
                                                  onClick={(e) =>
                                                    handleShow(e)
                                                  }>
                                                  <span
                                                    className="odd d-block"
                                                    onClick={() =>
                                                      handleSpanValueBack(
                                                        e.price,
                                                        event.name,
                                                        "back",
                                                        mid,
                                                        item.marketId,
                                                        event.selectionId,
                                                        item.Name,
                                                        pTime,
                                                        "false"
                                                      )
                                                    }>
                                                    {e.price}
                                                  </span>{" "}
                                                  <span className="d-block">
                                                    {e.size === ""
                                                      ? "0.0"
                                                      : e.size}
                                                  </span>
                                                </button>
                                              </div>
                                            );
                                          }
                                        )}
                                      {event.ex.availableToLay?.length &&
                                        event.ex.availableToLay.map((e, id) => {
                                          return (
                                            <div
                                              key={e.size + e.price + id}
                                              className={`box-1 lay float-left text-center ${
                                                id === 1 || id === 2
                                                  ? "d-none"
                                                  : ""
                                              } ${
                                                e.price !==
                                                previousState?.Odds[id1]
                                                  .runners[index]?.ex
                                                  ?.availableToLay[id]?.price
                                                  ? "blink"
                                                  : ""
                                              } `}>
                                              <button
                                                onClick={(e) => handleShow(e)}>
                                                <span
                                                  className="odd d-block"
                                                  onClick={() =>
                                                    handleSpanValueGay(
                                                      e.price,
                                                      event.name,
                                                      "lay",
                                                      mid,
                                                      item.marketId,
                                                      event.selectionId,
                                                      item.Name,
                                                      pTime,
                                                      "false"
                                                    )
                                                  }>
                                                  {e.price}
                                                </span>
                                                <span className="d-block">
                                                  {e.size}
                                                </span>
                                              </button>
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
                                          <Modal.Header
                                            closeButton
                                            closeVariant="white">
                                            <Modal.Title>Placebet</Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body
                                            className={
                                              cName === "back" ? "back" : "lay"
                                            }>
                                            <Placebet
                                              spanValueRate={spanValueRate}
                                              spanValueName={spanValueName}
                                              matchDetail={matchDetail}
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
                                            />
                                          </Modal.Body>
                                        </Modal>
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div></div>
                  </div>
                  <div className={`${fancyOdds.Bookmaker.length===0?"d-none":""}`}>
                    <div className="market-title mt-1">
                      Bookmaker
                      <p className="float-right mb-0">
                        <i className="fas fa-info-circle"></i>
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
                        {fancyOdds.Bookmaker?.length &&
                          fancyOdds.Bookmaker.map((bookmaker, id) => {
                            return (
                              <div
                                key={bookmaker + id}
                                data-title="SUSPENDED"
                                className={`table-row ${
                                  bookmaker.gstatus === "SUSPENDED"
                                    ? "suspended"
                                    : ""
                                } ${bookmaker.t === "TOSS" ? "d-none" : ""}`}>
                                <div className="float-left country-name box-4">
                                  <span className="team-name">
                                    <b>{bookmaker.nation}</b>
                                  </span>
                                  <p>
                                    <span
                                      className="float-left"
                                      style={{ color: "black" }}>
                                      0
                                    </span>
                                  </p>
                                </div>
                                <div className="box-1 back1 float-left back-1  text-center">
                                  <button>
                                    <span className="odd d-block">0</span>
                                    <span className="d-block">0.0</span>
                                  </button>
                                </div>
                                <div className="box-1 back2 float-left back-1  text-center">
                                  <button>
                                    <span className="odd d-block">0</span>{" "}
                                    <span className="d-block">0.0</span>
                                  </button>
                                </div>

                                <div
                                  className={`box-1 back float-left back-1  text-center ${
                                    bookmaker.b1 !==
                                    previousState.Bookmaker[id].b1
                                      ? "blink"
                                      : ""
                                  }`}>
                                  <button onClick={(e) => handleShow(e)}>
                                    <span
                                      className="odd d-block"
                                      onClick={() =>
                                        handleSpanValueBack(
                                          bookmaker.b1,
                                          bookmaker.nation,
                                          "back",
                                          mid,
                                          bookmaker.mid,
                                          bookmaker.sid,
                                          bookmaker.nation,
                                          pTime,
                                          "false",
                                          bookmaker.t
                                        )
                                      }>
                                      {bookmaker.b1}
                                    </span>
                                    <span className="d-block">
                                      {bookmaker.bs1 === ""
                                        ? "0.0"
                                        : bookmaker.bs1}
                                    </span>
                                  </button>
                                </div>

                                <div
                                  className={`box-1 lay float-left text-center ${
                                    bookmaker.l1 !==
                                    previousState.Bookmaker[id].l1
                                      ? "blink"
                                      : ""
                                  }`}>
                                  <button onClick={(e) => handleShow(e)}>
                                    <span
                                      className="odd d-block"
                                      onClick={() =>
                                        handleSpanValueGay(
                                          bookmaker.l1,
                                          bookmaker.nation,
                                          "lay",
                                          mid,
                                          bookmaker.mid,
                                          bookmaker.sid,
                                          bookmaker.nation,
                                          pTime,
                                          "false",
                                          bookmaker.t
                                        )
                                      }>
                                      {bookmaker.l1}
                                    </span>{" "}
                                    <span className="d-block">
                                      {bookmaker.ls1 === ""
                                        ? "0.0"
                                        : bookmaker.ls1}
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
                            );
                          })}
                      </div>
                    </div>
                    <div className="table-remark text-right remark">
                      {matchDetail?.length && matchDetail[0].name} vs{" "}
                      {matchDetail?.length && matchDetail[1].name} Match Bet
                      Started In Our Exchange
                    </div>
                    <div></div>
                  </div>
                  <div className="fancy-markets">
                    <ul className="nav nav-tabs mt-2 fancy-nav">
                      {gameName?.length &&
                        gameName.slice(2).map((item, id) => {
                          return (
                            <li
                              key={item + id}
                              className={`nav-item ${
                                FancyActive === id ? "active" : ""
                              }`}
                              onClick={() => handleGameName(item, id)}>
                                {/* eslint-disable-next-line */}
                              <a data-toggle="tab" className="nav-link">
                                {item}
                              </a>
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
                                    <i className="fas fa-info-circle"></i>
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
                                  <div className="table-body" key={item + id}>
                                    <div className="fancy-tripple">
                                      <div data-title="" className="table-row">
                                        <div className="float-left country-name box-4">
                                          <span>
                                            <b style={{fontSize:"10px"}}>{item?.nation}</b>
                                          </span>
                                          <div className="float-right">
                                            <div className="info-block">
                                              <Accordion>
                                                <Accordion.Item eventKey={id}>
                                                  <Accordion.Header>
                                                  {/* eslint-disable-next-line */}
                                                  <a
                                                data-toggle="collapse"
                                                data-target="/min-max-info355"
                                                aria-expanded="false"
                                                className="info-icon collapsed"
                                                // onClick={(e) =>
                                                //   handlecollaps(e)
                                                // }
                                                >
                                                <i className="fas fa-info-circle m-l-10"></i>
                                              </a>
                                                  </Accordion.Header>
                                                  <Accordion.Body>
                                                  <div
                                                id="min-max-info355"
                                                className="min-max-info">
                                                <span>
                                                  <b>Min:</b>
                                                  <br />
                                                  {
                                                    mFancyOdds[currentFancy][id]
                                                      .minBet
                                                  }
                                                </span>{" "}
                                                <span>
                                                  <b>Max:</b>
                                                  <br />
                                                  {
                                                    mFancyOdds[currentFancy][id]
                                                      .maxBet
                                                  }
                                                </span>
                                              </div>
                                                  </Accordion.Body>
                                                </Accordion.Item>
                                               
                                              </Accordion>
                                              
                                            </div>
                                          </div>
                                          <p>
                                            <span
                                              className="float-left"
                                              style={{ color: "black" }}>
                                              0
                                            </span>
                                          </p>
                                        </div>
                                        <div className="box-1 lay float-left text-center">
                                          <button
                                            onClick={(e) => handleShow(e)}>
                                            <span
                                              className="odd d-block"
                                              onClick={() =>
                                                handleSpanValueGay(
                                                  item?.l1,
                                                  item?.nation,
                                                  "lay",
                                                  mid,
                                                  item.mid,
                                                  item.sid,
                                                  item.nation,
                                                  pTime,
                                                  "true",
                                                  item.t
                                                )
                                              }>
                                              {item?.l1 === "" ? "0" : item?.l1}
                                            </span>{" "}
                                            <span className="d-block">
                                              {item?.ls1}
                                            </span>
                                          </button>
                                        </div>
                                        <div
                                          className={`box-1 back float-left text-center ${
                                            item.gstatus === "SUSPENDED"
                                              ? "suspended"
                                              : ""
                                          }`}>
                                          <button
                                            onClick={(e) => handleShow(e)}>
                                            <span
                                              className="odd d-block"
                                              onClick={() =>
                                                handleSpanValueBack(
                                                  item?.b1,
                                                  item?.nation,
                                                  "back",
                                                  mid,
                                                  item.mid,
                                                  item.sid,
                                                  item.nation,
                                                  pTime,
                                                  "true",
                                                  item.t
                                                )
                                              }>
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

                              <div></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="no-found">No real-time records found</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetail;

// Bookmaker Blick code:

// ${bookmaker.l1 !==previousState.Bookmaker[id].l1? "blink":""}
