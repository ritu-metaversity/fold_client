import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import moment from "moment";
import { UserAPI } from "../../apis/UserAPI";
import SideBar from "../sidebar/SideBar";
import "./AccountStatementDesk.css";

const dateFormat = "YYYY-MM-DD";

const AccountStatementDesk = () => {
  var curr = new Date();
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [type, setType] = useState(1);
  const [IndexValue, setIndexValue] = useState(100);
  const [show, setShow] = useState(false);
  const [dataList, setDataList] = useState("");
  const [dataListLength, setDataListLength] = useState();
  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [showModals, setShowModals] = useState(false);
  const [remark, setRemark] = useState();
  const [MarketId, setMarketId] = useState();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [Error, setError] = useState(false);
  const [ColorName, setColorName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Active, setActive] = useState(0);

  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
  };

  const EndDateValue = (date, dateString) => {
    setEndDate(dateString);
  };

  const getOptionValue = (e) => {
    setType(e.target.value);
  };
  const getIndexValues = (e) => {
    setIndexValue(e.target.value);
  };

  useEffect(() => {
    UserAPI.Account_Statement({
      noOfRecords: 100,
      index: 0,
      fromDate: timeBefore,
      toDate: time,
      type: 1,
    }).then((res) => {
      setIsLoading(false);
      setPageLength(res.totalPages);
      setDataList(res.dataList);
      setDataListLength(res.dataList.length);
    });
    // eslint-disable-next-line
  }, []);

  const handleCloseModal = () => setShowModals(false);
  const handleShow = (e, remark, marketId) => {
    e.preventDefault();
    setShowModals(true);
    setRemark(remark);
    setMarketId(marketId);
  };

  const submit = () => {
    setIsLoading(true);
    if (startDate === "") {
      setStartDate(moment().format().slice(0, 10));
    } else {
      setStartDate(startDate);
    }
    if (show === false || dataListLength !== 0) {
      setShow(true);
    }

    if (startDate === "" || endDate === "") {
      setError(true);
      setErrorMsg("Date is Required");
      setColorName("danger");
    }

    if (startDate !== "" || endDate !== "") {
      UserAPI.Account_Statement({
        noOfRecords: IndexValue,
        index: "0",
        fromDate: startDate,
        toDate: endDate,
        type: type,
      })
        .then((res) => {
          setIsLoading(false);
          setPageLength(res.totalPages);
          setDataList(res.dataList);
          setDataListLength(res.dataList.length);
        })
        .catch((error) => {
          setError(true);
          setErrorMsg(error.response.data.message);
          setColorName("danger");
        });
    }
  };

  const result = [];
  for (var i = 0; i < pageLength; i++) {
    result[i] = i;
  }

  //   const handlePagenation = (val) => {
  //     setPagination(val);
  //     setActive(val);
  //   };

  //   const increment = () => {
  //     if(pageLength - 1 !== pagination){
  //       setPagination(pagination + 1)
  //      setActive(pagination+1 );
  //   }
  //   };

  //   const decerement = () => {
  //     if(pagination !== 0){
  //       setPagination(pagination - 1)
  //       setActive(pagination-1 );
  //     }
  //   };

  //   const incrementByLast = () => {
  //     setPagination(pageLength-1);
  //   };

  //   const decrementByFirst = () => {
  //     setPagination(0);
  //   };

  useEffect(() => {
    if (pageLength > 0) {
      UserAPI.Account_Statement({
        noOfRecords: IndexValue,
        index: pagination,
        fromDate: startDate,
        toDate: endDate,
        type: type,
      }).then((res) => {
        setDataList(res.dataList);
      });
    }
    // eslint-disable-next-line
  }, [pagination]);

  const popupClose = (vl) => {
    setError(vl);
  };

  //   console.log(dataList, "dataList")

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>

            <div className="col-md-10 report-main-content m-t-5 desk-top-view">
              <div className="card">
                <div className="card-header br">
                  <h4 className="mb-0" style={{ fontSize: "24px" }}>
                    Account Statement
                  </h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 ">
                  <div className="row row5">
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
                          not-before="Tue Jan 10 2023 05:30:00 GMT+0530 (India Standard Time)"
                          not-after="Fri Feb 10 2023 05:30:00 GMT+0530 (India Standard Time)"
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
                    <div className="col-2">
                      <div className="form-group mb-0 mt-7">
                        <select
                          name="reportType"
                          className="custom-select"
                          onChange={getOptionValue}>
                          <option value="1">All</option>
                          <option value="2">Deposit/Withdraw Report</option>
                          <option value="3">Game Report</option>
                        </select>
                        <div className="upDownbtn">
                          <i class="fa fa-caret-up"></i>
                          <i class="fa fa-caret-down"></i>
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
                      <div className="table-responsive desk-table-responsive">
                        <table
                          role="table"
                          aria-busy="false"
                          aria-colcount="6"
                          className="table b-table table-striped table-bordered"
                          id="__BVID__104">
                          <thead>
                            <tr role="row">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-center">
                                Date
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-right">
                                Sr no
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="3"
                                className="text-right">
                                Credit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className="text-right">
                                Debit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="5"
                                className="text-right">
                                Balance
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className="text-left">
                                Remark
                              </th>
                            </tr>
                            </thead>
                            {/* {show ? ( */}
                            <tbody>
                            {dataList &&
                              dataList?.map((res) => {
                                return (
                                  <tr role="row">
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="1"
                                      className="text-center">
                                      {res?.date}
                                    </th>
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="2"
                                      className="text-right">
                                      {res?.sno}
                                    </th>
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="3"
                                      className="text-right text-success">
                                      {res?.credit}
                                    </th>
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="4"
                                      className="text-right text-danger">
                                      {res?.debit}
                                    </th>
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="5"
                                      className="text-right text-success">
                                      {res?.pts}
                                    </th>
                                    <th
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="6"
                                      className="text-left">
                                      {res?.remark}
                                    </th>
                                  </tr>
                                );
                              })}

                            {/* ) : (
                              ""
                            )} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mt-2">
                    <div className="col-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatementDesk;
