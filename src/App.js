import { React, useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "../src/component/navBar/TopNav.css";

import Login from "./component/login/Login";
import { Routes, Route, useNavigate, useLocation, Router } from "react-router-dom";
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
import SportData from "./component/Sports/SportData"; 
import NavBar from "./component/navBar/NavBar";
import Mobilenav from "./component/navBar/MobileNav/Mobilenav";
import Signup3 from './component/Items/SignUpForm/signup3/Signup3'
import Signup1 from './component/Items/SignUpForm/signup1/Signup1'
import Signup2 from "./component/Items/SignUpForm/signup2/Signup2";
import Signup4 from "./component/Items/SignUpForm/signup4/Signup4";
import Signup5 from "./component/Items/SignUpForm/signup5/Signup5";
import DefaultPage from "./component/Items/DefaultPage/DefaultPage";
import DefaultHomePage from "./component/Items/DefaultPage/DefaultHomePage";
import { UserAPI } from "./apis/UserAPI";
import AboutUsPageForMob from "./component/AboutUsPageForMob/AboutUsPageForMob";
import FooterForMob from "./component/FooterForMob/FooterForMob";
import TermAndCondition from "./component/TermAndCondition/TermAndCondition";
import ResponsibleGaming from "./component/ResponsibleGaming/ResponsibleGaming";


function App() {
  const [SportId, setSportId] = useState("");
  const [Errmessage, setErrMessege] = useState("");
  const [Statusmessage, setStatusmessage] = useState(false);

  const nav = useNavigate();
  const { pathname } = useLocation();

  const hostname = (window.location.host).split(".");
  document.title= hostname[0];






  useEffect(() => {
    UserAPI.Self_By_App_Url().then((res)=>{
      let favicon = document.queryCommandValue("link[rel~={Logo}]");
      if(!favicon){
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(favicon);
      }
      favicon.href = res?.data?.favicon;
    })

    const time = setInterval(() => {
      if (localStorage.getItem("token") !== null ) {
        if(localStorage.getItem("Password-type") !== "old"){
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
      nav("/login");

      if(pathname === "/signup3"){
        nav("/signup3");
      }else if(pathname === "/signup1"){
        nav("/signup1")
      }else if(pathname === "/signup2"){
        nav("/signup2")
      }else if(pathname === "/signup4"){
        nav("/signup4")
      }else if(pathname === "/signup5"){
        nav("/signup5")
      }else if(pathname === "/"){
        nav("/")
      }else if(pathname === "/in-play"){
        nav("/in-play")
      } else if(pathname === "/register"){
        nav("/register")
      }else if(pathname ==="/about-us"){
        nav("/about-us")
      }
      else if(pathname === "/sports"){
        nav("/sports")
      }
      else if(pathname === "/terms-and-conditions"){
        nav("/terms-and-conditions")
      }
      else if(pathname === "/responsible-gaming"){
        nav("/responsible-gaming")
      }

    }
    else if(pathname === "/"){
      nav("/login")
    }
  }, [nav]);

  useEffect(()=>{
  if(pathname!=="/m/setting/changepassword" && localStorage.getItem("Password-type")==="old"){
  nav("/m/setting/changepassword")
  }
  },[pathname])

  const idddd = (id) => {
    setSportId(id);
  };

  const message = (vl)=>{
    setErrMessege(vl)
  }
  
  const statusMsg=(val)=>{
    setStatusmessage(val)
  }
  const statusMsgForLogout = (val)=>{
    setStatusmessage(val);
  }

  return (
    <div className="App">
   
        <Routes>
          <Route  path="/login" element={<Login Errmessage={Errmessage} Statusmessage={Statusmessage} />} />
          <Route  path="/register" element={<Register />} />
          <Route exact path="/signup3" element={<Signup3/>} />
          <Route exact path="/signup1" element={<Signup1/>} />
          <Route exact path="/signup2" element={<Signup2/>} />
          <Route exact path="/signup4" element={<Signup4/>} />
          <Route exact path="/signup5" element={<Signup5/>} />
          <Route path="" element={<NavBar />}>
          <Route path="/about-us" element={<AboutUsPageForMob/>} />
          <Route path="/terms-and-conditions" element={<TermAndCondition/>} />
          <Route path="/responsible-gaming" element={<ResponsibleGaming/>} />
            <Route  path="/" element={<DefaultHomePage/>}/>
            <Route  path="/in-play" element={<DefaultHomePage/>}/>
            <Route  path="/sports" element={<DefaultPage/>}/>
            {
              localStorage.getItem("UsertypeInfo") == 1 ?
            <>
            <Route  path="/deposit" element={<Deposit />} />
            <Route  path="/withdraw" element={<Withdraw />} />
            </>:""
            }

            <Route path="/gamedetail/:id" element={<GameHead SportId={SportId} />}/>
            <Route  path="/casino/:id" element={<Casino />} />
            <Route path="/m/reports/accountstatement" element={<AaccountStatement />}/>
            <Route  path="/m/reports/profitloss" element={<ProfitLoss />} />
            <Route  path="/m/reports/bethistory" element={<BetHistory />} />
            <Route path="/m/reports/unsetteledbet" element={<UnSetteledBet />}/>
            <Route path="/m/setting/changebtnvalue" element={<ChangeBtnValue />}/>
            <Route path="/m/setting/changepassword" element={<ChangePassword  message={message} statusMsg={statusMsg}/>}/>
            <Route  path="/SignOut" element={<SignOut statusMsgForLogout={statusMsgForLogout} />} />
  
            <Route path="" element={<Mobilenav />}>
              <Route  path="/Home" element={<Home idddd={idddd} />} />
              <Route  path="/m/sports" element={<SportData />} />
              <Route  path="/m/others" element={<Home />} />
              <Route  path="/m/In-play" element={<Home />} />
              <Route  path="/m/slot" element={<Slot />} />
            </Route>
          </Route>
          <Route  path="*" element={<Login/>} />
        </Routes>
        {
          pathname === '/login' ?"":<FooterForMob/>
        }
        
    </div>
  );
}

export default App;
