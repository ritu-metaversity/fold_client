import React from "react";
import { Tabs } from "antd";
import UnsetteledBetSportForDesk from "./UnsetteledBetSportForDesk";
import UnsetteledBetCasinoForDesk from "./UnsetteledBetCasinoForDesk";

const UnsetteledBetDeskHome = () => {
  const items = [
    {
      key: "1",
      label: `Sport`,
      children: <UnsetteledBetSportForDesk/>,
    },
    {
      key: "2",
      label: `Casino`,
      children: <UnsetteledBetCasinoForDesk />,
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
                <h4 className="mb-0">Un-Setteled Bet</h4>
              </div>

              <Tabs defaultActiveKey="1" items={items} onClick={onChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnsetteledBetDeskHome;
