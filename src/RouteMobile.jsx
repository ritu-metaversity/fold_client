import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import Signup3 from "./component/Items/SignUpForm/signup3/Signup3";
import Signup1 from "./component/Items/SignUpForm/signup1/Signup1";
import Signup2 from "./component/Items/SignUpForm/signup2/Signup2";
import Signup4 from "./component/Items/SignUpForm/signup4/Signup4";
import Signup5 from "./component/Items/SignUpForm/signup5/Signup5";
import NavBar from "./component/navBar/NavBar";
import AboutUsPageForMob from "./component/AboutUsPageForMob/AboutUsPageForMob";
import TermAndCondition from "./component/TermAndCondition/TermAndCondition";
import ResponsibleGaming from "./component/ResponsibleGaming/ResponsibleGaming";
import DefaultHomePage from "./component/Items/DefaultPage/DefaultHomePage";
import DefaultPage from "./component/Items/DefaultPage/DefaultPage";
import Deposit from "./component/Items/Deposit/Deposit";
import Withdraw from "./component/Items/Withdrow/Withdraw";
import GameHead from "./component/Items/GameDetail/Gamehead/GameHead";
import Casino from "./component/Items/Casino/Casino";
import AaccountStatement from "./component/Items/AaccountStatement/AaccountStatement";
import BetHistory from "./component/Items/BetHistory/BetHistory";
import ProfitLoss from "./component/Items/ProfitLoss/ProfitLoss";
import ChangeBtnValue from "./component/Items/ChangeBtnValue/ChangeBtnValue";
import ChangePassword from "./component/Items/ChangePassword/ChangePassword";
import SignOut from "./component/singnout/SignOut";
import Mobilenav from "./component/navBar/MobileNav/Mobilenav";
import Home from "./component/Home/Home";
import SportData from "./component/Sports/SportData";
import Slot from "./component/Items/Slot/Slot";
import FooterForMob from "./component/FooterForMob/FooterForMob";
import NewMobWithdraw from "./component/Items/NewMobWithdraw/NewMobWithdraw";
import { UserAPI } from "./apis/UserAPI";
import UnSetteledBetHome from "./component/Items/UnSetteledBet/UnSetteledBetHome";
import LiveCasino from "./desktopLayout/LiveCasino/LiveCasino";
import FantsyTabs from "./desktopLayout/fantasyGame/FantsyTabs";
import IndianCasinoTabs from "./desktopLayout/IndianCasino/IndianCasinoTabs";
import ComingSoon from "./common/comingSoon/ComingSoon";
import NewLunch from "./desktopLayout/Newlunch/NewLunch";
import SuperNowa from "./desktopLayout/IndianCasino/SuperNowa";
import WhatsAppIcon from "./common/whatsAppIcon/WhatsAppIcon";
import { GameAPI } from "./apis/gameAPI";
import CasinoMainPage from "./Casino_New/CasinoMainPage/CasinoMainPage";

const RouteMobile = () => {
  const { pathname } = useLocation();
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);
  const [ItselfAllowed, setItselfAllowed] = useState()
  const [ItselfAllowedData, setItselfAllowedData] = useState()

  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
      nav("/m/in-play");
      if (pathname === "/signup3") {
        nav("/signup3");
      } else if (pathname === "/login") {
        nav("/login");
      } else if (pathname === "/signup1") {
        nav("/signup1");
      } else if (pathname === "/m/login") {
        nav("/m/login");
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
      } else if (pathname === "/about-us") {
        nav("/about-us");
      } else if (pathname === "/terms-and-conditions") {
        nav("/terms-and-conditions");
      } else if (pathname === "/responsible-gaming") {
        nav("/responsible-gaming");
      }
      else if (pathname === "/m/slot") {
        nav("/login");
      }
      else if (pathname === "/m/Others") {
        nav("/login");
      }
      else if (pathname.includes("/m/gamedetail")) {
        nav("/login");
      }
      else if (pathname === "/" && window.innerWidth < 800) {
        nav("/login");
      }
      else if (pathname === "/m/aura" || pathname === "/aura") {
        nav("/m/aura");
      }
      else if (pathname === "/m/sueprnowa" || pathname === "/sueprnowa" || pathname == "/m/fantsy" || pathname == "/slot" || pathname == "/m/livecasino" || pathname == "/lottery") {
        nav("/m/login");
      }
    }
    else{
      if(pathname === "/m/reports/deposit"){
        nav("/m/reports/deposit")
      }else if(pathname === "/m/reports/withdraw"){
        nav("/m/reports/withdraw");
      }
    }
  }, [pathname]);


  useEffect(()=>{
    UserAPI.Self_By_App_Url().then((res)=>{
      setItselfAllowed(res?.data?.selfAllowed)
    })
  }, [ItselfAllowed])

  
const token = localStorage.getItem("token")
  useEffect(()=>{
    if(token !== null){
      GameAPI.ALLOTED_CASINO_LIST().then((res)=>{
        setItselfAllowedData(res?.data);
      })
    }
  }, [pathname, token])

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


  const [whatsAppIconPosition, setWhatsAppIconPosition] = useState({ top: '10px', right: '10px' });

  useEffect(() => {
    const handleScroll = () => {
      const newTop = window.scrollY;
      setWhatsAppIconPosition({ top: newTop});
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const casinoStateNames = ['Aura', 'Super Nova', 'QTech', 'Virtual', 'SportBook'];


  const [AuraData, setAuraData] = useState();
  const [NowaData, setNowaData] = useState();
  const [QtechData, setQtechData] = useState();
  const [VirtualData, setVirtualData] = useState();
  const [SportBookData, setSportBookData] = useState();

  useEffect(() => {
    if (ItselfAllowedData) {
      casinoStateNames.forEach(name => {
        const casinoData = ItselfAllowedData.find(item => item.name === name);
        const setCasinoData = getSetterFunction(name);
        setCasinoData(casinoData?.active);
      });
    }
  }, [ItselfAllowedData, casinoStateNames]);

  function getSetterFunction(name) {
    switch (name) {
      case 'Aura':
        return setAuraData;
      case 'Super Nova':
        return setNowaData;
      case 'QTech':
        return setQtechData;
      case 'Virtual':
        return setVirtualData;
      case 'SportBook':
        return setSportBookData;
      default:
        return () => {};
    }
  }

  const casinoAllow = {Aura: AuraData, Nowa: NowaData, Qtech: QtechData, Virtual: VirtualData, Sportbook: SportBookData}

  return (
    <div>
      {" "}
      <>
        <Routes>
          <Route path="/m/login" element={ <Login Errmessage={Errmessage} Statusmessage={Statusmessage} />}/>
          <Route path="/m/register" element={<Register />} />
          <Route exact path="/signup3" element={<Signup3 />} />
          <Route exact path="/signup1" element={<Signup1 />} />
          <Route exact path="/signup2" element={<Signup2 />} />
          <Route exact path="/signup4" element={<Signup4 />} />
          <Route exact path="/signup5" element={<Signup5 />} />
          <Route path="" element={<NavBar />}>
            <Route path="/about-us" element={<AboutUsPageForMob />} />
            <Route path="/terms-and-conditions" element={<TermAndCondition />}/>
            <Route path="/responsible-gaming" element={<ResponsibleGaming />} />
            <Route path="/" element={<DefaultHomePage />} />
            <Route path="/in-play" element={<DefaultHomePage />} />
            <Route path="/sports" element={<DefaultPage />} />
            {localStorage.getItem("UsertypeInfo") == 1 && ItselfAllowed === true ? (
              <>
                <Route path="/m/reports/deposit" element={<Deposit />} />
                <Route path="/m/reports/withdraw" element={<NewMobWithdraw/>} />
              </>): ("")}
            <Route path="/m/gamedetail/:id" element={<GameHead SportId={SportId} />}/>
            {/* <Route path="/casino/:id" element={<Casino />} /> */}
            <Route path="/m/reports/accountstatement" element={<AaccountStatement />}/>
            <Route path="/m/reports/profitloss" element={<ProfitLoss />} />
            <Route path="/m/reports/bethistory" element={<BetHistory />} />
            <Route path="/m/reports/unsetteledbet" element={<UnSetteledBetHome />}/>
            <Route path="/m/setting/changebtnvalue" element={<ChangeBtnValue />}/>
            <Route path="/m/setting/changepassword" element={ <ChangePassword message={message} statusMsg={statusMsg} />}/>
            <Route path="/SignOut" element={<SignOut statusMsgForLogout={statusMsgForLogout} />}/>
            <Route path="" element={<Mobilenav casinoAllow={casinoAllow}/>}>
              <Route path="/m/Home" element={<Home idddd={idddd} casinoAllow={casinoAllow}/>} />
              <Route path="/m/sports" element={<SportData  casinoAllow={casinoAllow} />} />
              <Route path="/m/others" element={<Home />} casinoAllow={casinoAllow}/>
              <Route path="/m/In-play" element={<Home />} casinoAllow={casinoAllow}/>
              <Route path="/m/slot" element={<Slot />} />

              <Route path="/m/livecasino" element={<LiveCasino liveCasino={"LIVECASINO"} showid={2}/>} />
              <Route path="/slot" element={<LiveCasino liveCasino={"SLOT"} showid={2}/>} />
              <Route path="/lottery" element={<LiveCasino liveCasino={"LOTTERY"} showid={2}/>} />
              <Route path="/instantWin" element={<LiveCasino liveCasino={"INSTANTWIN"} showid={2}/>} />
              <Route path="/m/fantsy" element={<FantsyTabs  />} />
              <Route path="/m/sueprnowa" element={<SuperNowa/>} />
              <Route path="/m/aura" element={<NewLunch/>} />
              <Route path="/m/:id/casino" element={<CasinoMainPage />} />
              {/* <Route path="/m/sportbook" element={<ComingSoon/>} /> */}

            </Route>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
        {
        (localStorage.getItem("token") == null && ItselfAllowed) &&  <WhatsAppIcon top={whatsAppIconPosition.top}/>
        }
        {pathname === "/login" || pathname === "/m/register" ? "" : <FooterForMob  ItselfAllowed={ItselfAllowed}/>}
      </>
    </div>
  );
};

export default RouteMobile;
