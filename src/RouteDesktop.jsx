import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavbarDesk from "./desktopLayout/Navbarfordesk/NavbarDesk";
import SideBar from "./desktopLayout/sidebar/SideBar";
import ItemPageForHome from "./desktopLayout/HomePage/ItemPageForHome";
import LoginForDesk from "./desktopLayout/LoginForDesk/LoginForDesk";
import RegisterPage from "./desktopLayout/RegisterPage/RegisterPage";
import InPlay from "./desktopLayout/InPlay/InPlay";
import GamedetailPage from "./desktopLayout/gameDetailPage/GamedetailPage";
import AccountStatementDesk from "./desktopLayout/AccountStatementforDesktop/AccountStatementDesk";
import BetHistorydesk from "./desktopLayout/betHistoryforDesktop/BetHistorydesk";
import HomePage from "./desktopLayout/HomePage/HomePage";
import CasinoForDesk from "./desktopLayout/CasinoForDesk/CasinoForDesk";
import LiveCasino from "./desktopLayout/LiveCasino/LiveCasino";
import ProfitLossHome from "./desktopLayout/ProfitAndLoss/ProfitLossHome/ProfitLossHome";
// import UnsetteledBetForDesk from "./desktopLayout/UnsettelBetForDesk/UnsetteledBetForDesk";
import AboutPageForDesk from "./desktopLayout/AboutPageForDesk/AboutPageForDesk";
import DestTermsAndConditions from "./desktopLayout/DestTermsAndConditions/DestTermsAndConditions";
import DestResponsibleGaming from "./desktopLayout/DestResponsibleGaming/DestResponsibleGaming";
import ChangeBtnValueForDesk from "./desktopLayout/ChangeBtnValue/ChangeBtnValueForDesk";
import ChangePasswordForDesk from "./desktopLayout/ChangePasswordForDesk/ChangePasswordForDesk";
import SignoutForDesk from "./desktopLayout/SignoutForDesk/SignoutForDesk";
import WithdrawForDesk from "./desktopLayout/WithdrawForDesk/WithdrawForDesk";
import DepositForDesk from "./desktopLayout/DepositForDesk/DepositForDesk";
import Footer from "./desktopLayout/Footer/Footer";
import NewGameDetailPageDest from "./desktopLayout/NewGameDetailPageDest/NewGameDetailPageDest";
import NewWithdraw from "./desktopLayout/NewWithdraw/NewWithdraw";
import { UserAPI } from "./apis/UserAPI";
import UnsetteledBetDeskHome from "./desktopLayout/UnsettelBetForDesk/UnsetteledBetDeskHome";
import FantsyTabs from "./desktopLayout/fantasyGame/FantsyTabs";
import IndianCasinoTabs from "./desktopLayout/IndianCasino/IndianCasinoTabs";
import ComingSoon from "./common/comingSoon/ComingSoon";
import NewLunch from "./desktopLayout/Newlunch/NewLunch";
import SuperNowa from "./desktopLayout/IndianCasino/SuperNowa";
import FooterForMob from "./component/FooterForMob/FooterForMob";
import WhatsAppIcon from "./common/whatsAppIcon/WhatsAppIcon";
import { GameAPI } from "./apis/gameAPI";

const RouteDesktop = () => {
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);
  const [ItselfAllowed, setItselfAllowed] = useState();
  const [ItselfAllowedData, setItselfAllowedData] = useState([]);

  const nav = useNavigate();

  const { pathname } = useLocation();

  const id = pathname?.slice(13);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      nav("/login");
      if (pathname === "/") nav("/home");
      else if (pathname === "/register") nav("/register");
      else if (pathname === "/Cricket") nav("/Cricket");
      else if (pathname === "/Tennis") nav("/Tennis");
      else if (pathname === "/Football") nav("/Football");
      else if (pathname === "/Kabaddi") nav("/Kabaddi");
      else if (pathname === "/home") nav("/home");
      else if (pathname === "/about-us") nav("/about-us");
      else if (pathname === "/terms-and-conditions")
        nav("/terms-and-conditions");
      else if (pathname === "/responsible-gaming") nav("/responsible-gaming");
      else if (pathname === "/inplay") nav("/inplay");
      else if (pathname.includes("gamedetails")) nav(`/gamedetails/${id}`);
    } else if (pathname === "/") {
      nav("/");
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

  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res) => {
      setItselfAllowed(res?.data?.selfAllowed);
    });
   
  }, []);

  const token = localStorage.getItem("token")
  useEffect(()=>{
    if(token !== null){
      GameAPI.ALLOTED_CASINO_LIST().then((res)=>{
        setItselfAllowedData(res?.data);
      })
    }
  }, [pathname, token])

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
      <>
        {pathname === "/login" ||
        pathname === "/register" ||
        pathname.includes("gamedetails") ? (
          ""
        ) : (
          <NavbarDesk />
        )}
        <div
          className={`${
            pathname === "/login" || pathname === "/register" ? "" : "row row5"
          }`}>
          {pathname === "/login" ||
          pathname === "/register" ||
          pathname.includes("gamedetails") ? (
            ""
          ) : (
            <div className="sidebar col-md-2">
              <SideBar casinoAllow={casinoAllow}/>
            </div>
          )}

          <div
            className={`${
              pathname === "/login" ||
              pathname === "/register" ||
              pathname.includes("gamedetails")
                ? ""
                : "col-md-10 featured-box load game-page"
            }`}>
            <Routes>
              <Route path="/" element={<ItemPageForHome />} />
              {/* <Route path="/" element={<LoginForDesk />} /> */}
              <Route
                path="/gamedetails/:id"
                element={<NewGameDetailPageDest />}
              />

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
              <Route path="/inplay" element={<InPlay casinoAllow={casinoAllow}/>} />
              <Route path="/home" element={<ItemPageForHome casinoAllow={casinoAllow}/>} />
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
              <Route path="/horseracing" element={<HomePage />} />
              {/* <Route path="/casino/:id" element={<CasinoForDesk />} /> */}
              <Route
                path="/livecasino"
                element={<LiveCasino liveCasino={"LIVECASINO"} showid={2} />}
              />
              <Route
                path="/slot"
                element={<LiveCasino liveCasino={"SLOT"} showid={2} />}
              />
              <Route
                path="/lottery"
                element={<LiveCasino liveCasino={"LOTTERY"} showid={2} />}
              />
              <Route
                path="/instantWin"
                element={<LiveCasino liveCasino={"INSTANTWIN"} showid={2} />}
              />
              <Route path="/fantsy" element={<FantsyTabs />} />
              <Route path="/aura" element={<NewLunch />} />
              <Route path="/supernowa" element={<SuperNowa />} />
              {/* <Route path="/sportbook" element={<ComingSoon/>} /> */}

              <Route path="/profitloss" element={<ProfitLossHome />} />

              <Route
                path="/unsetteledbet"
                element={<UnsetteledBetDeskHome />}
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
              <Route></Route>

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
              {ItselfAllowed === true &&
              localStorage.getItem("UsertypeInfo") != 2 ? (
                <>
                  <Route path="/deposit" element={<DepositForDesk />} />
                  <Route path="/withdraw" element={<NewWithdraw />} />
                </>
              ) : (
                ""
              )}
            </Routes>
          </div>
        </div>
        {(localStorage.getItem("token") == null && ItselfAllowed) &&  <WhatsAppIcon top={whatsAppIconPosition.top}/>}
        {pathname === "/login" ||
        pathname === "/register" ||
        pathname.includes("gamedetails") ? (
          ""
        ) : (
          <FooterForMob ItselfAllowed={ItselfAllowed}/>
        )}
      </>
    </div>
  );
};  

export default RouteDesktop;
