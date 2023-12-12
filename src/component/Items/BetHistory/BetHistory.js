import React, { useEffect, useState } from "react";
import "../AaccountStatement/AaccountStatement.css";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { GameAPI } from "../../../apis/gameAPI";

const dateFormat = "YYYY-MM-DD";

function BetHistory() {
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
    if(pageLength - 1 !== pagination){
      setPagination(pagination + 1)
     setActive(pagination+1 );
  }
  };


  const decerement = () => {
    if(pagination !== 0){
      setPagination(pagination - 1)
      setActive(pagination-1 );
    }
  };

  const incrementByLast = () => {
    setPagination(pageLength-1);
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
    <div>
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header" style={{padding:"4px 5px"}}>
            <h4 className="mb-0">Bet History</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5 max_height">
            <div className="row row5 mt-2 acc-stat">
              <div className="col-6">
                <div className="form-group mb-0">
                  <select
                    name="reportType"
                    className="custom-select"
                    onChange={getSportId}>
                    <option value="">Sport Type</option>
                    {sportType.map((item) => {
                      return (
                        <option value={item.sportId}>{item.sportName}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group mb-0">
                  <select
                    name="reportType"
                    className="custom-select"
                    onChange={getBetStatus}>
                    <option value="" disabled="disabled">
                      Bet Status
                    </option>
                    <option value="false">Matched</option>
                    <option value="true">Deleted</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row5 mt-2 acc-stat mb-12">
              <div className="col-6">
                
                      <DatePicker
                        defaultValue={dayjs(startDate)}
                        // value={startDate}
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
              <div className="col-6">
                      <DatePicker
                        defaultValue={dayjs}
                        selected={startDate}
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
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block btn-sm"
                  onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
            {ShowData ? (
              <>
                <div
                  className={`row row5 mt-2 `}
                  style={{ marginInline: "-7px" }}>
                  <div className="">
                    <div
                      id="account-statement_length"
                      className="dataTables_length cpoint d-flex align-items-center">
                      <label
                        style={{ fontSize: "14px" }}
                        className="showEntries">
                        Show
                      </label>
                      <select
                        name="account-statement_length"
                        aria-controls="account-statement"
                        className="form-control form-control-sm theme1font optionValue"
                        style={{ fontSize: "14px" }}
                        onChange={getNoOfRecords}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="100" selected>
                          100
                        </option>
                      </select>
                      <i className="fa fa-angle-down arrowBtn"></i>
                      <label className="entries">entries</label>
                    </div>
                  </div>
                </div>

                <div className="row row5 mt-2">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table
                        role="table"
                        aria-busy="false"
                        aria-colcount="6"
                        className="table b-table table-bordered"
                        id="__BVID__104">
                        <thead>
                          <tr role="row">
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="2"
                              className="text-center bg-color">
                              Sport Name
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="1"
                              className="text-left bg-color">
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
                              aria-colindex="4"
                              className="text-left bg-color">
                              Nation
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              className="text-right bg-color">
                              User Rate
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="5"
                              className="text-right bg-color">
                              Pnl
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg-color">
                              Amount
                            </th>
                            <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="6"
                              className="text-left bg-color">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          {dataList &&
                            dataList?.map((res) => {
                              return (
                                <tr
                                  role="row"
                                  className={
                                    res?.isback === false ? "lay" : "back"
                                  }>
                                  <td aria-colindex="2" className="text-center">
                                    {res?.sportName}
                                  </td>
                                  <td aria-colindex="1" className="text-left">
                                    {res?.eventName}
                                  </td>
                                  <td aria-colindex="3" className="text-left ">
                                    {res?.marketname}
                                  </td>
                                  <td aria-colindex="4" className="text-left">
                                    {res?.nation}
                                  </td>
                                  <td aria-colindex="5" className="text-right ">
                                    {res?.rate}
                                  </td>
                                  <td
                                    aria-colindex="6"
                                    className={`text-right ${
                                      res?.pnl > 0
                                        ? "text-success"
                                        : res?.pnl < 0
                                        ? "text-danger"
                                        : ""
                                    }`}>
                                    {res?.pnl}
                                  </td>
                                  <td aria-colindex="5" className="text-right ">
                                    {res?.amount}
                                  </td>
                                  <td aria-colindex="5" className="text-right ">
                                    {res?.time}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                        <tbody
                          className={dataListLength === 0 ? "" : "dis-none"}>
                          <tr>
                            <td colSpan="8">
                              <div className="row row5 mt-2">
                                <div className="col-12">
                                  <div className="row row5 acc-stat">
                                    <div className="col-12">
                                      <p className="mb-0 text-center">
                                        There are no records to show
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row row5 mt-2 ">
                  <div
                    className={`col-12 ${pageLength === 0 ? "dis-none" : ""}`}>
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
                                {pagination+1}
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
              </>
            ) : isLoading ? (
              <p className="lodderr">
                <i className="fa fa-spinner fa-spin"></i>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
