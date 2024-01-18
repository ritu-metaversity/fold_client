import React, { useContext, useEffect, useState } from "react";
import "./CasinoBetSlip.css";
import CasinoModal from "../Modal/CasinoModal";
import { globalContext } from "../../CasinoMainPage/CasinoMainPage";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

const CasinoBetSlip = ({
  stakes,
  betState,
  setShowBetSection,
  showBetSection,
  open,
  setOpen,
  updated,
  setUpdated,
}) => {
  const [userIp, setUserIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [betPlace, setBetPlace] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetch("https://oddsapi.247idhub.com/betfair_api/my-ip")
      .then((res) => res.json())
      .then((res) => {
        setUserIP(res?.ip);
      });
  }, []);

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    axios
      .post(
        "http://13.250.53.81/VirtualCasinoBetPlacer/vc/place-bet",
        {
          ...betState,
          stake: updated,
          userIp: userIp,
          matchId: id,
          deviceInfo: {
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
            browser: "Chrome",
            device: "Macintosh",
            deviceType: "desktop",
            os: "Windows",
            os_version: "windows-10",
            browser_version: "108.0.0.0",
            orientation: "landscape",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.status === true) {
          setBetPlace && setBetPlace((o) => !o);
          handleBetClose();
          toast.success("Success !!");
        } else {
          toast.error(res.data.message || "Failed !!");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Failed !!");
      });
  };

  const handleClick = (event) => {
    setUpdated(event);
  };
  const handleBetClose = (event) => {
    setUpdated(event);
    showBetSection && setShowBetSection(false);
    setOpen(false);
  };

  return (
    <>
      <>
        {isLoading && (
          <p className="place-lodder">
            <div>
              <i className="fa fa-spinner fa-spin"></i>
            </div>
          </p>
        )}
        <div
          className="ps card d-none d-sm-block desk-view-casino"
          style={{ marginRight: "4px" }}>
          <div>
            <div
              className="card-header bg-primary text-white"
              style={{ padding: "0.5rem 1rem" }}>
              Place Bet
            </div>
            {showBetSection && (
              <div className="">
                <div
                  className={`table-responsive bet-table ${betState?.colorName}`}>
                  <form>
                    <table className={`coupon-table table table-borderedless `}>
                      <thead>
                        <tr
                          style={{ backgroundColor: "#ccc", fontSize: "12px" }}>
                          <th style={{ width: "2%" }}></th>
                          <th
                            style={{
                              width: "28%",
                              fontSize: "12px",
                              textAlign: "left",
                              marginLeft: "12px",
                            }}>
                            (Bet for)
                          </th>
                          <th
                            style={{
                              width: "25%",
                              fontSize: "12px",
                              textAlign: "left",
                            }}>
                            Odds
                          </th>
                          <th
                            style={{
                              width: "15%",
                              fontSize: "12px",
                              textAlign: "left",
                            }}>
                            Stake
                          </th>
                          <th
                            style={{
                              width: "15%",
                              fontSize: "12px",
                              textAlign: "right",
                              paddingRight: "5px",
                            }}>
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className={betState?.colorName}>
                        <tr style={{ height: "40px" }}>
                          <td>
                            <div
                              onClick={handleBetClose}
                              className="text-danger closeIcon">
                              <i className="fa fa-times"></i>
                            </div>
                          </td>
                          <td
                            style={{
                              whiteSpace: "initial",
                              fontWeight: "bold",
                            }}>
                            {betState?.nation}
                          </td>
                          <td className="bet-odds">
                            <div className="">
                              <input
                                placeholder="0"
                                type="text"
                                required="required"
                                maxlength="4"
                                readonly="readonly"
                                className="amountint"
                                value={betState?.odds}
                                style={{
                                  width: "40px",
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
                            <div className=" bet-stake">
                              <input
                                maxlength="10"
                                required="required"
                                type="number"
                                onChange={(e) => setUpdated(e.target.value)}
                                value={updated}
                              />
                            </div>
                          </td>
                          <td
                            className="text-right bet-profit"
                            style={{ paddingRight: "5px" }}>
                            0.00
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={5}
                            className="value-buttons"
                            style={{ padding: "5px" }}>
                            {stakes &&
                              Object?.values(stakes)?.map((item, id) => {
                                return (
                                  <button
                                    key={id + item}
                                    className="btn m-l-5 m-b-5"
                                    onClick={() => handleClick(item)}
                                    // value={e}
                                    type="button">
                                    {item}
                                  </button>
                                );
                              })}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="col-md-12 palce_btn">
                      <button
                        type="button"
                        onClick={handleBetClose}
                        className="btn btn-sm btn-danger float-left"
                        style={{ fontSize: "14px", padding: "0.25rem 0.5rem" }}>
                        Reset
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-sm btn-success float-right m-b-5"
                        style={{ fontSize: "14px", padding: "0.25rem 0.5rem" }}>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {window.innerWidth < 801 && (
          <CasinoModal
            open={open}
            handleClose={handleBetClose}
            title="Place Bet">
            {isLoading && (
              <p className="place-lodder">
                <div>
                  <i className="fa fa-spinner fa-spin"></i>
                </div>
              </p>
            )}
            <div className={`place-bet pt-2 pb-2 ${betState?.colorName}`}>
              <div className={`container-fluid container-fluid-5`}>
                <div className="stake_container mt-2">
                  <div className="">
                    <b>{betState?.nation}</b>
                  </div>
                  <div></div>
                  <div className="d-flex">
                    <button
                      className="stakeactionminus btn-primary btn"
                      disabled>
                      <span className="fa fa-minus"></span>
                    </button>{" "}
                    <input
                      placeholder="15"
                      className="w-100"
                      // onChange={(e) => setgetBetValu(e.target.value)}
                      value={betState?.odds}
                      readOnly
                    />
                    <button
                      className="stakeactionminus btn-primary btn"
                      disabled>
                      <span className="fa fa-plus"></span>
                    </button>
                  </div>
                  <div className="">
                    <input
                      type="number"
                      placeholder="0"
                      className=" w-100"
                      value={updated}
                      autoFocus
                      onChange={(e) => setUpdated(Number(e.target.value))}
                    />
                  </div>
                  <div className="">
                    <button
                      className="btn btn-primary btn-block w-100"
                      onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                  <div className=" text-center pt-1"></div>
                  {/* {stakes?.map((e, id) => {
                    return (
                      <div className="" key={e + id}>
                        <button
                          className="btn btn-primary btn-block w-100"
                          onClick={() => handleClick(e)}
                        >
                          {e}
                        </button>
                      </div>
                    );
                  })} */}
                  {stakes &&
                    Object?.values(stakes)?.map((item, id) => {
                      return (
                        <button
                          key={item + id}
                          className="btn btn-primary btn-block w-100"
                          onClick={() => handleClick(item)}
                          style={{background:"#2c3d50"}}
                          // value={e}
                          type="button">
                          {item}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
          </CasinoModal>
        )}
      </>
    </>
  );
};

export default CasinoBetSlip;
