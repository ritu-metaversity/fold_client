import { React, useEffect, useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/navBar/Nav.css";
import "../src/component/login/Login.css";
import "../src/component/navBar/TopNav.css";
import "../src/component/Items/SlotGame/SlotGame.css";

import Login from "./component/login/Login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RouteMobile from "./RouteMobile";
import RouteDesktop from "./RouteDesktop";
import { UserAPI } from "./apis/UserAPI";

function App() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [mobileRoutes, setMoileRoutes] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 1000) {
      setMoileRoutes(true);
      if (pathname.includes("/m/")) {
        nav("/home");
      }
    } else {
      setMoileRoutes(false);
      if(pathname == "//m/home")
      nav("/m/home");
    }
  }, []);

  useEffect(() => {
    document.title = window.location.hostname.replace('www.','');
    UserAPI.Self_By_App_Url().then((res)=>{
      if (res?.data.favicon) {
        let favicon = document.createElement("link");
        favicon.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(favicon);
        favicon.href = res?.data?.favicon;
      }
    });
  }, []);

  return (
    <div className="App">
      {mobileRoutes === true ? <RouteDesktop /> : <RouteMobile />}
    </div>
  );
}

export default App;
