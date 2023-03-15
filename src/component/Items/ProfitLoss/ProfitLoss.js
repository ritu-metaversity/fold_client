import React, { useState } from "react";
import Footer from "../../footer/Footer";
import NavBar from "../../navBar/NavBar";
import SideBar from "../../sidebar/SideBar";
import "../AaccountStatement/AaccountStatement.css";
import moment from "moment";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

function ProfitLoss() {
  const [startDate, setStartDate] = useState("");
  const [show, setShow] = useState(false);

  var curr = new Date();
// eslint-disable-next-line
  const inInd = curr.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
// eslint-disable-next-line
  const DateValue = (date, dateString) => {
    setStartDate(dateString);
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
  };
  return (
    <div>
      <NavBar />
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className="row row5">
            <div className="sidebar col-md-2">
              <SideBar />
            </div>

            <div className="col-md-10 report-main-content m-t-5 desk-top-view">
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Profit Loss</h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 ">
                  <div className="row row5">
                    <div className="col-2">
                      <div className="form-group mb-0">
                        <div
                          className="mx-datepicker"
                          not-before="Tue Jan 10 2023 05:30:00 GMT+0530 (India Standard Time)"
                          not-after="Fri Feb 10 2023 05:30:00 GMT+0530 (India Standard Time)"
                          style={{ width: "auto" }}>
                          <div className="mx-input-wrapper">
                            {/* <input
                              name="date"
                              type="date"
                              className="mx-input"
                              defaultValue={date}
                              onChange={(e) => setStartDate(e.target.value)}
                            /> */}
                            <DatePicker
                              defaultValue={dayjs}
                              format={dateFormat}
                              onChange={DateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "day")) ||
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
                              format={dateFormat}
                              onChange={DateValue}
                              
                            />

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-1">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={submit}>
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
                          <thead  className="">
                            <tr role="row" className="">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-center">
                                Event Type
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
                                className="text-right">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody ></tbody>
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
      <Footer />

      {/* mobile view */}
      {/* -------------------------------- */}
      {/* -------------------------------- */}
      {/* -------------------------------- */}

      <div className="report-container Mobile-view-topNav">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Profit Loss</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5">
            <div className="row row5">
              <div className="col-6">
                <div className="form-group mb-0">
                  <div
                    className="mx-datepicker"
                    not-before="Sun Jan 15 2023 05:30:00 GMT+0530 (India Standard Time)"
                    not-after="Wed Feb 15 2023 05:30:00 GMT+0530 (India Standard Time)"
                    style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
                      <DatePicker
                              defaultValue={dayjs}
                              format={dateFormat}
                              onChange={DateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
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
                    not-before="Sun Jan 15 2023 05:30:00 GMT+0530 (India Standard Time)"
                    not-after="Wed Feb 15 2023 05:30:00 GMT+0530 (India Standard Time)"
                    style={{ width: "auto" }}>
                    <div className="mx-input-wrapper">
                    <DatePicker
                              defaultValue={dayjs}
                              format={dateFormat}
                              onChange={DateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
                                d.isAfter(dayjs())
                              }
                            />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row5 mt-2">
              <div className="col-12">
                <button className="btn btn-primary btn-block btn-sm">
                  Submit
                </button>
              </div>
            </div>
            <div className="row row5 mt-2">
              <div className="col-12">
                <div className="row row5">
                  <div className="col-12">
                    <p className="mb-0 text-center">
                      There are no records to show
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfitLoss;
