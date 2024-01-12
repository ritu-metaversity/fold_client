import React, { useContext, useState } from 'react'
import './CasinoBetSlip.css'
import CasinoModal from '../Modal/CasinoModal';
import { globalContext } from '../../CasinoMainPage/CasinoMainPage';

const CasinoBetSlip = ({stakes, betState}) => {
    const [updated, setUpdated] = useState(0);
    // const id = window.location.pathname.replace("/", "");
  
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { betDetails, setBetDetails, setBetPlace } =useContext(globalContext);

    console.log(betState, "betDetailsbetDetails");

    

    // console.log(stakes, "stakes")


    const handleSubmit = () => {
        // const token = searchParams.get("token");
        // setIsLoading(true);
        // axios
        //   .post(
        //     "http://13.250.53.81/VirtualCasinoBetPlacer/vc/place-bet",
        //     {
        //       ...betDetails,
        //       matchId: id,
        //       stake: updated,
        //       userIp: "127.23.123.1",
        //       casinoName: 2,
        //       deviceInfo: {
        //         userAgent:
        //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        //         browser: "Chrome",
        //         device: "Macintosh",
        //         deviceType: "desktop",
        //         os: "Windows",
        //         os_version: "windows-10",
        //         browser_version: "108.0.0.0",
        //         orientation: "landscape",
        //       },
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     setIsLoading(false);
        //     if (res.data.status === true) {
        //       setBetPlace && setBetPlace((o) => !o);
        //       handleBetClose();
        //       toast.success("Success !!");
        //     } else {
        //       toast.error(res.data.message || "Failed !!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
    
        //     setIsLoading(false);
        //     toast.error(error?.response?.data?.message || "Failed !!");
        //   });
      };

      const handleClick = (event) => {
        setUpdated(event);
      };
      const handleBetClose = (event) => {
        setUpdated(event);
      };


    const colorName =  "back" ;
  return (
    <>
    <>
      {isLoading && (
        <p className="place-lodder">
          <div>
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </p>
      )}
      <div className="card d-none d-sm-block">
        <div className="card-header bg-primary text-white">Place Bet</div>
        <div className="">
            <div className={`table-responsive bet-table ${colorName}`}>
              <form>
                <table
                    className={`coupon-table table table-borderedless ${colorName}`}>
                    <thead>
                      <tr>
                        <th></th>
                        <th style={{ width: "35%", textAlign: "left" }}>
                          (Bet for)
                        </th>
                        <th style={{ width: "25%", textAlign: "left" }}>
                          Odds
                        </th>
                        <th style={{ width: "15%", textAlign: "left" }}>
                          Stake
                        </th>
                        <th style={{ width: "15%", textAlign: "right" }}>
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{height:"40px"}}>
                        <td className="text-center">
                          <button
                            onClick={handleBetClose}
                            className="text-danger closeIcon">
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                        <td style={{whiteSpace:"initial"}}>{betState?.nation}</td>
                        <td className="bet-odds">
                          <div className="">
                            <input
                              placeholder="0"
                              type="text"
                              required="required"
                              maxlength="4"
                              readonly="readonly"
                              className="amountint"
                              value={betState?.odds}
                              style={{
                                width: "35px",
                                verticalAlign: "middle",
                              }}
                            />
                            <div className="spinner-buttons input-group-btn btn-group-vertical">
                              <button
                                type="button"
                                className="custom-btn-spinner btn btn-xs btn-default">
                                <i className="fa fa-angle-up"></i>
                              </button>{" "}
                              <button
                                type="button"
                                className="custom-btn-spinner btn btn-xs btn-default">
                                <i className="fa fa-angle-down"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="bet-stakes">
                          <div className=" bet-stake">
                            <input
                              maxlength="10"
                              required="required"
                              type="number"
                              onChange={(e)=>setUpdated(e.target.value)}
                              value={updated}
                            />
                          </div>
                        </td>
                        <td className="text-right bet-profit">
                          0.00
                        </td>
                      </tr>
                      <tr>
                      <td
                        colSpan={5}
                        className="value-buttons"
                        style={{ padding: "5px" }}
                      >
                        {stakes &&
                          Object?.values(stakes)?.map((item) => {
                            return (
                              <button
                                className="btn m-l-5 m-b-5"
                                onClick={() => handleClick(item)}
                                  // value={e}
                                type="button"
                              >
                                {item}
                              </button>
                            );
                          })}
                      </td>
                    </tr>
                    </tbody>
                  </table>

                <div className="col-md-12 palce_btn">
                  <button
                    type="button"
                    onClick={handleBetClose}
                    className="btn btn-sm btn-danger float-left"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-sm btn-success float-right m-b-5"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
      
        </div>
      </div>

        <CasinoModal open={open} handleClose={handleBetClose} title="Place Bet">
          <div className={`place-bet pt-2 pb-2`}>
            <div className={`container-fluid container-fluid-5`}>
              <div className="stake_container mt-2">
                <div className="">
                  <b>"ten patti"</b>
                </div>
                <div></div>
                <div className="d-flex">
                  <button className="stakeactionminus btn-primary btn" disabled>
                    <span className="fa fa-minus"></span>
                  </button>{" "}
                  <input
                    placeholder="15"
                    value="100"
                    className="w-100"
                    // onChange={(e) => setgetBetValu(e.target.value)}
                    // value={getBetValu}
                    readOnly
                  />
                  <button className="stakeactionminus btn-primary btn" disabled>
                    <span className="fa fa-plus"></span>
                  </button>
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="0"
                    className=" w-100"
                    value={updated}
                    autoFocus
                    onChange={(e) => setUpdated(Number(e.target.value))}
                  />
                </div>
                <div className="">
                  <button
                    className="btn btn-primary btn-block w-100"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className=" text-center pt-1">
                  
                </div>
                {/* {stakes?.map((e, id) => {
                    return (
                      <div className="" key={e + id}>
                        <button
                          className="btn btn-primary btn-block w-100"
                          onClick={() => handleClick(e)}
                        >
                          {e}
                        </button>
                      </div>
                    );
                  })} */}
              </div>
            </div>
          </div>
        </CasinoModal>
      
    </>
    </>
  )
}

export default CasinoBetSlip