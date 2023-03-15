import React, { useState, useEffect } from "react";
import "./GameDetail.css";
import Modal from "react-bootstrap/Modal";
import Placebet from "../../MobPlacebet/Placebet";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import AlertBtn from '../../Alert/AlertBtn'

function GameDetail({ getStackValue }) {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  const pTime = moment(curr).format("YYYY-MM-DD h:mm:ss");

  // const [show, setShow] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [currentFancy, setCurrentFancy] = useState("Fancy2");
  const [matchodd, setMatchodd] = useState("");
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
  const [toss, setToss] = useState();
  const [status, setStatus] = useState();
  const [messege, setMessege] = useState();
  const [timeOut, setTimeOut] = useState(null)


  const Gameid = window.location.pathname;
  const id = Gameid.slice(12);
  const mid = Gameid.slice(12);

  useEffect(() => {
    const time = setInterval(() => { 
      axios.get(`http://89.39.105.69:9001/fancy/${id}`).then((res) => {
        if (fancyOdds) {
          const oldOdds = { ...fancyOdds };
          setPreviousState(oldOdds);
        } else {
          setPreviousState(res.data);
        }

        setFancyOdds(res.data);
        setGameName(Object.keys(res.data));
        setMatchodd(res.data.Odds);
        var matchData = res.data.Odds[0];
        setETime(matchData);
        setMatchDelatil(matchData.runners);
      }); // eslint-disable-next-lineF
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
  };

  

  const data = ( vl ) => {
    setStatus(vl.status);
    setMessege(vl.message);
    console.log(vl)
  };

  

  setTimeout(() => {
    setTimeOut(1)
  }, 15000)

  return (
    <div>
      {/* <div className="game-detail-desk-view">
        <div className="main">
          <div className="container-fluid container-fluid-5">
            <div className="row row5">
              <div className="sidebar col-md-2">
                <SideBar />
              </div>

              <div className="col-md-10 featured-box load game-page">
                <div className="row row5">
                  <div className="col-md-9 featured-box-detail sports-wrapper m-b-10">
                    <div className="game-heading">
                      <span className="card-header-title">
                        {matchDetail?.length && matchDetail[0].name} v{" "}
                        {matchDetail?.length && matchDetail[1].name}
                      </span>{" "}
                      <span className="float-right">{eTime?.eventTime}</span>
                    </div>
                    <div className="markets">
                      {matchodd?.length &&
                        matchodd.map((item) => {
                          return (
                            <div className="main-market">
                              <div
                                className={`market-title mt-1 ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.Name}
                                <span className="float-right">
                                  Maximum Bet <span>1</span>{" "}
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
                                <div className="float-left country-name box-4 min-max">
                                  <b></b>
                                </div>
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

                              <div
                                data-title="OPEN"
                                className={`table-body ${
                                  item.runners.length === 0 ? "d-none" : ""
                                }`}>
                                {item.runners?.length &&
                                  item.runners.map((event, id) => {
                                    return (
                                      <div
                                        data-title="ACTIVE"
                                        className={"table-row"}
                                        onClick={() =>
                                          handleClickName(event.name)
                                        }
                                        key={id + 5}>
                                        <div className="float-left country-name box-4">
                                          <span className="team-name">
                                            <b>{event.name}</b>
                                          </span>
                                          <p>
                                            <span
                                              className="float-left"
                                              style={{ color: "black" }}>
                                              0
                                            </span>{" "}
                                            <span
                                              className="float-right"
                                              style={{
                                                display: "none",
                                                color: "black",
                                              }}>
                                              0
                                            </span>
                                          </p>
                                        </div>
                                        {event.ex.availableToBack?.length &&
                                          event.ex.availableToBack.map(
                                            (e, id) => {
                                              return (
                                                <div
                                                  className="box-1 back2  float-left back-2 text-center"
                                                  onClick={() =>
                                                    handleClick("back", e.price)
                                                  }>
                                                  <span className="odd d-block">
                                                    {e.price}
                                                  </span>
                                                  <span className="d-block">
                                                    {e.size}
                                                  </span>
                                                </div>
                                              );
                                            }
                                          )}

                                        {event.ex.availableToLay?.length &&
                                          event.ex.availableToLay.map((e) => {
                                            return (
                                              <div
                                                className="box-1 lay float-left text-center"
                                                onClick={() =>
                                                  handleClick("lay", e.price)
                                                }>
                                                <span className="odd d-block">
                                                  {e.price === 0 ? "" : e.price}
                                                </span>{" "}
                                                <span className="d-block">
                                                  {e.size === 0 ? "" : "0.00"}
                                                </span>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    );
                                  })}
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
                                <span>
                                  <i className="fa fa-info-circle float-right"></i>
                                </span>
                              </a>
                            </div>
                            <div className="table-header">
                              <div className="float-left country-name box-4 text-info">
                                <b>
                                  Min: <span>100</span>
                                  Max: <span>200K</span>
                                </b>
                              </div>
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
                              {fancyOdds.Bookmaker?.length &&
                                fancyOdds.Bookmaker.map((bookmaker) => {
                                  return (
                                    <div
                                      data-title="SUSPENDED"
                                      className={`table-row ${
                                        bookmaker.gstatus === "SUSPENDED"
                                          ? "suspended"
                                          : ""
                                      }`}>
                                      <div className="float-left country-name box-4">
                                        <span className="team-name">
                                          <b>{bookmaker.nation}</b>
                                        </span>
                                        <p>
                                          <span
                                            className="float-left"
                                            style={{ color: "black" }}>
                                            0
                                          </span>{" "}
                                          <span
                                            className="float-right"
                                            style={{
                                              display: "none",
                                              color: "black",
                                            }}>
                                            0
                                          </span>
                                        </p>
                                      </div>
                                      <div className="box-1 back2 float-left text-center betting-disabled"></div>
                                      <div className="box-1 back1 float-left back-2 text-center betting-disabled"></div>
                                      <div className="box-1 back float-left back lock text-center betting-disabled">
                                        {bookmaker.b1}
                                      </div>
                                      <div className="box-1 lay float-left text-center betting-disabled">
                                        {bookmaker.ls1}
                                      </div>
                                      <div className="box-1 lay1 float-left text-center betting-disabled"></div>
                                      <div className="box-1 lay2 float-left text-center betting-disabled"></div>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="table-remark text-right remark">
                              Virtual Cricket Started In Our Exchange
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
                            <div className="box-1 float-left lay text-center">
                              <b>No</b>
                            </div>
                            <div className="back box-1 float-left back text-center">
                              <b>Yes</b>
                            </div>
                            <div className="box-2 float-left"></div>
                          </div>
                          
                          <div className="table-body">
                          {
                            fancyOdds[currentFancy]?.map((e)=>{
                             
                              return(
                                <div className="fancy-tripple">
                              <div
                                data-title="Ball Running"
                                className="table-row suspended">
                                <div
                                  className="float-left country-name box-6"
                                  style={{ borderBottom: "0px" }}>
                                  <p className="m-b-0">
                                    <a href="/">{e.nation}</a>
                                  </p>
                                  <p className="m-b-0">
                                    <span style={{ color: "black" }}></span>
                                  </p>
                                </div>
                                <div className="box-1 lay float-left text-center betting-disabled">{e.l1}</div>
                                <div className="box-1 back float-left text-center betting-disabled">{e.b1}</div>
                                <div
                                  className="box-2 float-left text-right min-max"
                                  style={{ borderBottom: "0px" }}>
                                  <span className="d-block">
                                    Min: <span>100</span>
                                  </span>{" "}
                                  <span className="d-block">
                                    Max: <span>100K</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                              )
                            })
                          }
                          </div>

                          <div></div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    <ul className="nav nav-tabs mt-1">
                      {gameName?.length &&
                        gameName.slice(2).map((item, id) => {
                          return (
                            <li
                              className="nav-item"
                              key={item + id}
                              onClick={() => handleGameName(item, id)}>
                                 
                              <button
                                href="#"
                                data-toggle="tab"
                                className={`nav-link ${
                                  FancyActive === id ? "active" : ""
                                }`}>
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
                                <span>{currentFancy} Market</span>{" "}
                                <a href="/" className="m-r-5 game-rules-icon">
                                  <span>
                                    <i className="fa fa-info-circle float-right"></i>
                                  </span>
                                </a>
                              </div>
                              <div className="table-header">
                                <div className="float-left country-name box-6"></div>
                                <div className="back box-1 float-left lay text-center">
                                  <b>No</b>
                                </div>
                                <div className="box-1 float-left back text-center">
                                  <b>Yes</b>
                                </div>
                                <div className="box-2 float-left"></div>
                              </div>
                              {fancyOdds[currentFancy]?.map((item, id) => {
                                return (
                                  <>
                                    <div className="table-body" key={item.sid + id}>
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
                                            <p className="m-b-0">
                                              <span style={{ color: "black" }}>
                                                0
                                              </span>
                                            </p>
                                          </div>
                                          <div className="box-1 lay float-left text-center">
                                            <span className="odd d-block">
                                            {item?.l1}
                                            </span>
                                            <span>{item?.ls1}</span>
                                          </div>
                                          <div className="box-1 back float-left text-center">
                                            <span className="odd d-block">
                                            {item?.b1}
                                            </span>
                                            <span>{item?.bs1}</span>
                                          </div>
                                          <div
                                            className="box-2 float-left text-right min-max"
                                            style={{ borderBottom: "0px"}}>
                                            <span className="d-block">
                                              Min:
                                              <span>100</span>
                                            </span>
                                            <span className="d-block">
                                              Max:
                                              <span>5K</span>
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

                    <div className="markets"></div>
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
                        matchValue={matchValue}
                        betShow={betShow}
                        gName={gName}
                        classnameValue={classnameValue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div> */}

      {/* Mobile view Game detail  */}
      {/* -------------------------------------------- */}
      {/* -------------------------------------------- */}
      {/* -------------------------------------------- */}

      <div className="wrapper">
        {
          status===true?timeOut !==1 && <AlertBtn color="success" val={messege}/>:""
          }
          {
            status===400? timeOut !==1 && <AlertBtn color="danger" val={messege}/>:""
          }
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
                    return (
                      <>
                        <div
                          className={`market-title mt-1 ${
                            item.runners.length === 0 ? "d-none" : ""
                          }`}
                          key={item.marketId + id}>
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
                                Max:
                                <span>10000</span>
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
                                    key={event.selectionId + index}>
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
                                      event.ex.availableToBack.map((e, id) => {
                                        return (
                                          <div
                                            key={e.size + e.price + id}
                                            className={`box-1 back1 float-left back-1 text-center ${
                                              id === 0 || id === 1
                                                ? "d-none"
                                                : ""
                                            }  ${
                                              e.price !==
                                              previousState?.Odds[id1].runners[
                                                index
                                              ]?.ex?.availableToBack[id]?.price
                                                ? "blink"
                                                : ""
                                            }`}>
                                            <button
                                              onClick={(e) => handleShow(e)}>
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
                                                {e.size === "" ? "0.0" : e.size}
                                              </span>
                                            </button>
                                          </div>
                                        );
                                      })}

                                    {event.ex.availableToLay?.length &&
                                      event.ex.availableToLay.map((e, id) => {
                                        return (
                                          <div
                                            key={e.size + e.price}
                                            className={`box-1 lay float-left text-center ${
                                              id === 1 || id === 2
                                                ? "d-none"
                                                : ""
                                            } ${
                                              e.price !==
                                              previousState?.Odds[id1].runners[
                                                index
                                              ]?.ex?.availableToLay[id]?.price
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

                                      {
                                        status===true || status===400?"":<Modal
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
                                      }
                                    
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div></div>
                </div>
                <div>
                  <div className="market-title mt-1">
                    Bookmaker
                    <p className="float-right mb-0">
                      <i className="fas fa-info-circle"></i>
                    </p>
                  </div>
                  <div className="bookmaker-market">
                    <div className="table-header">
                      <div className="float-left country-name box-6 min-max">
                        <b>Min:100 Max:200000</b>
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
                          // console.log(bookmaker)
                          return (
                            <div
                              key={bookmaker.sid + id}
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
                            <Link data-toggle="tab" className="nav-link">
                              {item}
                            </Link>
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
                                <div className="table-body" key={id}>
                                  <div className="fancy-tripple">
                                    <div data-title="" className="table-row">
                                      <div className="float-left country-name box-4">
                                        <span>
                                          <b>{item?.nation}</b>
                                        </span>
                                        <div className="float-right">
                                          <div className="info-block">
                                            <a
                                              href="/"
                                              data-toggle="collapse"
                                              data-target="/min-max-info355"
                                              aria-expanded="false"
                                              className="info-icon collapsed">
                                              <i className="fas fa-info-circle m-l-10"></i>
                                            </a>
                                            <div
                                              id="min-max-info355"
                                              className="min-max-info collapse">
                                              <span>
                                                <b>Min:</b>
                                                100
                                              </span>{" "}
                                              <span>
                                                <b>Max:</b>
                                                200000
                                              </span>
                                            </div>
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
                                        <button onClick={(e) => handleShow(e)}>
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
                                        <button onClick={(e) => handleShow(e)}>
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
                                            {item?.bs1 === "" ? "0" : item?.bs1}
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
    </div>
  );
}

export default GameDetail;

// Bookmaker Blick code:

// ${bookmaker.l1 !==previousState.Bookmaker[id].l1? "blink":""}
