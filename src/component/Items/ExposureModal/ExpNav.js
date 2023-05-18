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
          <button
            data-toggle="tab"
            className={`nav-link nav1 toggleBtn ${Active === 1 ? "active" : ""}`}
            >
            <div onClick={() => handleClick(1)}>Sports</div>
          </button>
        </li>
        <li className="nav-item text-center expRight">
          <button
            data-toggle="tab"
            className={`nav-link nav1 toggleBtn ${Active === 2 ? "active" : ""}`}
            >
            <div onClick={() => handleClick(2)}>Casino</div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ExpNav;
