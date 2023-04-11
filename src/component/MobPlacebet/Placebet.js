import { React, useEffect, useState } from "react";
import "./Placebet.css";
import { GameAPI } from "../../apis/gameAPI";
import axios from "axios";

function Placebet({ spanValueRate, spanValueName, matchDetail, colorName, matchId, marketId, selectionId, MarketName, placeTime, isFancy,data, priceValue }) {
  const [updated, setUpdated] = useState("");
  const [StackVal, setStackVal] = useState("");
  const [userIP, setUserIP] = useState("");
  // eslint-disable-next-line
  const [odds, setOdds]=useState(spanValueRate);
  // eslint-disable-next-line
  const [name, setName]=useState(spanValueName);
  // const [status, setStatus]=useState("");

  const [getBetValu, setgetBetValu] = useState(spanValueRate);
  const handleClick = (event) => {
    setUpdated(event.target.value);
  };


  useEffect(()=>{
    axios.get("https://geolocation-db.com/json/").then((res)=>{
      setUserIP(res.data.IPv4)
    })
  },[]);



  const handleSubmit = ()=>{
    GameAPI.PLACE_BET({
      "userIp": userIP,
        "isFancy": isFancy,
        "isBack": colorName ==="back" ? true:false,
        "odds": odds,
        "stake": parseInt(updated),
        "name": name, 
        "marketName": MarketName,
        "selectionId": parseInt(selectionId),
        "priceValue": isFancy===false? odds : priceValue, 
        "placeTime": placeTime,
        "marketId":marketId===""?selectionId:marketId,
        "matchId": matchId,
        "deviceInfo": {
           "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
           "browser": "Chrome",
           "device": "Macintosh",
           "deviceType": "desktop",
           "os": "Windows",
           "os_version": "windows-10",
           "browser_version": "108.0.0.0",
           "orientation": "landscape"
        }      
    }).then((res)=>{
      // setStatus(res.data.status);
      data({
        status:true,
        message:res.data.message
      })
    }).catch((error)=>{
      data({
        status:error.response.status,
        message:error.response.data.message
      })
      
    })
  }


  useEffect(() => {
    GameAPI.Place_Bet().then((res)=>{
      setStackVal(res);
    })
  }, []);

  return (
    <>
      <div id="__BVID__287___BV_modal_body_">
        <div>
          <div className={`place-bet pt-2 pb-2`}>
            <div className={`container-fluid container-fluid-5`}>
              <div className="row row5">
                <div className="col-5">
                  <b>{spanValueName}</b>
                </div>
                <div className="col-7 text-right">
                  <div className="float-right d-flex">
                    <button
                      className="stakeactionminus btn"
                      onClick={() =>
                        setgetBetValu(
                          getBetValu >= 2 ? getBetValu - 0.1 : getBetValu - 0.05
                        )
                      }
                      disabled={parseFloat(getBetValu).toFixed(2) === 1}>
                      <span className="fa fa-minus"></span>
                    </button>{" "}
                    <input
                      type="text"
                      placeholder="15"
                      className="stakeinput"
                      onChange={(e) => setgetBetValu(e.target.value)}
                      value={
                        parseFloat(getBetValu).toFixed(2) <= 1 ? "0" : getBetValu
                      }
                      readOnly
                    />
                    <button
                      className="stakeactionminus btn"
                      onClick={() =>
                        setgetBetValu(
                          getBetValu >= 2 ? getBetValu + 0.1 : getBetValu + 0.05
                        )
                      }>
                      <span className="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row row5 mt-2">
                <div className="col-4">
                  <input
                    type="number"
                    // placeholder="00"
                    className="stakeinput w-100"
                    value={updated === "" ? "00" : updated}
                  />
                </div>
                <div className="col-4">
                  <button className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="col-4 text-center pt-1">
                  <span>
                    {colorName === "back"
                      ? (parseFloat(getBetValu).toFixed(2) <= 1
                          ? updated * 1 - updated
                          : updated * parseFloat(getBetValu).toFixed(2) - updated
                        )
                      : (updated * parseFloat(getBetValu).toFixed(2) - updated).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="row row5 mt-2">
                {Object.values(StackVal).map((e, id) => {
                  return (
                    <div className="col-4" key={e+id}>
                      <button
                        className="btn btn-secondary btn-block mb-2"
                        onClick={handleClick}
                        value={e}>
                        {e}
                      </button>
                    </div>
                  );
                })}
              </div>

              {matchDetail.map((e) => {
                return (
                  <div className={`row row5 mt-2 ${isFancy===true?"fancy-none":""}`} key={e.selectionId+e.selectionId}>
                    <div className="col-4">
                      <span>{e.name}</span>
                    </div>
                    <div className="col-4 text-center text-success">
                      <b>
                        <span style={{ color: "black" }}>0</span>
                      </b>
                    </div>
                    <div className="col-4 text-right">
                      {colorName === "back" ? (
                        <span
                          className={
                            updated === ""
                              ? "text-danger"
                              : spanValueName === e.name
                              ? "text-success"
                              : "text-danger"
                          }>
                          {updated === "" ? (
                            <b>0.00</b>
                          ) : (
                            <b>
                              {spanValueName === e.name
                                ? (parseFloat(getBetValu).toFixed(2) <= 1
                                ? updated * 1 - updated
                                : updated * parseFloat(getBetValu) - updated
                              ).toFixed(2)
                                : `-${updated === "00" ? "0" : updated}.00`}
                            </b>
                          )}
                        </span>
                      ) : (
                        <span
                          className={
                            updated === ""
                              ? "text-danger"
                              : spanValueName === e.name
                              ? "text-danger"
                              : "text-success"
                          }>
                          {updated === "" ? (
                            <b>0.00</b>
                          ) : (
                            <b>
                              {spanValueName === e.name
                                ? ` ${parseFloat(getBetValu).toFixed(2) <= 1
                                    ? updated * 1 - updated
                                    : - (parseFloat(updated).toFixed(2))
                                  }`
                                : (updated * parseFloat(getBetValu).toFixed(2) - updated).toFixed(2)}
                            </b>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Placebet;
