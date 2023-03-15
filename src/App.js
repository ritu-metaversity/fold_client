import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "./component/sidebar/sidebar.css";
import "../src/component/navBar/TopNav.css";

import "../src/component/NewLunch.css";
import Login from "./component/login/Login";
import { BrowserRouter, Route, Switch} from "react-router-dom";

// import LiveCasino from "./component/Items/LiveCasino/LiveCasino";
import SlotGame from "./component/Items/SlotGame/SlotGame";
// import Race from "./component/Items/Race/Race";
// import HorseRace from "./component/Items/HorseRace/HorseRace";

// import DtList from "./component/Items/DtList/DtList";
// import SportCasino from "./component/Items/SportCasino/SportCasino";
// import AndarBahar from "./component/Items/andarBahar/AndarBahar";
// import BollywoodTable from "./component/Items/bollywoodTable/BollywoodTable";
// import Binary from "./component/Items/Binary/Binary";
// import CasinoWar from "./component/Items/casinoWar/CasinoWar";
// import Lottery from "./component/Items/Lottery/Lottery";
// import Worlilist from "./component/Items/WorList/Worlilist";
// import Cardjud from "./component/Items/CardJud/Cardjud";
// import VirtualSports from "./component/Items/VirtualSport/VirtualSports";
import Home from './component/Home/Home';

import CricketCasino from "./component/Items/CricketCasino/CricketCasino";
import AaccountStatement from "./component/Items/AaccountStatement/AaccountStatement";
import ProfitLoss from "./component/Items/ProfitLoss/ProfitLoss";
import BetHistory from "./component/Items/BetHistory/BetHistory";
import UnSetteledBet from "./component/Items/UnSetteledBet/UnSetteledBet";
import ChangeBtnValue from "./component/Items/ChangeBtnValue/ChangeBtnValue";
import ChangePassword from "./component/Items/ChangePassword/ChangePassword";
import SignOut from "./component/singnout/SignOut";
import GameHead from "./component/Items/GameDetail/Gamehead/GameHead";
import Slot from "./component/Items/Slot/Slot";



function App() {

  return (

    

    // <Modals/>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Home">
              <Home />
            </Route>
          {/* <Route exact path="/livcasino">
            <LiveCasino />
          </Route>
          <Route exact path="/slotgame">
            <SlotGame />
          </Route>
          <Route exact path="/race">
            <Race />
          </Route>
          <Route exact path="/horserace">
            <HorseRace />
          </Route>
          <Route exact path="/dtlist">
            <DtList />
          </Route>
          <Route exact path="/sportcasino">
            <SportCasino />
          </Route>
          <Route exact path="/andarbahar">
            <AndarBahar />
          </Route>
          <Route exact path="/bollywoodtable">
            <BollywoodTable />
          </Route>
          <Route exact path="/binary">
            <Binary />
          </Route>
          <Route exact path="/casinowar">
            <CasinoWar />
          </Route>
          <Route exact path="/lottery">
            <Lottery />
          </Route>
          <Route exact path="/worlilist">
            <Worlilist />
          </Route>
          <Route exact path="/cardjud">
            <Cardjud />
          </Route>
          <Route exact path="/virtualsports">
            <VirtualSports />
          </Route>
          <Route exact path="/cricketcasino">
            <CricketCasino />
          </Route> */}




          <Route exact path="/Cricket">
            <Home id="4"/>
          </Route>
          <Route exact path="/Tennis">
            <Home id="2" />
          </Route>
          <Route exact path="/Football">
          <Home id="3" />
          </Route>
          <Route exact path="/TableTennis">
          <Home id="1" />
          </Route>
          <Route exact path="/Kabaddi">
          <Home id="2" />
          </Route>
          <Route exact path="/Basketball">
          <Home id="2" />
          </Route>
          <Route exact path="/Volleyball">
          <Home id="2" />
          </Route>
          <Route exact path="/Baccarat">
          <Home id="2" />
          </Route>
          <Route exact path="/HorseRacing">
          <Home id="2" />
          </Route>
          <Route exact path="/Teenpatti">
          <Home id="2" />
          </Route>
          <Route exact path="/Poker">
          <Home id="2" />
          </Route>
          <Route exact path="/Lucky7">
          <Home id="2" />
          </Route>

          <Route exact path="/32Cards">
          <Home id="2" />
          </Route>

          {/* <Route exact path="/accountstatement">
            <AaccountStatement />
          </Route>
          <Route exact path="/profitloss">
            <ProfitLoss />
          </Route>
          <Route exact path="/bethistory">
            <BetHistory />
          </Route> */}



          <Route exact path="/gamedetail/:id">
            <GameHead  />
          </Route>


          {/* <Route exact path="/unsetteledbet">
            <UnSetteledBet />
          </Route>
          <Route exact path="/changebtnvalue">
            <ChangeBtnValue />
          </Route>
          <Route exact path="/changepassword">
            <ChangePassword />
          </Route> */}
          
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
            <Slot/>
          </Route>
          <Route exact path="/m/others">
            <Home />
          </Route>
          

          <Route exact path="/SignOut">
            <SignOut/>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
