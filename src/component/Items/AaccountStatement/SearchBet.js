import { React, useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "./SearchBet.css";

const SearchBet = (props) => {
  const [betValue, setBetValue] = useState(1);
  const [betListData, setBetListData] = useState();


  useEffect(() => {
    UserAPI.Bet_Search({
      marketId: props.MarketId,
      userId: "",
      betType: betValue,
    }).then((res) => {
      setBetListData(res.data);
    });
    // eslint-disable-next-line
  }, [betValue]);


  return (
    <div>
      <div id="__BVID__287___BV_modal_body_">
        <div>
          <div className={`place-bet pt-2 pb-2`}>
            <div className={`container-fluid container-fluid-5`}>
              <div className="row row5">
                <div className="col-12 remark-name">{props.remark}</div>

                <div className="row row5 mt-2" style={{ marginInline: "-7px" }}>
                  <div className="col-6">
                    <div
                      className="form-group mb-0"
                      style={{ marginTop: "12px" }}>
                      <div
                        id="match_unmatched_delete"
                        role="radiogroup"
                        tabIndex="-1">
                        <div className="custom-control custom-control-inline custom-radio p-l">
                          <input
                            id="all"
                            type="radio"
                            name="match"
                            autoComplete="off"
                            className="custom-control-input"
                            onChange={(e) => setBetValue(e.target.value)}
                            value="1"
                            defaultChecked
                          />
                          <label
                            htmlFor="all"
                            className="custom-control-label control-label1">
                            <span>All</span>
                          </label>
                        </div>
                        <div className="custom-control custom-control-inline custom-radio p-l ">
                          <input
                            id="Back"
                            type="radio"
                            name="match"
                            autoComplete="off"
                            className="custom-control-input"
                            onChange={(e) => setBetValue(e.target.value)}
                            value="2"
                          />
                          <label
                            htmlFor="Back"
                            className="custom-control-label control-label1">
                            <span>Back</span>
                          </label>
                        </div>
                        <div className="custom-control custom-control-inline custom-radio p-l">
                          <input
                            id="Lay"
                            type="radio"
                            name="match"
                            autoComplete="off"
                            className="custom-control-input"
                            onChange={(e) => setBetValue(e.target.value)}
                            value="3"
                          />
                          {/* <input type="radio"/> */}
                          <label
                            htmlFor="Lay"
                            className="custom-control-label control-label1">
                            <span>Lay</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stack-value">
                      <p>
                        Total Stake:{" "}
                        <span className="cback">{betListData?.totalStake}</span>
                      </p>
                      <p>
                        Total Bets:{" "}
                        <span className="cback">{betListData?.totalBets}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="row row5 mt-2">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table
                        role="table"
                        aria-busy="false"
                        aria-colcount="6"
                        className="table b-table"
                        id="__BVID__104">
                        <thead>
                          <tr role="row" className="s-table">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              className="text-left nation-name">
                              Nation
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left rate">
                              Rate
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left amount">
                              Amount
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left win">
                              Win
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left date">
                              Date
                            </th>
                            {/* <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="4"
                              className="text-left">
                              IP B Details
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {betListData?.betList?.map((item, id) => {
                            return (
                              <tr role="row" key={id} className={`bet-details ${item.isback===true?"back":"lay"} `}>
                                <td  className="text-left">
                                  {item.marketname}
                                </td>
                                <td className="text-left">
                                  {item.odds}
                                </td>
                                <td  className="text-left ">
                                  {item.stack}
                                </td>
                                <td  className="text-left">
                                  {parseFloat(item.netpnl).toFixed(2)}
                                </td>
                                <td  className="text-left">
                                  {item.matchedtime}
                                </td>
                                {/* <td aria-colindex="5" className="text-right ">
                                  Details
                                </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBet;
