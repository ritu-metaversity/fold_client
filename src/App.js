import { React, useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "./component/sidebar/sidebar.css";
import "../src/component/navBar/TopNav.css";

import Login from "./component/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
// eslint-disable-next-line
import SlotGame from "./component/Items/SlotGame/SlotGame";
import Home from "./component/Home/Home";
import AaccountStatement from "./component/Items/AaccountStatement/AaccountStatement";
import ProfitLoss from "./component/Items/ProfitLoss/ProfitLoss";
import BetHistory from "./component/Items/BetHistory/BetHistory";
import UnSetteledBet from "./component/Items/UnSetteledBet/UnSetteledBet";
import ChangeBtnValue from "./component/Items/ChangeBtnValue/ChangeBtnValue";
import ChangePassword from "./component/Items/ChangePassword/ChangePassword";
import SignOut from "./component/singnout/SignOut";
import GameHead from "./component/Items/GameDetail/Gamehead/GameHead";
import Slot from "./component/Items/Slot/Slot";
import Casino from "./component/Items/Casino/Casino";
import Deposit from "./component/Items/Deposit/Deposit";
import Withdraw from "./component/Items/Withdrow/Withdraw";
import Register from "./component/Register/Register";
import { AuthorAPI } from "./apis/AuthorAPI";

function App() {
  const [SportId, setSportId] = useState("");
  const token = localStorage.getItem("token");

  const nav = useNavigate();

  useEffect(() => {
    const time = setInterval(() => {
      if (localStorage.getItem("token"))
        AuthorAPI.VALIDATE_JWT()
          .then()
          .catch((error) => {
            if (token !== null) {
              if (error.response.status === 401) {
                localStorage.clear();
                nav("/login");
                window.location.reload();
              }
            }
          });
    }, 1000);
    return () => clearInterval(time);
    // eslint-disable-next-line
  }, []);

  const idddd = (id) => {
    setSportId(id);
  };
  return (
    <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Home idddd={idddd} />} />
          <Route exact path="/deposit" element={<Deposit />} />
          <Route exact path="/withdraw" element={<Withdraw />}/>
          <Route exact path="/gamedetail/:id" element={<GameHead SportId={SportId} />} />
          <Route exact path="/casino/:id" element={<Casino />} />
          <Route exact path="/m/reports/accountstatement" element={<AaccountStatement />}/>
          <Route exact path="/m/reports/profitloss" element={<ProfitLoss />} />
          <Route exact path="/m/reports/bethistory" element={<BetHistory />} />
          <Route exact path="/m/reports/unsetteledbet" element={<UnSetteledBet />} />
          <Route exact path="/m/setting/changebtnvalue" element={<ChangeBtnValue />} />
          <Route exact path="/m/setting/changepassword" element={<ChangePassword />} />
          <Route exact path="/m/sports" element={<Home />}/>
          <Route exact path="/m/In-play" element={<Home />}/>
          <Route exact path="/m/slot" element={<Slot />}/>
          <Route exact path="/m/others" element={<Home />}/>
          <Route exact path="/SignOut" element={<SignOut />}/>
        </Routes>
    </div>
  );
}

export default App;
