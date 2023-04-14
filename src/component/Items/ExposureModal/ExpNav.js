import React, { useState } from "react";

const ExpNav = (props) => {
  const [Active, setActive] = useState(1);

  const handleClick = (val) => {
    setActive(val);
    props.sporttype(val);
  };

  return (
    <div className="sports active">
      <ul className="nav nav-tabs game-nav-bar">
        <li className="nav-item text-center expLeft">
          <a
            data-toggle="tab"
            className={`nav-link nav1 ${Active === 1 ? "active" : ""}`}
            >
            <div onClick={() => handleClick(1)}>Sports</div>
          </a>
        </li>
        <li className="nav-item text-center expRight">
          <a
            data-toggle="tab"
            className={`nav-link nav1 ${Active === 2 ? "active" : ""}`}
            >
            <div onClick={() => handleClick(2)}>Casino</div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExpNav;
