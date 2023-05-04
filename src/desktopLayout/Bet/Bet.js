import React, { useState } from "react";
import "./Bet.css";
import { GameAPI } from "../../apis/gameAPI";

const Bet = ({
  spanValueRate,
  spanValueName,
  colorName,
  matchId,
  marketId,
  selectionId,
  MarketName,
  placeTime,
  isFancy,
  // data,
  priceValue,
  profits,
  StackVal,
  userIP,
}) => {
  const [betDivClose, setBetdivClose] = useState(false);
  const [updated, setUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log(marketId, "sadadas");

  const handleSubmit = () => {
    setIsLoading(true);
    GameAPI.PLACE_BET({
      userIp: userIP,
      isFancy: isFancy,
      isBack: colorName === "back" ? true : false,
      odds: spanValueRate,
      stake: parseInt(updated),
      name: spanValueName,
      marketName: MarketName,
      selectionId: parseInt(selectionId),
      priceValue: isFancy === false ? spanValueRate : priceValue,
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
        setIsLoading(false);
        // data({
        //   status: true,
        //   message: res.data.message,
        // });
      })
      .catch((error) => {
        // data({
        //   status: error.response.status,
        //   message: error.response.data.message,
        // });
      });
  };

  const handleClick = (e, val) => {
    e.preventDefault();

    setUpdated(val);
  };
  const handleBetClose = () => {
    if (betDivClose === false) {
        setBetdivClose(true);
    } else {
      setBetdivClose(false);
    }
  };

  return (
    <>
      <div className="sidebar-right-inner">
        <div className="card m-b-10 place-bet">
          <div className="card-header bet-header">
            <h6 className="card-title d-inline-block">Place Bet</h6>
          </div>
          <div>
            {betDivClose && (
              <div className={`table-responsive bet-table ${colorName}`}>
                <form>
                  <table
                    className={`coupon-table table table-borderedless ${colorName}`}>
                    <thead>
                      <tr>
                        <th></th>
                        <th style={{ width: "35%", textAlign: "left" }}>
                          (Bet for)
                        </th>
                        <th style={{ width: "25%", textAlign: "left" }}>
                          Odds
                        </th>
                        <th style={{ width: "15%", textAlign: "left" }}>
                          Stake
                        </th>
                        <th style={{ width: "15%", textAlign: "right" }}>
                          Profit
                        </th>
                      </tr>
                    </thead>
                   
                      
                        <tbody>
                          <tr>
                            <td className="text-center">
                              <button
                                onClick={handleBetClose}
                                className="text-danger closeIcon">
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                            <td>{spanValueName}</td>
                            <td className="bet-odds">
                              <div className="form-group">
                                <input
                                  placeholder="0"
                                  type="text"
                                  required="required"
                                  maxlength="4"
                                  readonly="readonly"
                                  className="amountint"
                                  value={spanValueRate}
                                  style={{
                                    width: "45px",
                                    verticalAlign: "middle",
                                  }}
                                />
                                <div className="spinner-buttons input-group-btn btn-group-vertical">
                                  <button
                                    type="button"
                                    className="custom-btn-spinner btn btn-xs btn-default">
                                    <i className="fa fa-angle-up"></i>
                                  </button>{" "}
                                  <button
                                    type="button"
                                    className="custom-btn-spinner btn btn-xs btn-default">
                                    <i className="fa fa-angle-down"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="bet-stakes">
                              <div className="form-group bet-stake">
                                <input
                                  maxlength="10"
                                  required="required"
                                  type="text"
                                  value={updated}
                                />
                              </div>
                            </td>
                            <td className="text-right bet-profit">
                              <span
                                className={`${
                                  isFancy === true ? "fancy-none" : ""
                                }`}>
                                {marketId?.includes("BM") ||
                                marketId?.includes("Bm") ||
                                marketId?.includes("bm")
                                  ? profits?.Bookmaker?.filter(
                                      (item) => item?.mid === marketId
                                    ).map((profit) => {
                                      return (
                                        profit.sid === selectionId &&
                                        (
                                          (profit?.value || 0) +
                                          ((colorName === "back" ? 1 : -1) *
                                            spanValueRate *
                                            updated) /
                                            100
                                        ).toFixed(2)
                                      );
                                    })
                                  : profits?.Odds[marketId]?.map((profit) => {
                                      return (
                                        profit.sid === selectionId &&
                                        (
                                          (profit?.value || 0) +
                                          (colorName === "back" ? 1 : -1) *
                                            (spanValueRate - 1) *
                                            updated
                                        ).toFixed(2)
                                      );
                                    })}
                              </span>
                              <span
                                className={`${
                                  isFancy === true ? "" : "fancy-none"
                                }`}>
                                {updated || 0}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td
                              colspan="5"
                              className="value-buttons"
                              style={{ padding: "5px" }}>
                              {StackVal &&
                                Object.values(StackVal)?.map((item, id) => {
                                  // console.log(e, "das")
                                  return (
                                    <button
                                      className="btn btn-secondary m-l-5 m-b-5"
                                      onClick={(e) => handleClick(e, item)}
                                      //   value={e}
                                    >
                                      {item}
                                    </button>
                                  );
                                })}
                            </td>
                          </tr>
                        </tbody>
                      
                   
                  </table>
                 
                    <div className="col-md-12">
                      <button
                        type="button"
                        onClick={handleBetClose}
                        className="btn btn-sm btn-danger float-left">
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-sm btn-success float-right m-b-5">
                        Submit
                      </button>
                    </div>
                 
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="card m-b-10 my-bet">
          <div className="card-header bet-header">
            <h6 className="card-title d-inline-block">My Bet</h6>
          </div>
          <div className="card-body">
            <table className="coupon-table table  table-borderedless">
              <thead>
                <tr>
                  <th style={{ width: "60%" }}>Matched Bet</th>
                  <th className="text-right">Odds</th>
                  <th className="text-center">Stake</th>
                </tr>
              </thead>
              <tr>
                <td colSpan="3" className="text-center">
                  No records Found
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bet;
