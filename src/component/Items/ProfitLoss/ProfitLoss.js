import { Tabs } from "antd";
import SportProfit from "./SportProfit/SportProfit";
import NavBar from "../../navBar/NavBar";
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
    console.log(key);
  };
  return (
    <>
    <NavBar />
    <div className="card-header">
          <h4 className="mb-0">Profit Loss</h4>
        </div>
    <Tabs defaultActiveKey="1" items={items} onClick={onChange} />
    </>
  );
}

export default ProfitLoss;
