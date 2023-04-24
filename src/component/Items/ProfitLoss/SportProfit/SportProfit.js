import  { React,  useEffect, useState } from "react";
import "../ProfitLoss.css";
import "../../AaccountStatement/AaccountStatement.css";
import moment from "moment";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { UserAPI } from "../../../../apis/UserAPI";
import { GameAPI } from "../../../../apis/gameAPI";
import AlertBtn from "../../../Alert/AlertBtn";

const dateFormat = "YYYY-MM-DD";
function SportProfit() {
  const [show, setShow] = useState(false);
  var curr = new Date();
  const timeBefore = moment(curr).subtract(14, "days").format("YYYY-MM-DD");
  const time = moment(curr).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(timeBefore);
  const [endDate, setEndDate] = useState(time);
  const [IndexValue, setIndexValue] = useState(5);
  const [PLValue, setPLValue] = useState();
  const [SportId, setSportId] = useState(4);
  const [MatchId, setMatchId] = useState();
  const [SportList, setSportList] = useState();
  const [SportData, setSportData] = useState();
  // const [SportDataLength, setSportDataLength] = useState();
  const [DataList, setDataList] = useState();
  const [DataVal, setDataVal] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [ColorName, setColorName] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");



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
    GameAPI.ACTIVE_SPORT_LIST().then((res) => {
      setSportList(res);
    });
  }, []);

  useEffect(() => {
    if (SportId !== "") {
      GameAPI.Active_Match_Sport_Wise({ sportId: SportId }).then((res) => {
        setSportData(res?.data?.data);
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
      setIsLoading(false);
      setDataVal(res?.data)
      setPLValue(res?.data?.market);
    
    });
  }, [SportId]);
  

  const getIndexValues = (e) => {
    setIndexValue(e.target.value);
  };

  const submit = () => {

    if(startDate === "" || endDate === ""){
      setError(true)
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

    if(startDate !== "" &&  endDate !== ""){

    UserAPI.Profit_Loss({
      noOfRecords: parseInt(IndexValue),
      index:0,
      toDate: endDate,
      fromDate: startDate,
      sportId: parseInt(SportId),
      matchId: MatchId,
      userId: "",
      totalPages: 2
    }).then((res) => {
      setIsLoading(false)
      setDataVal(res?.data)
      setPLValue(res?.data?.market);
      setDataList(res?.data?.market?.length);
    });
  }
  };

  const popupClose = (vl) => {
    setError(vl);
  };

  return (
    <div>
      {
        Error ? <AlertBtn color={ColorName} val={ErrorMsg} popupClose={popupClose}/> :""
      }
      <div className="report-container statement1">
        <div className="card">
          <div className="card-body container-fluid container-fluid-5">
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
              <div className="col-6 ">
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
                    <option selected>Select Match</option>
                    {SportList?.length &&
                      SportList?.map((item) => {
                        return (
                          <option value={item?.sportId} key={item?.sportId}>{item?.sportName}</option>
                        );
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
                    <option>Select Match List</option>

                    {SportData?.length &&
                      SportData?.map((item) => {
                        return (
                          <option value={item?.matchId} key={item?.matchId}>{item?.matchName}</option>
                        );
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
                        <th
                          role="columnheader"
                          scope="col"
                          aria-colindex="4"
                          className="text-left bg-color">
                          Commssion Mila
                        </th>
                      </tr>
                    </thead>
                    {
                      isLoading? (<tr className="lodding">
                      <td colSpan="3">
                      <i className="fa fa-spinner fa-spin"></i>
                      </td>
                    
                  </tr>):(<>
                    <tbody className={`${DataList === 0|| DataVal === null  ?"dis-none":""}`}>
                      {PLValue?.length &&
                        PLValue.map((res) => {
                          return (
                            <tr role="row" key={res.matchName}>
                              <td aria-colindex="2" className="text-left">
                                {res?.matchName}
                              </td>
                              <td aria-colindex="1" className="text-right">
                                {parseFloat(res?.pnl).toFixed(2)}
                              </td>
                              <td
                                aria-colindex="5"
                                className="text-right text-success">
                                {res?.commssionMila}
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                    <tbody>
                    <tr
                      role="row"
                      className={`b-table-empty-row ${
                        DataVal === null || DataList===0  ? "" : "dis-none"
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
                  </>)
                    }
                   
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

export default SportProfit;
