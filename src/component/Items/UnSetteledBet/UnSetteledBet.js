import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import Footer from "../../footer/Footer";
import NavBar from "../../navBar/NavBar";
import SideBar from "../../sidebar/SideBar";
import "../AaccountStatement/AaccountStatement.css";

function UnSetteledBet() {
  const [recordValue, setRecordValue] = useState(5);
  const [betType, setBetType] = useState(1);
  const [DataList, setDataList] = useState("");
  const [ListLength, setListLength] = useState("");
  const [pageLength, setPageLength] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [betValue, setBetValue] = useState(1);


  console.log(betValue);

  useEffect(() => {
    UserAPI.Unsetteled_bet({
      noOfRecords: 5,
      index: 0,
      sportType: 1,
      betType: 1,
    }).then((res) => {
      // setPageLength(res.data.totalPages);
      setDataList(res.data.dataList);
    });
    // eslint-disable-next-line
  }, []);

  const submit = () => {
    UserAPI.Unsetteled_bet({
      noOfRecords: recordValue,
      index: 0,
      sportType: 1,
      betType: betValue,
    }).then((res) => {
      setPageLength(res.data.totalPages);
      setListLength(res.data.dataList.length);
      setDataList(res.data.dataList);
    });
  };

  const result = [];
  for (var i = 0; i <= pageLength; i++) {
    result[i] = i;
  }

  const handleClick = (val) => {
    setPagination(val);
  };
  const increment = () => {
    setPagination(pageLength + 1);
  };
  const decerement = () => {
    setPagination(pageLength - 1);
  };

  useEffect(() => {
    if (ListLength > 0) {
      UserAPI.Unsetteled_bet({
        noOfRecords: recordValue,
        index: pagination,
        sportType: 1,
        betType: betValue,
      }).then((res) => {
        console.log(res.data.dataList);
        setDataList(res.data.dataList);
      });
    }
    // eslint-disable-next-line
  }, [pagination]);

  return (
    <div>
      <NavBar />
      {/* <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>

            <div className="col-md-10 report-main-content m-t-5 desk-top-view">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Un-Setteled Bet</h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 unsetteledbet">
                  <div className="row row5">
                    <div className="col-12">
                      <div
                        id="match_unmatched_delete"
                        role="radiogroup"
                        tabIndex="-1">
                        <div className="custom-control custom-control-inline custom-radio">
                          <input
                            id="matched"
                            type="radio"
                            checked
                            name="match_unmatched_delete"
                            autocomplete="off"
                            value="1"
                            className="custom-control-input"
                          />{" "}
                          <label
                            for="matched"
                            className="custom-control-label control-label1">
                            <span>Matched</span>
                          </label>
                        </div>
                        <div className="custom-control custom-control-inline custom-radio">
                          <input
                            id="deleteed"
                            type="radio"
                            name="match_unmatched_delete"
                            autocomplete="off"
                            value="3"
                            className="custom-control-input"
                          />{" "}
                          <label
                            for="deleteed"
                            className="custom-control-label control-label1">
                            <span>Deleted</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <div className="table-responsive">
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
                                className="text-right">
                                No
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-center">
                                Event Name
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="3"
                                className="text-center">
                                Nation
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className="text-center">
                                Event Type
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="5"
                                className="text-center">
                                Market Name
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className="text-center">
                                Side
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="7"
                                className="text-center">
                                Rate
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="8"
                                className="text-right">
                                Amount
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="9"
                                className="text-center">
                                Place Date
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="10"
                                className="">
                                Match Date
                              </th>
                            </tr>
                          </thead>
                          <tbody></tbody>
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
      <Footer /> */}

      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Un-Setteled Bet</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5 unsetteledbet">
            <div className="row row5">
              <div className="col-12 text-center">
                <div
                  id="match_unmatched_delete"
                  role="radiogroup"
                  tabIndex="-1">
                  <div className="custom-control custom-control-inline custom-radio">
                    <input
                      id="matched"
                      type="radio"
                      checked
                      name="match_unmatched_delete"
                      autocomplete="off"
                      value="1"
                      className="custom-control-input"
                    />{" "}
                    <label
                      for="matched"
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
                    />
                    <label
                      for="deleteed"
                      className="custom-control-label control-label1">
                      <span>Deleted</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`row row5 mt-2 ${ListLength === 0 ? "dis-none" : ""}`}>
              <div className="col-6">
                <div className="form-group mb-0" style={{ marginTop: "12px" }}>
                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <div
                          id="match_unmatched_delete"
                          role="radiogroup"
                          tabindex="-1">
                          <div class="custom-control custom-control-inline custom-radio">
                            <input
                              id="all"
                              type="radio"
                              name="match"
                              autocomplete="off"
                              class="custom-control-input"
                              onChange={(e)=>setBetValue(e.target.value)}
                              value="1"
                              checked
                             
                            />{" "}
                            <label
                              for="all"
                              class="custom-control-label control-label1">
                              <span>All</span>
                            </label>
                          </div>
                          <div class="custom-control custom-control-inline custom-radio">
                            <input
                              id="Back"
                              type="radio"
                              name="match"
                              autocomplete="off"
                              class="custom-control-input"
                              onChange={(e)=>setBetValue(e.target.value)}
                              value="2"
                            />
                            <label
                              for="Back"
                              class="custom-control-label control-label1">
                              <span>Back</span>
                            </label>
                          </div>
                          <div class="custom-control custom-control-inline custom-radio">
                            <input
                              id="Lay"
                              type="radio"
                              name="match"
                              autocomplete="off"
                              class="custom-control-input"
                              onChange={(e)=>setBetValue(e.target.value)}
                              value="3"
                            />
                            {/* <input type="radio"/> */}
                            <label
                              for="Lay"
                              class="custom-control-label control-label1">
                              <span>Lay</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <select
                    name="reportType"
                    className="custom-select"
                    onChange={(e) => setBetType(e.target.value)}>
                    <option value="1">All</option>
                    <option value="2">Back</option>
                    <option value="3">Lay</option>
                  </select> */}
                </div>
              </div>
              <div className="col-6">
                <div
                  id="account-statement_length"
                  className="dataTables_length"
                  style={{ float: "right", marginRight: "30px" }}>
                  <label style={{ fontSize: "14px" }}>
                    Show
                    <select
                      name="account-statement_length"
                      aria-controls="account-statement"
                      className="form-control form-control-sm theme1font"
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
                    </select>
                    entries
                  </label>
                </div>
              </div>
            </div>
            <div className="row row5 mt-2">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block btn-sm"
                  onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
            <div className="row row5 mt-2">
              <div className="row row5 mt-2">
                <div className="col-12">
                  <div className="table-responsive">
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
                            className="text-right">
                            Sport Name
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="2"
                            className="text-center">
                            Event Name
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="3"
                            className="text-center">
                            Market Name
                          </th>

                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="5"
                            className="text-center">
                            Nation
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="6"
                            className="text-center">
                            User Rate
                          </th>

                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="8"
                            className="text-right">
                            Amount
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="9"
                            className="text-center">
                            Place Date
                          </th>
                          <th
                            role="columnheader"
                            scope="col"
                            aria-colindex="10"
                            className="">
                            Match Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {DataList?.length > 0 &&
                          DataList.map((item) => {
                            console.log(item.isback)
                            return (
                              <tr role="row" className={`${item.isback===true?"back":item.isback===false?"lay":""}`}>
                                <td
                                  role="columnheader"

                                  aria-colindex="1"
                                  className="text-left "
                                  style={{
                                    // border:"5px solid "
                                  }}
                                  >
                                  {item.sportName}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="2"
                                  className="text-center">
                                  {item.eventName}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="3"
                                  className="text-center">
                                  {item.marketname}
                                </td>

                                <td
                                  role="columnheader"
                                  aria-colindex="5"
                                  className="text-center">
                                  {item.nation}
                                </td>
                                <td
                                  role="columnheader"
                                  aria-colindex="6"
                                  className="text-center">
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
                                <td
                                  role="columnheader"
                                  aria-colindex="10"
                                  className="">
                                  {moment(item.time).format("YYYY-MM-DD")}
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
            </div>
            <div className="row row5 mt-2">
              <div className="col-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item" onClick={decerement}>
                      <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </li>
                    {result?.length &&
                      result.map((item, id) => {
                        return (
                          <li
                            className="page-item"
                            onClick={() => handleClick(id)}>
                            <button className="page-link">{item}</button>
                          </li>
                        );
                      })}
                    <li className="page-item" onClick={increment}>
                      <button className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
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

export default UnSetteledBet;
