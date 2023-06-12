import React, { useEffect, useState } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { GameAPI } from "../../../apis/gameAPI";
import { UserAPI } from "../../../apis/UserAPI";
import SideBar from "../../sidebar/SideBar";

const dateFormat = "YYYY-MM-DD";

const CasinoPnl = () => {
  const [show, setShow] = useState(false);
  var curr = new Date();
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [IndexValue, setIndexValue] = useState(100);
  const [PLValue, setPLValue] = useState();
  const [SportId, setSportId] = useState(323334);
  const [MatchId, setMatchId] = useState();
  const [SportList, setSportList] = useState();
  const [CasinoDataList, setCasinoDataList] = useState();
  const [CDataList, setCDataList] = useState();

  const [DataList, setDataList] = useState();
  const [DataVal, setDataVal] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [ColorName, setColorName] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [Active, setActive] = useState(0);
  const [CasinoList, setCasinoList] = useState([]);

  // const [currentPage, setCurrentPage] = useState();

  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
  };
  const EndDateValue = (date, dateString) => {
    setEndDate(dateString);
  };

  const getOptionValue = (e) => {
    setMatchId(e.target.value);
  };
  const getOptionValue1 = (e) => {
    setSportId(e.target.value);
  };

  // const UserId = localStorage.getItem("UserId")

  useEffect(() => {
    GameAPI.CASINO_TYPES().then((res) => {
      setSportList(res);
    });
  }, []);

  useEffect(() => {
    if (SportId !== "") {
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
      index: 0,
      noOfRecords: 100,
      totalPages: 1,
    }).then((res) => {
      setIsLoading(false);
      setCDataList(res?.data);
      setPLValue(res?.data?.market);
      setPageLength(res?.data?.totalRecord);
      setCasinoDataList(res?.data?.length);
    });
  }, [SportId, pagination]);

  const getIndexValues = (e) => {
    setIndexValue(e.target.value);
  };

  const submit = () => {
    if (startDate === "" || endDate === "") {
      setError(true);
      setErrorMsg("Date is Required");
      setColorName("danger");
    }

    if (startDate === "") {
      setStartDate(moment().format().slice(0, 10));
    } else {
      setStartDate(startDate);
    }
    if (show === false) {
      setShow(true);
    }

    if (startDate !== "" && endDate !== "") {
      UserAPI.Profit_Loss({
        noOfRecords: parseInt(IndexValue),
        index: 0,
        toDate: endDate,
        fromDate: startDate,
        sportId: parseInt(SportId),
        matchId: MatchId,
        userId: "",
        totalPages: pageLength,
      }).then((res) => {
        setIsLoading(false);
        setPageLength(res?.data?.totalRecord);
        setDataVal(res?.data);
        setPLValue(res?.data?.market);
        setDataList(res?.data?.market?.length);
      });
    }
  };

  const handleClick = (val, id) => {
    if (pagination !== 0){
    setPagination(val);
    setActive(id);
  }
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
    if(pagination !== 0)
    setPagination(pageLength - 1);
  };

  const decrementByFirst = () => {
    setPagination(0);
  };

  const popupClose = (vl) => {
    setError(vl);
  };
  return (
    <>
      <div className="card-body container-fluid container-fluid-5 ">
        <div className="row row5">
          <div className="col-2">
            <div className="form-group mb-0">
              <div className="mx-datepicker" style={{ width: "auto" }}>
                <div className="mx-input-wrapper">
                  <DatePicker
                    defaultValue={dayjs(startDate)}
                    className="mx-input"
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
          <div className="col-2">
            <div className="form-group mb-0">
              <div className="mx-datepicker" style={{ width: "auto" }}>
                <div className="mx-input-wrapper">
                  <DatePicker
                    defaultValue={dayjs}
                    format={dateFormat}
                    className="mx-input"
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
                onChange={getOptionValue1}>
                <option selected>Select Match</option>

                {SportList?.length &&
                  SportList?.map((item) => {
                    return (
                      <option value={item?.id} key={item?.name}>
                        {item?.name}
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
                onChange={getOptionValue}>
                <option>Select Match List</option>

                {CasinoList?.length &&
                  CasinoList?.map((item) => {
                    return (
                      <option value={item?.gameId} key={item?.gameId}>
                        {item?.gameName}
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

          <div className="col-2 mt-11">
            <div
              id="account-statement_length"
              className="dataTables_length cpoint d-flex align-items-center">
              <label
                style={{ fontSize: "14px", height: "37px" }}
                className="showEntries">
                Show
              </label>
              <select
                name="account-statement_length"
                aria-controls="account-statement"
                className="form-control form-control-sm theme1font optionValue OptionVal"
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

          <div className="col-1">
            <button className="btn btn-primary btn-block mt-7" onClick={submit}>
              Submit
            </button>
          </div>
        </div>

        <div className="row row5 mt-2">
          <div className="col-12 account-statement-tbl">
            <div className="table-responsive">
              <table
                role="table"
                aria-busy="false"
                aria-colcount="3"
                className="table b-table table-striped table-bordered"
                id="__BVID__69">
                <thead className="pnlVal">
                  <tr role="row" className="">
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="1"
                      className="text-left">
                      Event Type
                    </th>
                    <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="2"
                      className="text-right">
                      Pnl
                    </th>
                    {/* <th
                      role="columnheader"
                      scope="col"
                      aria-colindex="3"
                      className="text-right">
                      Amount
                    </th> */}
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="3">
                        <p className="lodder">
                          <i className="fa fa-spinner fa-spin"></i>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody
                    className={`${
                      CasinoDataList === 0 || CDataList === null
                        ? "dis-none"
                        : ""
                    }`}>
                    {PLValue?.length &&
                      PLValue.map((res) => {
                        return (
                          <tr role="row" key={res?.matchName}>
                            <td aria-colindex="2" className="text-left">
                              {res?.matchName}
                            </td>
                            <td
                              aria-colindex="1"
                              className={`text-right ${
                                res?.pnl > 0
                                  ? "text-success"
                                  : res?.pnl < 0
                                  ? "text-danger"
                                  : ""
                              }`}>
                              {parseFloat(res?.pnl).toFixed(2)}
                            </td>
                            {/* <td
                              aria-colindex="5"
                              className="text-right text-success">
                              {res?.commssionMila}
                            </td> */}
                          </tr>
                        );
                      })}
                  </tbody>
                )}

                <tbody>
                  <tr
                    role="row"
                    className={`b-table-empty-row ${
                      CDataList === null || CasinoDataList === 0
                        ? ""
                        : "dis-none"
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
        <div className={`row row5 mt-2 ${DataVal === null ? "d-none" : ""}`}>
          <div className={`col-12 ${pageLength === 0 ? "dis-none" : ""}`}>
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
                <li className="page-item " onClick={() => handleClick(1)}>
                  <button
                    className="plink act"
                    style={{ padding: "4.4px 12px" }}>
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
    </>
  );
};

export default CasinoPnl;
