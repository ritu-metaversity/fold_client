import React, { useEffect, useState } from "react";
import "../ProfitLoss.css";
// import "../AaccountStatement/AaccountStatement.css";
import "../../AaccountStatement/AaccountStatement.css";
import moment from "moment";
import { DatePicker, Tabs } from "antd";
import dayjs from "dayjs";
import { UserAPI } from "../../../../apis/UserAPI";
import { GameAPI } from "../../../../apis/gameAPI";

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

  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
    console.log(dateString);
  };
  const EndDateValue = (date, dateString) => {
    setEndDate(dateString);
  };
  const getOptionValue1 = (e) => {
    console.log(e.target.value)
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

console.log(SportId!=="");

  useEffect(() => {
    if(SportId !== "") {
      console.log("seconf api hit")

      GameAPI.CASINO_LIST_BY_TYPE({
        id: SportId,
      }).then((res) => {
        console.log(res,"currs res skkkrrrr")
        setCasinoList(res);
      });
    }
  }, [SportId]);



  useEffect(() => {
    console.log("first hit")
    UserAPI.Profit_Loss({
      sportId: SportId,
      matchId: "",
      fromDate: startDate,
      toDate: endDate,
      userId: "",
    }).then((res) => {
      setPLValue(res.data);
      setCasinoDataList(res.data.length);
    });
  }, []);

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

    UserAPI.Profit_Loss({
      noOfRecords: IndexValue,
      index: 1,
      toDate: endDate,
      fromDate: startDate,
      sportId: MatchId,
      matchId: SportId,
      userId: "",
      totalPages: 2,
    }).then((res) => {
        setPLValue(res.data);
        setCasinoDataList(res.data.length);
    });
  };

  return (
    <div>
      <div className="report-container Mobile-view-topNav">
        <div className="card">
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
                    not-before="Sun Jan 15 2023 05:30:00 GMT+0530 (India Standard Time)"
                    not-after="Wed Feb 15 2023 05:30:00 GMT+0530 (India Standard Time)"
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
            <div className="row row5 mt-2" style={{ marginInline: "-7px" }}>
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
            <div className="row row5 mt-2" style={{ marginInline: "-7px" }}>
              <div className="col-6">
                <div
                  id="account-statement_length"
                  className="dataTables_length">
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
                          className="text-left">
                          Match Name
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="1"
                          className="text-left">
                          Pnl
                        </th>
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="4"
                          className="text-left">
                          Commssion Mila
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`${CasinoDataList===0?"dis-none":""}`}>
                      {PLValue?.length &&
                        PLValue.map((res) => {
                          return (
                            <tr role="row">
                              <td aria-colindex="2" className="text-left">
                                {res.matchName}
                              </td>
                              <td aria-colindex="1" className="text-right">
                                {parseFloat(res.pnl).toFixed(2)}
                              </td>

                              {/* <td
                            aria-colindex="3"
                            className="text-right text-success">
                            {parseFloat(res.uplineAmount).toFixed(2)}
                          </td> */}
                              <td
                                aria-colindex="5"
                                className="text-right text-success">
                                {res.commssionMila}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tbody>
                    <tr
                      role="row"
                      className={`b-table-empty-row ${CasinoDataList===0?"":"dis-none"}`}>
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
        </div>
      </div>
    </div>
  );
}

export default CasinoProfit;
