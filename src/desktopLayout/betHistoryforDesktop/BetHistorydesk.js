import React, { useEffect, useState } from "react";
// import "../AaccountStatement/AaccountStatement.css";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { GameAPI } from "../../apis/gameAPI";
import SideBar from "../sidebar/SideBar";

const dateFormat = "YYYY-MM-DD";

function BetHistorydesk() {
  var curr = new Date();
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [sportType, setSportType] = useState([]);
  const [NoOfRecords, setNoOfRecords] = useState(100);
  const [sportId, setSportId] = useState(4);
  const [betStatus, setBetStatus] = useState(false);
  const [ShowData, setShowData] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataListLength, setDataListLength] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [Active, setActive] = useState(1);

  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
  };

  const EndDateValue = (date, dateString) => {
    setEndDate(dateString);
  };

  useEffect(() => {
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setSportType(res);
    });
  }, []);

  const handleClick = (val, id) => {
    if(pagination !== 0)
    setPagination(val);
    setActive(id);
  };

  const increment = () => {
    if (pageLength - 1 !== pagination) {
      setPagination(pagination + 1);
      setActive(pagination + 1);
    }
  };

  const decerement = () => {
    if (pagination !== 0) {
      setPagination(pagination - 1);
      setActive(pagination - 1);
    }
  };

  const incrementByLast = () => {
    setPagination(pageLength - 1);
  };

  const decrementByFirst = () => {
    setPagination(0);
  };

  useEffect(() => {
    GameAPI.BET_HISTORY({
      sportId: parseInt(sportId),
      fromDate: startDate,
      toDate: endDate,
      index: pagination,
      noOfRecords: NoOfRecords,
      isdeleted: betStatus,
    }).then((res) => {
      setDataList(res?.dataList);
      setPageLength(res?.totalPages);
    });
  }, [pagination]);

  const getNoOfRecords = (e) => {
    setNoOfRecords(e.target.value);
  };
  const getSportId = (e) => {
    setSportId(e.target.value);
  };

  const getBetStatus = (e) => {
    setBetStatus(e.target.value);
  };

  const submit = () => {
    setIsLoading(true);
    GameAPI.BET_HISTORY({
      sportId: parseInt(sportId),
      fromDate: startDate,
      toDate: endDate,
      index: 0,
      noOfRecords: NoOfRecords,
      isdeleted: betStatus,
    }).then((res) => {
      setShowData(true);
      setIsLoading(false);
      setDataList(res?.dataList);
      setPageLength(res.totalPages);
      setDataListLength(res?.dataList?.length);
    });
  };

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
           

            
              <div className="card">
                <div className="card-header header-card">
                  <h4 className="mb-0">Bet History</h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 ">
                  <div className="row row5">
                    <div className="col-2">
                      <div className="form-group mb-0 mt-7">
                        <select name="reportType" className="custom-select">
                          <option value="" selected disabled="disabled">
                            Sport Type
                          </option>
                          {sportType?.map((res, id) => {
                            return (
                              <option key={id} value={res.sportId}>
                                {res?.sportName}
                              </option>
                            );
                          })}
                        </select>
                        <div className="upDownbtn">
                          <i class="fa fa-caret-up"></i>
                          <i class="fa fa-caret-down"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group mb-0 mt-7">
                        <select
                          name="reportType"
                          className="custom-select"
                          onChange={getBetStatus}>
                          <option value="" disabled="disabled" selected>
                            Bet Status
                          </option>
                          <option value="false">Matched</option>
                          <option value="true">Deleted</option>
                        </select>
                        <div className="upDownbtn">
                          <i class="fa fa-caret-up"></i>
                          <i class="fa fa-caret-down"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group mb-0">
                        <div
                          className="mx-datepicker"
                          style={{ width: "auto" }}>
                          <div className="mx-input-wrapper">
                            <DatePicker
                              defaultValue={dayjs(startDate)}
                              className="mx-input"
                              format={dateFormat}
                              selected={startDate}
                              onChange={StartDateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(2, "month")) ||
                                d.isAfter(dayjs())
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group mb-0">
                        <div
                          className="mx-datepicker"
                          style={{ width: "auto" }}>
                          <div className="mx-input-wrapper">
                            <DatePicker
                              defaultValue={dayjs}
                              className="mx-input"
                              selected={endDate}
                              format={dateFormat}
                              onChange={EndDateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(2, "month")) ||
                                d.isAfter(dayjs())
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-1">
                      <button
                        className="btn btn-primary btn-block mt-7"
                        onClick={submit}>
                        Submit
                      </button>
                    </div>
                  </div>

                  <div className="row row5 mt-2">
                    <div className="col-12 account-statement-tbl">
                      <div className="table-responsive">
                        {isLoading ? (
                          <p className="lodder">
                            <i className="fa fa-spinner fa-spin"></i>
                          </p>
                        ) : (
                          <table
                            role="table"
                            aria-busy="false"
                            aria-colcount="8"
                            className="table b-table table-bordered"
                            id="__BVID__103">
                            <thead className="pnlVal">
                              <tr role="row" className="">
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="1"
                                  className="text-left">
                                  Sport Name
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="1"
                                  className="text-left">
                                  Event Name
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="2"
                                  className="text-left">
                                  Market Name
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="3"
                                  className="text-left">
                                  Nation
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="4"
                                  className="text-right"
                                  style={{width: "100px"}}
                                  >
                                  User Rate
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="5"
                                  className="text-right">
                                  Pnl
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="6"
                                  className="text-right">
                                  Amount
                                </th>
                                <th
                                  role="columnheader"
                                  scope="col"
                                  aria-colindex="7"
                                  className="text-center"
                                  style={{width: "200px"}}
                                  >
                                  Time
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataList &&
                                dataList?.map((res) => {
                                  return (
                                    <tr
                                      role="row"
                                      className={
                                        res?.isback === false ? "lay" : "back"
                                      }>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="1"
                                        className="text-left" 
                                        style={{paddingRight: "45px"}}
                                        >
                                        {res?.sportName}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="1"
                                        className="text-left">
                                        {res?.eventName}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="2"
                                        className="text-left">
                                        {res?.marketname}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="3"
                                        className="text-left">
                                        {res?.nation}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="4"
                                        className="text-right">
                                        {res?.rate}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="5"
                                        className={`text-right ${
                                          res?.pnl > 0
                                            ? "text-success"
                                            : res?.pnl < 0
                                            ? "text-danger"
                                            : ""
                                        }`}>
                                        {res?.pnl}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="6"
                                        className="text-right">
                                        {res?.amount}
                                      </td>
                                      <td
                                        role="columnheader"
                                        scope="col"
                                        aria-colindex="7"
                                        className="text-center">
                                        {res?.time}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                  <div >
                    <div
                      className={`col-12 ${
                        pageLength === 0 ? "dis-none" : ""
                      }`}>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item" onClick={decrementByFirst}>
                            <button className="page-link" aria-label="Previous">
                              <span aria-hidden="true">First</span>
                            </button>
                          </li>
                          <li className="page-item" onClick={decerement}>
                            <button className="page-link" aria-label="Previous">
                              <span aria-hidden="true">Prev</span>
                            </button>
                          </li>
                          <li
                            className="page-item "
                            onClick={() => handleClick(1)}>
                            <button className="plink act">
                              <span aria-hidden="true" className="num">
                                {pagination + 1}
                              </span>
                            </button>
                          </li>
                          <li className="page-item" onClick={increment}>
                            <button
                              className="page-link"
                              // disabled={!(pageLength - 1 === pagination)}
                              aria-label="Next">
                              <span aria-hidden="true" className="num">
                                Next
                              </span>
                            </button>
                          </li>
                          <li className="page-item" onClick={incrementByLast}>
                            <button className="page-link" aria-label="Next">
                              <span aria-hidden="true">Last</span>
                            </button>
                          </li>
                        </ul>
                      </nav>
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

export default BetHistorydesk;
