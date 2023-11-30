import { React, useEffect, useState } from "react";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../sidebar/SideBar";
import { GameAPI } from "../../apis/gameAPI";
import NewLunch from "../Newlunch/NewLunch";
import BannerList from "../../component/BannerSection/BannerList";
import Itemdesk from "../itemPageforDesktop/Itemdesk";
import DeskMainPage from "../itemPageforDesktop/DeskMainPage";
import LatestEvent from "../../common/LatestEvent";
import LiveCasino from "../LiveCasino/LiveCasino";

function ItemPageForHome() {
  return (
    <div className="main">
      <div className="container-fluid container-fluid-5">
        <div className="row itemHome">
          {/* <LatestEvent /> */}
          <DeskMainPage />
          <NewLunch />
          {/* <LiveCasino liveCasino={"LIVECASINO"} showid={1}/> */}
        </div>
      </div>
    </div>
  );
}

export default ItemPageForHome;
