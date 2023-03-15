import { React, useState } from "react";
import "./Bet.css";

function Bet({ classnameValue, matchValue, betShow, gName }) {
  const [updated, setUpdated] = useState("");

  // const [betColorBack ,setBetColorBack]=useState("false")
  // const [betColorLay ,setBetColorLay]=useState("false")
  const handleClick = (event) => {
    setUpdated(event.target.value);
  };
  // console.log(classnameValue)

  const [show, setShow] = useState(true);

  const toggle = () => {
    if (show === true) {
      setShow(false);
    }
  };

  const check = () => {
    if (updated === "") {
      alert("Amount is Required");
    } else {
      alert("Check Maximum Bet Limit");
    }
  };
  // console.log(betShow)

  // console.log(matchValue)

  return (
    <div>
      <div className="ps">
        <div className="sidebar-right-inner">
          <div className="card m-b-10 place-bet">
            <div className="card-header">
              <h6 className="card-title d-inline-block">Place Bet</h6>
            </div>
            {betShow ? (
              <div>
                <div className={`table-responsive ${classnameValue}`}>
                  <form>
                    <table className="coupon-table table table-borderedless">
                      <thead>
                        <tr>
                          <th style={{ width: "35%", textAlign: "left" }}>
                            (Bet for)
                          </th>
                          <th style={{ width: "35%", textAlign: "left" }}>
                            Odds
                          </th>
                          <th style={{ width: "15%", textAlign: "left" }}>
                            Stake
                          </th>
                          <th style={{ width: "15%", textAlign: "righ" }}>
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className={`${classnameValue}`}>
                        <tr>
                          <td
                            className="text-center"
                            style={{
                              paddingLeft: "0px",
                              paddingRight: "11px",
                              textAlign: "left",
                            }}>
                            {/* eslint-disable-next-line */}
                            <a
                              href="#"
                              className="text-danger"
                              onClick={toggle}
                              style={{ marginLeft: "-14px" }}>
                              <i className="fa fa-times"></i>
                            </a>
                            <span style={{ paddingLeft: "4px" }}>{gName}</span>
                          </td>
                          <td className="bet-odds">
                            <div className="form-group">
                              <input
                                placeholder="0"
                                type="number"
                                required="required"
                                maxLength="4"
                                value={matchValue}
                                readOnly="readonly"
                                className="amountint"
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
                                maxLength="10"
                                required="required"
                                type="text"
                                value={updated}
                              />
                            </div>
                          </td>
                          <td className="text-right bet-profit">
                            {(updated * matchValue - updated).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan="5"
                            className="value-buttons"
                            style={{ padding: "5px", paddingLeft: "12px" }}>
                            <button
                              type="button"
                              onClick={handleClick}
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="1000">
                              1000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="5000"
                              onClick={handleClick}>
                              5000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="10000"
                              onClick={handleClick}>
                              10000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="25000"
                              onClick={handleClick}>
                              25000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="50000"
                              onClick={handleClick}>
                              50000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="100000"
                              onClick={handleClick}>
                              100000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="200000"
                              onClick={handleClick}>
                              200000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="500000"
                              onClick={handleClick}>
                              500000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="1000000"
                              onClick={handleClick}>
                              1000000
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary m-l-5 m-b-5"
                              value="2500000"
                              onClick={handleClick}>
                              2500000
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={`${classnameValue}`}>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger float-left"
                        onClick={toggle}
                        style={{ marginLeft: "30px" }}>
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-success float-right m-b-5"
                        style={{ marginRight: "30px" }}
                        onClick={check}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card m-b-10 my-bet">
            <div className="card-header">
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
        <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            className="ps__thumb-x"
            tabIndex="0"
            style={{ left: "0px", width: "0px" }}></div>
        </div>
        <div className="ps__rail-y" style={{ top: "0px", right: "0px" }}>
          <div
            className="ps__thumb-y"
            tabIndex="0"
            style={{ top: "0px", height: "0px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default Bet;
