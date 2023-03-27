import { React, useEffect} from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "./component/sidebar/sidebar.css";
import "../src/component/navBar/TopNav.css";

import Login from "./component/login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import {
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { AuthorAPI } from "./apis/AuthorAPI";

function App() {
  const history = useHistory("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setInterval(() => {
        AuthorAPI.VALIDATE_JWT()
          .then()
          .catch((error) => {
            if(token !== null){
            if (error.response.status === 401) {
              localStorage.clear();
              history.push("/login");
            }
          }
          });
    }, 1500);
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/deposit">
            <Deposit />
          </Route>
          <Route exact path="/withdraw">
            <Withdraw />
          </Route>
          <Route exact path="/gamedetail/:id">
            <GameHead />
          </Route>
          <Route exact path="/casino/:id">
            <Casino />
          </Route>
          <Route exact path="/m/reports/accountstatement">
            <AaccountStatement />
          </Route>
          <Route exact path="/m/reports/profitloss">
            <ProfitLoss />
          </Route>
          <Route exact path="/m/reports/bethistory">
            <BetHistory />
          </Route>
          <Route exact path="/m/reports/unsetteledbet">
            <UnSetteledBet />
          </Route>
          <Route exact path="/m/setting/changebtnvalue">
            <ChangeBtnValue />
          </Route>
          <Route exact path="/m/setting/changepassword">
            <ChangePassword />
          </Route>
          <Route exact path="/m/sports">
            <Home />
          </Route>
          <Route exact path="/m/In-play">
            <Home />
          </Route>
          <Route exact path="/m/slot">
            <Slot />
          </Route>
          <Route exact path="/m/others">
            <Home />
          </Route>
          <Route exact path="/SignOut">
            <SignOut />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
