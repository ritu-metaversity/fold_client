import React, { useEffect, useState } from "react";
import "../ProfitLoss.css";
// import "../AaccountStatement/AaccountStatement.css";
import "../../AaccountStatement/AaccountStatement.css";
import moment from "moment";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { UserAPI } from "../../../../apis/UserAPI";
import { GameAPI } from "../../../../apis/gameAPI";
import AlertBtn from "../../../Alert/AlertBtn";

const dateFormat = "YYYY-MM-DD";
function CasinoProfit() {
  const [show, setShow] = useState(false);

  var curr = new Date();
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [IndexValue, setIndexValue] = useState(5);
  const [PLValue, setPLValue] = useState();
  const [SportList, setSportList] = useState();
  const [SportId, setSportId] = useState(323334);
  const [CasinoList, setCasinoList] = useState([]);
  const [MatchId, setMatchId] = useState();
  const [CasinoDataList, setCasinoDataList] = useState();
  const [CDataList, setCDataList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [Error, setError] = useState(false);
  const [ColorName, setColorName] = useState("");

  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [Active, setActive] = useState(0);


  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
  };
  const EndDateValue = (date, dateString) => {
    setEndDate(dateString);
  };
  const getOptionValue1 = (e) => {
    setSportId(e.target.value);
  };
  const getOptionValue = (e) => {
    setMatchId(e.target.value);
  };

  useEffect(() => {
    GameAPI.CASINO_TYPES().then((res) => {
      setSportList(res);
    });
  }, []);

  useEffect(() => {
    if(SportId !== "") {

      GameAPI.CASINO_LIST_BY_TYPE({
        id: SportId,
      }).then((res) => {
        setCasinoList(res);
      });
    }
  }, [SportId]);

  useEffect(() => {
    UserAPI.Profit_Loss({
      sportId: SportId,
      matchId: "",
      fromDate: startDate,
      toDate: endDate,
      userId: "",
      index:0,
      noOfRecords:100,
      totalPages:1,
    }).then((res) => {
      setIsLoading(false)
      setCDataList(res?.data)
      setPLValue(res?.data?.market);
      setPageLength(res?.data?.totalRecord);
      setCasinoDataList(res?.data?.length);
    });
  }, [SportId, pagination]);

  const getIndexValues = (e) => {
    setIndexValue(e.target.value);
  };

  const submit = () => {
    if (startDate === "") {
      setStartDate(moment().format().slice(0, 10));
    } else {
      setStartDate(startDate);
    }
    if (show === false) {
      setShow(true);
    }

    if(startDate === "" || endDate === ""){
      setError(true)
      setErrorMsg("Date is Required");
      setColorName("danger");

    }

    if(startDate !== "" && endDate !== ""){
    UserAPI.Profit_Loss({
      noOfRecords: IndexValue,
      index:0,
      toDate: endDate,
      fromDate: startDate,
      sportId: SportId,
      matchId: MatchId,
      userId: "",
      totalPages: pageLength
    }).then((res) => {
      setIsLoading(false)
      setPLValue(res?.data?.market);
      setPageLength(res?.data?.totalRecord);
      setCasinoDataList(res?.data?.length);
    });
  }
  };
  const popupClose = (vl) => {
    setError(vl);
  };



  // const result = [];
  // for (var i = 0; i < pageLength; i++) {
  //   result[i] = i;
  // }
  const handleClick = (val, id) => {
    if(pagination !==0)
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

  return (
    <div>
      {
        Error ? <AlertBtn color={ColorName} val={ErrorMsg} popupClose={popupClose}/> :""
      }
      <div className="report-container Mobile-view-topNav">
        <div className="card">
          <div className="card-body container-fluid container-fluid-5 max1_height">
            <div className="row row5 acc-stat">
              <div className="col-6">
                <div className="form-group mb-0">
                  <div
                    className="mx-datepicker"
                    style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
                      <DatePicker
                        defaultValue={dayjs(startDate)}
                        format={dateFormat}
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
              <div className="col-6">
                <div className="form-group mb-0">
                  <div
                    className="mx-datepicker"
                    style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
                      <DatePicker
                        defaultValue={dayjs}
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
            <div className="row row5 mt-2 acc-stat" style={{ marginInline: "-7px" }}>
              <div className="col-6">
                <div className="form-group mb-0">
                  <select
                    name="reportType"
                    className="custom-select"
                    onChange={getOptionValue1}>
                    <option>Select Casino</option>

                    {SportList?.length &&
                      SportList?.map((item) => {
                        return <option value={item.id} key={item.id}>{item.name}</option>;
                      })}
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group mb-0">
                  <select
                    name="reportType"
                    className="custom-select"
                    onChange={getOptionValue}>
                    <option>Select Casino List</option>
                    {CasinoList?.length &&
                      CasinoList?.map((item) => {
                        return( <option value={item.gameId} key={item.gameId}>{item.gameName}</option>)
                      })}
                  </select>
                </div>
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
            <div className="row row5 mt-2 acc-stat" style={{ marginInline: "-7px" }}>
              <div className="">
              <div
                  id="account-statement_length"
                  className="dataTables_length cpoint d-flex align-items-center">
                  <label style={{ fontSize: "14px" }} className="showEntries">Show</label>
                  <select 
                    name="account-statement_length"
                    aria-controls="account-statement"
                    className="form-control form-control-sm theme1font optionValue"
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
                          className="text-left bg-color">
                          Match Name
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="1"
                          className="text-left bg-color">
                          Pnl
                        </th>
                        {/* <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="4"
                          className="text-left bg-color">
                          Commssion Mila
                        </th> */}
                      </tr>
                    </thead>
                    {
                      isLoading?(<tr className="lodding">
                      <td colSpan="3">
                      <i className="fa fa-spinner fa-spin"></i>
                      </td>
                    
                  </tr>):(<>
                    <tbody className={`${CasinoDataList===0 || CDataList === null?"dis-none":""}`}>
                      {PLValue?.length &&
                        PLValue.map((res) => {
                          return (
                            <tr role="row" key={res.matchName}>
                              <td aria-colindex="2" className="text-left">
                                {res.matchName}
                              </td>
                              <td aria-colindex="1" className={`text-right ${res?.pnl > 0 ?"text-success" : res?.pnl < 0? "text-danger":""}`}>
                                {parseFloat(res.pnl).toFixed(2)}
                              </td>

                              {/* <td
                                aria-colindex="5"
                                className="text-right text-success">
                                {res.commssionMila}
                              </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                    <tbody>
                    <tr
                      role="row"
                      className={`b-table-empty-row ${CasinoDataList===0  || CDataList === null?"":"dis-none"}`}>
                      <td colSpan="6" role="cell">
                        <div role="alert" aria-live="polite">
                          <div className="text-center my-2">
                            There are no records to show
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </>)
                    }
                    
                  </table>
                </div>
              </div>
            </div>
            {/* <div className={`row row5 mt-2 ${CDataList === null?"d-none":""}`}>
                <div className="col-12">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={decrementByFirst}>
                        <button className="page-link" aria-label="Previous">
                          <span aria-hidden="true">First</span>
                        </button>
                      </li>
                      <li className="page-item" onClick={decrement}>
                        <button
                          disabled={pageLength == 1 ? true : false}
                          className="page-link"
                          aria-label="Previous">
                          <span aria-hidden="true">Prev</span>
                        </button>
                      </li>
                      {result?.length > 0 &&
                        result.map((item, id) => {
                          return (
                            <li
                              key={item + id}
                              className="page-item act"
                              onClick={() => handlePagenation(id)}>
                              <button
                                className={`page-link ${
                                  Active === id ? "act" : ""
                                } `}>
                                <span
                                  aria-hidden="true"
                                  className={Active === id ? "num" : ""}>
                                  {item === "" ? 1 : item+1}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                        {result?.length === 0 && (
                        <li
                          // key={item + id}
                          className="page-item "
                          onClick={() => handlePagenation(1)}>
                          <button className="plink act">
                            <span aria-hidden="true" className="num">
                              1
                            </span>
                          </button>
                        </li>
                      )}
                      <li className="page-item" onClick={increment}>
                        <button
                          className="page-link"
                          disabled={pageLength === 1 ? true : false}
                          aria-label="Next">
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
              </div> */}

<div className={`row row5 mt-2 ${CDataList === null?"d-none":""}`}>
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
                            <button className="plink act" style={{padding: "5px 12px"}}>
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
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default CasinoProfit;