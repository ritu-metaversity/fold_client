import React from "react";
import "./LatestEvent.css";
import { Link } from "react-router-dom";

const LatestEvent = () => {
  return (
    <div>
      <div className="latest-event d-xl">
        {/* <div className="latest-event-item">
          <Link className="blink_me" to="/m/gamedetails/823215454">
            <i className="fa fa-soccer-ball-o"></i>
            <span>US Open Women 2023 - To Win Outright</span>
          </Link>
        </div> */}
        <div className="latest-event-item">
          <Link className="blink_me" to="/m/gamedetail/1693387820">
            <i className="fa fa-soccer-ball-o"></i>
            <span>US Open Men 2023 - To Win Outright</span>
          </Link>
        </div>
        <div className="latest-event-item">
          <Link className="blink_me" to="/m/gamedetails/895190242">
          <i className="fa fa-soccer-ball-o"></i>
            <span>FIBA World Cup 2023 - To Win Outright</span>
          </Link>
        </div>
        <div className="latest-event-item">
          <Link className="blink_me" to="/m/game-details/4/656025676">
          <i className="fa fa-soccer-ball-o"></i>
            <span> Pakistan v Bangladesh</span>
          </Link>
        </div>
        <div className="latest-event-item">
          <Link className="blink_me" to="/m/gamedetails/713294041">
          <i className="fa fa-soccer-ball-o"></i>
            <span>Q Zheng v A Sabalenka</span>
          </Link>
        </div>
        <div className="latest-event-item">
          <Link className="blink_me" to="/m/gamedetails/713294041">
          <i className="fa fa-soccer-ball-o"></i>
            <span>Q Zheng v A Sabalenka</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestEvent;
