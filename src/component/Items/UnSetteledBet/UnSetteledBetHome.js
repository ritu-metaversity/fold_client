import React, { useEffect, useState } from "react";
import { UserAPI } from "../../../apis/UserAPI";
import "../AaccountStatement/AaccountStatement.css";
import SportUnsetteledBet from "./SportUnsetteledBet";
import CasinoUnsetteledBet from "./CasinoUnsetteledBet";
import { Tabs } from "antd";

function UnSetteledBetHome() {
  const items = [
    {
      key: "1",
      label: `Sport`,
      children: <SportUnsetteledBet />,
    },
    {
      key: "2",
      label: `Casino`,
      children: <CasinoUnsetteledBet />,
    },
  ];
  const onChange = (key) => {};
  return (
    <>
      <div className="card-header" style={{ padding: "4px 5px" }}>
        <h4 className="mb-0">Profit Loss</h4>
      </div>
      <Tabs defaultActiveKey="1" items={items} onClick={onChange} />
    </>
  );
}

export default UnSetteledBetHome;
