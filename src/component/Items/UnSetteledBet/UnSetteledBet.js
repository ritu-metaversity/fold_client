import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "../AaccountStatement/AaccountStatement.css";

function UnSetteledBet() {
  const [recordValue, setRecordValue] = useState(100);
  const [DataList, setDataList] = useState("");
  const [ListLength, setListLength] = useState("");
  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [betValue, setBetValue] = useState(1);
  const [deleteVal, setDeleteVal] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [Active, setActive] = useState(1);

  useEffect(() => {
    UserAPI.Unsetteled_bet({
      noOfRecords: parseInt(recordValue),
      index: 0,
      sportType: 1,
      betType: parseInt(betValue),
    }).then((res) => {
      setPageLength(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setListLength(res.data.dataList.length);
      setDataList(res.data.dataList);
    });
    // eslint-disable-next-line
  }, [betValue, betValue, recordValue]);

  // const submit = () => {
  //   UserAPI.Unsetteled_bet({
  //     noOfRecords: parseInt(recordValue),
  //     index: 0,
  //     sportType: 1,
  //     betType: parseInt(betValue),
  //   }).then((res) => {
  //     setPageLength(res.data.totalPages);
  //     setListLength(res.data.dataList.length);
  //     setDataList(res.data.dataList);
  //   });
  // };

  const result = [];
  for (var i = 1; i < pageLength; i++) {
    result[i] = i;
  }

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
      // setDisable(pagination - 1)
    }
  };

  const incrementByLast = () => {
    setPagination(pageLength-1);
  };

  const decrementByFirst = () => {
    setPagination(0);
  };
  useEffect(() => {
    if (ListLength > 0) {
      UserAPI.Unsetteled_bet({
        noOfRecords: parseInt(recordValue),
        index: pagination,
        sportType: 1,
        betType: parseInt(betValue),
      }).then((res) => {
        setDataList(res.data.dataList);
      });
    }
  }, [pagination]);

  return (
    <div>
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header" style={{padding:"4px 5px"}}>
            <h4 className="mb-0 heading-ch">Un-Setteled Bet</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5 unsetteledbet max_height">
            <div className="row row5 ">
              <div className="col-6">
                <div
                  id="match_unmatched_delete"
                  role="radiogroup"
                  tabIndex="-1">
                  <div className="custom-control custom-control-inline custom-radio">
                    <input
                      id="matched"
                      type="radio"
                      defaultChecked
                      name="match_unmatched_delete"
                      autoComplete="off"
                      value="1"
                      className="custom-control-input"
                      onChange={(e) => setDeleteVal(e.target.value)}
                    />{" "}
                    <label
                      htmlFor="matched"
                      className="custom-control-label control-label1">
                      <span>Matched</span>
                    </label>
                  </div>
                  <div className="custom-control custom-control-inline custom-radio">
                    <input
                      id="deleteed"
                      type="radio"
                      name="match_unmatched_delete"
                      autoComplete="off"
                      value="2"
                      className="custom-control-input"
                      onChange={(e) => setDeleteVal(e.target.value)}
                    />
                    <label
                      htmlFor="deleteed"
                      className="custom-control-label control-label1 deletedBtn">
                      <span>Deleted</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${deleteVal === "2" ? "d-none" : ""}`}>
              <div className="row row5 mt-2 match_unmatched">
                <div className="col-6">
                  <div
                    className="form-group mb-0"
                    style={{ marginTop: "-6px" }}>
                    <div className="row row5 mt-2">
                      <div className="col-12">
                        <div
                          className="form-group mb-0 backLay">
                          <div
                            id="match_unmatched_delete"
                            role="radiogroup"
                            tabIndex="-1">
                            <div className="custom-control custom-control-inline custom-radio">
                              <input
                                id="all"
                                type="radio"
                                name="match"
                                autoComplete="off"
                                className="custom-control-input"
                                onChange={(e) => setBetValue(e.target.value)}
                                value="1"
                                defaultChecked
                              />{" "}
                              <label
                                htmlFor="all"
                                className="custom-control-label control-label1">
                                <span>All</span>
                              </label>
                            </div>
                            <div className="custom-control custom-control-inline custom-radio">
                              <input
                                id="Back"
                                type="radio"
                                name="match"
                                autoComplete="off"
                                className="custom-control-input"
                                onChange={(e) => setBetValue(e.target.value)}
                                value="2"
                              />
                              <label
                                htmlFor="Back"
                                className="custom-control-label control-label1">
                                <span>Back</span>
                              </label>
                            </div>
                            <div className="custom-control custom-control-inline custom-radio">
                              <input
                                id="Lay"
                                type="radio"
                                name="match"
                                autoComplete="off"
                                className="custom-control-input"
                                onChange={(e) => setBetValue(e.target.value)}
                                value="3"
                              />
                              {/* <input type="radio"/> */}
                              <label
                                htmlFor="Lay"
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
                {/* onChange={(e) => setRecordValue(e.target.value)} */}
              </div>
              <div className="" style={{marginLeft: "8px"}}>
                <div
                  id="account-statement_length"
                  className="dataTables_length cpoint d-flex align-items-center">
                  <label style={{ fontSize: "14px" }} className="showEntries">Show</label>
                  <select 
                    name="account-statement_length"
                    aria-controls="account-statement"
                    className="form-control form-control-sm theme1font optionValue"
                    style={{ fontSize: "14px" }}
                    onChange={(e) => setRecordValue(e.target.value)}>
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
              <div className="row row5 mt-2 ">
                <div className="col-12">
                  <div className="table-responsive unsetTable">
                    <table
                      role="table"
                      aria-busy="false"
                      aria-colcount="10"
                      className="table b-table table-bordered"
                      id="__BVID__96">
                      <thead className="">
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
                            aria-colindex="2"
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
                            aria-colindex="5"
                            className="text-left bg-color">
                            Nation
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="6"
                            className="text-left bg-color text-right">
                            User Rate
                          </th>

                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="8"
                            className="text-left bg-color text-right">
                            Amount
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="9"
                            className="text- bg-color text-center">
                            Place Date
                          </th>
                            {/* <th
                              role="columnheader"
                              scope="col"
                              aria-colindex="10"
                              className=" bg-color">
                              Match Date
                            </th> */}
                        </tr>
                      </thead>
                      <tbody className="">
                        {DataList?.length > 0 &&
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
                                  className="text-left"
                                  style={
                                    {
                                      // border:"5px solid "
                                    }
                                  }>
                                  {item.sportName}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="2"
                                  className="text-left">
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
                                  className="text-left">
                                  {item.nation}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="6"
                                  className="text-right">
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
                                  className="text-center">
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
                          ${ListLength === 0 ? "" : "dis-none"}`}>
                          <td colSpan="8" role="cell">
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
            </div>
            <div
              className={`row row5 mt-2 ${deleteVal === "2" ? "" : "d-none"}`}>
              <div className="col-12 ">
                <p className="text-center record-delete">No Records Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnSetteledBet;
