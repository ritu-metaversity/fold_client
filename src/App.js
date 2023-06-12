import { React, useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "../src/component/navBar/TopNav.css";
import "../src/component/Items/SlotGame/SlotGame.css";

import Login from "./component/login/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import NavbarDesk from "./desktopLayout/Navbarfordesk/NavbarDesk";
import { UserAPI } from "./apis/UserAPI";
import Footer from "./desktopLayout/Footer/Footer";
import DefaultPage from "./component/Items/DefaultPage/DefaultPage";
import DefaultHomePage from "./component/Items/DefaultPage/DefaultHomePage";
import DepositForDesk from "./desktopLayout/DepositForDesk/DepositForDesk";
import WithdrawForDesk from "./desktopLayout/WithdrawForDesk/WithdrawForDesk";
import SignoutForDesk from "./desktopLayout/SignoutForDesk/SignoutForDesk";
import ChangePasswordForDesk from "./desktopLayout/ChangePasswordForDesk/ChangePasswordForDesk";
import ChangeBtnValueForDesk from "./desktopLayout/ChangeBtnValue/ChangeBtnValueForDesk";
import UnsetteledBetForDesk from "./desktopLayout/UnsettelBetForDesk/UnsetteledBetForDesk";
import ProfitLossHome from "./desktopLayout/ProfitAndLoss/ProfitLossHome/ProfitLossHome";
import LiveCasino from "./desktopLayout/LiveCasino/LiveCasino";
import CasinoForDesk from "./desktopLayout/CasinoForDesk/CasinoForDesk";
import HomePage from "./desktopLayout/HomePage/HomePage";
import BetHistorydesk from "./desktopLayout/betHistoryforDesktop/BetHistorydesk";
import AccountStatementDesk from "./desktopLayout/AccountStatementforDesktop/AccountStatementDesk";
import GamedetailPage from "./desktopLayout/gameDetailPage/GamedetailPage";
import ItemPageForHome from "./desktopLayout/HomePage/ItemPageForHome";
import LoginForDesk from "./desktopLayout/LoginForDesk/LoginForDesk";
import SideBar from "./desktopLayout/sidebar/SideBar";
import RegisterPage from "./desktopLayout/RegisterPage/RegisterPage";
import AboutPageForDesk from "./desktopLayout/AboutPageForDesk/AboutPageForDesk";
import DestTermsAndConditions from "./desktopLayout/DestTermsAndConditions/DestTermsAndConditions";
import DestResponsibleGaming from "./desktopLayout/DestResponsibleGaming/DestResponsibleGaming";
import FooterForMob from "./component/FooterForMob/FooterForMob";
import InPlay from "./desktopLayout/InPlay/InPlay";
import TermAndCondition from "./component/TermAndCondition/TermAndCondition";
import ResponsibleGaming from "./component/ResponsibleGaming/ResponsibleGaming";
import AboutUsPageForMob from "./component/AboutUsPageForMob/AboutUsPageForMob";
import RouteMobile from "./RouteMobile";
import RouteDesktop from "./RouteDesktop";

function App() {
  // const [SportId, setSportId] = useState("");
  // const [Errmessage, setErrMessege] = useState("");
  // const [Statusmessage, setStatusmessage] = useState(false);

  const nav = useNavigate();
  const { pathname } = useLocation();

  const hostname = window.location.host.split(".");
  document.title = hostname[0];

  // useEffect(() => {
  //   UserAPI.Self_By_App_Url().then((res) => {
  //     let favicon = document.queryCommandValue("link[rel~={Logo}]");
  //     if (!favicon) {
  //       favicon = document.createElement("link");
  //       favicon.rel = "icon";
  //       document.getElementsByTagName("head")[0].appendChild(favicon);
  //     }
  //     favicon.href = res?.data?.favicon;
  //   });

  //   const time = setInterval(() => {
  //     if (localStorage.getItem("token") !== null) {
  //       if (localStorage.getItem("Password-type") !== "old") {
  //         AuthorAPI.VALIDATE_JWT()
  //           .then()
  //           .catch((error) => {
  //             if (error.response.status === 401) {
  //               localStorage.clear();
  //               nav("/login");
  //             }
  //           });
  //       }
  //     }
  //   }, 1000);

  //   return () => clearInterval(time);
  //   // eslint-disable-next-line
  // }, []);


  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     nav("/m/login");
  //     if (pathname === "/signup3") {
  //       nav("/signup3");
  //     } else if (pathname === "/signup1") {
  //       nav("/signup1");
  //     } else if (pathname === "/signup2") {
  //       nav("/signup2");
  //     } else if (pathname === "/signup4") {
  //       nav("/signup4");
  //     } else if (pathname === "/signup5") {
  //       nav("/signup5");
  //     } else if (pathname === "/") {
  //       nav("/m/in-play");
  //     } else if (pathname === "/m/in-play") {
  //       nav("/m/in-play");
  //     } else if (pathname === "/m/register") {
  //       nav("/register");
  //     } else if (pathname === "/m/sports" || pathname === "/sports") {
  //       nav("/m/sports");
  //     }
  //   } else if (pathname === "/" && window.innerWidth < 800) {
  //     nav("/m/login");
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //   if(!pathname.includes('m')){
  //   if (localStorage.getItem("token") === null && screenWidth > 799) {
  //     nav("/login");
  //     if (pathname === "/") {
  //       nav("/");
  //     } else if (pathname === "/register") {
  //       nav("/register");
  //     } else if (pathname === "/Cricket") {
  //       nav("/Cricket");
  //     } else if (pathname === "/Tennis") {
  //       nav("/Tennis");
  //     } else if (pathname === "/Football") {
  //       nav("/Football");
  //     } else if (pathname === "/Kabaddi") {
  //       nav("/Kabaddi");
  //     } else if (pathname === "/home") {
  //       nav("/home");
  //     } else if (pathname === "/about-us") {
  //       nav("/about-us");
  //     } else if (pathname === "/terms-and-conditions") {
  //       nav("/terms-and-conditions");
  //     } else if (pathname === "/responsible-gaming") {
  //       nav("/responsible-gaming");
  //     }
  //   } else if (pathname === "/") {
  //     nav("/");
  //   }
  // }
  // }, [nav]);

  // useEffect(() => {
  //   if (
  //     pathname !== "/m/setting/changepassword" &&
  //     localStorage.getItem("Password-type") === "old"
  //   ) {
  //     nav("/m/setting/changepassword");
  //   }
  // }, [pathname]);

 
  const [mobileRoutes, setMoileRoutes] = useState(true);

  // let screenWidth = window.innerWidth;

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setMoileRoutes(true);
      console.log("1");
      if (!pathname.includes("/m/")) {
        console.log("2");

        nav("/home");
      }
      console.log("3");

      // console.log("mobile")
    } else {
      console.log("4");

      setMoileRoutes(false);
      nav("/m/home");


    }
  }, []);



//   useEffect(()=>{
// if(Withdraw.)
//   }, [])

  return (
    <div className="App">
      {/* { screenWidth > 800 && !pathname?.includes("/m/") ? (
        <>
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
            {pathname === "/login" || pathname === "/register" ? (
              ""
            ) : (
              <div className="sidebar col-md-2">
                <SideBar />
              </div>
            )}

            <div
              className={`${
                pathname === "/login" || pathname === "/register"
                  ? ""
                  : "col-md-10 featured-box load game-page"
              }`}>
              <Routes>
                <Route path="/" element={<ItemPageForHome />} />
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
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/login"
              element={
                <Login Errmessage={Errmessage} Statusmessage={Statusmessage} />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route exact path="/signup3" element={<Signup3 />} />
            <Route exact path="/signup1" element={<Signup1 />} />
            <Route exact path="/signup2" element={<Signup2 />} />
            <Route exact path="/signup4" element={<Signup4 />} />
            <Route exact path="/signup5" element={<Signup5 />} />
            <Route path="" element={<NavBar />}>
              <Route path="/about-us" element={<AboutUsPageForMob />} />
              <Route
                path="/terms-and-conditions"
                element={<TermAndCondition />}
              />
              <Route
                path="/responsible-gaming"
                element={<ResponsibleGaming />}
              />
              <Route path="/" element={<DefaultHomePage />} />
              <Route path="/in-play" element={<DefaultHomePage />} />
              <Route path="/sports" element={<DefaultPage />} />
              {localStorage.getItem("UsertypeInfo") == 1 ? (
                <>
                  <Route path="/m/reports/deposit" element={<Deposit />} />
                  <Route path="/m/reports/withdraw" element={<Withdraw />} />
                </>
              ) : (
                ""
              )}

              <Route
                path="/m/gamedetail/:id"
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
              <Route
                path="/SignOut"
                element={<SignOut statusMsgForLogout={statusMsgForLogout} />}
              />

              <Route path="" element={<Mobilenav />}>
                <Route path="/m/Home" element={<Home idddd={idddd} />} />
                <Route path="/m/sports" element={<SportData />} />
                <Route path="/m/others" element={<Home />} />
                <Route path="/m/In-play" element={<Home />} />
                <Route path="/m/slot" element={<Slot />} />
              </Route>
            </Route>
            <Route path="*" element={<Login />} />
          </Routes>
          {pathname === "/login" ? "" : <FooterForMob />}
        </>
        <RouteMobile/>
      )} */}

{
  mobileRoutes === true ?<RouteDesktop/> :
<RouteMobile/>
}


    </div>
  );
}

export default App;
