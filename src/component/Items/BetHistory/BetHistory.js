import React, { useState } from "react";
import NavBar from "../../navBar/NavBar";
import "../AaccountStatement/AaccountStatement.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

function BetHistory() {
  const [startDate, setStartDate] = useState("");
  // const [show, setShow] = useState(false);

  var curr = new Date();
 

  const inInd = curr.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const DateValue = (date, dateString) => {
    setStartDate(dateString);
  };

  // const submit = () => {
  //   if (startDate === "") {
  //     setStartDate(moment().format().slice(0, 10));
  //   } else {
  //     setStartDate(startDate);
  //   }

  //   if (show === false) {
  //     setShow(true);
  //   }
  // };

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
                  <h4 className="mb-0">Account Statement</h4>
                </div>
                <div className="card-body container-fluid container-fluid-5 ">
                  <div className="row row5">
                    <div className="col-2">
                      <div className="form-group mb-0">
                        <select name="reportType" className="custom-select">
                          <option value="" disabled="disabled">
                            Sport Type
                          </option>
                          <option value="1">Football</option>
                          <option value="2">Tennis</option>
                          <option value="4">Cricket</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="form-group mb-0">
                        <select name="reportType" className="custom-select">
                          <option value="" disabled="disabled">
                            Bet Status
                          </option>
                          <option value="1">Matched</option>
                          <option value="2">Deleted</option>
                        </select>
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
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
                                d.isAfter(dayjs())
                              }/>
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
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
                                d.isAfter(dayjs())
                              }/>
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
                          aria-colcount="8"
                          className="table b-table table-bordered"
                          id="__BVID__103">
                          <thead  className="">
                            <tr role="row" className="">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="1"
                                className="text-center">
                                Event Name
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="2"
                                className="text-center">
                                Nation
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="3"
                                className="text-center">
                                Bet Type
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="4"
                                className="text-center">
                                User Rate
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="5"
                                className="text-right">
                                Amount
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="6"
                                className="text-right">
                                Profit/Loss
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="7"
                                className="text-center">
                                Place Date
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex="8"
                                className="text-center">
                                Match Date
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
      <Footer /> */}
      

      <div className="report-container wrapper">
    
   <div className="card">
      <div className="card-header">
         <h4 className="mb-0">Bet History</h4>
      </div>
      <div className="card-body container-fluid container-fluid-5">
         <div className="row row5 mt-2">
            <div className="col-6">
               <div className="form-group mb-0">
                  <select name="reportType" className="custom-select">
                     <option value="" disabled="disabled">Sport Type</option>
                     <option value="1">Football</option>
                     <option value="2">Tennis</option>
                     <option value="4">Cricket</option>
                  </select>
               </div>
            </div>
            <div className="col-6">
               <div className="form-group mb-0">
                  <select name="reportType" className="custom-select">
                     <option value="" disabled="disabled">Bet Status</option>
                     <option value="1">Matched</option>
                     <option value="2">Deleted</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="row row5 mt-2">
            <div className="col-6">
               <div className="form-group mb-0">
                  <div className="mx-datepicker" not-before="Sun Jan 15 2023 05:30:00 GMT+0530 (India Standard Time)" not-after="Wed Feb 15 2023 05:30:00 GMT+0530 (India Standard Time)" style={{width: "auto"}}>
                     <div className="mx-input-wrapper">
                     <DatePicker
                              defaultValue={dayjs}
                              format={dateFormat}
                              onChange={DateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
                                d.isAfter(dayjs())
                              }/>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-6">
               <div className="form-group mb-0">
                  <div className="mx-datepicker" not-before="Sun Jan 15 2023 05:30:00 GMT+0530 (India Standard Time)" not-after="Wed Feb 15 2023 05:30:00 GMT+0530 (India Standard Time)" style={{width: "auto"}}>
                     <div className="mx-input-wrapper">
                     <DatePicker
                              defaultValue={dayjs}
                              format={dateFormat}
                              onChange={DateValue}
                              disabledDate={(d) =>
                                !d ||
                                d.isBefore(dayjs().subtract(10, "month")) ||
                                d.isAfter(dayjs())
                              }/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row row5 mt-2">
            <div className="col-12"><button className="btn btn-primary btn-block btn-sm">Submit</button></div>
         </div>
         <div className="row row5 mt-2">
            <div className="col-12">
               <div className="row row5">
                  <div className="col-12">
                     <p className="mb-0 text-center">There are no records to show</p>
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

export default BetHistory;
