import React, { useEffect, useState } from "react";
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
import { CasinoApi } from "../../apis/CasinoApi";

const SportData = ({ casinoAllow }) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    // props.idddd(id);
  };

  const [providerList, setProviderList] = useState({})
  useEffect(()=>{
    CasinoApi.ProvideList({
      gameType:"ALL"
    }).then((res)=>{
      setProviderList(res?.data?.data)
    })

  }, []);
  return (
    <>
      <div className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      {localStorage.getItem("token") !== null ? "" : <BannerList />}

      <Sport gameIdForItemPage={gameIdForItemPage} />

      {(casinoAllow?.Aura || localStorage.getItem("token") === null) && <Slot />}

          <div className="casino-main">
            {(casinoAllow?.Nowa || localStorage.getItem("token") === null) && <SuperNowaHome path={"/m/sueprnowa"} />}
            {(casinoAllow?.Qtech || localStorage.getItem("token") === null) && (
              <>
                <LiveCasinoHome providerList={providerList?.liveCasino}/>
                <FantasyGamesHome path={"/m/fantsy"} />
                <SlotHome providerList={providerList} />
              </>
            )}
          </div>
          {localStorage.getItem("token") === null && <LotteryHome path={"/lottery"} />}
    </>
  );
};

export default SportData;
