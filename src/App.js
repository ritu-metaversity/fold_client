import { React, useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "../src/component/navBar/TopNav.css";

import Login from "./component/login/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
// import Sport from "./component/Sports/Sport";
import SportData from "./component/Sports/SportData";
import NavBar from "./component/navBar/NavBar";
import Mobilenav from "./component/navBar/MobileNav/Mobilenav";
import Signup3 from "./component/Items/SignUpForm/signup3/Signup3";
import Signup1 from "./component/Items/SignUpForm/signup1/Signup1";
import Signup2 from "./component/Items/SignUpForm/signup2/Signup2";
import Signup4 from "./component/Items/SignUpForm/signup4/Signup4";
import Signup5 from "./component/Items/SignUpForm/signup5/Signup5";
import GameData from "./desktopLayout/gameDetailPage/GameData";
import ItemdeskData from "./desktopLayout/itemPageforDesktop/ItemdeskData";
import NavbarDesk from "./desktopLayout/Navbarfordesk/NavbarDesk";
import AccountStatementDesk from "./desktopLayout/AccountStatementforDesktop/AccountStatementDesk";
import BetHistorydesk from "./desktopLayout/betHistoryforDesktop/BetHistorydesk";
import HomePage from "./desktopLayout/HomePage/HomePage";
import CasinoForDesk from "./desktopLayout/CasinoForDesk/CasinoForDesk";
import LiveCasino from "./desktopLayout/LiveCasino/LiveCasino";
import GamedetailPage from "./desktopLayout/gameDetailPage/GamedetailPage";
import LoginForDesk from "./desktopLayout/LoginForDesk/LoginForDesk";
import ProfitLossHome from "./desktopLayout/ProfitAndLoss/ProfitLossHome/ProfitLossHome";
import UnsetteledBetForDesk from "./desktopLayout/UnsettelBetForDesk/UnsetteledBetForDesk";
import ChangeBtnValueForDesk from "./desktopLayout/ChangeBtnValue/ChangeBtnValueForDesk";
import ChangePasswordForDesk from "./desktopLayout/ChangePasswordForDesk/ChangePasswordForDesk";
import SignoutForDesk from "./desktopLayout/SignoutForDesk/SignoutForDesk";
import ItemPageForHome from "./desktopLayout/HomePage/ItemPageForHome";
import WithdrawForDesk from "./desktopLayout/WithdrawForDesk/WithdrawForDesk";
import SideBar from "./desktopLayout/sidebar/SideBar";
import DepositForDesk from "./desktopLayout/DepositForDesk/DepositForDesk";

function App() {
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);

  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const time = setInterval(() => {
      if (localStorage.getItem("token") !== null) {
        if (localStorage.getItem("Password-type") !== "old") {
          AuthorAPI.VALIDATE_JWT()
            .then()
            .catch((error) => {
              if (error.response.status === 401) {
                localStorage.clear();
                nav("/login");
              }
            });
        }
      }
    }, 1000);

    return () => clearInterval(time);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      localStorage.clear();
      nav("/login");
      if (pathname === "/signup3") {
        nav("/signup3");
      } else if (pathname === "/signup1") {
        nav("/signup1");
      } else if (pathname === "/signup2") {
        nav("/signup2");
      } else if (pathname === "/signup4") {
        nav("/signup4");
      } else if (pathname === "/signup5") {
        nav("/signup5");
      }
    }
  }, []);

  useEffect(() => {
    if (
      pathname !== "/m/setting/changepassword" &&
      localStorage.getItem("Password-type") === "old"
    ) {
      nav("/m/setting/changepassword");
    }
  }, [pathname]);

  const idddd = (id) => {
    setSportId(id);
  };

  const message = (vl) => {
    setErrMessege(vl);
  };

  const statusMsg = (val) => {
    setStatusmessage(val);
  };

  let width = window.screen.width;
  // console.log(width)

  return (
    <div className="App">
      {/* {width > 800 ? ( */}
      <Routes>
        <Route path="/" element={<LoginForDesk />} />
        <Route path="/login" element={<LoginForDesk />} />
        <Route path="" element={<NavbarDesk />}>
          <Route path="/home" element={<ItemPageForHome />} />
          <Route path="/gamedetail/:id" element={<GamedetailPage />} />
          <Route path="/accountstatement" element={<AccountStatementDesk />} />
          <Route path="/bethistory" element={<BetHistorydesk />} />
          <Route path="/Cricket" element={<HomePage />} />
          <Route path="/Tennis" element={<HomePage />} />
          <Route path="/Football" element={<HomePage />} />
          <Route path="/Kabaddi" element={<HomePage />} />
          <Route path="/casino/:id" element={<CasinoForDesk />} />
          <Route path="/livecasino" element={<LiveCasino />} />
          <Route path="/profitloss" element={<ProfitLossHome />} />
          <Route path="/unsetteledbet" element={<UnsetteledBetForDesk />} />
          <Route path="/changebtnvalue" element={<ChangeBtnValueForDesk />} />
          <Route path="/changepassword" element={<ChangePasswordForDesk />} />
          <Route path="/SignOut" element={<SignoutForDesk />} />
          <Route path="/withdraw" element={<WithdrawForDesk />} />
          <Route path="/deposit" element={<DepositForDesk/>} />
        </Route>
      </Routes>
      {/* ) : ( */}
      {/* <Routes>
          <Route
            path="/login"
            element={
              <Login Errmessage={Errmessage} Statusmessage={Statusmessage} />
            }
          />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/"
            element={
              <Login Errmessage={Errmessage} Statusmessage={Statusmessage} />
            }
          />
          <Route exact path="/signup3" element={<Signup3 />} />
          <Route exact path="/signup1" element={<Signup1 />} />
          <Route exact path="/signup2" element={<Signup2 />} />
          <Route exact path="/signup4" element={<Signup4 />} />
          <Route exact path="/signup5" element={<Signup5 />} />
          <Route path="" element={<NavBar />}>
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route
              path="/gamedetail/:id"
              element={<GameHead SportId={SportId} />}
            />
            <Route path="/casino/:id" element={<Casino />} />
            <Route
              path="/m/reports/accountstatement"
              element={<AaccountStatement />}
            />
            <Route path="/m/reports/profitloss" element={<ProfitLoss />} />
            <Route path="/m/reports/bethistory" element={<BetHistory />} />
            <Route
              path="/m/reports/unsetteledbet"
              element={<UnSetteledBet />}
            />
            <Route
              path="/m/setting/changebtnvalue"
              element={<ChangeBtnValue />}
            />
            <Route
              path="/m/setting/changepassword"
              element={
                <ChangePassword message={message} statusMsg={statusMsg} />
              }
            />
            <Route path="/SignOut" element={<SignOut />} />

            <Route path="" element={<Mobilenav />}>
              <Route path="/Home" element={<Home idddd={idddd} />} />
              <Route path="/m/sports" element={<SportData />} />
              <Route path="/m/others" element={<Home />} />
              <Route path="/m/In-play" element={<Home />} />
              <Route path="/m/slot" element={<Slot />} />
            </Route>
          </Route>

          <Route path="*" element={<Login />} />
        </Routes> */}
      {/* )} */}
      {/* 
        <Routes>
          <Route  path="/login" element={<Login Errmessage={Errmessage} Statusmessage={Statusmessage} />} />
          <Route  path="/Register" element={<Register />} />
          <Route  path="/" element={<Login Errmessage={Errmessage} Statusmessage={Statusmessage} />} />
          <Route exact path="/signup3" element={<Signup3/>} />
          <Route exact path="/signup1" element={<Signup1/>} />
          <Route exact path="/signup2" element={<Signup2/>} />
          <Route exact path="/signup4" element={<Signup4/>} />
          <Route exact path="/signup5" element={<Signup5/>} />
          <Route path="" element={<NavBar />}>
            <Route  path="/deposit" element={<Deposit />} />
            <Route  path="/withdraw" element={<Withdraw />} />
            <Route path="/gamedetail/:id" element={<GameHead SportId={SportId} />}/>
            <Route  path="/casino/:id" element={<Casino />} />
            <Route path="/m/reports/accountstatement" element={<AaccountStatement />}/>
            <Route  path="/m/reports/profitloss" element={<ProfitLoss />} />
            <Route  path="/m/reports/bethistory" element={<BetHistory />} />
            <Route path="/m/reports/unsetteledbet" element={<UnSetteledBet />}/>
            <Route path="/m/setting/changebtnvalue" element={<ChangeBtnValue />}/>
            <Route path="/m/setting/changepassword" element={<ChangePassword  message={message} statusMsg={statusMsg}/>}/>
            <Route  path="/SignOut" element={<SignOut />} />
  
            <Route path="" element={<Mobilenav />}>
              <Route  path="/Home" element={<Home idddd={idddd} />} />
              <Route  path="/m/sports" element={<SportData />} />
              <Route  path="/m/others" element={<Home />} />
              <Route  path="/m/In-play" element={<Home />} />
              <Route  path="/m/slot" element={<Slot />} />
            </Route>
          </Route>
  
          <Route  path="*" element={<Login/>} />
          
        </Routes> */}
    </div>
  );
}

export default App;
