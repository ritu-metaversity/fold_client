import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "./ExposureModal.css";
import ExpNav from "./ExpNav";

const ExposureModal = () => {
  const [DataList, setDataList] = useState("");
  const [ListLength, setListLength] = useState("");
  const [BetDetail, setBetDetail] = useState();
  // const [pagination, setPagination] = useState(0);
  const [betExpValue, setBetExpValue] = useState(1);
  const [deleteVal, setDeleteVal] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [spType, setSpType] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const sporttype = (val) => {
    setSpType(val);
  };

  useEffect(() => {
    UserAPI.Unsetteled_bet({
      noOfRecords: 100,
      index: 0,
      sportType: spType,
      betType: betExpValue,
    }).then((res) => {
      // setPageLength(res.data.totalPages);
      setIsLoading(false);
      setBetDetail(res?.data);
      setCurrentPage(res.data.currentPage);
      setDataList(res.data.dataList);
    });
    // eslint-disable-next-line
  }, [betExpValue, spType]);

  return (
    <>
      <div className="report-container wrapper main-exp-containor">
        <div className="card">
          <ExpNav sporttype={sporttype} />
          <div className="card-body container-fluid container-fluid-5 exposre">
            {isLoading ? (
              <p className="lodder">
                <i className="fa fa-spinner fa-spin"></i>
              </p>
            ) : (
              <div className={`${deleteVal === "2" ? "d-none" : ""}`}>
                <div
                  className={`row row5 mt-2  ${
                    ListLength === 0 ? "dis-none" : ""
                  }`}>
                  <div className="col-6">
                    <div className="form-group mb-0">
                      <div className="mt-2">
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <div
                              id="match_unmatched_delete"
                              role="radiogroup"
                              className="exp_data"
                              tabIndex="-1">
                              <div className="custom-control custom-control-inline expRedioBtn1  custom-radio">
                                <input
                                  id="all_exp"
                                  type="radio"
                                  name="exp"
                                  autoComplete="off"
                                  className="custom-control-input"
                                  onChange={(e) =>
                                    setBetExpValue(e.target.value)
                                  }
                                  value="1"
                                  defaultChecked
                                />{" "}
                                <label
                                  htmlFor="all_exp"
                                  className="custom-control-label control-label1">
                                  <span>All</span>
                                </label>
                              </div>
                              <div className="custom-control custom-control-inline expRedioBtn custom-radio">
                                <input
                                  id="Back_exp"
                                  type="radio"
                                  name="exp"
                                  autoComplete="off"
                                  className="custom-control-input"
                                  onChange={(e) =>
                                    setBetExpValue(e.target.value)
                                  }
                                  value="2"
                                />
                                <label
                                  htmlFor="Back_exp"
                                  className="custom-control-label control-label1">
                                  <span>Back</span>
                                </label>
                              </div>
                              <div className="custom-control custom-control-inline expRedioBtn custom-radio">
                                <input
                                  id="Lay_exp"
                                  type="radio"
                                  name="exp"
                                  autoComplete="off"
                                  className="custom-control-input"
                                  onChange={(e) =>
                                    setBetExpValue(e.target.value)
                                  }
                                  value="3"
                                />
                                {/* <input type="radio"/> */}
                                <label
                                  htmlFor="Lay_exp"
                                  className="custom-control-label control-label1">
                                  <span>Lay</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      className="form-group mb-0"
                      style={{ marginTop: "12px" }}>
                      <div className="row row5 mt-2">
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <div
                              id="match_unmatched_delete"
                              role="radiogroup"
                              tabIndex="-1">
                              <div className="custom-control custom-control-inline custom-radio">
                                <div>
                                  <span className="betInfo">
                                    Total Bets:{" "}
                                    <span className="betColor">
                                      {BetDetail?.totalBets}
                                    </span>
                                  </span>{" "}
                                  <span className="betInfo">
                                    Total Amount:{" "}
                                    <span className="betColor">
                                      {BetDetail?.totalStake}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="table-responsive unsetTable expMaindiv">
                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="10"
                      className="table b-table table-bordered"
                      id="__BVID__96">
                      <thead className="theme1font">
                        <tr role="row" className="">
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="1"
                            className="text-left bg-color">
                            Sport Name
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            className="text-left bg-color eventName">
                            Event Name
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            className="text-left bg-color">
                            Market Name
                          </th>

                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="5"
                            className="text-left bg-color eventName">
                            Nation
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="6"
                            className="text-left bg-color">
                            User Rate
                          </th>

                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="8"
                            className="text-left bg-color">
                            Amount
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="9"
                            className="text-center bg-color eventName">
                            Place Date
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={DataList?.length === 0 ? "dis-none" : ""}>
                        {DataList?.length &&
                          DataList.map((item, id) => {
                            return (
                              <tr
                                role="row"
                                key={item.pnl + id}
                                className={`${
                                  item.isback === true
                                    ? "back"
                                    : item.isback === false
                                    ? "lay"
                                    : ""
                                }`}>
                                <td
                                  role="columnheader"
                                  aria-colindex="1"
                                  className="text-left">
                                  {item.sportName}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="2"
                                  className="text-left ">
                                  {item.eventName}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="3"
                                  className="text-left">
                                  {item.marketname}
                                </td>

                                <td
                                  role="columnheader"
                                  aria-colindex="5"
                                  className="text-left ">
                                  {item.nation}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="6"
                                  className="text-left">
                                  {item.rate}
                                </td>

                                <td
                                  role="columnheader"
                                  aria-colindex="8"
                                  className="text-right">
                                  {item.amount}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="9"
                                  className="text-center ">
                                  {item.time}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <tbody>
                        <tr
                          role="row"
                          className={`b-table-empty-row  
                            ${DataList?.length === 0 ? "" : "d-none"}`}>
                          <td colSpan="7" role="cell">
                            <div role="alert" aria-live="polite">
                              <div className="text-center my-2">
                                There are no records to show
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExposureModal;
