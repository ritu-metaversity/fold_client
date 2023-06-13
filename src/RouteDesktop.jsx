import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavbarDesk from './desktopLayout/Navbarfordesk/NavbarDesk';
import SideBar from './desktopLayout/sidebar/SideBar';
import ItemPageForHome from './desktopLayout/HomePage/ItemPageForHome';
import LoginForDesk from './desktopLayout/LoginForDesk/LoginForDesk';
import RegisterPage from './desktopLayout/RegisterPage/RegisterPage';
import InPlay from './desktopLayout/InPlay/InPlay';
import GamedetailPage from './desktopLayout/gameDetailPage/GamedetailPage';
import AccountStatementDesk from './desktopLayout/AccountStatementforDesktop/AccountStatementDesk';
import BetHistorydesk from './desktopLayout/betHistoryforDesktop/BetHistorydesk';
import HomePage from './desktopLayout/HomePage/HomePage';
import CasinoForDesk from './desktopLayout/CasinoForDesk/CasinoForDesk';
import LiveCasino from './desktopLayout/LiveCasino/LiveCasino';
import ProfitLossHome from './desktopLayout/ProfitAndLoss/ProfitLossHome/ProfitLossHome';
import UnsetteledBetForDesk from './desktopLayout/UnsettelBetForDesk/UnsetteledBetForDesk';
import AboutPageForDesk from './desktopLayout/AboutPageForDesk/AboutPageForDesk';
import DestTermsAndConditions from './desktopLayout/DestTermsAndConditions/DestTermsAndConditions';
import DestResponsibleGaming from './desktopLayout/DestResponsibleGaming/DestResponsibleGaming';
import ChangeBtnValueForDesk from './desktopLayout/ChangeBtnValue/ChangeBtnValueForDesk';
import ChangePasswordForDesk from './desktopLayout/ChangePasswordForDesk/ChangePasswordForDesk';
import SignoutForDesk from './desktopLayout/SignoutForDesk/SignoutForDesk';
import WithdrawForDesk from './desktopLayout/WithdrawForDesk/WithdrawForDesk';
import DepositForDesk from './desktopLayout/DepositForDesk/DepositForDesk';
import Footer from './desktopLayout/Footer/Footer';

const RouteDesktop = () => {
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);

  const nav = useNavigate();

  const { pathname } = useLocation();


  useEffect(() => {
    // if(!pathname.includes('m')){
    if (localStorage.getItem("token") === null ) {
      nav("/login");
      if (pathname === "/") {
        nav("/home");
      }
       else if (pathname === "/register") {
        nav("/register");
      } else if (pathname === "/Cricket") {
        nav("/Cricket");
      } else if (pathname === "/Tennis") {
        nav("/Tennis");
      } else if (pathname === "/Football") {
        nav("/Football");
      } else if (pathname === "/Kabaddi") {
        nav("/Kabaddi");
      } else if (pathname === "/home") {
        nav("/home");
      } else if (pathname === "/about-us") {
        nav("/about-us");
      } else if (pathname === "/terms-and-conditions") {
        nav("/terms-and-conditions");
      } else if (pathname === "/responsible-gaming") {
        nav("/responsible-gaming");
      } else if (pathname === "/inplay") {
        nav("/inplay");
      }
    } else if (pathname === "/") {
      nav("/");
    }
  // }
  }, [pathname]);

  // useEffect(() => {   1234567890
  //   if (
  //     pathname !== "/setting/changepassword" &&
  //     localStorage.getItem("Password-type") === "old"
  //   ) {
  //     nav("/setting/changepassword");
  //   }
  // }, [pathname]);
  const idddd = (id) => {
    setSportId(id);
  };

  const statusMassege = (val) => {
    setStatusmessage(val);
  };
  const message = (vl) => {
    setErrMessege(vl);
  };

  const statusMsg = (val) => {
    setStatusmessage(val);
  };
  const statusMsgForLogout = (val) => {
    setStatusmessage(val);

  };
  console.log("hellooo")
  return (
    <div> <>
    {pathname === "/login" || pathname === "/register" ? (
      ""
    ) : (
      <NavbarDesk />
    )}


    <div


      className={`${
        pathname === "/login" || pathname === "/register"
          ? ""
          : "row row5"
      } `}>
      {pathname === "/login" || pathname === "/register" ? ("") :
       (
        <div className="sidebar col-md-2"><SideBar /></div>
      )}

      <div
        className={`${
          pathname === "/login" || pathname === "/register"
            ? ""
            : "col-md-10 featured-box load game-page"
        }`}>
        <Routes>
          <Route path="/" element={<ItemPageForHome />} />
          {/* <Route path="/" element={<LoginForDesk />} /> */}
          <Route
            path="/login"
            element={
              <LoginForDesk
                Errmessage={Errmessage}
                Statusmessage={Statusmessage}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/inplay" element={<InPlay />} />
          <Route path="/home" element={<ItemPageForHome />} />
          <Route path="/gamedetail/:id" element={<GamedetailPage />} />
          <Route
            path="/accountstatement"
            element={<AccountStatementDesk />}
          />
          <Route path="/bethistory" element={<BetHistorydesk />} />
          <Route path="/Cricket" element={<HomePage />} />
          <Route path="/Tennis" element={<HomePage />} />
          <Route path="/Football" element={<HomePage />} />
          <Route path="/Kabaddi" element={<HomePage />} />
          <Route path="/casino/:id" element={<CasinoForDesk />} />
          <Route path="/livecasino" element={<LiveCasino />} />
          <Route path="/profitloss" element={<ProfitLossHome />} />
          <Route
            path="/unsetteledbet"
            element={<UnsetteledBetForDesk />}
          />
          <Route path="/about-us" element={<AboutPageForDesk />} />
          <Route
            path="/terms-and-conditions"
            element={<DestTermsAndConditions />}
          />
          <Route
            path="/responsible-gaming"
            element={<DestResponsibleGaming />}
          />
          <Route
            path="/changebtnvalue"
            element={<ChangeBtnValueForDesk />}
          />
          <Route
            path="/changepassword"
            element={
              <ChangePasswordForDesk
                statusMsg={statusMsg}
                message={message}
              />
            }
          />
          <Route
            path="/SignOut"
            element={<SignoutForDesk statusMassege={statusMassege} />}
          />
          <Route path="/withdraw" element={<WithdrawForDesk />} />
          <Route path="/deposit" element={<DepositForDesk />} />
        </Routes>
      </div>
    </div>
    {pathname === "/login" || pathname === "/register" ? "" : <Footer />}
  </></div>
  )
}

export default RouteDesktop