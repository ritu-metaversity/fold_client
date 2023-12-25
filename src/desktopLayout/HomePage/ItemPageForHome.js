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
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
import SuperNowaHome from "../../CasinoHome/SuperNowaHome";

function ItemPageForHome() {
  return (
    <div className="main">
      <div className="container-fluid container-fluid-5">
        <div className="row itemHome">
          <DeskMainPage />
          <NewLunch />
          <SuperNowaHome path={"/supernowa"} />

          <LiveCasinoHome />
          <FantasyGamesHome path={"/fantsy"} />
          <SlotHome path={"/slot"} />
          <LotteryHome path={"/lottery"} />
          {/* <LiveCasino liveCasino={"LIVECASINO"} showid={1}/> */}
        </div>
      </div>
    </div>
  );
}

export default ItemPageForHome;
