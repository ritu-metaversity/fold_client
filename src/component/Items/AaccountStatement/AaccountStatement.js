import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import NavBar from "../../navBar/NavBar";
import "./AaccountStatement.css";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import moment from "moment";
import { UserAPI } from "../../../apis/UserAPI";
import SearchBet from "./SearchBet";
import AlertBtn from "../../Alert/AlertBtn";
const dateFormat = "YYYY-MM-DD";

function AaccountStatement() {
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
  const [currentPage, setCurrentPage] = useState();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [Error, setError] = useState(false);
  const [ColorName, setColorName] = useState("");
  

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



  // console.log(MarketId);

  useEffect(() => {
    UserAPI.Account_Statement({
      noOfRecords: 100,
      index: 0,
      fromDate: timeBefore,
      toDate: time,
      type: 1,
    }).then((res) => {
      // console.log(res)
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
    if (startDate === "") {
      setStartDate(moment().format().slice(0, 10));
    } else {
      setStartDate(startDate);
    }
    if (show === false || dataListLength !== 0) {
      
      setShow(true);
    }

    if(startDate === "" || endDate === ""){
      setError(true)
      setErrorMsg("Date is Required");
      setColorName("danger");

    }

    if(startDate !== "" && endDate !==""){
    UserAPI.Account_Statement({
      noOfRecords: IndexValue,
      index: "0",
      fromDate: startDate,
      toDate: endDate,
      type: type,
    }).then((res) => {
      setPageLength(res.totalPages);
      setDataList(res.dataList);
      setDataListLength(res.dataList.length);
    }).catch((error)=>{
      // console.log(error.response.data.message);
      setError(true)
      setErrorMsg(error.response.data.message);
      setColorName("danger")
    });
  }
  };
  // console.log(pageLength);

  const result = [];
  for (var i = 0; i < pageLength; i++) {
    result[i] = i;
  }

  const handlePagenation = (val) => {
    setPagination(val);
  };

  const decrement = () => {
    if (pageLength > 0) {
      setPagination(pageLength - 1);
    }
  };

  const increment = () => {
    if(pageLength !== 1){

      setPagination(pageLength + 1);
    }
    // console.log(pageLength+1)
  };
  const decrementByFirst = ()=>{
    setPageLength(1)
  }

  const incrementByLast = ()=>{
    setPagination(pageLength-1)
  }

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
        setCurrentPage(res?.currentPage)

      });
    }
    // eslint-disable-next-line
  }, [pagination]);

  const popupClose = (vl) => {
    setError(vl);
  };

  // console.log(pageLength);

  return (
    <div>
      {
        Error ? <AlertBtn color={ColorName} val={ErrorMsg} popupClose={popupClose}/> :""
      }
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0 heading-ch">Account Statement</h4>
          </div>
          <div className="card-body statement container-fluid container-fluid-5">
            <div className="row row5 ">
              <div className="col-6">
                <div className="form-group mb-0">
                  <div className="mx-datepicker" style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
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
                  </div>
                </div>
              </div>
              <div className="col-6 ">
                <div className="form-group mb-0">
                  <div className="mx-datepicker" style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
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
                </div>
              </div>
            </div>
            <div className="row row5  ">
              <div className="col-12">
                <div className="form-group mb-0">
                  <select
                    name="reportType"
                    className="custom-select"
                    onChange={getOptionValue}>
                    <option value="1">All</option>
                    <option value="2">Deposit/Withdraw Report</option>
                    <option value="3">Game Report</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row5 mt-2 ">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block btn-sm"
                  onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
            <div
              className={`row row5 mt-2 ${dataListLength === 0?"dis-none":""}`}
              style={{ marginInline: "-7px" }}>
              <div className="col-6">
                <div
                  id="account-statement_length"
                  className="dataTables_length cpoint">
                  <label style={{ fontSize: "14px" }}>
                    Show
                    <select
                      name="account-statement_length"
                      aria-controls="account-statement"
                      className="form-control form-control-sm theme1font"
                      style={{ fontSize: "14px" }}
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
                      <option value="100" selected>100</option>
                    </select>
                    entries
                  </label>
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
                          Date
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="1"
                          className="text-left bg-color">
                          Sr no
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="3"
                          className="text-right bg-color">
                          Credit
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="4"
                          className="text-right bg-color">
                          Debit
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="5"
                          className="text-right bg-color">
                          Balance
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="6"
                          className="text-left bg-color">
                          Remark
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cpoint">
                      {dataList?.length > 0 &&
                        dataList.map((item) => {
                          return (
                            <tr
                              role="row"
                              key={item.sno + item.sno}
                              onClick={(e) =>
                                handleShow(e, item.remark, item.marketid)
                              }>
                              <td aria-colindex="2" className="text-center">
                              {moment(item.date).format("YYYY-MM-DD h:mm")}

                              </td>
                              <td aria-colindex="1" className="text-left">
                                {item.sno}

                              </td>
                              <td
                                aria-colindex="3"
                                className="text-right text-success">
                                {item.credit.toFixed(2)}
                              </td>
                              <td
                                aria-colindex="4"
                                className="text-right text-danger">
                                {item.debit.toFixed(2)}
                              </td>
                              <td
                                aria-colindex="5"
                                className="text-right text-success">
                                {item.pts}
                              </td>
                              <td aria-colindex="6" className="text-lift">
                                {item.remark}
                              </td>
                            </tr>
                          );
                        })}

                      <Modal
                        show={showModals}
                        className={``}
                        onHide={handleCloseModal}
                        style={{
                          marginTop: "12px",
                          marginInline: "2%",
                          width: "95%",
                        }}>
                        <Modal.Header closeButton closeVariant="white">
                          <Modal.Title>Result</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <SearchBet MarketId={MarketId} remark={remark} />
                        </Modal.Body>
                      </Modal>
                    </tbody>
                    <tbody>
                      <tr
                        role="row"
                        className={`b-table-empty-row ${
                          dataListLength === 0 ? "" : "dis-none"
                        }`}>
                        <td colSpan="6" role="cell">
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
            {
              pageLength === 0?"":( <div className="row row5 mt-2  ">
              <div className="col-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item" onClick={decrementByFirst}>
                      <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">First</span>
                      </button>
                    </li>
                    <li className="page-item" onClick={decrement}>
                      <button  disabled ={currentPage===pageLength?true:false} className="page-link" aria-label="Previous">
                        <span aria-hidden="true" >Prev</span>
                      </button>
                    </li>
                    {result?.length > 0 &&
                      result.map((item, id) => {
                        return (
                          <li
                            key={item + id}
                            className="page-item act"
                            onClick={() => handlePagenation(id)}>
                            <button className="page-link act">
                              <span aria-hidden="true" className="num">
                                {item === "" ? 1 : item +1}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    <li className="page-item" onClick={increment}>
                      <button className="page-link" disabled ={pageLength === 1 ? true:false} aria-label="Next">
                        <span aria-hidden="true">Next</span>
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
            </div>)
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default AaccountStatement;
