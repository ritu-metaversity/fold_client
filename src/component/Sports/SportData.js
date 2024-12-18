import React, { useEffect, useState } from "react";
import TopNav from "../navBar/TopNav";
import Sport from "./Sport";
import BannerList from "../BannerSection/BannerList";
// import FooterForMob from "../FooterForMob/FooterForMob";
// import Slot from "../Items/Slot/Slot";
import LiveCasinoHome from "../../CasinoHome/LiveCasinoHome";
import FantasyGamesHome from "../../CasinoHome/FantasyGamesHome";
import SlotHome from "../../CasinoHome/SlotHome";
import LotteryHome from "../../CasinoHome/LotteryHome";
// import SuperNowaHome from "../../CasinoHome/SuperNowaHome";
import { CasinoApi } from "../../apis/CasinoApi";
import Slot from "../Items/Slot/Slot";
import FantsyList from "../../desktopLayout/fantasyGame/FantsyList";

const SportData = ({ casinoAllow }) => {
  const [gameIdForItemPage, setGameIdForItemPage] = useState("");

  const gameId = (id) => {
    setGameIdForItemPage(id);
    // props.idddd(id);
  };

  const [providerList, setProviderList] = useState({})
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token !== null){
      CasinoApi.ProvideList({
        gameType:"ALL"
      }).then((res)=>{
        setProviderList(res?.data?.data)
      })
    }
  }, [token]);
  return (
    <>
      <div className="main-gameHead">
        <TopNav gameId={gameId} />
      </div>
      {token !== null ? "" : <BannerList />}

      <Sport gameIdForItemPage={gameIdForItemPage} />
      <FantsyList  showHome={true}/>
      {/* <Slot /> */}

      {/* {(casinoAllow?.Aura || token === null) && <Slot />} */}

          {/* <div className="casino-main">
            {(casinoAllow?.Nowa || token === null) && <SuperNowaHome path={"/m/sueprnowa"} />}
            {(casinoAllow?.Qtech || token === null) && (
              <>
                <LiveCasinoHome providerList={providerList?.liveCasino}/>
                <FantasyGamesHome path={"/m/fantsy"} />
                <SlotHome providerList={providerList} />
              </>
            )}
          </div>
          {token === null && <LotteryHome path={"/lottery"} />} */}
    </>
  );
};

export default SportData;
