import { Tabs } from "antd";
import SportProfit from "./SportProfit/SportProfit";
import CasinoProfit from "./CasinoProfit/CasinoProfit";


function ProfitLoss() {
 
  const items = [
    {
      key: '1',
      label: `Sport`,
      children: <SportProfit/>,
    },
    {
      key: '2',
      label: `Casino`,
      children:<CasinoProfit/>,
    },
    
  ];
  const onChange = (key) => {
  };
  return (
    <>
    <div className="card-header">
          <h4 className="mb-0" style={{marginLeft:"-6px"}}>Profit Loss</h4>
        </div>
    <Tabs defaultActiveKey="1" items={items} onClick={onChange} />
    </>
  );
}

export default ProfitLoss;