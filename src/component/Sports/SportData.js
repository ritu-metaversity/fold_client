import React, { useState } from "react";
import TopNav from "../navBar/TopNav";
import Sport from "./Sport";
import BannerList from "../BannerSection/BannerList";
import FooterForMob from "../FooterForMob/FooterForMob";
import Slot from "../Items/Slot/Slot";
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
import SuperNowaHome from "../../CasinoHome/SuperNowaHome";

const SportData = ({ItselfAllowedData}) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    // props.idddd(id);
  };
  return (
    <>
      <div className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      {localStorage.getItem("token") !== null ? "" : <BannerList />}

      <Sport gameIdForItemPage={gameIdForItemPage} />

      {ItselfAllowedData?.aura &&  <Slot />}
         
          <div className="casino-main">
            
            {ItselfAllowedData?.superNova && (
              <SuperNowaHome path={"/m/sueprnowa"} />
            )}
            {ItselfAllowedData?.qtech && (
              <>
                <LiveCasinoHome />
                <FantasyGamesHome path={"/m/fantsy"} />
                <SlotHome path={"/m/slots"} />
                <LotteryHome path={"/m/lottery"} />
              </>
            )}
            </div>
    </>
  );
};

export default SportData;
