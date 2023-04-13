import { React, useEffect, useState } from "react";
import "./Placebet.css";
import { GameAPI } from "../../apis/gameAPI";
import axios from "axios";

function Placebet({
  spanValueRate,
  spanValueName,
  colorName,
  matchId,
  marketId,
  selectionId,
  MarketName,
  placeTime,
  isFancy,
  data,
  priceValue,
  profits,
  StackVal,

}) {
  const [updated, setUpdated] = useState("");
  // const [StackVal, setStackVal] = useState("");
  const [userIP, setUserIP] = useState("");
  // eslint-disable-next-line
  const [odds, setOdds] = useState(spanValueRate);
  // eslint-disable-next-line
  const [name, setName] = useState(spanValueName);

  const [getBetValu, setgetBetValu] = useState(spanValueRate);
  const handleClick = (event) => {
    setUpdated(event.target.value);
  };

  // console.log(typeof updated)

  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((res) => {
      setUserIP(res.data.IPv4);
    });
  }, []);

  const handleSubmit = () => {
    GameAPI.PLACE_BET({
      userIp: userIP,
      isFancy: isFancy,
      isBack: colorName === "back" ? true : false,
      odds: odds,
      stake: parseInt(updated),
      name: name,
      marketName: MarketName,
      selectionId: parseInt(selectionId),
      priceValue: isFancy === false ? odds : priceValue,
      placeTime: placeTime,
      marketId: marketId === "" ? selectionId : marketId,
      matchId: matchId,
      deviceInfo: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        browser: "Chrome",
        device: "Macintosh",
        deviceType: "desktop",
        os: "Windows",
        os_version: "windows-10",
        browser_version: "108.0.0.0",
        orientation: "landscape",
      },
    })
      .then((res) => {
        // setStatus(res.data.status);
        data({
          status: true,
          message: res.data.message,
        });
      })
      .catch((error) => {
        data({
          status: error.response.status,
          message: error.response.data.message,
        });
      });
  };

  // useEffect(() => {
  //   GameAPI.Place_Bet().then((res) => {
  //     setStackVal(res);
  //   });
  // }, []);

  return (
    <>
      <div id="__BVID__287___BV_modal_body_">
        <div>
          <div className={`place-bet pt-2 pb-2`}>
            <div className={`container-fluid container-fluid-5`}>
              <div className="row row5">
                <div className="col-5">
                  <b>{spanValueName}</b>
                </div>
                <div className="col-7 text-right">
                  <div className="float-right d-flex">
                    <button
                      className="stakeactionminus btn"
                      onClick={() =>
                        setgetBetValu(
                          getBetValu >= 2 ? getBetValu - 0.1 : getBetValu - 0.05
                        )
                      }
                      disabled={parseFloat(getBetValu).toFixed(2) === 1}>
                      <span className="fa fa-minus"></span>
                    </button>{" "}
                    <input
                      type="text"
                      placeholder="15"
                      className="stakeinput"
                      onChange={(e) => setgetBetValu(e.target.value)}
                      value={
                        parseFloat(getBetValu).toFixed(2) <= 1 ? 0 : getBetValu
                      }
                      readOnly
                    />
                    <button
                      className="stakeactionminus btn"
                      onClick={() =>
                        setgetBetValu(
                          getBetValu >= 2 ? getBetValu + 0.1 : getBetValu + 0.05
                        )
                      }>
                      <span className="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row row5 mt-2">
                <div className="col-4">
                  <input
                    type="number"
                    // placeholder="00"
                    className="stakeinput w-100"
                    value={updated === "" ? "00" : updated}
                  />
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
                <div className="col-4 text-center pt-1">
                  <span className={`${isFancy === true ? "fancy-none" : ""}`}>
                    {marketId?.includes("BM") ||
                    marketId?.includes("Bm") ||
                    marketId?.includes("bm")
                      ? profits?.Bookmaker?.filter(
                          (item) => item?.mid === marketId
                        ).map((profit) => {
                          return (
                            profit.sid === selectionId &&
                            (profit?.value || 0) +
                              ((colorName === "back" ? 1 : -1) *
                                odds *
                                updated) /
                                100
                          );
                        })
                      : profits?.Odds[marketId]?.map((profit) => {
                          return (
                            profit.sid === selectionId &&
                            (profit?.value || 0) +
                              (colorName === "back" ? 1 : -1) *
                                (odds - 1) *
                                updated
                          );
                        })}
                  </span>
                  <span className={`${isFancy === true ? "" : "fancy-none"}`}>
                    {updated || 0}
                  </span>
                </div>
              </div>
              <div className="row row5 mt-2">
                {Object.values(StackVal)?.map((e, id) => {
                  return (
                    <div className="col-4" key={e + id}>
                      <button
                        className="btn btn-secondary btn-block mb-2"
                        onClick={handleClick}
                        value={e}>
                        {e}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className={`${isFancy === true ? "fancy-none" : ""}`}>
                {marketId?.includes("BM") ||
                marketId?.includes("bm") ||
                marketId?.includes("Bm")
                  ? profits.Bookmaker?.filter(
                      (item) => item?.mid === marketId
                    ).map((profit) => (
                      <div
                        key={profit.value}
                        className={`row row5 mt-2 ${
                          isFancy === true ? "fancy-none" : ""
                        }`}
                        // key={e.selectionId}
                      >
                        <div className="col-4">
                          <span>{profit.title}</span>
                        </div>
                        <div className="col-4 text-center">
                          <b>
                            <span
                              style={{ color: "black" }}
                              className={`${
                                profit?.value > 0
                                  ? "text-success"
                                  : "text-danger"
                              }`}>
                              {profit.value}
                            </span>
                          </b>
                        </div>
                        <div
                          className={`col-4 text-right ${
                            (profit.sid == selectionId
                              ? (profit?.value || 0) +
                                ((colorName === "back" ? 1 : -1) *
                                  odds *
                                  updated) /
                                  100
                              : (profit?.value || 0) +
                                (colorName === "back" ? -1 : 1) * updated) < 0
                              ? "text-danger"
                              : "text-success"
                          }`}>
                          {profit.sid == selectionId
                            ? (profit?.value || 0) +
                              ((colorName === "back" ? 1 : -1) *
                                odds *
                                updated) /
                                100
                            : (profit?.value || 0) +
                              (colorName === "back" ? -1 : 1) * updated}
                        </div>
                      </div>
                    ))
                  : Number(marketId) &&
                    profits.Odds[marketId]?.map((profit) => (
                      <div
                        className={`row row5 mt-2 ${
                          isFancy === true ? "fancy-none" : ""
                        }`}
                        key={profits.sid}>
                        <div className="col-4">
                          <span>{profit.title}</span>
                        </div>
                        <div className="col-4 text-center text-success">
                          <b>
                            <span
                              style={{ color: "black" }}
                              className={`${
                                profit?.value > 0
                                  ? "text-success"
                                  : "text-danger"
                              }`}>
                              {profit.value}
                            </span>
                          </b>
                        </div>
                        <div
                          className={`col-4 text-right ${
                            (profit.sid === selectionId
                              ? profit.value +
                                (colorName === "back" ? 1 : -1) *
                                  (odds - 1) *
                                  updated
                              : profit.value +
                                (colorName === "back" ? -1 : 1) * updated) > 0
                              ? "text-success"
                              : (profit.sid === selectionId
                                  ? profit.value +
                                    (colorName === "back" ? 1 : -1) *
                                      (odds - 1) *
                                      updated
                                  : profit.value +
                                    (colorName === "back" ? -1 : 1) * updated) <
                                0
                              ? "text-danger"
                              : ""
                          }`}>
                          {profit.sid === selectionId
                            ? profit.value +
                              (colorName === "back" ? 1 : -1) *
                                (odds - 1) *
                                updated
                            : profit.value +
                              (colorName === "back" ? -1 : 1) * updated}
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Placebet;
