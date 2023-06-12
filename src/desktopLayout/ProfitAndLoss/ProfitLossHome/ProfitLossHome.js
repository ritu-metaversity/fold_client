import React from "react";
import SportPnl from "./SportPnl/SportPnl";
import CasinoPnl from "../CasinoPnl/CasinoPnl";
import { Tabs } from "antd";
import SideBar from "../../sidebar/SideBar";

const ProfitLossHome = () => {
  const items = [
    {
      key: "1",
      label: `Sport`,
      children: <SportPnl />,
    },
    {
      key: "2",
      label: `Casino`,
      children: <CasinoPnl />,
    },
  ];
  const onChange = (key) => {};
  return (
    <>
      <div className="main">
        <div className="container-fluid container-fluid-5">
          <div className=" itemHome">
            <div className="card">
              <div className="card-header header-card">
                <h4 className="mb-0">Profit Loss</h4>
              </div>

              <Tabs defaultActiveKey="1" items={items} onClick={onChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitLossHome;
