import { useEffect, useState } from "react";
import "./CasinoResult.css";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { tableIdtoUrl, titleById } from "../Constant/Constant";
import ResultModalContainer from "../LastResult/ResultModalContainer";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import CasinoResultTable from "./CasinoResultTable";
import { CasinoLiveApi } from "../../apis/CasinoLiveApi";

const CasinoResult = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [casinoId, setCasinoId] = useState("");
  const [resultList, setResultList] = useState([]);
  const [mid, setMid] = useState("");
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  const [noOfRecords, setNoOfRecords] = useState(10);
  const [index, setIndex] = useState(0);
  var curr = new Date();
  const time = moment(curr).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(time);
  const dateFormat = "YYYY-MM-DD";

  const {id} = useParams()

  useEffect(() => {
    CasinoLiveApi.Casino_Result({
      gtype: tableIdtoUrl[casinoId || id],
      noOfRecord: noOfRecords,
      index,
    }).then((res) => {
      if (res?.data) {
        setResultList(res.data || []);
      }
    }).catch((err) => {
      console.log(err);
      setResultList([]);
    });
  }, [noOfRecords, index, id]);

  const handleSubmit = ()=>{
    CasinoLiveApi.Casino_Result({
      gtype: tableIdtoUrl[casinoId || id],
      noOfRecord: noOfRecords,
      index,
    }).then((res) => {
      if (res?.data) {
        setResultList(res.data || []);
      }
    }).catch((err) => {
      console.log(err);
      setResultList([]);
    });
  }

  const changeNoOfRecords = (e) => {
    setNoOfRecords(Number(e.target.value));
  };
  const handlePrev = () => {
    setIndex((o) => (o <= 0 ? 0 : o - 1));
  };
  const handleNext = () => {
    console.log("next");
    setIndex((o) => (o >= 100 ? 100 : o + 1));
  };

  const StartDateValue = (date, dateString) => {
    setStartDate(dateString);
  };

  return (
    <div>
      <ResultModalContainer
        tableId={casinoId}
        mid={mid}
        setMid={(mid) => setMid(mid)}
      />
      <div className="card">
        <div className="card-header bg-primary">
          <div className="text-white">Casino Result</div>
        </div>
        <div className="card-body gap-container ">
          <div className="row">
            <div className="col-2">
              <DatePicker
                defaultValue={dayjs(startDate)}
                className="mx-input"
                format={dateFormat}
                selected={startDate}
                onChange={StartDateValue}
                disabledDate={(d) =>
                  !d ||
                  d.isBefore(dayjs().subtract(2, "month")) ||
                  d.isAfter(dayjs())
                }
              />
              {/* <CustomizedDatePicker value={fromDate} onChange={setFromDate} /> */}
            </div>
            <div className="col-2">
              <div className="form-group mb-0">
                <select
                  name="reportType"
                  onChange={(e) => setCasinoId(e.target.value)}
                  className="custom-select">
                  <option value="">Casino Type</option>
                  {Object.keys(titleById).map((key) => (
                    <option value={key}>{titleById[key]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-2" onClick={handleSubmit}>
              <button className="btn btn-primary ">Submit</button>
            </div>
          </div>
          <div className="w-100">
            Show{" "}
            <select onChange={changeNoOfRecords} className="custom-select-sm">
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            Entries
          </div>
          <CasinoResultTable resultList={resultList} setMid={setMid} setIndex={setIndex} handlePrev={handlePrev} index={index} handleNext={handleNext}/>

        </div>
      </div>
    </div>
  );
};

export default CasinoResult;
