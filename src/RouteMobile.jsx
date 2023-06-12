import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './component/login/Login';
import Register from './component/Register/Register';
import Signup3 from './component/Items/SignUpForm/signup3/Signup3';
import Signup1 from './component/Items/SignUpForm/signup1/Signup1';
import Signup2 from './component/Items/SignUpForm/signup2/Signup2';
import Signup4 from './component/Items/SignUpForm/signup4/Signup4';
import Signup5 from './component/Items/SignUpForm/signup5/Signup5';
import NavBar from './component/navBar/NavBar';
import AboutUsPageForMob from './component/AboutUsPageForMob/AboutUsPageForMob';
import TermAndCondition from './component/TermAndCondition/TermAndCondition';
import ResponsibleGaming from './component/ResponsibleGaming/ResponsibleGaming';
import DefaultHomePage from './component/Items/DefaultPage/DefaultHomePage';
import DefaultPage from './component/Items/DefaultPage/DefaultPage';
import Deposit from './component/Items/Deposit/Deposit';
import Withdraw from './component/Items/Withdrow/Withdraw';
import GameHead from './component/Items/GameDetail/Gamehead/GameHead';
import Casino from './component/Items/Casino/Casino';
import AaccountStatement from './component/Items/AaccountStatement/AaccountStatement';
import BetHistory from './component/Items/BetHistory/BetHistory';
import ProfitLoss from './component/Items/ProfitLoss/ProfitLoss';
import UnSetteledBet from './component/Items/UnSetteledBet/UnSetteledBet';
import ChangeBtnValue from './component/Items/ChangeBtnValue/ChangeBtnValue';
import ChangePassword from './component/Items/ChangePassword/ChangePassword';
import SignOut from './component/singnout/SignOut';
import Mobilenav from './component/navBar/MobileNav/Mobilenav';
import Home from './component/Home/Home';
import SportData from './component/Sports/SportData';
import Slot from './component/Items/Slot/Slot';
import FooterForMob from './component/FooterForMob/FooterForMob';

const RouteMobile = () => {
  const { pathname } = useLocation();
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      nav("/m/login");
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
      } else if (pathname === "/") {
        nav("/m/in-play");
      } else if (pathname === "/m/in-play") {
        nav("/m/in-play");
      } else if (pathname === "/m/register") {
        nav("/m/register");
      } else if (pathname === "/m/sports" || pathname === "/sports") {
        nav("/m/sports");
      }
    } else if (pathname === "/" && window.innerWidth < 800) {
      nav("/m/login");
    }
  }, [pathname]);

  useEffect(() => {
    if (
      pathname !== "/changepassword" &&
      localStorage.getItem("Password-type") === "old"
    ) {
      nav("/changepassword");
    }
  }, [pathname]);
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

    // console.log(statusMassege, "rwerwrwr");
  };
  // console.log(alert("hello"), "rwerwrwr");

  return (
    <div> <>
    <Routes>
      <Route
        path="/m/login"
        element={
          <Login Errmessage={Errmessage} Statusmessage={Statusmessage} />
        }
      />
      <Route path="/m/register" element={<Register />} />
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
    {pathname === "/m/login" ? "" : <FooterForMob />}
  </></div>
  )
}

export default RouteMobile