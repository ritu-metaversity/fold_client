import React from "react";
import MyBet from "../../desktopLayout/MyBet/MyBet";

const CasinoMatchBet = () => {
  return (
    <div className="card m-b-10 my-bet" style={{borderRadius:"5px !important"}}>
      <div className="card-header bet-header" >
        <h6 className="card-title d-inline-block" >My Bet</h6>
      </div>
      <div className="card-body" style={{ padding: "0px" }}>
        <table className="coupon-table table  table-borderedless">
          <thead>
            <tr style={{background:"#ccc", }}>
              <th style={{ width: "60%", paddingLeft:"14px",fontSize:"12px" }}>Matched Bet</th>
              <th style={{fontSize:"12px" }} className="text-right">Odds</th>
              <th style={{fontSize:"12px" }} className="text-center">Stake</th>
            </tr>
          </thead>
          <MyBet />
        </table>
      </div>
    </div>
  );
};

export default CasinoMatchBet;
