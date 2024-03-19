import React from "react";
import "./LatestEvent.css";
import { Link } from "react-router-dom";
import { MdSportsCricket } from "react-icons/md";

const LatestEvent = ({iplPath, elePath}) => {
  return (
    <div>
      <div className="latest-event d-xl">
        <div className="latest-event-item">
          <Link className="blink_me" to={iplPath}>
            <MdSportsCricket />
            <span>IPL 2024</span>
          </Link>
        </div>
        <div className="latest-event-item">
          <Link className="blink_me" to={elePath}>
          <i className="fa fa-soccer-ball-o"></i>
            <span>ELECTION 2024</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestEvent;
