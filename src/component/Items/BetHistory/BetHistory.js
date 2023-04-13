import React from "react";
import NavBar from "../../navBar/NavBar";
import "../AaccountStatement/AaccountStatement.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

function BetHistory() {
  // const [startDate, setStartDate] = useState("");
  // const [show, setShow] = useState(false);

  // var curr = new Date();

  // const inInd = curr.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  const DateValue = (date, dateString) => {
    // setStartDate(dateString);
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
      <div className="report-container wrapper">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Bet History</h4>
          </div>
          <div className="card-body container-fluid container-fluid-5">
            <div className="row row5 mt-2 acc-stat">
              <div className="col-6">
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
              <div className="col-6">
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
            </div>
            <div className="row row5 mt-2 acc-stat">
              <div className="col-6">
                <div className="form-group mb-0">
                  <div
                    className="mx-datepicker"
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
            <div className="row row5 mt-2 acc-stat">
              <div className="col-12">
                <button className="btn btn-primary btn-block btn-sm">
                  Submit
                </button>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetHistory;
