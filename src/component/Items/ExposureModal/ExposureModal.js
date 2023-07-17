import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "./ExposureModal.css";
import ExpNav from "./ExpNav";
import SportExp from "./SportExp/SportExp";
import CasinoExp from "./CasinoExp/CasinoExp";

const ExposureModal = () => {
  const [spType, setSpType] = useState(1);

  const sporttype = (val) => {
    setSpType(val);
  };
  

  return (
    <>
      <div className="report-container wrapper main-exp-containor">
        <div className="card">
          <ExpNav sporttype={sporttype} />

          {
            spType === 1? <SportExp spType={spType}/>:<CasinoExp spType={spType}/>
          }
          
        </div>
      </div>
    </>
  );
};

export default ExposureModal;
