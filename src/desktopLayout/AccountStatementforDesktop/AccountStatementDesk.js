import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import moment from "moment";
import { UserAPI } from "../../apis/UserAPI";
import SideBar from "../sidebar/SideBar";
import "./AccountStatementDesk.css";
import Modal from "react-bootstrap/Modal";
import SearchBetDesk from "./SearchBetDesk/SearchBetDesk";

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

  useEffect(() => {
    UserAPI.Account_Statement({
      noOfRecords: IndexValue,
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
  }, [IndexValue]);

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

  const handlePagenation = (val) => {
    if (pagination !== 0) setPagination(val);
    setActive(val);
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

  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="itemHome">
            <div className="card">
              <div className="card-header header-card ">
                <h4 className="mb-0">Account Statement</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5 ">
                <div className="row row5">
                  <div className="col-2">
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
                  <div className="col-2">
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
                  <div className="col-2">
                    <div className="form-group mb-0 ">
                      <select
                        name="reportType"
                        className="custom-select"
                        onChange={getOptionValue}>
                        <option value="1">All</option>
                        <option value="2">Game Report</option>
                        <option value="3">Deposit/Withdraw Report</option>
                      </select>
                      <div className="upDownbtn">
                        <i className="fa fa-caret-up"></i>
                        <i className="fa fa-caret-down"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-3 mt4 ${
                      dataListLength === 0 ? "dis-none" : ""
                    }`}>
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
                          style={{ fontSize: "14px", height: "38px" }}
                          onChange={getIndexValues}>
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
                  <div className="col-1">
                    <button
                      className="btn btn-primary btn-block "
                      onClick={submit}>
                      Submit
                    </button>
                  </div>
                </div>

                <div className="row row5 mt-2">
                  <div className="col-12 account-statement-tbl">
                    <div className="table-responsive desk-table-responsive">
                      {isLoading ? (
                        <p className="lodder">
                          <i className="fa fa-spinner fa-spin"></i>
                        </p>
                      ) : (
                        <table
                          role="table"
                          aria-busy="false"
                          aria-colcount="6"
                          className="table b-table table-striped table-bordered"
                          id="__BVID__104">
                          <thead className="pnlVal">
                            <tr role="row">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-center text-white">
                                Date
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-right text-white">
                                Sr no
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="3"
                                className="text-right text-white">
                                Credit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className="text-right text-white">
                                Debit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="5"
                                className="text-right text-white">
                                Balance
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className="text-left text-white">
                                Remark
                              </th>
                            </tr>
                          </thead>
                          {/* {show ? ( */}
                          <tbody>
                            {dataList &&
                              dataList?.map((res) => {
                                return (
                                  <tr
                                    role="row"
                                    className="cPointer"
                                    key={res?.sno}
                                    onClick={(e) =>
                                      handleShow(e, res?.remark, res?.marketid)
                                    }>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="1"
                                      className="text-center">
                                      {res?.date}
                                    </td>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="2"
                                      className="text-right">
                                      {res?.sno}
                                    </td>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="3"
                                      className="text-right text-success">
                                      {res?.credit}
                                    </td>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="4"
                                      className="text-right text-danger">
                                      {res?.debit}
                                    </td>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="5"
                                      className="text-right text-success">
                                      {res?.pts}
                                    </td>
                                    <td
                                      role="columnheader"
                                      scope="col"
                                      aria-colindex="6"
                                      className="text-left">
                                      {res?.remark}
                                    </td>
                                  </tr>
                                );
                              })}

                            {/* ) : (
                                ""
                              )} */}
                          </tbody>
                        </table>
                      )}

                      <Modal
                        show={showModals}
                        size="xl"
                        className=""
                        onHide={handleCloseModal}
                        style={{
                          marginTop: "12px",
                          marginInline: "2%",
                          width: "95%",
                        }}>
                        <Modal.Header
                          closeButton
                          closeVariant="white"
                          className="head-result">
                          <Modal.Title className="acc-result">
                            Result
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="account-popup">
                          <SearchBetDesk MarketId={MarketId} remark={remark} />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
                {pageLength === 0 || isLoading ? (
                  ""
                ) : (
                  <div className="row row5 mt-2 ">
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
                            onClick={() => handlePagenation(1)}>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatementDesk;
